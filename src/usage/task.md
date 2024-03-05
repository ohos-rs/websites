# Task

`Task` is the most important part of the ohos-rs. It helps us to implement complex logic in `libuv`, which can avoid cause the main thread to lock.

For example, if we perform CPU-intensive calculations in the main thread, it will cause the main thread to freeze, and the UI and other tasks cannot proceed.

## Basic usage

If we need to use `task`, we should implement the `Task` trait for any data. Task's trait is below here:

```rust
pub trait Task: Send + Sized {
  type Output: Send + Sized + 'static;
  type JsValue: ToNapiValue + TypeName;

  /// Compute logic in libuv thread
  fn compute(&mut self) -> Result<Self::Output>;

  /// Into this method if `compute` return `Ok`
  fn resolve(&mut self, env: Env, output: Self::Output) -> Result<Self::JsValue>;

  /// Into this method if `compute` return `Err`
  fn reject(&mut self, _env: Env, err: Error) -> Result<Self::JsValue> {
    Err(err)
  }

  // after resolve or reject
  fn finally(&mut self, _env: Env) -> Result<()> {
    Ok(())
  }
}
```

For us, we must implement the basic method: `compute` `resolve`.

**compute**   
This method will be executed in `libuv` with sub thread.

**resolve**   
This method will be executed in the main thread.

::: warning
You should avoid to run the complex logic in this method.
:::

## Simple example

Now we try to implement the `fibonacci` with task.

At first, we need to declare a basic struct.

```rust
fn fibonacci_native(n: u32) -> u32 {
    match n {
        1 | 2 => 1,
        _ => fibonacci_native(n - 1) + fibonacci_native(n - 2),
    }
}

struct ComputeFib {
    n: u32,
}

impl ComputeFib {
    pub fn new(n: u32) -> ComputeFib {
        ComputeFib { n }
    }
}
```

Then, we need to implement the `Task` for `ComputeFib`.

```rust
impl Task for ComputeFib {
    type Output = u32;
    type JsValue = JsNumber;

    fn compute(&mut self) -> Result<Self::Output> {
        Ok(fibonacci_native(self.n))
    }

    fn resolve(&mut self, env: Env, output: Self::Output) -> Result<Self::JsValue> {
        env.create_uint32(output)
    }
}
```

Finally just to register a method for `ArkTS`, the function's sign should be below here:

::: code-group
```rust [lib.rs]
// register method
#[napi(ts_return_type="Promise<number>")]
pub fn fib(env: Env, init: u32) -> Result<JsObject> {
    let task = ComputeFib::new(init);
    let async_promise = env.spawn(task).unwrap();
    Ok(async_promise.promise_object())
}
```

```ts [index.d.ts]
// ts declare
export function fib(init: number): Promise<number>
```
:::

Now we can use it in `ArkTS`.

```ts
import nativeFib from 'libfib.so';

const result = await nativeFib.fib(10);
```

The fibonacci will run in the `libuv`.