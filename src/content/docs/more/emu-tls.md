---
editLink: true
outline: "deep"
---

## EMU-TLS

对于 llvm 15 或者更高的版本， emu-tls 以及相关的 symbol 符号已经被移动到了 `libc++.so` and `libclang_rt.builtins.a` 文件中。因此如果你出现了类似于下面的这种报错，请考虑新增链接文件：

::: danger Error
\_\_emutls_get_address: symbol not found
:::

### 如何解决？

在构建脚本中链接对应的内置动态/静态链接库即可：

```rust
// build.rs

fn main() {
    println!("cargo:rustc-link-lib=c++");
    // or
    // println!("cargo:rustc-link-lib=static=clang_rt.builtins");
}
```

## x86_64

当构建 x64_64 架构的产物时，我们可能会遇到如下的报错：

![error](assets/x86_64_error.png)

在你的项目中新增文件`.cargo/config.toml`并且添加如下内容：

```toml
[unstable]
build-std-features = ["compiler-builtins-weak-intrinsics"]
```
