---
editLink: true
---
> [!IMPORTANT] ✨
> **如果该项目对您有一定的帮助，请不吝给我们点一个 [star](https://github.com/ohos-rs/ohos-rs)。非常感谢！**


## 什么是 `ohos-rs`?

OpenHarmony 目前底层的运行机制与 Node.js 十分相像，但是在一些小的方面有一些差异。因此我们基于 [napi-rs](https://github.com/napi-rs/napi-rs) 做了一些处理，使得基本上在鸿蒙上可用并且用法基本对齐。

## 一个简单的 🌰

现在我们可以基于 ohos-rs 实现一个简单的函数，其名为 `add`

```rs
use napi_derive_ohos::napi;

#[napi]
pub fn add(left: u32, right: u32) -> u32 {
  left + right
}
```


在鸿蒙上层的 ArkTS 里可以像下面这样调用：

```ts
import basic from 'libadd.so';

const result = basic.add(1,2);
// result is 3
```