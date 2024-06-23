---
editLink: true
---

# 基本用法

在基本的使用上，我们完全对于 [napi-rs](https://napi.rs/)，因此你可以直接参考 napi-rs 的官方文档来学习使用。并且 napi-rs 以及 ohos-rs 项目中也包括了非常多的示例代码以及用于单元测试的代码，这些代码我认为可能对你学习基于 napi-rs 开发 Node 模块或者基于 ohos-rs 开发鸿蒙模块都有着非常好的借鉴作用。


## 特别注意

虽然 ohos-rs 基本上对齐了 napi-rs 但是因为鸿蒙的特异性，我们还是会存在一些差异。在日常开发中，我们需要额外注意。

### 不支持 symbol

因为鸿蒙中不支持使用 symbol，因此 ohos-rs 将 symbol 相关的支持能力都进行了隐藏/移除。在使用的时候，如果没有找到 symbol 相关的能力是符合预期的。

### 功能集有限

目前鸿蒙只支持标准的 N-API **1-8** 的能力集，因此在配置 feature 的时候不能开启 N-API9 以及 experimental 相关的功能。

### 额外的变更

1. `napi_run_script`使用`napi_run_script_path`替代，在 ohos-rs 中暴露的 API 没有变化。

### 不需要调用的能力

1. 无须额外调用 `napi_adjust_external_memory` 方法