---
editLink: true
outline: "deep"
---

# ArkRuntime 与类 Node.js 运行时差异

ArkRuntime(方舟运行时) 为鸿蒙上的用于执行 ArkTS/TS/JS 代码的标准运行时。除去上层对于 JS 标准支持（基于 Test262 测试集），同时也通过 N-API 给开发者提供了使用 C/C++ 实现更加底层能力的方案，与大部分类 Node.js 运行时保持基本一致。

不过方舟运行时与社区现有的一些实现仍然存在差异，本部分将简单列举起差异和阐述如何进行适配：

## 不支持 Symbol

鸿蒙不支持使用 Symbol，因此 Symbol 相关的 N-API 均被隐藏，不支持的原因参考 [Symbol 适配指导](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/typescript-to-arkts-migration-guide-V5#不支持symbolapi)

```rust
#[cfg(not(feature = "ohos"))] // [!code ++]
pub fn create_symbol_from_js_string(&self, description: JsString) -> Result<JsSymbol> {
    let mut result = ptr::null_mut();
    check_status!(unsafe { sys::napi_create_symbol(self.0, description.0.value, &mut result) })?;
    Ok(unsafe { JsSymbol::from_raw_unchecked(self.0, result) })
}
```

::: tip Note
目前使用 `feature` 进行隐藏，后续将修改为 `target_env`。
:::

## 无需 napi_adjust_external_memory

在 Node.js 中用于调整分配的外部内存计数等信息，有助于 GC 更好的分析和处理。在鸿蒙上无需额外进行调用，因此与上类似隐藏即可。

## 不支持 node_api_throw_syntax_error(napi9)

鸿蒙不支持，隐藏。

## 不支持 node_api_create_syntax_error(napi9)

鸿蒙不支持，隐藏。

## 不支持 experimental 相关的 N-API

鸿蒙不支持，隐藏。列表有：

- node_api_create_external_string_latin1
- node_api_create_external_string_utf16

## Buffer 差异

目前 N-API 侧的 Buffer 与 ArkTS 中的 `@ohos.buffer` 模块并非一一对应，详情参考 [Buffer](/docs/more/buffer.html)。除此之外，还存在一些差异需要额外适配：

### 创建空 buffer 失败

目前系统对于 `napi_create_buffer` 底层在实现上会强行校验 length 会导致无法创建空 buffer，而目前鸿蒙系统上 buffer 与 arraybuffer 表现一致，因此暂时使用 `napi_create_arraybuffer` 进行替换，参考 [PR](https://github.com/ohos-rs/ohos-rs/pull/92)

### Copy Buffer 失败

`napi_create_buffer` 和 `napi_create_buffer_copy` 不接受传入空数组， **目前无任何规避方案**。

## ArrayBuffer 差异

相关修复 [PR](https://github.com/ohos-rs/ohos-rs/pull/92)

### 创建不允许直接传入 NULL/nullptr

鸿蒙实现上带有一些额外的参数校验或者逻辑会导致在创建空的 ArrayBuffer 的时候直接传入空指针失败，需要通过引用传入。

```c++
napi_value buf;

napi_status status = napi_create_arraybuffer(env, 0, NULL, &buf); // [!code --]

void *data = NULL; // [!code ++]
napi_status status = napi_create_arraybuffer(env, 0, &data, &buf); // [!code ++]
```

### napi_get_typedarray_info 获取的参数含义不一致

在鸿蒙的实现上，通过`napi_get_typedarray_info` 获取到的 TypedArray 的 `length` 实际值为：数组长度 \* 字节长度，因此在取值的时候需要除于对应类型的字节长度，从而获取到最终真实的长度。

## napi_wrap 差异

napi_wrap 用于关联原生对象和 JS 对象。鸿蒙上的实现，当`napi_ref` 参数为非空时，会导致原生对象对应的析构函数或者`finalize_hint`回调函数在第一次创建之后，对象销毁时无法被正常调用。

此时需要通过 `napi_reference_unref` 来减少引用计数来规避该问题，如果`napi_ref`的参数为 NULL/nullptr 则无需额外处理。 关联 [PR](https://github.com/ohos-rs/ohos-rs/pull/71)

```c++
napi_wrap(env,
            jsThis,
            reinterpret_cast<void*>(obj),
            MyObject::Destructor,
            nullptr,  // finalize_hint
            &obj->wrapper_);

napi_reference_unref(env, obj->wrapper_, nullptr); // [!code ++]
```

## napi_get_cb_info 获取 this 为 undefined

`napi_get_cb_info` 我们在某些场景下，需要获取 this 参数用于 `napi_wrap` 绑定一个 native 对象到 this 上，但是目前鸿蒙上实现有一定的差异。我们在最终的使用上需要额外注意：

```ts
// ❌ 不能使用下面这种方式调用
import { test } from 'libhello.so'

// ✅ 使用此写法进行调用
import napiTest from 'libhello.so'

napiTest.test()
```
