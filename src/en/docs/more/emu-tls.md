---
editLink: true
outline: "deep"
---

# EMU-TLS

For versions of LLVM 15 and above, emu-tls related symbols have been moved into `libc++.so` and `libclang_rt.builtins.a` files. Therefore, if you encounter errors similar to the ones below, please link to the relevant dynamic or static library.

::: danger Error
__emutls_get_address: symbol not found
:::

## How to solve it?

```rust
// build.rs

fn main() {
    println!("cargo:rustc-link-lib=c++");
    // or
    // println!("cargo:rustc-link-lib=static=clang_rt.builtins");
}
```

### x86_64

When dealing with the x86_64 architecture, we might encounter an error like the one below.

![error](assets/x86_64_error.png)

Add `.cargo/config.toml` file in your project, and add some code.

```toml
[unstable]
build-std-features = ["compiler-builtins-weak-intrinsics"]
```
