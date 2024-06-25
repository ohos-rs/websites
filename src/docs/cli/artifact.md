---
editLink: true
---

# artifact

这个子命令能够帮助我们去生成对应的 ohpm 平台的 har 文件。

## 用法

标准用法如下所示：

```shell
ohrs artifact
```

## 参数

| 参数      | 描述                                                | 类型       | 示例                             |
|---------|:--------------------------------------------------|:---------|:-------------------------------|
| dist    | 与`build`的`dist`参数匹配，当构建时修改了输出目录时，构建 har 文件时也需要修改。 | `string` | `ohrs artifact --dist=test`    |
| package | 构建的 har 文件名，默认是`package`                          | `string` | `ohrs artifact --package=test` |
