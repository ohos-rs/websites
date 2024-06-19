---
editLink: true
---

# @ohos-rs/snappy

Fastest Snappy compression library in `OpenHarmony`, powered by `ohos-rs` and `rust-snappy`.

## Install

```shell
ohpm install @ohos-rs/snappy
```

## API

```ts
export function compressSync(
    input: buffer.Buffer | string | ArrayBuffer | Uint8Array,
): Buffer
export function compress(
    input: buffer.Buffer | string | ArrayBuffer | Uint8Array,
): Promise<Buffer>
export function uncompressSync(compressed: buffer.Buffer): buffer.Buffer
export function uncompress(compressed: buffer.Buffer): Promise<buffer.Buffer>
```

## Usage

```ts
import { compressSync } from '@ohos-rs/snappy';

const a = compressSync("hello world", { copyOutputData: false });
// Buffer.from([11, 40, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]))
```