---
editLink: true
---

# Task

与 napi-rs 相同的，`Task` 同样是 ohos-rs 中最重要的一部分。它能够帮助我们快速的基于`libuv`实现各种复杂异步逻辑，这可以避免我们对主线程的阻塞。

举个🌰：假设我们在主线程去实现一个斐波那契数列计算，最终就会导致 UI 和其他任务无法进行，从而导致 App freeze。

## 基础用法

如果我们需要使用`Task`，那么就需要我们为其实现名为`Task`的`trait`。该`trait`定义如下所示：

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

对于我们来说，需要实现最基本的两个方法: `compute` `resolve`.

**compute**   
这个函数中的逻辑将会在`libuv`的子线程中被执行

**resolve**   
这个函数将会在`compute`函数执行完成之后执行，并且该函数是在主线程执行的。

::: tip 提示
1. 请避免复杂和耗时的任务或者逻辑在`resolve`方法中被执行。
2. 注意这个是内部的实现，写在这里以帮助我们更好的使用 Task，如果你只是想直接用，请忽略这部分直接参考下面的代码。
:::

## 一个简单的🌰

现在我们尝试用 Task 来实现一个`fibonacci`计算逻辑。

首先我们需要定义一个计算方法以及最简单的数据结构。

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

然后我们需要为定义的 `ComputeFib` 实现 `Task`。

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

最后我们只需要将方法注册到环境中即可，其函数签名也应该如下所示：

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

现在我们可以在上层的 ArkTS 直接调用这个方法如下所示：

```ts
import nativeFib from 'libfib.so';

const result = await nativeFib.fib(10);
```

最终的斐波那契计算将会在 `libuv` 中执行，主线程不会被该计算任务所阻塞。