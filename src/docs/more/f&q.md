---
editLink: true
---

# F & Q

## Why is the binary's size larger than C++ ?

In fact, Rust's build products are generally about 10 times larger than C++'s build products. However, as the code functionality increases, this gap will gradually narrow. You can refer to [min-sized-rust](https://github.com/johnthagen/min-sized-rust) for optimization.

## `Option<T>` will cause a crash

For optional parameters, they will be assigned to `undefined` in Node.js, but HarmonyOS lacks this step, which will cause the framework to fail to confirm the parameters and thus cause a crash.

This error is related to the phone's ROM. **At this stage, you should avoid using optional parameters.**

## How to migrate existing `.so` files from Android and iOS ?

In fact, we cannot directly use any previously compiled `.so` files from **non-HarmonyOS** platforms.

All `.so` files must be recompiled with HarmonyOS's NDK to meet the specifications, otherwise they cannot be used.

A real example is compiling `openssl` for HarmonyOS. You can find the [example](https://github.com/ohos-rs/ohos-openssl).