---
editLink: true
outline: "deep"
---

# cargo

该命令从`0.5.0`的版本开始支持，用于提供给需要构建环境的 cargo 子命令执行。

## 用法

标准用法如下所示：

```shell
ohrs cargo expand
```

实际上就是提供了 ohos 的构建环境去执行`cargo expand`命令。

## 参数

### -a/--arch 

指定构建架构，支持 `arm64/aarch`, `arm/arm32`, `x86_64/x64`。

默认构建 `arm64` 构架目标。

### --disable-target

不传入默认的构建目标架构参数。
