---
editLink: true
---

# ArkRuntime

::: danger 提示
该能力目前边界性和稳定性没有明确的文档，不建议在真实的业务代码中强依赖该能力。

1. ArkRuntime 是非线程安全的，在当前线程创建的 ArkRuntime 不能在其他线程使用。
2. ArkRuntime 的创建和销毁需要消耗一定的性能，因此不建议在频繁创建和销毁的场景中使用。
3. 每个 ArkRuntime 实例都独占当前的线程，每个线程只能存在一个 ArkRuntime 实例。
   :::

ArkRuntime 是鸿蒙特有的拓展能力，旨在为我们提供在 Native 创建虚拟机运行 ArkTS 代码，从而减少在主线程运行代码的成本。

一个典型的场景是：当我们获取蓝牙状态时需要在 ArkTS 通过对应的模块实现，这部分代码需要运行在 ArkTS 层，这样就面临两个问题：

1. 无法在 Native 层获取到对应的蓝牙状态，只能通过 N-API 进行一些中转。
2. 强依赖于当前代码运行的事件循环。

因此，系统提供了一系列 ArkRuntime 的接口来给我们绕开这些限制，我们将分别从同步函数和异步函数举两个例子来简单说明在 ohos-rs 中如何使用。

## 同步 API

我们以蓝牙状态中的`getState`方法作为演示，如何通过 ohos-rs 在 native 侧获取到对应的蓝牙状态。

我们在 ArkTS 中获取蓝牙状态的代码如下所示：

```ts
import ble from "@ohos.bluetooth.access";

const state = ble.getState();
```

其中`getState`是同步函数，其返回结果是数字类型的枚举值。因此我们在 native 中的代码则实现如下：

```rust
use napi_derive_ohos::napi;
use napi_ohos::{ark::ArkRuntime, JsNumber, Result};

#[napi]
pub fn get_state() -> Result<JsNumber> {
  // 创建一个新的虚拟机环境
  let runtime = ArkRuntime::new()?;

  // 加载 @ohos.bluetooth.access 模块
  let ble = runtime.load_without_info("@ohos.bluetooth.access")?;
  // 现在 ble 已经是对应的模块，只需要调用获取获取其属性即可。
  let ret: JsNumber  = ble.call_without_args("getState")?;
  Ok(ret)
}
```

这里有几点需要注意：

1. 加载模块有三种方法其差异分别如下：
   - **load** 只允许在主线程被调用
   - **load_with_info** 加载模块时附带路径，只要用于加载第三方模块和本地模块
   - **load_without_info** 用于加载系统的内建模块
2. 系统内建模块仅支持 `@ohos` 开头的模块，不支持`@kit`的名称，如需加载只能在本地新建一个 ets 文件重导出。

## 异步 API

异步 API 的逻辑与同步 API 基本一致。唯一的差异在于：异步 API 在调用方法之后需要通过 `run_loop`来使异步函数被执行，从而获取到最终的结果。

我们通过监听蓝牙开关状态来演示这一过程。在 ArkTS 中，我们一般如下实现：

```ts
import ble from "@ohos.bluetooth.access";

ble.on("stateChange", (ret) => {
  // 状态变更后 该函数会被执行
});
```

无论是`on`还是`off`，我们可以最简单的理解成他本身就是个函数调用，只是结果是异步的。因此，我们在 Native 中的代码如下所示：

```rust
use napi_derive_ohos::napi;
use napi_ohos::{
  ark::{ArkRuntime, EventLoopMode},
  bindgen_prelude::{FnArgs, Function},
  threadsafe_function::ThreadsafeFunction,
  Env, JsNumber, JsString, Result,
};
use ohos_hilog_binding::hilog_info;
use std::{
  sync::{
    mpsc::{self, Sender},
    LazyLock, Mutex,
  },
  thread,
  time::Duration,
};

static TX: LazyLock<Mutex<Option<Sender<bool>>>> = LazyLock::new(|| Mutex::new(None));

#[napi]
pub fn run_ble(cb: ThreadsafeFunction<JsNumber, ()>) -> Result<()> {
  let (tx, rx) = mpsc::channel::<bool>();

  let mut tx_option = TX.lock().unwrap();
  *tx_option = Some(tx);

  let _handle = thread::spawn(move || {
    let runtime = ArkRuntime::new().unwrap();
    let module = runtime.load_without_info("@ohos.bluetooth.access").unwrap();

    let func: Function<JsNumber, ()> = runtime
      .env
      .create_function_from_closure("stateChange", move |ctx| {
        hilog_info!("arkruntime_ble");
        let arg: JsNumber = ctx.first_arg().unwrap();
        cb.call(
          Ok(arg),
          napi_ohos::threadsafe_function::ThreadsafeFunctionCallMode::NonBlocking,
        );
        Ok(())
      })
      .unwrap();

    module
      .call::<_, FnArgs<(String, Function<JsNumber, ()>)>, ()>(
        "on",
        (String::from("stateChange"), func).into(),
      )
      .unwrap();

    loop {
      runtime.run_loop(EventLoopMode::NonBlocking).unwrap();

      if let Ok(_) = rx.try_recv() {
        break;
      }
      thread::sleep(Duration::from_millis(10));
    }
  });

  Ok(())
}

#[napi]
pub fn stop() -> Result<()> {
  let tx_lock = TX.lock().unwrap();

  if let Some(tx) = tx_lock.as_ref() {
    tx.send(true).unwrap();
    return Ok(());
  }
  Ok(())
}
```

这样我们就可以在 native 中实现对异步函数的调用了。
