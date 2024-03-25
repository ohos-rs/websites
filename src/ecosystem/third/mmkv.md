---
editLink: true
---

# @ohos-rs/mmkv

MMKV is an efficient, small, easy-to-use mobile key-value storage framework used in the WeChat application. It's currently available on Android, iOS/macOS, Win32 and POSIX.

In fact, mmkv can fully run on OpenHarmony devices. We provide a simple native binding for MMKV.

::: danger Tip
This is an early preview version, providing only a small number of APIs.

You can also submit [PR](https://github.com/ohos-rs/mmkv/pulls) or [issue](https://github.com/ohos-rs/mmkv/issues) to submit more features.
:::

## Install

```shell
ohpm install @ohos-rs/mmkv
```

## Usage

```ts
import { MMKV, MMKVLogLevel, MMKVMode } from '@ohos-rs/mmkv';

const m = new MMKV("/data/storage/el2/base/haps/entry/files/mmkv",MMKVLogLevel.Info,MMKVMode.SingleProcess);

m.encodeBool("test",false,16000);
const a = m.decodeBool("test");
```