---
editLink: true
---

# cURL

There are already [rust bindings](https://github.com/alexcrichton/curl-rust) for cURL in the community, we can use it directly.

## Basic usage

Add `curl` crate to dependence, and create a function.

```shell
cargo add curl
```

Example code:

```rust
use curl::easy::Easy;
use napi_derive_ohos::napi;

#[napi]
pub fn request_hello() -> String {
    let mut easy = Easy::new();
    easy.ssl_verify_peer(false).unwrap();
    easy.ssl_verify_host(false).unwrap();
    easy.url("https://httpbin.org/ip").unwrap();
    easy.write_function(|data: &[u8]| Ok(data.len())).unwrap();
    let a = easy.perform();

    match a {
        Ok(()) => {
            // get the content-type then print it
            let con_type: &str = easy.content_type().unwrap().unwrap();
            String::from(con_type)
        }
        Err(e) => {
            let res = format!("{:?}", e);
            res
        }
    }
}
```

There are two points to note here:

1. `curl` depends on `openssl`, so we need to set openssl.
2. If you try to request a link with `https` protocol, you can set ssl_verify to false.

## SSL Usage

A simple example with ssl:

```rust
#[napi]
pub fn request_hello_with_ca() -> String {
    let mut easy = Easy::new();

    // should use root ca  // [!code ++]
    let mut f = File::open("/etc/ssl/certs/cacert.pem").unwrap();  // [!code ++]
    let mut buf = Vec::new();  // [!code ++]
    f.read_to_end(&mut buf).unwrap();  // [!code ++]
    easy.ssl_cainfo_blob(&buf).unwrap();  // [!code ++]

    // some url will fail which is self-sign CA
    easy.url("https://www.qq.com").unwrap();
    easy.write_function(|data: &[u8]| Ok(data.len())).unwrap();
    let a = easy.perform();

    match a {
        Ok(()) => {
            // get the content-type then print it
            let con_type: &str = easy.content_type().unwrap().unwrap();
            String::from(con_type)
        }
        Err(e) => {
            let res = format!("{:?}", e);
            res
        }
    }
}
```

The current system root certificate may cause the following error for some request addresses.

::: danger Error info
Error { description: "SSL peer certificate or SSH remote key was not OK", code: 60, extra: Some("SSL certificate problem: self-signed certificate")
:::

## Example

All examples can be found [here](https://github.com/ohos-rs/example/tree/main/example/curl).
