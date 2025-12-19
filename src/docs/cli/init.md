---
editLink: true
---

# init

`ohrs` 提供了一些有用的子命令来协助我们进行项目初始化、构建以及其他操作。

## 用法

`init` 是 ohrs 的一个子命令，其标准使用方法如下所示：

```shell
ohrs init xx
```

脚手架将会创建一个名为`xx`的文件夹，并且其在`Cargo.toml`文件中的项目名也会为这个名字，其文件内容如下所示：

```toml
[package]
name    = "xx"
version = "0.1.0"
edition = "2021"
```

当然最终的构建产物名会变成跟这个保持一致： `libxx.so`

::: danger 注意
❌ 不要使用一些特殊的字符。 比如： `test` `crate` `fn` 等等.
:::

## 支持参数

| 参数名  | 描述                               | 类型     | 示例                             |
| ------- | :--------------------------------- | :------- | :------------------------------- |
| package | 创建 ohpm 的包模版，名称可以自定义 | `string` | `ohrs init hello -p=@ohrs/hello` |
