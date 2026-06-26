import "@fontsource/maple-mono/index.css";
import { StrictMode, useMemo, useState, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { contentHref, ContentPage } from "./docs-page";
import {
  firstRoutePath,
  hasContentRoute,
  type ContentCollection,
  type Locale,
} from "./content/docs";
import BuildSnippet from "./content/snippets/build.md";
import InstallSnippet from "./content/snippets/install.md";
import RustSnippet from "./content/snippets/rust.md";
import "./styles.css";

type Snippet = {
  id: string;
  label: string;
  language: string;
  code: string;
  Component: ComponentType;
};

type SiteRoute = "home" | ContentCollection;

type SiteContext = {
  locale: Locale;
  route: SiteRoute;
};

const snippets: Snippet[] = [
  {
    id: "install",
    label: "Cargo install",
    language: "sh",
    Component: InstallSnippet,
    code: "cargo install ohrs\ncargo add napi-ohos napi-derive-ohos\ncargo add napi-build-ohos --build",
  },
  {
    id: "rust",
    label: "Rust API",
    language: "rust",
    Component: RustSnippet,
    code: `use napi_derive_ohos::napi;

#[napi]
pub fn add(left: u32, right: u32) -> u32 {
  left + right
}`,
  },
  {
    id: "build",
    label: "Build",
    language: "sh",
    Component: BuildSnippet,
    code: "ohrs build --release",
  },
];

const content = {
  zh: {
    nav: {
      docs: "文档",
      ecosystem: "生态",
      blog: "博客",
      github: "GitHub",
      aria: "主导航",
      language: "语言",
      languageNames: {
        zh: "中文",
        en: "English",
      },
    },
    copy: {
      idle: "复制",
      copied: "已复制",
      select: "选中",
    },
    hero: {
      eyebrow: "面向 OpenHarmony 的 Rust Native 模块",
      body: "通过 Node-API 风格绑定，用 Rust 构建 OpenHarmony 编译产物；保留 napi-rs 的开发体验，同时覆盖 OpenHarmony 运行时差异。",
      primary: "快速开始",
      secondary: "文档",
      pipelineAlt: "Rust 代码通过 ohos-rs 构建为 OpenHarmony 动态库，并在 ArkTS 中调用",
    },
    capabilities: {
      eyebrow: "能力地图",
      title: "Rust-first 的 OpenHarmony Native 开发",
      items: [
        {
          title: "Rust Native 模块",
          body: "使用 napi-rs 风格宏，把 Rust 函数和类型暴露给 OpenHarmony ArkTS 代码。",
        },
        {
          title: "OpenHarmony 构建",
          body: "为 OpenHarmony target 构建 .so 产物，减少手写 C++ 与 NDK 配置。",
        },
        {
          title: "运行时差异",
          body: "集中记录 ArkRuntime 行为、Buffer 差异、N-API 缺口和常见迁移问题。",
        },
        {
          title: "生态包",
          body: "复用 hilog、mmkv、bcrypt、jsonwebtoken、xxhash 等维护中的绑定与包。",
        },
      ],
    },
    setup: {
      eyebrow: "安装",
      title: "通过 Cargo 安装工具与 Rust 绑定",
    },
    build: {
      eyebrow: "构建流程",
      title: "复制第一个可工作的形态",
      aria: "构建片段",
    },
    footer: {
      license: "MIT licensed",
      note: "Forked from napi-rs and adapted for OpenHarmony",
    },
  },
  en: {
    nav: {
      docs: "Docs",
      ecosystem: "Ecosystem",
      blog: "Blog",
      github: "GitHub",
      aria: "Primary navigation",
      language: "Language",
      languageNames: {
        zh: "中文",
        en: "English",
      },
    },
    copy: {
      idle: "Copy",
      copied: "Copied",
      select: "Select",
    },
    hero: {
      eyebrow: "Rust native modules for OpenHarmony",
      body: "Build compiled OpenHarmony SDK artifacts in Rust through Node-API style bindings, with napi-rs ergonomics and OpenHarmony-specific runtime guidance.",
      primary: "Quick Start",
      secondary: "Docs",
      pipelineAlt:
        "Rust source built by ohos-rs into OpenHarmony shared libraries and called from ArkTS",
    },
    capabilities: {
      eyebrow: "Capability map",
      title: "Rust-first native development for OpenHarmony",
      items: [
        {
          title: "Rust native modules",
          body: "Use napi-rs style macros to expose Rust functions and types to OpenHarmony ArkTS code.",
        },
        {
          title: "OpenHarmony aware build",
          body: "Build .so artifacts for OpenHarmony targets with less manual C++ and NDK wiring.",
        },
        {
          title: "Runtime differences documented",
          body: "Track ArkRuntime behavior, Buffer differences, N-API gaps, and common migration issues in one docs tree.",
        },
        {
          title: "Ecosystem packages",
          body: "Reuse maintained bindings and packages such as hilog, mmkv, bcrypt, jsonwebtoken, xxhash, and more.",
        },
      ],
    },
    setup: {
      eyebrow: "Setup",
      title: "Install tooling and Rust bindings with Cargo",
    },
    build: {
      eyebrow: "Build flow",
      title: "Copy the first working shape",
      aria: "Build recipe snippets",
    },
    footer: {
      license: "MIT licensed",
      note: "Forked from napi-rs and adapted for OpenHarmony",
    },
  },
} as const;

function App() {
  const context = resolveContext();

  if (context.route !== "home") {
    return (
      <>
        <SiteHeader context={context} />
        <main id="top">
          <ContentPage collection={context.route} locale={context.locale} />
        </main>
        <SiteFooter locale={context.locale} />
      </>
    );
  }

  return <HomePage context={context} />;
}

function resolveContext(): SiteContext {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const locale: Locale = parts[0] === "en" ? "en" : "zh";
  const offset = locale === "en" ? 1 : 0;
  const segment = parts[offset];
  const route: SiteRoute =
    segment === "docs" || segment === "ecosystem" || segment === "blog" ? segment : "home";
  return { locale, route };
}

function HomePage({ context }: { context: SiteContext }) {
  const text = content[context.locale];
  const [activeSnippetId, setActiveSnippetId] = useState(snippets[0]?.id ?? "");
  const [copyLabel, setCopyLabel] = useState<string>(text.copy.idle);
  const activeSnippet = useMemo(
    () => snippets.find((snippet) => snippet.id === activeSnippetId) ?? snippets[0],
    [activeSnippetId],
  );

  async function copySnippet() {
    if (!activeSnippet) return;

    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopyLabel(text.copy.copied);
    } catch {
      setCopyLabel(text.copy.select);
    }

    window.setTimeout(() => setCopyLabel(text.copy.idle), 1200);
  }

  return (
    <>
      <SiteHeader context={context} />
      <main id="top">
        <Hero locale={context.locale} />
        <CapabilitySection locale={context.locale} />
        <InstallSection locale={context.locale} />
        <BuildSection
          activeSnippet={activeSnippet}
          activeSnippetId={activeSnippetId}
          copyLabel={copyLabel}
          locale={context.locale}
          onCopy={copySnippet}
          onSnippetChange={setActiveSnippetId}
        />
      </main>
      <SiteFooter locale={context.locale} />
    </>
  );
}

function SiteHeader({ context }: { context: SiteContext }) {
  const text = content[context.locale];
  const zhHref = localizedCurrentHref("zh");
  const enHref = localizedCurrentHref("en");
  const languageValue = context.locale === "en" ? enHref : zhHref;

  return (
    <header className="site-header sticky top-0 z-50 border-b border-(--color-border)">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <a
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold text-(--color-fg)"
          href={homeHref(context.locale)}
        >
          <img className="size-7 rounded-md" src="/logo.svg" alt="" />
          ohos-rs
        </a>
        <div className="ml-auto flex items-center justify-end gap-4">
          <nav
            className="flex items-center gap-5 text-sm text-(--color-muted)"
            aria-label={text.nav.aria}
          >
            <a
              className={navLinkClass(context.route === "docs")}
              href={contentHref(context.locale, "docs", "basic")}
            >
              {text.nav.docs}
            </a>
            <a
              className={navLinkClass(context.route === "ecosystem")}
              href={contentHref(context.locale, "ecosystem", "")}
            >
              {text.nav.ecosystem}
            </a>
            <a
              className={navLinkClass(context.route === "blog")}
              href={contentHref(context.locale, "blog", "")}
            >
              {text.nav.blog}
            </a>
          </nav>
          <label className="language-select-wrap">
            <span className="sr-only">{text.nav.language}</span>
            <select
              className="language-select"
              value={languageValue}
              onChange={(event) => {
                window.location.href = event.currentTarget.value;
              }}
              aria-label={text.nav.language}
            >
              <option value={zhHref}>{text.nav.languageNames.zh}</option>
              <option value={enHref}>{text.nav.languageNames.en}</option>
            </select>
          </label>
          <a
            className="rounded-lg border border-(--color-border-strong) px-3 py-1.5 text-sm text-(--color-muted) transition-colors hover:border-(--color-accent) hover:text-(--color-fg)"
            href="https://github.com/ohos-rs/ohos-rs"
            target="_blank"
            rel="noreferrer"
          >
            {text.nav.github}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const text = content[locale].hero;

  return (
    <section className="hero-section relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="accent-glow" aria-hidden="true" />
      <div className="container-page grid min-h-[calc(100vh-3.5rem)] items-center gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="reveal is-visible">
          <img
            className="mb-7 size-16 rounded-2xl border border-(--color-border-strong)"
            src="/logo.svg"
            alt=""
          />
          <p className="eyebrow">{text.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-(--text-display-xl) font-semibold leading-[1.02] text-(--color-fg)">
            ohos-rs
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-(--color-muted)">{text.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href={docHref(locale, "quick-start")}>
              {text.primary}
            </a>
            <a className="btn-secondary" href={docHref(locale, "basic")}>
              {text.secondary}
            </a>
          </div>
        </div>
        <figure className="pipeline-card reveal is-visible">
          <img className="pipeline-image" src="/ohos-rs-pipeline.svg" alt={text.pipelineAlt} />
        </figure>
      </div>
    </section>
  );
}

function CapabilitySection({ locale }: { locale: Locale }) {
  const text = content[locale].capabilities;

  return (
    <section className="section-band">
      <div className="container-page">
        <SectionHeader eyebrow={text.eyebrow} title={text.title} />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {text.items.map((item) => (
            <article className="panel min-h-42" key={item.title}>
              <h3 className="text-lg font-semibold text-(--color-fg)">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-(--color-muted)">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallSection({ locale }: { locale: Locale }) {
  const text = content[locale].setup;

  return (
    <section id="install" className="section-band">
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
        <div>
          <SectionHeader eyebrow={text.eyebrow} title={text.title} />
        </div>
        <div className="grid gap-3" role="list" aria-label="Setup commands">
          <code className="command-line" role="listitem">
            cargo install ohrs
          </code>
          <code className="command-line" role="listitem">
            cargo add napi-ohos napi-derive-ohos
          </code>
          <code className="command-line" role="listitem">
            cargo add napi-build-ohos --build
          </code>
          <code className="command-line" role="listitem">
            ohrs build --release
          </code>
        </div>
      </div>
    </section>
  );
}

type BuildSectionProps = {
  activeSnippet: Snippet | undefined;
  activeSnippetId: string;
  copyLabel: string;
  locale: Locale;
  onCopy: () => void;
  onSnippetChange: (id: string) => void;
};

function BuildSection({
  activeSnippet,
  activeSnippetId,
  copyLabel,
  locale,
  onCopy,
  onSnippetChange,
}: BuildSectionProps) {
  const text = content[locale].build;
  const ActiveSnippet = activeSnippet?.Component;

  return (
    <section id="build" className="section-band">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={text.eyebrow} title={text.title} />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={text.aria}>
            {snippets.map((snippet) => (
              <button
                className={`snippet-tab${snippet.id === activeSnippetId ? " active" : ""}`}
                key={snippet.id}
                onClick={() => onSnippetChange(snippet.id)}
                role="tab"
                type="button"
                aria-selected={snippet.id === activeSnippetId}
              >
                {snippet.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-7 overflow-hidden rounded-xl border border-(--color-border-strong) bg-(--color-surface-2)">
          <div className="flex h-12 items-center justify-between border-b border-(--color-border) px-4 text-xs text-(--color-faint)">
            <span>{activeSnippet?.language}</span>
            <button className="copy-button" onClick={onCopy} type="button">
              {copyLabel}
            </button>
          </div>
          <div className="void-md snippet-markdown">{ActiveSnippet ? <ActiveSnippet /> : null}</div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-(--text-h2) font-semibold leading-[1.1] text-(--color-fg)">
        {title}
      </h2>
    </div>
  );
}

function SiteFooter({ locale }: { locale: Locale }) {
  const text = content[locale].footer;

  return (
    <footer className="border-t border-(--color-border)">
      <div className="container-page flex flex-col gap-3 py-8 text-sm text-(--color-faint) md:flex-row md:justify-between">
        <span>{text.license}</span>
        <span>{text.note}</span>
      </div>
    </footer>
  );
}

function localizedCurrentHref(locale: Locale) {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const currentLocale: Locale = parts[0] === "en" ? "en" : "zh";
  const offset = currentLocale === "en" ? 1 : 0;
  const collection = parts[offset];

  if (collection === "docs" || collection === "ecosystem" || collection === "blog") {
    const routePath = parts.slice(offset + 1).join("/");
    const fallback = firstRoutePath(locale, collection);
    return contentHref(
      locale,
      collection,
      hasContentRoute(locale, collection, routePath) ? routePath : fallback,
    );
  }

  return homeHref(locale);
}

function docHref(locale: Locale, routePath: string) {
  return contentHref(locale, "docs", routePath);
}

function homeHref(locale: Locale) {
  return locale === "en" ? "/en/" : "/";
}

function navLinkClass(active: boolean) {
  return `transition-colors hover:text-(--color-fg)${active ? " text-(--color-fg)" : ""}`;
}

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Missing #app root");
}

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
