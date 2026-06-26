---
editLink: true
---

# @ohos-rs/bcrypt

🚀 Fastest bcrypt in OpenHarmony.

## Install

```shell
ohpm install @ohos-rs/bcrypt
```

## API

```ts
export const DEFAULT_COST: 12

export function hashSync(password: string | Buffer, round?: number): string
export function hash(password: string | Buffer, round?: number): Promise<string>
export function verifySync(password: string | Buffer, hash: string | Buffer): boolean
export function verify(password: string | Buffer, hash: string | Buffer): Promise<boolean>
/**
 * The same with `verifySync`
 */
export function compareSync(password: string | Buffer, hash: string | Buffer): boolean
/**
 * The same with `verify`
 */
export function compare(password: string | Buffer, hash: string | Buffer): Promise<boolean>

export type Version = '2a' | '2x' | '2y' | '2b'
/**
 * @param version default '2b'
 */
export function genSaltSync(round: number, version?: Version): string
/**
 * @param version default '2b'
 */
export function genSalt(round: number, version?: Version): Promise<string>
```
