import type { ComponentType } from "react";

export type Locale = "zh" | "en";
export type ContentCollection = "docs" | "ecosystem" | "blog";

export type ContentHeading = {
  depth: number;
  slug: string;
  text: string;
};

export type ContentSection = {
  id: string;
  historyPath: string;
  sourcePath: string;
  routePath: string;
  title: string;
  summary: string;
  headings: ReadonlyArray<ContentHeading>;
  Component: ComponentType;
};

export type ContentGroup = {
  title: string;
  sections: ContentSection[];
};

type MarkdownModule = {
  default: ComponentType;
  headings?: ReadonlyArray<ContentHeading>;
};

type ContentItem = readonly [
  id: string,
  sourcePath: string,
  routePath: string,
  title: string,
  summary: string,
];
type GroupItem = readonly [title: string, ids: readonly string[]];

const modules = {
  ...import.meta.glob<MarkdownModule>("./**/*.md", { eager: true }),
  ...import.meta.glob<MarkdownModule>("../en/docs/**/*.md", { eager: true }),
  ...import.meta.glob<MarkdownModule>("../blog/**/*.md", { eager: true }),
  ...import.meta.glob<MarkdownModule>("../en/blog/**/*.md", { eager: true }),
};

const zhDocs = [
  ["basic", "basic.md", "basic", "简介", "ohos-rs 的定位、基础能力和最小示例。"],
  [
    "quick-start",
    "basic/quick-start.md",
    "basic/quick-start",
    "快速开始",
    "环境准备、安装和第一个项目。",
  ],
  [
    "simple-project",
    "basic/simple-project.md",
    "basic/simple-project",
    "从 0 新建项目",
    "从初始化到构建 native 方法的完整示例。",
  ],
  ["cli-init", "cli/init.md", "cli/init", "init", "初始化项目的 CLI 命令。"],
  ["cli-build", "cli/build.md", "cli/build", "build", "构建命令、参数和多目标产物。"],
  ["cli-artifact", "cli/artifact.md", "cli/artifact", "artifact", "产物处理相关命令。"],
  ["cli-cargo", "cli/cargo.md", "cli/cargo", "cargo", "cargo 子命令参数。"],
  ["cli-doctor", "cli/doctor.md", "cli/doctor", "doctor", "环境检查命令。"],
  [
    "usage-basic",
    "usage/basic.md",
    "usage/basic",
    "基本用法",
    "OpenHarmony N-API 使用差异和注意事项。",
  ],
  ["task", "usage/task.md", "usage/task", "Task", "异步 Task 的基础用法和示例。"],
  [
    "thread-safe-function",
    "usage/tsfn.md",
    "usage/tsfn",
    "ThreadSafeFunction",
    "ThreadSafeFunction 的使用方式。",
  ],
  [
    "ark-runtime",
    "usage/ark_runtime.md",
    "usage/ark_runtime",
    "ArkRuntime",
    "同步与异步场景下访问 ArkRuntime。",
  ],
  ["ci-basic", "ci/basic.md", "ci/basic", "CI", "GitHub Action 和自定义流水线接入。"],
  ["ci-zig", "ci/zig.md", "ci/zig", "zig-build", "Zig 相关 CI 配置。"],
  ["runtime-diff", "more/diff.md", "more/diff", "Diff", "ArkRuntime 与类 Node.js 运行时差异。"],
  ["buffer", "more/buffer.md", "more/buffer", "Buffer", "Buffer 与 ArrayBuffer 的使用。"],
  ["faq", "more/f&q.md", "more/f&q", "常见问题", "体积、Option<T>、迁移动态库和测试问题。"],
  ["known-issue", "more/known-issue.md", "more/known-issue", "N-API", "N-API 相关已知问题。"],
  ["emu-tls", "more/emu-tls.md", "more/emu-tls", "EMU-TLS", "EMU-TLS 问题和处理方式。"],
] as const satisfies readonly ContentItem[];

const enDocs = [
  [
    "basic",
    "basic.md",
    "basic",
    "Introduction",
    "What ohos-rs is and the smallest native module example.",
  ],
  [
    "quick-start",
    "basic/quick-start.md",
    "basic/quick-start",
    "Quick Start",
    "Environment setup, installation, and the first project.",
  ],
  [
    "simple-project",
    "basic/simple-project.md",
    "basic/simple-project",
    "Simple Project",
    "A complete example from initialization to native build output.",
  ],
  ["cli-init", "cli/init.md", "cli/init", "init", "Initialize an ohos-rs project."],
  [
    "cli-build",
    "cli/build.md",
    "cli/build",
    "build",
    "Build commands, parameters, and output examples.",
  ],
  ["cli-artifact", "cli/artifact.md", "cli/artifact", "artifact", "Artifact handling command."],
  ["cli-cargo", "cli/cargo.md", "cli/cargo", "cargo", "Cargo subcommand arguments."],
  ["cli-doctor", "cli/doctor.md", "cli/doctor", "doctor", "Environment check command."],
  [
    "usage-basic",
    "usage/basic.md",
    "usage/basic",
    "Basic Usage",
    "OpenHarmony N-API usage differences and notes.",
  ],
  ["task", "usage/task.md", "usage/task", "Task", "Basic async Task usage and examples."],
  [
    "thread-safe-function",
    "usage/tsfn.md",
    "usage/tsfn",
    "ThreadSafeFunction",
    "How to use ThreadSafeFunction.",
  ],
  [
    "ark-runtime",
    "usage/ark_runtime.md",
    "usage/ark_runtime",
    "ArkRuntime",
    "Access ArkRuntime in synchronous and asynchronous scenarios.",
  ],
  ["ci-basic", "ci/basic.md", "ci/basic", "CI", "GitHub Actions and custom pipeline setup."],
  ["ci-zig", "ci/zig.md", "ci/zig", "zig-build", "Zig-related CI setup."],
  [
    "runtime-diff",
    "more/diff.md",
    "more/diff",
    "Diff",
    "Differences between ArkRuntime and Node.js-like runtimes.",
  ],
  ["buffer", "more/buffer.md", "more/buffer", "Buffer", "Buffer and ArrayBuffer usage."],
  ["faq", "more/f&q.md", "more/f&q", "FAQ", "Size, Option<T>, library migration, and test issues."],
  ["known-issue", "more/known-issue.md", "more/known-issue", "N-API", "Known N-API issues."],
  ["emu-tls", "more/emu-tls.md", "more/emu-tls", "EMU-TLS", "EMU-TLS issue and solution notes."],
] as const satisfies readonly ContentItem[];

const zhEcosystem = [
  ["ecosystem", "ecosystem/index.md", "", "生态", "ohos-rs 生态库总览。"],
  ["crc32", "ecosystem/package/crc32.md", "package/crc32", "crc32", "crc32 包安装、API 和示例。"],
  ["jieba", "ecosystem/package/jieba.md", "package/jieba", "jieba", "jieba 包安装、API 和示例。"],
  [
    "argon2",
    "ecosystem/package/argon2.md",
    "package/argon2",
    "argon2",
    "Argon2 包安装、API 和示例。",
  ],
  [
    "bcrypt",
    "ecosystem/package/bcrypt.md",
    "package/bcrypt",
    "bcrypt",
    "bcrypt 包安装、API 和示例。",
  ],
  [
    "jsonwebtoken",
    "ecosystem/package/jsonwebtoken.md",
    "package/jsonwebtoken",
    "jsonwebtoken",
    "jsonwebtoken 包安装、API 和示例。",
  ],
  [
    "snappy",
    "ecosystem/package/snappy.md",
    "package/snappy",
    "snappy",
    "snappy 包安装、API 和示例。",
  ],
  [
    "xxhash",
    "ecosystem/package/xxhash.md",
    "package/xxhash",
    "xxhash",
    "xxhash 包安装、API 和示例。",
  ],
  ["image", "ecosystem/package/image.md", "package/image", "image", "image 包提示和说明。"],
  [
    "hilog-binding",
    "ecosystem/binding/hilog.md",
    "binding/hilog",
    "hilog",
    "hilog binding 安装和用法。",
  ],
  [
    "init-binding",
    "ecosystem/binding/init.md",
    "binding/init",
    "init",
    "init binding 安装和用法。",
  ],
  [
    "abort-controller",
    "ecosystem/polyfill/abort-controller.md",
    "polyfill/abort-controller",
    "AbortController",
    "AbortController polyfill。",
  ],
  [
    "web-streams",
    "ecosystem/polyfill/web-streams.md",
    "polyfill/web-streams",
    "WebStreams",
    "WebStreams polyfill 和 ohos-rs stream 互操作说明。",
  ],
  ["openssl", "ecosystem/third/openssl.md", "third/openssl", "OpenSSL", "OpenSSL 适配说明。"],
  ["curl", "ecosystem/third/curl.md", "third/curl", "cURL", "cURL 与 SSL 使用示例。"],
  ["mmkv", "ecosystem/third/mmkv.md", "third/mmkv", "MMKV", "MMKV 包安装、API 和示例。"],
  ["avif", "ecosystem/third/avif.md", "third/avif", "avif", "AVIF 第三方库适配说明。"],
  ["cronet", "ecosystem/third/cronet.md", "third/cronet", "cronet", "cronet 适配说明。"],
  [
    "boringssl",
    "ecosystem/third/boringssl.md",
    "third/boringssl",
    "BoringSSL",
    "BoringSSL 适配说明。",
  ],
] as const satisfies readonly ContentItem[];

const enEcosystem = [
  ["ecosystem", "ecosystem/index.md", "", "Ecosystem", "ohos-rs ecosystem overview."],
  [
    "crc32",
    "ecosystem/package/crc32.md",
    "package/crc32",
    "crc32",
    "crc32 package API and examples.",
  ],
  [
    "jieba",
    "ecosystem/package/jieba.md",
    "package/jieba",
    "jieba",
    "jieba package API and examples.",
  ],
  [
    "argon2",
    "ecosystem/package/argon2.md",
    "package/argon2",
    "argon2",
    "Argon2 package API and examples.",
  ],
  [
    "bcrypt",
    "ecosystem/package/bcrypt.md",
    "package/bcrypt",
    "bcrypt",
    "bcrypt package API and examples.",
  ],
  [
    "jsonwebtoken",
    "ecosystem/package/jsonwebtoken.md",
    "package/jsonwebtoken",
    "jsonwebtoken",
    "jsonwebtoken package API and examples.",
  ],
  [
    "snappy",
    "ecosystem/package/snappy.md",
    "package/snappy",
    "snappy",
    "snappy package API and examples.",
  ],
  [
    "xxhash",
    "ecosystem/package/xxhash.md",
    "package/xxhash",
    "xxhash",
    "xxhash package API and examples.",
  ],
  ["image", "ecosystem/package/image.md", "package/image", "image", "image package notes."],
  [
    "hilog-binding",
    "ecosystem/binding/hilog.md",
    "binding/hilog",
    "hilog",
    "hilog binding installation and usage.",
  ],
  [
    "init-binding",
    "ecosystem/binding/init.md",
    "binding/init",
    "init",
    "init binding installation and usage.",
  ],
  [
    "abort-controller",
    "ecosystem/polyfill/abort-controller.md",
    "polyfill/abort-controller",
    "AbortController",
    "AbortController polyfill.",
  ],
  [
    "web-streams",
    "ecosystem/polyfill/web-streams.md",
    "polyfill/web-streams",
    "WebStreams",
    "WebStreams polyfill and ohos-rs stream interop.",
  ],
  [
    "openssl",
    "ecosystem/third/openssl.md",
    "third/openssl",
    "OpenSSL",
    "OpenSSL integration notes.",
  ],
  ["curl", "ecosystem/third/curl.md", "third/curl", "cURL", "cURL and SSL usage examples."],
  ["mmkv", "ecosystem/third/mmkv.md", "third/mmkv", "MMKV", "MMKV package API and examples."],
  ["avif", "ecosystem/third/avif.md", "third/avif", "avif", "AVIF third-party library notes."],
  ["cronet", "ecosystem/third/cronet.md", "third/cronet", "cronet", "cronet integration notes."],
  [
    "boringssl",
    "ecosystem/third/boringssl.md",
    "third/boringssl",
    "BoringSSL",
    "BoringSSL integration notes.",
  ],
] as const satisfies readonly ContentItem[];

const zhBlog = [
  ["blog-index", "index.md", "", "博客", "项目文章与更新日志。"],
  [
    "release-1.0.0",
    "release-1.0.0.md",
    "release-1.0.0",
    "Release 1.0.0",
    "ohos-rs 1.0.0 发布记录。",
  ],
  ["2024-07-30", "2024-07-30.md", "2024-07-30", "2024-07-30", "Beta 版本更新记录。"],
  ["2024-05-27", "2024-05-27.md", "2024-05-27", "2024-05-27", "版本更新记录。"],
  [
    "2025-01-24",
    "2025-01-24.md",
    "2025-01-24",
    "OpenHarmony Ability and winit for OpenHarmony",
    "OpenHarmonyAbility 和 winit 预览版本介绍。",
  ],
] as const satisfies readonly ContentItem[];

const enBlog = [
  ["blog-index", "index.md", "", "Blog", "Repository updates and articles."],
  [
    "release-1.0.0",
    "release-1.0.0.md",
    "release-1.0.0",
    "Release 1.0.0",
    "ohos-rs 1.0.0 release note.",
  ],
  ["2024-07-30", "2024-07-30.md", "2024-07-30", "2024-07-30", "Beta release update."],
  ["2024-05-27", "2024-05-27.md", "2024-05-27", "2024-05-27", "Release note."],
  [
    "2025-01-24",
    "2025-01-24.md",
    "2025-01-24",
    "OpenHarmony Ability and winit for OpenHarmony",
    "Preview release for OpenHarmonyAbility and winit.",
  ],
] as const satisfies readonly ContentItem[];

const zhDocGroups = [
  ["简介", ["basic", "quick-start", "simple-project"]],
  ["脚手架", ["cli-init", "cli-build", "cli-artifact", "cli-cargo", "cli-doctor"]],
  ["用法", ["usage-basic", "task", "thread-safe-function", "ark-runtime"]],
  ["CI/CD", ["ci-basic", "ci-zig"]],
  ["More", ["runtime-diff", "buffer", "faq", "known-issue", "emu-tls"]],
] as const satisfies readonly GroupItem[];

const enDocGroups = [
  ["Introduction", ["basic", "quick-start", "simple-project"]],
  ["Scaffolding", ["cli-init", "cli-build", "cli-artifact", "cli-cargo", "cli-doctor"]],
  ["Usage", ["usage-basic", "task", "thread-safe-function", "ark-runtime"]],
  ["CI/CD", ["ci-basic", "ci-zig"]],
  ["More", ["runtime-diff", "buffer", "faq", "known-issue", "emu-tls"]],
] as const satisfies readonly GroupItem[];

const zhEcosystemGroups = [
  ["@ohos-rs", ["crc32", "jieba", "argon2", "bcrypt", "jsonwebtoken", "snappy", "xxhash", "image"]],
  ["原生模块绑定", ["hilog-binding", "init-binding"]],
  ["Polyfill", ["abort-controller", "web-streams"]],
  ["第三方能力", ["openssl", "curl", "mmkv", "avif", "cronet", "boringssl"]],
] as const satisfies readonly GroupItem[];

const enEcosystemGroups = [
  ["@ohos-rs", ["crc32", "jieba", "argon2", "bcrypt", "jsonwebtoken", "snappy", "xxhash", "image"]],
  ["Native bindings", ["hilog-binding", "init-binding"]],
  ["Polyfill", ["abort-controller", "web-streams"]],
  ["Third-party", ["openssl", "curl", "mmkv", "avif", "cronet", "boringssl"]],
] as const satisfies readonly GroupItem[];

const zhBlogGroups = [
  ["Blog", ["release-1.0.0", "2024-07-30", "2024-05-27", "2025-01-24"]],
] as const satisfies readonly GroupItem[];
const enBlogGroups = [
  ["Blog", ["release-1.0.0", "2024-07-30", "2024-05-27", "2025-01-24"]],
] as const satisfies readonly GroupItem[];

export const contentLocales = {
  zh: {
    docs: createCollection("zh", "docs", zhDocs, zhDocGroups),
    ecosystem: createCollection("zh", "ecosystem", zhEcosystem, zhEcosystemGroups),
    blog: createCollection("zh", "blog", zhBlog, zhBlogGroups),
  },
  en: {
    docs: createCollection("en", "docs", enDocs, enDocGroups),
    ecosystem: createCollection("en", "ecosystem", enEcosystem, enEcosystemGroups),
    blog: createCollection("en", "blog", enBlog, enBlogGroups),
  },
};

export function getContentGroups(locale: Locale, collection: ContentCollection) {
  return contentLocales[locale][collection].groups;
}

export function getContentSections(locale: Locale, collection: ContentCollection) {
  return contentLocales[locale][collection].sections;
}

export function getContentSection(
  locale: Locale,
  collection: ContentCollection,
  routePath: string,
) {
  return (
    contentLocales[locale][collection].sections.find(
      (section) => section.routePath === routePath,
    ) ?? contentLocales[locale][collection].defaultSection
  );
}

export function hasContentRoute(locale: Locale, collection: ContentCollection, routePath: string) {
  return contentLocales[locale][collection].sections.some(
    (section) => section.routePath === routePath,
  );
}

export function firstRoutePath(locale: Locale, collection: ContentCollection) {
  return contentLocales[locale][collection].defaultSection.routePath;
}

function createCollection(
  locale: Locale,
  collection: ContentCollection,
  items: readonly ContentItem[],
  groups: readonly GroupItem[],
) {
  const sourcePrefix = sourcePrefixFor(locale, collection);
  const sectionsById = new Map(
    items.map(([id, sourcePath, routePath, title, summary]) => {
      const mod = modules[`${sourcePrefix}/${sourcePath}`];

      if (!mod) {
        throw new Error(`Missing ${locale} ${collection} markdown module: ${sourcePath}`);
      }

      return [
        id,
        {
          id,
          historyPath: historyPathFor(locale, collection, sourcePath),
          sourcePath,
          routePath,
          title,
          summary,
          headings: mod.headings ?? [],
          Component: mod.default,
        },
      ];
    }),
  );

  const contentGroups: ContentGroup[] = groups.map(([title, ids]) => ({
    title,
    sections: ids.map((id) => {
      const section = sectionsById.get(id);

      if (!section) {
        throw new Error(`Missing ${locale} ${collection} section: ${id}`);
      }

      return section;
    }),
  }));
  const indexSection = sectionsById.get(`${collection}-index`);
  const firstSection = contentGroups[0]?.sections[0] ?? [...sectionsById.values()][0];

  return {
    groups: contentGroups,
    sections: [...sectionsById.values()],
    defaultSection: indexSection ?? firstSection,
  };
}

function sourcePrefixFor(locale: Locale, collection: ContentCollection) {
  if (collection === "docs") return locale === "zh" ? "." : "../en/docs";
  if (collection === "blog") return locale === "zh" ? "../blog" : "../en/blog";
  return locale === "zh" ? "." : "../en/docs";
}

function historyPathFor(locale: Locale, collection: ContentCollection, sourcePath: string) {
  const localePrefix = locale === "en" ? "src/en" : "src";
  if (collection === "docs") return `${localePrefix}/docs/${sourcePath}`;
  if (collection === "ecosystem") return `${localePrefix}/${sourcePath}`;
  return `${localePrefix}/blog/${sourcePath}`;
}
