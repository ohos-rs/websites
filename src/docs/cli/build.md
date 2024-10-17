---
editLink: true
outline: "deep"
---

# build

作为另一个常见的子命令，`build`命令提供给我们构建产物、收集产物以及输出类型声明文件等能力。

## 用法

一个标准的 build 命令使用如下所示：

```shell
ohrs build
```

## 参数

| 参数      | 描述                                                | 类型        | 使用示例                      |
|---------|:--------------------------------------------------|:----------|:--------------------------|
| release | 构建模式，默认为`debug`模式，设置后将构建`release`产物               | `boolean` | `ohrs build --release`    |
| dist    | 收集产物的最终输出文件夹                                      | `string`  | `ohrs build --dist=test`  |
| arch    | 构建的目标架构，支持 `arm64/aarch` `arm/arm32` `x86_64/x64` | `string`  | `ohrs build --arch=aarch` |
| static  | 复制产物到 `dist`时是否复制依赖的静态链接库，默认为`false`              | `boolean` | `ohrs build --static`     |

## 额外的一些使用案例

### 支持自定义参数

在之前的脚手架版本，我们只能使用脚手架预置的参数来参与到构建中去，现在我们的`build`命令已经支持完全的自定义参数了。

比如我们想要输出更加详细的构建过程，我们一般会使用如下的构建命令来实现：

```shell
cargo build -v
```

在 ohrs 中我们现在可以使用如下的脚本来实现类似的能力：

```shell
ohrs build -- -v
```

这样既提供了 ohos 的环境也能够满足业务的自定义使用场景。

### 构建多目标产物

在上面的支持参数中可以发现，我们其实是支持构建指定的架构内容。当我们不传入`arch`
参数的时候，默认会构建全部架构（arm64-v8a、armeabi-v7a、x86_64）。通过 arch 参数我们可以指定构建的平台。

构建一个平台

```shell
ohrs build --arch aarch
```

构建两个平台

```shell
ohrs build --arch aarch --arch x64
```

### 为类型定义文件注入自定义头

在鸿蒙开发中，我们某些场景下需要使用类型重写以完善相关的实现代码类型。比如我们在使用 `raw-file` 模块来使用鸿蒙的应用文件：

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

如果直接这样写的话，生成的文件会因为缺失 `resourceManager` 的类型导致最终使用时的类型错误或者无效，因此我们需要在生成的文件中引入这部分内容。

```ts
// index.d.ts 文件

// 额外新增的内容
import { resourceManager } from '@kit.LocalizationKit';

// 生成内容
// xxx
```

而为了避免手动处理，我们允许在项目的 `Cargo.toml` 文件中定义通用代码，ohrs 在最终构建的时候会将其插入到生成的类型文件中去。

```toml
[package]
# 默认配置

# 自定义内容配置如下所示。
[package.metadata.template]
header = "import { resourceManager } from '@kit.LocalizationKit';"
```