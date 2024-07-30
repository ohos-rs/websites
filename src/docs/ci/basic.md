---
editLink: true
---

# CI 

目前 ohos 生态提供了简单版本的 CI 环境以执行一些逻辑，更多的能力需要在 HarmonyOS/OpenHarmony 支持后提供。

你可以参考这个 [Github Action](https://github.com/ohos-rs/ohos-rs/blob/ohos/.github/workflows/simple-test.yml) 来创建你自己的流水线。

## 版本

### 4.0

```bash
docker push southorange/ohos-base:v4.0
```

### 4.1

注意 4.1 中默认不安装 ohrs 脚手架工具，请在自己的工作流中实时安装。

```bash
docker push southorange/ohos-base:v4.1
```