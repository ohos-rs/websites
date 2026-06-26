---
editLink: true
outline: "deep"
---

# build

`ohrs build` 会为当前 Rust 项目提供 OpenHarmony 构建环境，执行 `cargo build`，收集动态库产物，并生成 ArkTS/TypeScript 类型声明文件。

## 用法

```shell
ohrs build
```

向底层 `cargo build` 透传参数时，把参数放在 `--` 后面：

```shell
ohrs build -- -v
```

## 参数

| 参数                        | 描述                                                                                              | 类型       | 默认值                     | 示例                                   |
| --------------------------- | :------------------------------------------------------------------------------------------------ | :--------- | :------------------------- | :------------------------------------- |
| `--release`                 | 使用 release 模式构建。                                                                           | `boolean`  | `false`                    | `ohrs build --release`                 |
| `--dist <DIST>`             | 收集最终产物的目录。                                                                              | `string`   | `dist`                     | `ohrs build --dist test`               |
| `-a, --arch <ARCH>`         | 构建目标架构，支持 `arm64/aarch`、`arm/arm32`、`x86_64/x64`、`loongarch64`，可重复传入。          | `string[]` | `arm64`、`arm32`、`x86_64` | `ohrs build -a aarch -a x64`           |
| `--static`                  | 同步复制静态链接库到最终输出目录。                                                                | `boolean`  | `false`                    | `ohrs build --static`                  |
| `--skip-libs`               | 不复制动态库到最终输出目录。                                                                      | `boolean`  | `false`                    | `ohrs build --skip-libs`               |
| `--dts-cache`               | 使用 dts 缓存生成最终类型声明文件。当前实现默认开启。                                             | `boolean`  | `true`                     | `ohrs build --dts-cache`               |
| `--skip-check`              | 跳过 `napi-ohos` 与 `napi-derive-ohos` 版本检查。当前实现默认开启。                               | `boolean`  | `true`                     | `ohrs build --skip-check`              |
| `--target-dir <TARGET_DIR>` | 指定 ohrs 构建临时目录。                                                                          | `string`   | 当前目录                   | `ohrs build --target-dir .ohrs-target` |
| `--zigbuild`                | 使用 `cargo-zigbuild` 构建。                                                                      | `boolean`  | `false`                    | `ohrs build --zigbuild`                |
| `--bisheng`                 | 使用 BiSheng 编译工具链构建。                                                                     | `boolean`  | `false`                    | `ohrs build --bisheng`                 |
| `-p, --package <PACKAGE>`   | 在 workspace 中只构建指定 package；也可以通过 `-- -p package` 透传给 cargo。                      | `string`   | 无                         | `ohrs build -p native_mod`             |
| `--skip-napi-check`         | 跳过当前 package 是否依赖 `napi-ohos` 和 `napi-derive-ohos` 的检查。当前实现默认开启。            | `boolean`  | `true`                     | `ohrs build --skip-napi-check`         |
| `--soname <SONAME>`         | 设置生成动态库的 SONAME。支持 `foo`、`foo.so`、`libfoo.so`，不支持 `libfoo.so.1` 这类版本号格式。 | `string`   | 无                         | `ohrs build --soname native_mod`       |

## 构建多目标产物

默认会构建 `arm64-v8a`、`armeabi-v7a` 和 `x86_64`。通过 `--arch` 可以限制或扩展目标架构。

构建一个平台：

```shell
ohrs build --arch aarch
```

构建两个平台：

```shell
ohrs build --arch aarch --arch x64
```

构建 LoongArch64：

```shell
ohrs build --arch loongarch64
```

## Workspace 构建

在 workspace 根目录执行时，`ohrs build` 会查找依赖 `napi-derive-ohos` 的 workspace package 并构建它们。使用 `-p/--package` 可以只构建其中一个 package。

```shell
ohrs build --package native_mod
```

如果在某个 package 目录或其子目录中执行，则只构建当前 package。

## 为类型定义文件注入自定义头

在鸿蒙开发中，某些场景需要使用类型重写以完善生成的类型。例如使用 `raw-file` 模块读取鸿蒙应用文件：

```rust
use napi_derive_ohos::napi;
use napi_ohos::{bindgen_prelude::Object, Env};
use ohos_raw_binding::Raw;

#[napi]
pub fn raw_example(
    env: Env,
    #[napi(ts_arg_type = "resourceManager.ResourceManager")] resource_manager: Object,
) -> i32 {
    let raw_manager = Raw::new(env, resource_manager);
    let raw_dir = raw_manager.open_dir("");
    let count = raw_dir.count();
    count
}
```

如果直接这样写，生成的文件会因为缺少 `resourceManager` 类型而无法获得正确类型提示。可以在 `Cargo.toml` 中声明模板头，`ohrs build` 会把它插入到生成的 `index.d.ts` 中。

```toml
[package.metadata.template]
header = "import { resourceManager } from '@kit.LocalizationKit';"
```
