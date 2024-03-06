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
export function crc32(input: string | buffer.Buffer, crc?: number): number
export function crc32c(input: string | buffer.Buffer, crc?: number): number
```

## Usage

```ts
import { crc32 } from '@ohos-rs/crc32';

crc32("crc32c - test",0);
// 2608757237
```
