---
editLink: true
---

# ThreadSafeFunction

We know that the JavaScript runtime is a single-threaded environment, making it essentially impossible to use multiple threads within this environment. However, `NAPI` enables us to have the capability to use multiple threads. To prevent the haphazard use of multiple threads in `NAPI` from causing chaos in the JavaScript runtime, the official documentation provides the capability of `ThreadSafeFunction`. This is the only way we interact between multiple threads and the JavaScript runtime. Similar implementations are also provided on HarmonyOS.

Now, let's start to experiment with using `TSFN` to implement a native multithreaded application.

## Basic

Firstly, our `TSFN` will accept a callback function, which will be invoked after the multithreaded execution is completed.

Therefore, we need to define a parameter for the callback function, as shown in the following code:

```rust
use napi_derive_ohos::napi;
use napi_ohos::{JsFunction, Result};

#[napi]
pub fn run_ts_fn(cb: JsFunction) -> Result<()>  {
  Ok(())
}
```

Then, we need to create a `TSFN` that can be safely called in a child thread. Here's how you can do it:

```rust
use napi_derive_ohos::napi;
use napi_ohos::{
    threadsafe_function::{ErrorStrategy, ThreadsafeFunction},
    JsFunction, Result,
};

#[napi]
pub fn run_ts_fn(cb: JsFunction) -> Result<()> {
    let ts_fn: ThreadsafeFunction<i64, ErrorStrategy::CalleeHandled> = cb // [!code ++]
        .create_threadsafe_function(0, |ctx| ctx.env.create_int64(ctx.value).map(|v| vec![v])) // [!code ++]
        .unwrap(); // [!code ++]

    Ok(())
}
```

You can see that when we create a `TSFN`, it accepts two generic parameters. The first one is used to define the current data type, which will be passed to `ctx.value` when the `TSFN` is called. The second one is used to define the response mode of the current `TSFN`. Following that, when we create it, we pass two parameters: the first one is the callback queue size of the `TSFN`. When it's set to 0, the queue will be unlimited. The second one is the final execution callback function, used to pass data back to the JS environment.

::: tip
It's worth noting that ultimately, when returning, we need to return a list. This list will serve as the arguments passed to the callback function in the JS environment.
:::

Now we can call this function in any child thread.

```rust
use std::thread;

use napi_derive_ohos::napi;
use napi_ohos::{
    threadsafe_function::{ErrorStrategy, ThreadsafeFunction, ThreadsafeFunctionCallMode},
    JsFunction, Result,
};

#[napi]
pub fn run_ts_fn(cb: JsFunction) -> Result<()> {
    let ts_fn: ThreadsafeFunction<i64, ErrorStrategy::CalleeHandled> = cb
        .create_threadsafe_function(0, |ctx| ctx.env.create_int64(ctx.value).map(|v| vec![v]))
        .unwrap();

    thread::spawn(move || {  // [!code ++]
      ts_fn.call(Ok(1), ThreadsafeFunctionCallMode::NonBlocking);  // [!code ++]
    });  // [!code ++]

    Ok(())
}
```

In the JavaScript code, it will look something like this:

```ts
import tslib from 'libts_fn.so';

tslib.runTsFn((result) => {
    console.log(result);
    // result is 1;
});
```

## ErrorStrategy

In JavaScript, we generally have two ways to handle callback functions:

1. When an error occurs, the error will be returned as the first argument of the callback function. Otherwise, the first argument will be null, indicating normal execution.
2. When an error occurs, it throws an exception directly and exits the program.

`ErrorStrategy::CalleeHandled` is used for the first scenario, while `ErrorStrategy::Fatal` is used for the second scenario.