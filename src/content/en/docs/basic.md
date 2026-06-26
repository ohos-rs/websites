---
editLink: true
---

> [!IMPORTANT] Star
> **If you find this project helpful, we'd appreciate it if you could give us a [star](https://github.com/ohos-rs/ohos-rs). Thank you!**

## What's the `ohos-rs`?

The runtime of HarmonyOS is very similar to Node.js, but there are slight differences in some logic. ohos-rs is based on [napi-rs](https://github.com/napi-rs/napi-rs) and adapts its Rust-first development experience for OpenHarmony. The overall APIs are basically aligned with napi-rs.

## Simple example

We can write a simple function called `add`.

```rs
use napi_derive_ohos::napi;

#[napi]
pub fn add(left: u32, right: u32) -> u32 {
  left + right
}
```

In HarmonyOS, we can call it with some code.

```ts
import basic from 'libadd.so';

const result = basic.add(1,2);
// result is 3
```
