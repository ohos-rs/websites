---
editLink: true
outline: "deep"
---

# Buffer

Buffer is a crucial part of the Node.js ecosystem, providing us with many powerful capabilities such as large file reading/writing and stream processing.

However, HarmonyOS doesn't have good support for Buffer. Although the official documentation currently offers the `@ohos.buffer` module, it's not actually the same as the Buffer created through N-API.

> The actual code to use @ohos.buffer is: `import { buffer } from "@kit.ArkTS"`

Therefore, at this stage, it's recommended to prioritize the use of `ArrayBuffer` over `Buffer`.
