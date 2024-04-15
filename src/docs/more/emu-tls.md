---
editLink: true
---

# EMU-TLS

For versions of LLVM 15 and above, emu-tls related symbols have been moved into `libc++.so` and `libclang_rt.builtins.a` files. Therefore, if you encounter errors similar to the ones below, please link to the relevant dynamic or static library.

::: danger Error
__emutls_get_address: symbol not found
:::

## Solve

```rust
// build.rs

fn main() {
    println!("cargo:rustc-link-lib=c++");
    // or
    // println!("cargo:rustc-link-lib=static=clang_rt.builtins");
}
```