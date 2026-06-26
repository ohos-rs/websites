---
editLink: true
---

# cronet

Cronet is a network request library developed by the Google team to replace `curl` and is widely used on `Android`. It is currently also supported on HarmonyOS, but it is different from the use of `curl`. We suggest first building the corresponding `.so` file, and then directly loading the corresponding capabilities in the business code to implement the use, rather than building with the business code.

:::tip There are two reasons why we choose the pre-built solution.

1. Cronet merely offers a build strategy that relies on `gn` and `ninja`, while the Rust ecosystem appears to lack robust capabilities.
2. To get it operational on HarmonyOS, we need to supply some extra patches for platform compatibility, and the source code package is excessively large.
   :::

You can refer to this [guide](https://gitee.com/han_jin_fei/lycium/tree/master/main/cronet) to build the required `.so` file.
