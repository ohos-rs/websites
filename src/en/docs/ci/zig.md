---
editLink: true
---

For those familiar with napi-rs or cross-build, this capability will be quite familiar. Given Zig's excellent build system, we can use Zig as a compiler to achieve cross-platform cross-compilation.

Currently, Zig HarmonyOS adaptation-related capabilities have been split into an independent organization [openharmony-zig](https://github.com/openharmony-zig) for maintenance. Current progress:

1. Support cross-platform cross-compilation capabilities based on Zig through cross-build.
2. Provide a simple zig-napi implementation based on Zig for native module development.

For the overall picture, you can refer to the repository [zig-napi](https://github.com/openharmony-zig/zig-napi).

- Example based on zig-napi: [zig-ping](https://github.com/openharmony-zig/zig-ping)
- Example based on cross-build: [ada-ohos](https://github.com/harmony-contrib/ada-ohos)
