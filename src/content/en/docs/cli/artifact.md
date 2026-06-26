---
editLink: true
---

# Artifact

`ohrs artifact` generates an ohpm `.har` package from the project `package` directory and, unless disabled, copies native artifacts from `dist` into `package/libs`.

## Usage

```shell
ohrs artifact
```

## Options

| Option                    | Description                                                        | Type      | Default   | Example                        |
| ------------------------- | :----------------------------------------------------------------- | :-------- | :-------- | :----------------------------- |
| `-d, --dist <DIST>`       | Artifact directory aligned with `ohrs build --dist`.               | `string`  | `dist`    | `ohrs artifact --dist test`    |
| `-n, --name <NAME>`       | Base name of the generated `.har` file.                            | `string`  | `package` | `ohrs artifact --name demo`    |
| `--skip-libs`             | Do not copy dynamic libraries into `package/libs`.                 | `boolean` | `false`   | `ohrs artifact --skip-libs`    |
| `-p, --package <PACKAGE>` | Generate an artifact for only one package in workspace mode.       | `string`  | none      | `ohrs artifact -p native_mod`  |
| `--no-workspace`          | Ignore workspace discovery and package from the current directory. | `boolean` | `false`   | `ohrs artifact --no-workspace` |

## Workspace Behavior

When running from a workspace root, `ohrs artifact` finds packages that depend on `napi-derive-ohos`. If multiple packages are generated, the file name is `{name}-{package}.har`.

```shell
ohrs artifact --name sdk
```

Example output:

```text
sdk-native_mod.har
```

To process only one package:

```shell
ohrs artifact --package native_mod
```
