# N-API

目前鸿蒙上面的 N-API 整体对齐 Node.js，但是仍然有一些不支持。我们将一些核心不支持的能力列举到下面了：

* napi_adjust_external_memory
* uv_run（可以通过 libuv.so 引入该方法）
* node_api_create_syntax_error
* node_api_throw_syntax_error
* node_api_symbol_for（鸿蒙不支持使用 Symbol ）

当然系统也有一些额外拓展的方法，你可以在 [官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/napi-V5#node-api%E7%BB%84%E4%BB%B6%E6%89%A9%E5%B1%95%E7%9A%84%E7%AC%A6%E5%8F%B7%E5%88%97%E8%A1%A8) 找到相关的问题和描述。
