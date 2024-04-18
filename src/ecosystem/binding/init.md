---
editLink: true
---

# ohos-init-binding

This is a binding crate for HarmonyOS's `init`.


## Install

```shell
cargo add ohos-init-binding
```

## Usage

It just provides a simple function for `canIUse`.

```rust
use ohos_init_binding::canIUse;

fn try_it() {
    let r = canIUse("SystemCapability.Location.Location.Core");
}
```