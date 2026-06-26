---
editLink: true
outline: 'deep'
---

# ohos-hilog-binding

This is a binding crate for HarmonyOS's `hilog`.

## Install

```shell
cargo add ohos-hilog-binding
```

## Usage

```rust
use ohos_hilog_binding::hilog_debug;
use napi_derive_ohos::napi;

#[napi]
pub fn add(left: u32, right: u32) -> u32 {
    hilog_debug!("hello world");
    hilog_debug!(
        "test",
        LogOptions {
          tag: Some("testTag"),
          domain: None
      }
    );
    left + right
}
```

## Docs

This crate provides some macro to log info.

### Support method

- `hilog_debug`
- `hilog_info`
- `hilog_warn`
- `hilog_error`
- `hilog_fatal`

The macro is below here:

```rust
#[macro_export]
macro_rules! hilog_info {
    ($info: expr) => {
        hilog_binding::info($info, None);
    };
    ($info: expr,$option: expr) => {
        hilog_binding::info($info, Some($option));
    };
}

#[derive(Default)]
pub struct LogOptions<'a> {
    // domain default is 0x0000
    pub domain: Option<u32>,
    /// tag default is hilog_rs
    pub tag: Option<&'a str>,
}
```

- `info` should be `str`
- `option` should be `LogOptions`
