---
editLink: true
---

## What's `ohos-rs`?

The runtime of HarmonyOS is very similar to Node.js, but there are slight differences in some logic, so it forked the code of [napi-rs](https://github.com/napi-rs/napi-rs) and made some modifications. The overall functions are basically aligned with napi-rs.


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