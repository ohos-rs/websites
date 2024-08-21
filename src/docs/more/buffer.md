---
editLink: true
outline: "deep"
---

# Buffer

Buffer 是 Node.js 生态中最重要的一部分，他能够为我们提供很多强大的能力。比如大文件读写，流处理等等。

不过在鸿蒙上对于 Buffer 的支持性不好，虽然官方目前提供了`@ohos.buffer` 模块，但是实际上与通过 N-API 创建的 Buffer 并不是同一个内容。

**现阶段通过 N-API 创建的 Buffer 实际上就是 ArrayBuffer，因此在最终的构建输出类型声明文件中会被修正为 ArrayBuffer。**

> @ohos.buffer 实际使用代码为：`import { buffer } from "@kit.ArkTS"`

因此，现阶段建议优先使用 `ArrayBuffer` 而非 `Buffer`。

## 使用

如果确实需要定义该类型，上层 ArkTS 可以使用如下方法进行数据初始化。

我们有这样的一个例子：

```rust
use napi_derive_ohos::napi;
use napi_ohos::bindgen_prelude::Buffer;

#[napi]
pub fn get_buffer(buf: Buffer) -> usize {
  buf.len()
}
```

### buffer

```ts
import { buffer } from '@kit.ArkTS';

const buf = buffer.from([1,2,3]);

const ret = getBuffer(buf.buffer);
```

### ArrayBuffer

```ts
const buf = new ArrayBuffer(10);

const ret = getBuffer(buf);
```