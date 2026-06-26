---
editLink: true
outline: "deep"
---

# cargo

`ohrs cargo` runs arbitrary cargo subcommands inside the OpenHarmony build environment. It is useful for commands such as `cargo expand`, `cargo check`, or other cargo extensions that need the target environment.

## Usage

```shell
ohrs cargo expand
```

The command injects OpenHarmony environment variables and the default target argument for the underlying cargo command.

## Options

| Option                    | Description                                                                                                                 | Type       | Default | Example                                |
| ------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :--------- | :------ | :------------------------------------- |
| `-a, --arch <ARCH>`       | Target architecture for the command. Supports `arm64/aarch`, `arm/arm32`, `x86_64/x64`, and `loongarch64`; can be repeated. | `string[]` | `arm64` | `ohrs cargo --arch x64 check`          |
| `--disable-target`        | Do not inject the default target argument, and run the command only once.                                                   | `boolean`  | `false` | `ohrs cargo --disable-target metadata` |
| `--bisheng`               | Run the command with the BiSheng toolchain.                                                                                 | `boolean`  | `false` | `ohrs cargo --bisheng check`           |
| `-p, --package <PACKAGE>` | Run the command for only one package in workspace mode. It can also be passed through cargo args as `-p package`.           | `string`   | none    | `ohrs cargo -p native_mod check`       |
| `--soname <SONAME>`       | Set the shared library SONAME for commands that need linking.                                                               | `string`   | none    | `ohrs cargo --soname native_mod build` |

## Examples

Check the current package:

```shell
ohrs cargo check
```

Run the same command for multiple architectures:

```shell
ohrs cargo --arch aarch --arch x64 check
```

Reuse the environment variables without injecting the OpenHarmony target:

```shell
ohrs cargo --disable-target metadata
```
