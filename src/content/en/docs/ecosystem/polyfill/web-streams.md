---
editLink: true
---

# @ohos-rs/streams

WebStreams polyfill for OpenHarmony. It provides `ReadableStream`, `WritableStream`, `TransformStream`, queuing strategies, and helpers that can interoperate with ohos-rs native stream APIs.

## Requirement

- API Version >= 12

## Install

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

## Install to globalThis

The package calls `installWebStreams()` by default. You can also install the constructors into a custom target or call it again before loading code that expects WebStreams on `globalThis`.

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

## ohos-rs native interop

The exported `ReadableStream` and `WritableStream` classes are designed to work with streams created or consumed by ohos-rs native code.

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

## Notes

- `ReadableStream.abort(reason)` is an alias for `cancel(reason)`, which is useful when native code requests stream cancellation.
- `pipeTo`, `pipeThrough`, `tee`, `locked`, `getReader`, and `getWriter` are implemented for common WebStreams usage.
- `CountQueuingStrategy` and `ByteLengthQueuingStrategy` expose `highWaterMark` and `size()` for queue sizing.
