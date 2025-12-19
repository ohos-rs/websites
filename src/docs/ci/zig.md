---
editLink: true
---

如果熟悉 napi-rs 或者 cross-build 的同学对于该能力会相当熟悉，鉴于 zig 的优秀构建系统，我们能够使用 zig 作为编译器来实现跨平台交叉编译。

目前已经 Zig 鸿蒙适配相关能力拆分到独立的组织 [openharmony-zig](https://github.com/openharmony-zig) 中进行维护。当前进度：

1. 支持基于 cross-build 实现基于 zig 的跨平台交叉编译能力。
2. 提供简单的基于 zig 实现的 zig-napi 来实现原生模块的开发。

整体可以参考仓库 [zig-napi](https://github.com/openharmony-zig/zig-napi)。

- 基于 zig-napi 的案例： [zig-ping](https://github.com/openharmony-zig/zig-ping)
- 基于 cross-build 的案例：[ada-ohos](https://github.com/harmony-contrib/ada-ohos)
