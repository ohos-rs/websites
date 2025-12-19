---
editLink: true
---

# @ohos-rs/abort-controller

AbortController for OpenHarmony based on `emitter`.

## Required

API Version >= 11

## Install

```shell
ohpm install @ohos-rs/abort-controller
```

## Usage

```ts
const controller = new AbortController();

asyncFib(20, controller.signal).catch((e: ESObject) => {
    console.error(e) // Error: AbortError
})

controller.abort()
```
