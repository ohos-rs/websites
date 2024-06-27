---
editLink: true
outline: "deep"
---

# ThreadSafeFunction

我们知道在 Node.js 中，整体是一个单线程的执行环境。每个数据和函数调用操作都跟`env` 强相关，而 env 本身又无法被安全的在线程之间传递（这可能会打破单线程执行的顺序导致异常），这对于我们子线程操作非常不方便。因此 N-API 提供了 thread-safe-function 的设计来简化在子线程中操作函数的逻辑。

**实际上这也是我们跨线程调用上层 JS/ArkTS 传递的函数的唯一办法**。

接下来我们将简单的讲解下如何在 ohos-rs 中定义和使用 ThreadSafeFunction(后面都简称：TSFN)。

## 基础用法

首先，我们需要了解什么时候需要使用到 TSFN ？

在上层的应用开发中，我们一般会采用类似于回调的执行方法来实现一些异步逻辑，纯 JS 实现的代码当然没什么问题。但是在 C++ 实现中，这个逻辑完全有可能是在某个真实的子线程进行处理的，这时候再去调用回调就变成了跨线程的操作。

而我们所有的 NAPI 操作基本上都是需要跟注册时传入的`env` 绑定的，而 env 本身也不允许被线程之间安全的传递，这就意味着我们不能将 env 存起来然后在子线程中调用的时候使用。

TSFN 正是针对于这种场景出现的，为了解决跨线程的函数调用，我们可以将普通的 JsFunction 包装成 TSFN，包装之后的函数是允许在线程之间传递的。

目前 TSFN 的定义如下所示：

```rust
pub struct ThreadsafeFunction<
  T: 'static,
  Return: 'static + FromNapiValue = Unknown,
  CallJsBackArgs: 'static + JsValuesTupleIntoVec = T,
  const CalleeHandled: bool = true,
  const Weak: bool = false,
  const MaxQueueSize: usize = 0,
> {
  ...
}
```

其中6个泛型作用分别是：

1. T: 回调函数的入参类型，如果是多个参数可以用元组定义。
2. Return: 回调函数的执行返回值，该返回值可以在 native 侧获取到。
3. CallJsBackArgs: 回调函数的入参类型，可以简单理解成 T 的别名，但是多了一些 trait 限制。
4. CalleeHandled: TSFN 执行抛错的模式。true: 以回调参数形式，false: 直接抛错误。
5. Weak: 是否为 weak 模式，当设置为 true 时，创建的 TSFN 会被调用 `napi_unref_threadsafe_function` 来去掉引用。
6. MaxQueueSize: 设置 TSFN 回调函数队列的大小，默认为 0 则为无限大。

### 直接接受 TSFN

最常见的使用就是在函数定义的时候直接在参数中定义成 TSFN 来接受一个函数，该函数在使用的时候已经被框架包装成为了一个 TSFN，无须开发者再进行任何操作了。

```rust
use std::thread;

use napi_derive_ohos::napi;
use napi_ohos::{
    threadsafe_function::{ThreadsafeFunction, ThreadsafeFunctionCallMode},
    Env,
};

#[napi]
pub fn run_ts_fn(left: i32, right: i32, func: ThreadsafeFunction<i32, bool>) {
    thread::spawn(move || {
        func.call_with_return_value(
            Ok(left + right),
            ThreadsafeFunctionCallMode::NonBlocking,
            |ret: Result<bool, napi_ohos::Error>, env: Env| {
                println!("ret");
                Ok(())
            },
        )
    });
}
```

该函数对于上层调用的函数签名如下所示：
```ts
export declare function runTsFn(left: number, right: number, func: (err: Error | null, arg: number) => boolean): void
```

### 基于 Function 构建

第二种方式是参数直接接收 Function，在函数内部进行 TSFN 的包装，与上面相同的示例在该场景下可以这样写：

```rust
use std::thread;

use napi_derive_ohos::napi;
use napi_ohos::{bindgen_prelude::Function, threadsafe_function::ThreadsafeFunctionCallMode, Env};

#[napi]
pub fn run_ts_fn(left: i32, right: i32, func: Function<i32, bool>) {
    let tsfn = func
        .build_threadsafe_function()
        .callee_handled::<true>()
        .build()
        .unwrap();

    thread::spawn(move || {
        tsfn.call_with_return_value(
            Ok(left + right),
            ThreadsafeFunctionCallMode::NonBlocking,
            |ret: Result<bool, napi_ohos::Error>, env: Env| {
                println!("ret");
                Ok(())
            },
        )
    });
}
```

通过这些方式我们能够方便的创建的 TSFN 函数来实现在任意的子线程调用回调。

::: danger
请注意：请不要在回调函数等地方执行过于复杂的运算或者耗时任务。因为他是在主线程执行的，这会导致主线程卡死。
:::