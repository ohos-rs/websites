---
editLink: true
---

# ArkRuntime

::: danger Note
This capability currently has unclear stability and boundary guarantees. Do not strongly depend on it in production business code.

1. ArkRuntime is not thread-safe. An ArkRuntime created on one thread cannot be used from another thread.
2. Creating and destroying ArkRuntime has a runtime cost, so it is not recommended for scenarios that create and destroy it frequently.
3. Each ArkRuntime instance exclusively occupies the current thread, and each thread can only have one ArkRuntime instance.
   :::

ArkRuntime is an OpenHarmony-specific extension that lets native code create a VM and run ArkTS code. This can reduce the cost of running certain work on the main thread.

A typical case is reading Bluetooth state. On OpenHarmony, this is usually done through an ArkTS module, so two problems appear:

1. Native code cannot get the Bluetooth state directly and has to use N-API as a bridge.
2. The code strongly depends on the event loop where it runs.

OpenHarmony provides ArkRuntime APIs to work around these limits. The following sections show how to use it from ohos-rs with synchronous and asynchronous APIs.

## Synchronous API

Use the Bluetooth `getState` method as an example. In ArkTS, the code looks like this:

```ts
import ble from "@ohos.bluetooth.access";

const state = ble.getState();
```

`getState` is synchronous and returns a numeric enum value. The native implementation can be written as follows:

```rust
use napi_derive_ohos::napi;
use napi_ohos::{ark::ArkRuntime, JsNumber, Result};

#[napi]
pub fn get_state() -> Result<JsNumber> {
  // Create a new VM environment.
  let runtime = ArkRuntime::new()?;

  // Load the @ohos.bluetooth.access module.
  let ble = runtime.load_without_info("@ohos.bluetooth.access")?;
  // ble is now the module object, so call the method directly.
  let ret: JsNumber = ble.call_without_args("getState")?;
  Ok(ret)
}
```

There are a few details to note:

1. There are three ways to load modules:
   - **load** can only be called from the main thread.
   - **load_with_info** loads a module with path information, mainly for third-party and local modules.
   - **load_without_info** loads built-in system modules.
2. Built-in system modules only support names starting with `@ohos`. `@kit` module names are not supported directly. If needed, create a local ets file and re-export the module.

## Asynchronous API

Asynchronous APIs follow the same basic idea. The difference is that after calling an async method, you need to call `run_loop` so the async work can execute and produce its final result.

The following example listens to Bluetooth switch state changes. In ArkTS, it usually looks like this:

```ts
import ble from "@ohos.bluetooth.access";

ble.on("stateChange", (ret) => {
  // This callback runs after the state changes.
});
```

Both `on` and `off` can be treated as function calls whose result is asynchronous. The native code can be written as follows:

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

This allows native code to call asynchronous ArkTS APIs.
