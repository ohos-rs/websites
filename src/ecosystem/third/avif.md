---
editLink: true
---

# AVIF

AVIF is a new image format based on AV1 video encoding. Compared with image formats such as JPEG and WEBP, it has a higher compression ratio and better picture details. And most importantly, it is free and open source, with no licensing fees.

The rust community also provides the corresponding crate  [libavif-sys](https://github.com/njaard/libavif-rs), implemented based on [libavif](https://github.com/AOMediaCodec/libavif). The relevant openharmony adaptation has been submitted, you can refer to this [PR](https://github.com/njaard/libavif-rs/pull/99).

You can wait for the PR to merge or directly reference through git.

## Example

```toml
[dependencies]
libavif = { git = "https://github.com/southorange0929/libavif-rs.git", default-features = false, features = [
    "codec-aom",
] }
```

## Tip

For the `x86_64-unknown-linux-ohos` target, you need to install `yasm` or `nasm` to support assembly compilation.