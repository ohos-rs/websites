---
editLink: true
---

# @ohos-rs/streams

OpenHarmony 上的 WebStreams polyfill，提供 `ReadableStream`、`WritableStream`、`TransformStream`、队列策略和辅助方法，可与 ohos-rs 原生 stream API 互操作。

## 要求

- API Version >= 12

## 安装

```shell
ohpm install @ohos-rs/streams
```

## API

```ts
export class ReadableStream<T = ESObject>
export class ReadableStreamDefaultReader<T>
export class ReadableStreamDefaultController<T>
export class ReadableStreamReadResult<T>

export class WritableStream<T = ESObject>
export class WritableStreamDefaultWriter<T = ESObject>
export class WritableStreamDefaultController

export class TransformStream<I = ESObject, O = I>
export class TransformStreamDefaultController<T>
export class ReadableWritablePair<I, O>

export class CountQueuingStrategy
export class ByteLengthQueuingStrategy

export function installWebStreams(target?: ESObject): void
export function isReadableStream(value: ESObject): boolean
export function isWritableStream(value: ESObject): boolean
export function collectReadableStream<T>(stream: ReadableStream<T>): Promise<T[]>
```

## 安装到 globalThis

包默认会调用 `installWebStreams()`。如果需要把构造函数安装到自定义对象上，或者在加载依赖 `globalThis` WebStreams 的代码前显式安装，可以再次调用它。

```ts
import { installWebStreams } from "@ohos-rs/streams";

installWebStreams();
```

## ReadableStream

```ts
import { ReadableStream } from "@ohos-rs/streams";

const readable = new ReadableStream<Uint8Array>({
  start(controller) {
    controller.enqueue(new Uint8Array([104, 101, 108, 108, 111]));
    controller.close();
  },
});

const reader = readable.getReader();
const first = await reader.read();

if (!first.done) {
  console.info(`chunk length: ${first.value.byteLength}`);
}

reader.releaseLock();
```

## WritableStream

```ts
import { ReadableStream, WritableStream } from "@ohos-rs/streams";

const readable = new ReadableStream<Uint8Array>({
  start(controller) {
    controller.enqueue(new Uint8Array([104, 101, 108, 108, 111]));
    controller.close();
  },
});

const writable = new WritableStream<Uint8Array>({
  write(chunk) {
    console.info(`chunk length: ${chunk.byteLength}`);
  },
});

await readable.pipeTo(writable);
```

## TransformStream

```ts
import { TransformStream } from "@ohos-rs/streams";

const transform = new TransformStream<number, string>({
  transform(chunk, controller) {
    controller.enqueue(`value:${chunk}`);
  },
});

const writer = transform.writable.getWriter();
await writer.write(10);
await writer.write(20);
await writer.close();
writer.releaseLock();
```

## ohos-rs 原生互操作

导出的 `ReadableStream` 和 `WritableStream` 可用于 ohos-rs 原生代码创建或消费 stream 的场景。

```ts
import { ReadableStream, collectReadableStream } from "@ohos-rs/streams";

const native = requireNapiPreview("stream_test", true);

const nativeReadable = native.createReadableStream();
const chunks = await collectReadableStream(nativeReadable);

const jsReadable = new ReadableStream<Uint8Array>({
  start(controller) {
    controller.enqueue(new Uint8Array([104, 101, 108, 108, 111]));
    controller.close();
  },
});

await native.acceptStream(jsReadable);
```

## 说明

- `ReadableStream.abort(reason)` 是 `cancel(reason)` 的别名，便于原生代码发起 stream 取消。
- 已实现常用 WebStreams 能力，包括 `pipeTo`、`pipeThrough`、`tee`、`locked`、`getReader` 和 `getWriter`。
- `CountQueuingStrategy` 和 `ByteLengthQueuingStrategy` 提供 `highWaterMark` 和 `size()`，可用于队列大小计算。
