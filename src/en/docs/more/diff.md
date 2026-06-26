---
editLink: true
outline: "deep"
---

# Differences Between ArkRuntime and Node.js-like Runtimes

ArkRuntime is the standard runtime for executing ArkTS/TS/JS code on OpenHarmony. In addition to JavaScript standard support based on the Test262 suite, it exposes lower-level extension capabilities through N-API, which makes it broadly similar to Node.js-like runtimes.

There are still differences between ArkRuntime and existing community implementations. This page lists the known differences and adaptation notes.

## Symbol Is Not Supported

OpenHarmony does not support Symbol, so Symbol-related N-API methods are hidden. See the official [Symbol migration guide](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/typescript-to-arkts-migration-guide-V5#不支持symbolapi) for the background.

```rust
#[cfg(not(feature = "ohos"))] // [!code ++]
pub fn create_symbol_from_js_string(&self, description: JsString) -> Result<JsSymbol> {
    let mut result = ptr::null_mut();
    check_status!(unsafe { sys::napi_create_symbol(self.0, description.0.value, &mut result) })?;
    Ok(unsafe { JsSymbol::from_raw_unchecked(self.0, result) })
}
```

::: tip Note
The current implementation hides these APIs through a `feature`. This will later be changed to `target_env`.
:::

## napi_adjust_external_memory Is Not Needed

In Node.js, `napi_adjust_external_memory` adjusts accounting for externally allocated memory so GC can make better decisions. OpenHarmony does not need this extra call, so it is hidden in the same way.

## node_api_throw_syntax_error Is Not Supported

OpenHarmony does not support `node_api_throw_syntax_error` from napi9, so it is hidden.

## node_api_create_syntax_error Is Not Supported

OpenHarmony does not support `node_api_create_syntax_error` from napi9, so it is hidden.

## Experimental N-API Is Not Supported

OpenHarmony does not support experimental N-API methods. Hidden methods include:

- node_api_create_external_string_latin1
- node_api_create_external_string_utf16

## Buffer Differences

N-API Buffer and the ArkTS `@ohos.buffer` module do not map one-to-one. See [Buffer](/en/docs/more/buffer/) for details. There are also additional differences that need adaptation.

### Creating an Empty Buffer Fails

The system implementation of `napi_create_buffer` checks `length` in a way that prevents creating an empty Buffer. On OpenHarmony, Buffer and ArrayBuffer currently behave the same, so ohos-rs temporarily replaces it with `napi_create_arraybuffer`. See [PR #92](https://github.com/ohos-rs/ohos-rs/pull/92).

### Copy Buffer Fails

`napi_create_buffer` and `napi_create_buffer_copy` do not accept empty arrays. There is currently no workaround.

## ArrayBuffer Differences

Related fix: [PR #92](https://github.com/ohos-rs/ohos-rs/pull/92).

### NULL/nullptr Cannot Be Passed Directly

OpenHarmony has extra validation or logic that fails when a null pointer is passed directly while creating an empty ArrayBuffer. Pass a pointer by reference instead.

```c++
napi_value buf;

napi_status status = napi_create_arraybuffer(env, 0, NULL, &buf); // [!code --]

void *data = NULL; // [!code ++]
napi_status status = napi_create_arraybuffer(env, 0, &data, &buf); // [!code ++]
```

### napi_get_typedarray_info Returns a Different length Meaning

In OpenHarmony, the `length` returned by `napi_get_typedarray_info` is actually array length multiplied by byte length. Divide it by the byte length of the corresponding type to get the real length.

## napi_wrap Differences

`napi_wrap` associates a native object with a JS object. On OpenHarmony, when the `napi_ref` parameter is not null, the native object's destructor or `finalize_hint` callback may not be called correctly after the object is destroyed.

Use `napi_reference_unref` to reduce the reference count and work around this issue. If the `napi_ref` parameter is NULL/nullptr, no extra handling is required. See [PR #71](https://github.com/ohos-rs/ohos-rs/pull/71).

```c++
napi_wrap(env,
            jsThis,
            reinterpret_cast<void*>(obj),
            MyObject::Destructor,
            nullptr,  // finalize_hint
            &obj->wrapper_);

napi_reference_unref(env, obj->wrapper_, nullptr); // [!code ++]
```

## napi_get_cb_info Gets undefined for this

In some scenarios, `napi_get_cb_info` is used to get `this` so `napi_wrap` can bind a native object to it. OpenHarmony behaves differently here, so use the following import style:

```ts
// ❌ Do not call it this way.
import { test } from 'libhello.so'

// ✅ Use the default import style.
import napiTest from 'libhello.so'

napiTest.test()
```
