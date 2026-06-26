---
editLink: true
outline: "deep"
---

# 🎉 Release 1.0.0

## First

In September 2023, I officially started working with native HarmonyOS application development. After reading through the developer documentation, I realized it might have an architecture similar to Node.js, which immediately led me to consider trying to develop its native modules using Rust.

### Start

On October 9, 2023, I completed the capability verification of the prototype, officially running Rust-compiled code on the HarmonyOS system.

### Adaptation

On November 7, 2023, I decided to adapt `napi-rs` to the HarmonyOS system for native module development. By the 9th, I had completed the first version of development, which I named `ohos-rs`.

At this time, the system was still in the API9 stage, with many N-API features unsupported. So, I proposed to the system side the need for complete N-API interfaces, which were gradually opened up afterwards.

## Second

Since then, I gradually adapted a series of capabilities and tools from scaffolding to development, building, packaging, CI/CD, etc., and began to promote them on various platforms. With the full launch of HarmonyOS native application adaptation in 2024, some companies and individual developers in the community began to adopt the adapted 'ohos-rs'. During this process, we encountered some issues:

Inconsistent behavior compared to Node.js
I began to attempt some adaptations, striving for consistent behavior.

Packaging failures of Rust ecosystem libraries
I started adapting from the most commonly used libraries, submitting PRs to support HarmonyOS builds and usage to ensure availability. Meanwhile, I provided many corresponding library usage examples to developers to avoid potential problems they might encounter.

Incomplete documentation and examples
Gradually established a documentation site and related example projects.

## Third

On October 8, 2024, HarmonyNext began its official public beta, with its API evolving to API12, and related capabilities basically meeting requirements. After verification of some applications and SDKs, the overall capabilities of `ohos-rs` gradually stabilized, so we decided to release the official `1.0.0` version today.

This version has been used by multiple launched applications and community SDKs. Meanwhile, we have migrated a large number of napi-rs use cases, most of which have passed, indicating the stability and usability of the code.

- Capabilities basically aligned with napi-rs
- Passed a large number of napi-rs test cases
- Supplemented some HarmonyOS extension capabilities

We strongly recommend that you upgrade both the scaffolding and corresponding crate packages to the official `1.0.0` to access the latest and most stable capabilities.

## Finally

Hereafter, we will use API12 as the adaptation baseline. The capabilities of all subsequent new versions and system bindings will be provided in a manner similar to napi-rs adaptation, through 'features', and we will continuously update related documentation examples and toolchains.

Finally, we hope our work will be helpful to your work ~
