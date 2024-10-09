---
editLink: true
---

# CI 

目前 ohos 生态提供了简单版本的 CI 环境以执行一些逻辑，更多的能力需要在 HarmonyOS/OpenHarmony 支持后提供。

## Github Action

如果你可以使用 Github Action，你可以直接使用 [openharmony-rs/setup-ohos-sdk](https://github.com/openharmony-rs/setup-ohos-sdk)。

你可以参考这个 [Github Action](https://github.com/ohos-rs/ohos-rs/blob/ohos/.github/workflows/simple-test.yml) 来创建你自己的流水线。

## 自定义流水线

对于自定义流水线，我们提供了一些简单的 Docker image 用于创建自定义流水线执行环境。

我们提供了多个版本的镜像，请自行选择合适的版本进行构建，当然你也可以参考项目中的 `Dockerfile` 文件来创建适合自己的镜像。

### 4.0

```bash
docker push southorange/ohos-base:v4.0
```

### 4.1

注意 4.1 中默认不安装 ohrs 脚手架工具，请在自己的工作流中实时安装。

```bash
docker push southorange/ohos-base:v4.1
```