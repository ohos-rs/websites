---
editLink: true
outline: "deep"
---

# Buffer

Buffer 是 Node.js 生态中最重要的一部分，他能够为我们提供很多强大的能力。比如大文件读写，流处理等等。

不过在鸿蒙上对于 Buffer 的支持性不好，虽然官方目前提供了`@ohos.buffer` 模块，但是实际上与通过 N-API 创建的 Buffer 并不是同一个内容。

> @ohos.buffer 实际使用代码为：`import { buffer } from "@kit.ArkTS"`

因此，现阶段建议优先使用 `ArrayBuffer` 而非 `Buffer`.