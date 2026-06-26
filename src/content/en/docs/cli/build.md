---
editLink: true
outline: "deep"
---

# Build

`ohrs build` provides the OpenHarmony build environment for the current Rust project, runs `cargo build`, collects native artifacts, and generates ArkTS/TypeScript declaration files.

## Usage

```shell
ohrs build
```

Put custom `cargo build` arguments after `--`:

```shell
ohrs build -- -v
```

## Options

| Option                      | Description                                                                                                                               | Type       | Default                    | Example                                |
| --------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------------------- | :------------------------------------- |
| `--release`                 | Build in release mode.                                                                                                                    | `boolean`  | `false`                    | `ohrs build --release`                 |
| `--dist <DIST>`             | Directory for collected build artifacts.                                                                                                  | `string`   | `dist`                     | `ohrs build --dist test`               |
| `-a, --arch <ARCH>`         | Target architecture. Supports `arm64/aarch`, `arm/arm32`, `x86_64/x64`, and `loongarch64`; can be repeated.                               | `string[]` | `arm64`, `arm32`, `x86_64` | `ohrs build -a aarch -a x64`           |
| `--static`                  | Copy static libraries to the final output directory.                                                                                      | `boolean`  | `false`                    | `ohrs build --static`                  |
| `--skip-libs`               | Do not copy dynamic libraries to the final output directory.                                                                              | `boolean`  | `false`                    | `ohrs build --skip-libs`               |
| `--dts-cache`               | Use the dts cache to generate the final declaration file. The current implementation enables it by default.                               | `boolean`  | `true`                     | `ohrs build --dts-cache`               |
| `--skip-check`              | Skip version checks for `napi-ohos` and `napi-derive-ohos`. The current implementation enables it by default.                             | `boolean`  | `true`                     | `ohrs build --skip-check`              |
| `--target-dir <TARGET_DIR>` | Temporary build directory used by ohrs.                                                                                                   | `string`   | current directory          | `ohrs build --target-dir .ohrs-target` |
| `--zigbuild`                | Build with `cargo-zigbuild`.                                                                                                              | `boolean`  | `false`                    | `ohrs build --zigbuild`                |
| `--bisheng`                 | Build with the BiSheng toolchain.                                                                                                         | `boolean`  | `false`                    | `ohrs build --bisheng`                 |
| `-p, --package <PACKAGE>`   | Build only one package in workspace mode. It can also be passed through cargo args as `-- -p package`.                                    | `string`   | none                       | `ohrs build -p native_mod`             |
| `--skip-napi-check`         | Skip checking whether the package depends on `napi-ohos` and `napi-derive-ohos`. The current implementation enables it by default.        | `boolean`  | `true`                     | `ohrs build --skip-napi-check`         |
| `--soname <SONAME>`         | Set the generated shared library SONAME. Supports `foo`, `foo.so`, and `libfoo.so`; versioned names like `libfoo.so.1` are not supported. | `string`   | none                       | `ohrs build --soname native_mod`       |

## Multiple Architectures

By default, `ohrs build` builds `arm64-v8a`, `armeabi-v7a`, and `x86_64` artifacts. Use `--arch` to restrict or extend target architectures.

Build one architecture:

```shell
ohrs build --arch aarch
```

Build two architectures:

```shell
ohrs build --arch aarch --arch x64
```

Build LoongArch64:

```shell
ohrs build --arch loongarch64
```

## Workspace Builds

When running from a workspace root, `ohrs build` finds workspace packages that depend on `napi-derive-ohos` and builds them. Use `-p/--package` to build only one package.

```shell
ohrs build --package native_mod
```

When running inside a package directory or one of its subdirectories, only that package is built.

## Inject Custom Headers Into Declarations

Some OpenHarmony APIs need extra type imports in the generated declaration file. For example:

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

Add a template header in `Cargo.toml`; `ohrs build` inserts it into the generated `index.d.ts`.

```toml
[package.metadata.template]
header = "import { resourceManager } from '@kit.LocalizationKit';"
```
