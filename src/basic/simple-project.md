# Simple Project

We can use tool to initial our HarmonyOS's project, and it's also possible for us to initial project with standard rust project.

Now, we will try to use standard rust project to build prebuild binary.

## Init

Using `cargo` to initial a binary project.

```shell
cargo new hello --lib
```

## Add dependencies

We need to add some dependencies, which provide useful functions.

```shell
cargo add napi-ohos napi-derive-ohos

cargo add napi-build-ohos --build
```

## Setup binary type

There are many binary type for rust project, but now we use `cdylib` as final target. We need to add some config with `Cargo.toml`

```toml
# Cargo.toml

[lib]
crate-type=["cdylib"]
```

## Setup build script

`build.rs` is a special file, that will execute before the project starts to bundle. We can use it to add some special logic to help us build the project.

::: tip 🔆
More info about build script , you can find it with [official book](https://doc.rust-lang.org/cargo/reference/build-scripts.html)
:::

At first, create a file `build.rs` in project's root folder, then we need to run `setup`, which is provided by `napi-build-ohos`, and the content is below here:

```rust
// build.rs
fn main () {
    napi_build_ohos::setup();
}
```

Our project may be like this:

```txt
.
├── Cargo.lock
├── Cargo.toml
├── build.rs
└── src
    └── lib.rs
```

## Add napi method

Now we can write some napi method. For example, we can add a `add` method

```rust
use napi_derive_ohos::napi;

#[napi]
pub fn add(a: u32,b: u32) -> u32 {
    a + b
}
```

## Build

Just run `ohrs` to build our project.

```shell
ohrs build
```

Then we can get the final prebuild binary and `.d.ts` file in `hello/dist`.

![Dist](./assets/dist_tree.png)
