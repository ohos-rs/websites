# N-API

Now, OpenHarmony's `napi` isn't aligned with `Node.js`, below is a list of unsupported methods:

- napi_make_callback
- napi_adjust_external_memory
- napi_async_init
- napi_async_destroy
- uv_run
- napi_add_env_cleanup_hook
- napi_remove_env_cleanup_hook
- napi_open_callback_scope
- napi_close_callback_scope
- napi_add_finalizer
- napi_set_instance_data
- napi_get_instance_data
- napi_add_async_cleanup_hook
- napi_remove_async_cleanup_hook
- node_api_symbol_for
- node_api_get_module_file_name
- node_api_create_syntax_error
- node_api_throw_syntax_error
- node_api_create_external_string_latin1

Related issue: [I96OIQ](https://gitee.com/openharmony/docs/issues/I96OIQ) [I96ONT](https://gitee.com/openharmony/arkui_napi/issues/I96ONT)
