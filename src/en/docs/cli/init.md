---
editLink: true
---

# Init

`ohrs` provide some useful subcommand to help us initial and build project.

## Usage

`init` is a subcommand with `ohrs`, a standard command just be here:

```shell
ohrs init xx
```

Tool will create a folder named `xx`, and it will be also as project's name in `Cargo.toml`. So `Cargo.toml` will be like:

```toml
[package]
name    = "xx"
version = "0.1.0"
edition = "2021"
```

And the final prebuild binary's name will be `libxx.so`.

::: danger Don't do it
❌ Don't use some special name. For example: `test` `crate` `fn` etc.
:::

## Arguments


| Options | description                                                                                                                                         | type                | default |
|---------|:----------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|:--------|
| package | This will generate an OHPM package, which won't be created by default. If you input a string, it will replace the `name` field in oh-package.json5. | `boolean \| string` | false   |
