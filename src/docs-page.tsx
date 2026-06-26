import { useEffect, useRef } from "react";
import { lastUpdatedBySourcePath } from "virtual:last-updated";
import {
  getContentGroups,
  getContentSection,
  getContentSections,
  type ContentSection,
  type ContentCollection,
  type Locale,
} from "./content/docs";

type ContentPageProps = {
  collection: ContentCollection;
  locale: Locale;
};

const pageText = {
  zh: {
    docs: "文档",
    ecosystem: "生态",
    blog: "博客",
    ariaPager: "页面导航",
    ariaToc: "当前页面章节",
    previous: "上一页",
    next: "下一页",
    onThisPage: "本页目录",
    lastUpdated: "最新更新于",
  },
  en: {
    docs: "Docs",
    ecosystem: "Ecosystem",
    blog: "Blog",
    ariaPager: "Page navigation",
    ariaToc: "Current page sections",
    previous: "Previous",
    next: "Next",
    onThisPage: "On this page",
    lastUpdated: "Last updated",
  },
} as const;

const markdownAssets = import.meta.glob<string>("./content/**/assets/*", {
  eager: true,
  import: "default",
  query: "?url",
});

export function ContentPage({ collection, locale }: ContentPageProps) {
  const articleRef = useRef<HTMLElement>(null);
  const activePath = resolveActiveRoutePath(locale, collection);
  const groups = getContentGroups(locale, collection);
  const sections = getContentSections(locale, collection);
  const activeSection = getContentSection(locale, collection, activePath);
  const ActiveComponent = activeSection.Component;
  const visibleSections = groups.flatMap((group) => group.sections);
  const activeIndex = visibleSections.findIndex((section) => section.id === activeSection.id);
  const previousSection = activeIndex > 0 ? visibleSections[activeIndex - 1] : undefined;
  const nextSection =
    activeIndex >= 0 && activeIndex < visibleSections.length - 1
      ? visibleSections[activeIndex + 1]
      : undefined;
  const tocHeadings = activeSection.headings.filter(
    (heading) => heading.depth > 1 && heading.depth <= 3,
  );
  const text = pageText[locale];
  const title = text[collection];
  const lastUpdated = formatLastUpdated(lastUpdatedBySourcePath[activeSection.historyPath], locale);

  useEffect(() => {
    rewriteMarkdownImages(articleRef.current, locale, collection, activeSection);
  }, [activeSection, collection, locale]);

  return (
    <div className="container-page api-container py-12">
      <details className="mb-8 rounded-lg border border-(--color-border) bg-(--color-surface-1) md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs uppercase text-(--color-muted)">
          {title}
          <span className="nav-caret text-(--color-faint)" aria-hidden="true">
            ▾
          </span>
        </summary>
        <nav className="flex flex-col gap-5 px-2 pb-3 text-sm" aria-label={title}>
          {groups.map((group) => (
            <div className="grid gap-2" key={group.title}>
              <p className="px-2 text-xs uppercase text-(--color-faint)">{group.title}</p>
              {group.sections.map((section) => (
                <a
                  className={contentNavLinkClass(section.id === activeSection.id, "mobile")}
                  href={contentHref(locale, collection, section.routePath)}
                  key={section.id}
                >
                  {section.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </details>
      <div className="flex gap-10 lg:gap-14">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-20 flex flex-col gap-7 text-sm" aria-label={title}>
            <p className="mb-2 text-xs uppercase text-(--color-muted) opacity-60">{title}</p>
            {groups.map((group) => (
              <div className="grid gap-3" key={group.title}>
                <p className="pl-3 text-xs uppercase text-(--color-faint)">{group.title}</p>
                {group.sections.map((section) => (
                  <a
                    className={contentNavLinkClass(section.id === activeSection.id)}
                    href={contentHref(locale, collection, section.routePath)}
                    key={section.id}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>
        <main className="grid min-w-0 flex-1 grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_11rem]">
          <article className="void-md api-markdown min-w-0" ref={articleRef}>
            {lastUpdated ? (
              <p className="api-last-updated">
                {text.lastUpdated} {lastUpdated}
              </p>
            ) : null}
            <ActiveComponent />
            {sections.length > 1 ? (
              <nav className="api-doc-pager" aria-label={text.ariaPager}>
                {previousSection ? (
                  <a
                    className="api-doc-pager-link"
                    href={contentHref(locale, collection, previousSection.routePath)}
                  >
                    <span>{text.previous}</span>
                    <strong>{previousSection.title}</strong>
                  </a>
                ) : (
                  <span />
                )}
                {nextSection ? (
                  <a
                    className="api-doc-pager-link next"
                    href={contentHref(locale, collection, nextSection.routePath)}
                  >
                    <span>{text.next}</span>
                    <strong>{nextSection.title}</strong>
                  </a>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </article>
          {tocHeadings.length > 0 ? (
            <aside className="api-toc hidden xl:block">
              <nav className="sticky top-20" aria-label={text.ariaToc}>
                <p className="api-toc-title">{text.onThisPage}</p>
                <div className="api-toc-links">
                  {tocHeadings.map((heading) => (
                    <a
                      className={`api-toc-link depth-${heading.depth}`}
                      href={`#${heading.slug}`}
                      key={heading.slug}
                    >
                      {heading.text}
                    </a>
                  ))}
                </div>
              </nav>
            </aside>
          ) : null}
        </main>
      </div>
    </div>
  );
}

function rewriteMarkdownImages(
  container: HTMLElement | null,
  locale: Locale,
  collection: ContentCollection,
  section: ContentSection,
) {
  if (!container) return;

  for (const image of container.querySelectorAll<HTMLImageElement>("img")) {
    const originalSrc = image.getAttribute("src");
    if (!originalSrc || isExternalOrAbsoluteUrl(originalSrc)) continue;

    const assetKey = markdownAssetKey(locale, collection, section.sourcePath, originalSrc);
    const assetUrl = markdownAssets[assetKey];
    if (assetUrl) image.src = assetUrl;
  }
}

function isExternalOrAbsoluteUrl(src: string) {
  return (
    src.startsWith("/") ||
    src.startsWith("#") ||
    src.startsWith("data:") ||
    /^[a-z][a-z\d+.-]*:/i.test(src)
  );
}

function markdownAssetKey(
  locale: Locale,
  collection: ContentCollection,
  sourcePath: string,
  imagePath: string,
) {
  const sourceDir = sourcePath.includes("/")
    ? sourcePath.slice(0, sourcePath.lastIndexOf("/"))
    : "";
  const normalizedImagePath = normalizeRelativePath(`${sourceDir}/${imagePath}`);
  return `${contentAssetRoot(locale, collection)}/${normalizedImagePath}`;
}

function contentAssetRoot(locale: Locale, collection: ContentCollection) {
  if (collection === "blog") return locale === "en" ? "./content/en/blog" : "./content/blog";
  if (locale === "en") return "./content/en/docs";
  return "./content/docs";
}

function normalizeRelativePath(path: string) {
  const parts: string[] = [];

  for (const part of path.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      parts.pop();
      continue;
    }
    parts.push(part);
  }

  return parts.join("/");
}

export function contentHref(locale: Locale, collection: ContentCollection, routePath: string) {
  const localePrefix = locale === "en" ? "/en" : "";
  const collectionRoot = `${localePrefix}/${collection}/`;
  return routePath ? `${collectionRoot}${routePath}/` : collectionRoot;
}

function resolveActiveRoutePath(locale: Locale, collection: ContentCollection) {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const offset = locale === "en" ? 1 : 0;
  return parts[offset] === collection ? parts.slice(offset + 1).join("/") : "";
}

function contentNavLinkClass(active: boolean, mode: "desktop" | "mobile" = "desktop") {
  if (mode === "mobile") {
    return [
      "flex min-h-11 items-center rounded-md px-2 transition-colors",
      active
        ? "bg-(--color-accent-muted) text-(--color-fg)"
        : "text-(--color-muted) hover:bg-(--color-surface-2) hover:text-(--color-fg)",
    ].join(" ");
  }

  return [
    "border-l-2 pl-3 transition-colors",
    active
      ? "border-(--color-accent) text-(--color-fg)"
      : "border-transparent text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-fg)",
  ].join(" ");
}

function formatLastUpdated(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return "";

  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: locale === "zh" ? "2-digit" : "short",
    day: "2-digit",
  }).format(date);
}
