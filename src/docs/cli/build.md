---
editLink: true
---

# Build

As another useful subcommand, it helps us to build the final binary and generate `.d.ts`. Standard command will be:

```shell
cargo build
```

It supports some special options.

| Options |                                          description                                          |   type    | default |
|---------|:---------------------------------------------------------------------------------------------:|:---------:|--------:|
| release |           build mode,if it be set with true, project will build with `release` mode           | `boolean` |   false |
| compact | Generate folder struct,if it be set with true, the final dist folder will not be nest folder. | `boolean` |   false |
| dist    |                                   The final binary's folder                                   | `string`  |    dist |


## Usage

Here are some examples to use them.

### --release

```shell
ohrs build --release
```

If we use `--release`, project will build with `release` mode.

### --compact

```shell
ohrs build --compact
```

If we use `--compact`, the final folder will be:

![Dist](assets/dist.png)

All the final binary will in a same folder.

### --dist new_folder

```shell
cargo build --dist new_folder
```

Now, the final project structure will be:

![Dist](assets/new_folder.png)
