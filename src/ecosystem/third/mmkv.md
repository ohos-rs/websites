---
editLink: true
---

# @ohos-rs/mmkv

MMKV is an efficient, small, easy-to-use mobile key-value storage framework used in the WeChat application. It's currently available on Android, iOS/macOS, Win32 and POSIX.

In fact, mmkv can fully run on OpenHarmony devices. We provide a simple native binding for MMKV.

## Install

```shell
ohpm install @ohos-rs/mmkv
```

## API

```ts
export interface InitOption {
  /** mmkv instance's log level */
  logLevel?: MMKVLogLevel
  /** mmkv instance mode */
  mode?: MMKVMode
  /** mmkv instance id if is empty, will use default. */
  mmapId?: string
}

/** MMKV log level */
export const enum MMKVLogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  None = 4
}

export const enum MMKVMode {
  SingleProcess = 1,
  MultiProcess = 2
}

export class MMKV {
  constructor(rootDir: string, options?: InitOption | undefined | null)
  enableAutoKeyExpire(expire: number): void
  /** set bool to mmkv */
  encodeBool(key: string, value: boolean, expire?: number | undefined | null): void
  /** get bool from mmkv */
  decodeBool(key: string): boolean
  /** get string */
  decodeString(key: string): string
  /** set string */
  encodeString(key: string, value: string, expire?: number | undefined | null): void
  /** set number include int float etc.s */
  encodeNumber(key: string, value: number, expire?: number | undefined | null): void
  /** get number */
  decodeNumber(key: string): number
  /** set bigint which will store as `Vec<string>`, and the first element is a flag, 1 for negative numbers. */
  encodeBigint(key: string, value: bigint, expire?: number | undefined | null): void
  /** get bigint */
  decodeBigint(key: string): bigint
  /** remove key or keys */
  removeValueForKey(key: string | Array<string>): void
  /** check key if existed */
  containsKey(key: string): boolean
  /** get current mmkv instance's all keys */
  allKeys(): Array<string>
  /** get current mmkv instance's mmap id */
  getMmapId(): string
  /**
    * get current mmkv instance's storage size
    * @default TOTAL
    */
  getStorageSize(sizeType?: 'ACTUAL' | 'TOTAL'): number
  /**
    * get kv's count
    * @default false
    */
  count(filterExpire?: boolean | undefined | null): number
  /**
    * get key's size
    * @default false
    */
  getValueSize(key: string, actual?: boolean | undefined | null): number
  /** clear all kv with current mmkv */
  clearAll(keepSpace?: boolean | undefined | null): void
  /** clear memory cache with current mmkv */
  clearMemoryCache(keepSpace?: boolean | undefined | null): void
  /** basic method to back up data */
  static backUpToDirectory(dir: string, mmapId?: string | undefined | null): void
  /** basic method to restore data */
  static restoreFromDirectory(dir: string, mmapId?: string | undefined | null): void
  /** remove instance */
  static removeStorage(mmapId: string): void
}
```

## Usage

```ts
import { MMKV, MMKVLogLevel, MMKVMode } from '@ohos-rs/mmkv';

const m = new MMKV("/data/storage/el2/base/haps/entry/files/mmkv",MMKVLogLevel.Info,MMKVMode.SingleProcess);

m.encodeBool("test",false,16000);
const a = m.decodeBool("test");
```