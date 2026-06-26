---
editLink: true
outline: "deep"
---

# cargo

`ohrs cargo` 用于在 OpenHarmony 构建环境下执行任意 cargo 子命令。常见场景是运行 `cargo expand`、`cargo check` 或其他需要目标环境的 cargo 扩展命令。

## 用法

```shell
ohrs cargo expand
```

它会为底层 cargo 命令注入 OpenHarmony 相关环境和默认 target 参数。

## 参数

| 参数                      | 描述                                                                                               | 类型       | 默认值  | 示例                                   |
| ------------------------- | :------------------------------------------------------------------------------------------------- | :--------- | :------ | :------------------------------------- |
| `-a, --arch <ARCH>`       | 执行命令使用的目标架构，支持 `arm64/aarch`、`arm/arm32`、`x86_64/x64`、`loongarch64`，可重复传入。 | `string[]` | `arm64` | `ohrs cargo --arch x64 check`          |
| `--disable-target`        | 不注入默认 target 参数，并且命令只执行一次。                                                       | `boolean`  | `false` | `ohrs cargo --disable-target metadata` |
| `--bisheng`               | 使用 BiSheng 编译工具链运行命令。                                                                  | `boolean`  | `false` | `ohrs cargo --bisheng check`           |
| `-p, --package <PACKAGE>` | workspace 模式下只对指定 package 运行命令；也可通过 cargo 参数传入 `-p package`。                  | `string`   | 无      | `ohrs cargo -p native_mod check`       |
| `--soname <SONAME>`       | 为需要链接的命令设置动态库 SONAME。                                                                | `string`   | 无      | `ohrs cargo --soname native_mod build` |

## 示例

检查当前 package：

```shell
ohrs cargo check
```

对多个架构执行同一个命令：

```shell
ohrs cargo --arch aarch --arch x64 check
```

不注入 OpenHarmony target，只复用环境变量：

```shell
ohrs cargo --disable-target metadata
```
