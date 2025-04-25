---
editLink: true
---

# Quick Start

We provide a cli tool to simplify some action. For example: `init`, `build` and so on.

We will now begin to introduce this capability step by step.

## Requirement

Before all, we need to install `Rust` and `HarmonyOS NDK`.

### Rust

For rust, we can use official guide to install it.

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

::: tip 🌈
For more detail about rust, you can visit [link](https://www.rust-lang.org/learn/get-started)
:::

And then we need to install some toolchain and component, which will help use to build prebuild binary for HarmonyOS.

1. **toolchain**

   OpenHarmony is `tier2` target for rust, so we must use custom toolchain or use source-code to build it.
   Just run this command and install toolchains
   ```shell
   rustup target add aarch64-unknown-linux-ohos
   rustup target add armv7-unknown-linux-ohos
   rustup target add x86_64-unknown-linux-ohos
   ```
   
### HarmonyOS NDK

::: tip
For the latest SDK Version, You need `DevEco Studio NEXT Developer Beta1 (5.0.3.100)` or later.
:::

You just need to download the latest `DevEco-Studio` and download the latest SDK. You can download it with [official website](https://developer.huawei.com/consumer/cn/deveco-studio/)

And then we need to set env variable to use it. If your install path is `/path/Sdk` , you can run the following command: 

```shell
# For 4.0 or older version
export OHOS_NDK_HOME=/path/Sdk/9/

# For 5.0 or newer version
export OHOS_NDK_HOME=/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony
```

## Install

Now, you can install cli tool with `cargo`.

```shell
cargo install ohrs
```

## Simple Project

Using `ohrs` to init project

```shell
ohrs init hello
```

And using `ohrs` to build project

```shell
ohrs build.md
```
