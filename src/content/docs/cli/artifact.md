---
editLink: true
---

# artifact

`ohrs artifact` 会基于项目中的 `package` 目录生成 ohpm 平台使用的 `.har` 文件，并按需把 `dist` 中的 native 产物复制到 `package/libs`。

## 用法

```shell
ohrs artifact
```

## 参数

| 参数                      | 描述                                                           | 类型      | 默认值    | 示例                           |
| ------------------------- | :------------------------------------------------------------- | :-------- | :-------- | :----------------------------- |
| `-d, --dist <DIST>`       | 与 `ohrs build --dist` 对齐的产物目录。                        | `string`  | `dist`    | `ohrs artifact --dist test`    |
| `-n, --name <NAME>`       | 生成的 `.har` 文件基础名称。                                   | `string`  | `package` | `ohrs artifact --name demo`    |
| `--skip-libs`             | 不复制动态库到 `package/libs`。                                | `boolean` | `false`   | `ohrs artifact --skip-libs`    |
| `-p, --package <PACKAGE>` | workspace 模式下只为指定 package 生成 artifact。               | `string`  | 无        | `ohrs artifact -p native_mod`  |
| `--no-workspace`          | 忽略 workspace 自动发现，直接按当前目录的 `package` 目录打包。 | `boolean` | `false`   | `ohrs artifact --no-workspace` |

## Workspace 行为

在 workspace 根目录执行时，`ohrs artifact` 会查找依赖 `napi-derive-ohos` 的 package。多个 package 同时打包时，生成文件名为 `{name}-{package}.har`，例如：

```shell
ohrs artifact --name sdk
```

可能生成：

```text
sdk-native_mod.har
```

如果只想处理某一个 package：

```shell
ohrs artifact --package native_mod
```
