---
editLink: true
---

如果熟悉 napi-rs 或者 cross-build 的同学对于该能力会相当熟悉，鉴于 zig 的优秀构建系统，我们能够使用 zig 作为编译器来实现跨平台交叉编译。

在近期的努力下，鸿蒙使用 zig 作为编译器构建 Rust 项目目前基本上已经可用，相关参考相关 [PR](https://github.com/ziglang/zig/pull/20020)。

## 使用

zig 目前的镜像基于基础的 4.1 版本镜像进行构建。

```bash
docker push southorange/ohos-base-zig:v4.1
```

## 示例

具体使用示例以及自定义构建逻辑请参考 [Repo](https://github.com/ohos-rs/zig-setup)