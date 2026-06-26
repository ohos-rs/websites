---
editLink: true
---

# @ohos-rs/jieba

[jieba-rs](https://github.com/messense/jieba-rs) binding to OpenHarmony.

## Install

```shell
ohpm install @ohos-rs/jieba
```

## API

```ts
import buffer from '@ohos.buffer';
export interface Keyword {
  keyword: string
  weight: number
}
export interface TaggedWord {
  tag: string
  word: string
}
export function cut(sentence: string | buffer.Buffer, hmm?: boolean | undefined | null): string[]
export function cutAll(sentence: string | buffer.Buffer): string[]
export function cutForSearch(sentence: string | buffer.Buffer, hmm?: boolean | undefined | null): string[]
export function extract(sentence: string | buffer.Buffer, topn: number, allowedPos?: string | undefined | null): Array<Keyword>
export function load(): void
export function loadDict(dict: buffer.Buffer): void
export function loadTFIDFDict(dict: buffer.Buffer): void
export function tag(sentence: string | buffer.Buffer, hmm?: boolean | undefined | null): Array<TaggedWord>
```

## Usage

```ts
const sentence = '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，走上人生巅峰。'
cut(sentence);
tag(sentence);
```
