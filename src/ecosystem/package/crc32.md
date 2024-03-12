---
editLink: true
---

# @ohos-rs/crc32

The fast implement crc32 in HarmonyOS using SIMD.

## Requirement

- NDK Version >= 10

## Install

```shell
ohpm install @ohos-rs/crc32
```

## Api

```ts
import buffer from '@ohos.buffer';

export function crc32(input: string | buffer.Buffer, initialState?: number | undefined | null): number
export function crc32c(input: string | buffer.Buffer, initialState?: number | undefined | null): number
```

## Usage

```ts
import { crc32 } from '@ohos-rs/crc32';

crc32("crc32c - test",0);
// 2608757237
```
