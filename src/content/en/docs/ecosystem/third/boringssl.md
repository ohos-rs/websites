---
editLink: true
---

# BoringSSL

BoringSSL is a fork of OpenSSL that is designed to meet Google's needs.

The rust community also provides the corresponding crate [boringssl](https://github.com/cloudflare/boring). The relevant openharmony adaptation has been submitted, you can refer to this [PR](https://github.com/cloudflare/boring/pull/231).

You can wait for the PR to merge or directly reference through git.

## Usage

Before you begin, you'll need to establish two environment variables to guarantee a successful build.

```shell
export BORING_BSSL_SYSROOT=${OHOS_NDK_HOME}/native/sysroot
export CMAKE_TOOLCHAIN_FILE=${OHOS_NDK_HOME}/native/build/cmake/ohos.toolchain.cmake
```

## Example

```toml
[dependencies]
boring = { git="https://github.com/ohos-rs/boring" }
```

Source Code:

```rust
use boring::sha;
use napi_derive_ohos::napi;

#[napi]
pub fn h() -> String {
    let mut hasher = sha::Sha256::new();

    hasher.update(b"Hello, ");
    hasher.update(b"world");

    let hash = hasher.finish();
    hex::encode(hash)
}
```

Usage code:

```ts
import { h } from 'libboring_ssl.so';
const a = h();
// a: 4ae7c3b6ac0beff671efa8cf57386151c06e58ca53a78d83f36107316cec125f
```

You can find the example [here](https://github.com/ohos-rs/example/tree/main/example/boring_ssl).

## More

We also offer precompiled build outputs, which you can either use right away or custom-build as per your requirements. You can find it with [Repo](https://github.com/ohos-rs/ohos-boringssl)
