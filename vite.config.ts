import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import { voidMarkdown } from "@void/md/plugin";
import { voidReact } from "@void/react/plugin";
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url));
const LAST_UPDATED_ID = "virtual:last-updated";
const RESOLVED_LAST_UPDATED_ID = `\0${LAST_UPDATED_ID}`;

const contentMarkdownFiles = [
  "src/docs/basic.md",
  "src/docs/basic/quick-start.md",
  "src/docs/basic/simple-project.md",
  "src/docs/cli/init.md",
  "src/docs/cli/build.md",
  "src/docs/cli/artifact.md",
  "src/docs/cli/cargo.md",
  "src/docs/cli/doctor.md",
  "src/docs/usage/basic.md",
  "src/docs/usage/task.md",
  "src/docs/usage/tsfn.md",
  "src/docs/usage/ark_runtime.md",
  "src/docs/ci/basic.md",
  "src/docs/ci/zig.md",
  "src/docs/more/diff.md",
  "src/docs/more/buffer.md",
  "src/docs/more/f&q.md",
  "src/docs/more/known-issue.md",
  "src/docs/more/emu-tls.md",
  "src/ecosystem/index.md",
  "src/ecosystem/package/crc32.md",
  "src/ecosystem/package/jieba.md",
  "src/ecosystem/package/argon2.md",
  "src/ecosystem/package/bcrypt.md",
  "src/ecosystem/package/jsonwebtoken.md",
  "src/ecosystem/package/snappy.md",
  "src/ecosystem/package/xxhash.md",
  "src/ecosystem/package/image.md",
  "src/ecosystem/binding/hilog.md",
  "src/ecosystem/binding/init.md",
  "src/ecosystem/polyfill/abort-controller.md",
  "src/ecosystem/third/openssl.md",
  "src/ecosystem/third/curl.md",
  "src/ecosystem/third/mmkv.md",
  "src/ecosystem/third/avif.md",
  "src/ecosystem/third/cronet.md",
  "src/ecosystem/third/boringssl.md",
  "src/blog/index.md",
  "src/blog/release-1.0.0.md",
  "src/blog/2024-07-30.md",
  "src/blog/2024-05-27.md",
  "src/blog/2025-01-24.md",
  "src/en/docs/basic.md",
  "src/en/docs/basic/quick-start.md",
  "src/en/docs/basic/simple-project.md",
  "src/en/docs/cli/init.md",
  "src/en/docs/cli/build.md",
  "src/en/docs/cli/artifact.md",
  "src/en/docs/cli/cargo.md",
  "src/en/docs/cli/doctor.md",
  "src/en/docs/usage/basic.md",
  "src/en/docs/usage/task.md",
  "src/en/docs/usage/tsfn.md",
  "src/en/docs/usage/ark_runtime.md",
  "src/en/docs/ci/basic.md",
  "src/en/docs/ci/zig.md",
  "src/en/docs/more/diff.md",
  "src/en/docs/more/buffer.md",
  "src/en/docs/more/f&q.md",
  "src/en/docs/more/known-issue.md",
  "src/en/docs/more/emu-tls.md",
  "src/en/ecosystem/index.md",
  "src/en/ecosystem/package/crc32.md",
  "src/en/ecosystem/package/jieba.md",
  "src/en/ecosystem/package/argon2.md",
  "src/en/ecosystem/package/bcrypt.md",
  "src/en/ecosystem/package/jsonwebtoken.md",
  "src/en/ecosystem/package/snappy.md",
  "src/en/ecosystem/package/xxhash.md",
  "src/en/ecosystem/package/image.md",
  "src/en/ecosystem/binding/hilog.md",
  "src/en/ecosystem/binding/init.md",
  "src/en/ecosystem/polyfill/abort-controller.md",
  "src/en/ecosystem/third/openssl.md",
  "src/en/ecosystem/third/curl.md",
  "src/en/ecosystem/third/mmkv.md",
  "src/en/ecosystem/third/avif.md",
  "src/en/ecosystem/third/cronet.md",
  "src/en/ecosystem/third/boringssl.md",
  "src/en/blog/index.md",
  "src/en/blog/release-1.0.0.md",
  "src/en/blog/2024-07-30.md",
  "src/en/blog/2024-05-27.md",
  "src/en/blog/2025-01-24.md",
] as const;

function docsFallback(): Plugin {
  const fallbackRoutes = [
    ["/docs/", "/docs/index.html"],
    ["/ecosystem/", "/ecosystem/index.html"],
    ["/blog/", "/blog/index.html"],
    ["/en/docs/", "/en/docs/index.html"],
    ["/en/ecosystem/", "/en/ecosystem/index.html"],
    ["/en/blog/", "/en/blog/index.html"],
  ] as const;

  function rewrite(req: { url?: string }) {
    if ((req.url === "/en" || req.url === "/en/") && !req.url.includes(".")) {
      req.url = "/en/index.html";
      return;
    }

    const match = fallbackRoutes.find(([prefix]) => req.url?.startsWith(prefix));
    if (match && !req.url?.includes(".")) req.url = match[1];
  }

  return {
    name: "localized-subpath-fallback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
}

function lastUpdatedPlugin(): Plugin {
  return {
    name: "last-updated",
    resolveId(id) {
      return id === LAST_UPDATED_ID ? RESOLVED_LAST_UPDATED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_LAST_UPDATED_ID) return null;

      const updated = Object.fromEntries(
        contentMarkdownFiles.map((file) => [file, lastUpdatedIso(file)]),
      );

      return `export const lastUpdatedBySourcePath = ${JSON.stringify(updated, null, 2)};`;
    },
  };
}

function lastUpdatedIso(filePath: string) {
  try {
    const committed = execFileSync("git", ["log", "-1", "--format=%cI", "--", filePath], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (committed) return committed;
  } catch {
    // Untracked files have no git history yet; fall back to filesystem time.
  }

  return statSync(resolve(rootDir, filePath)).mtime.toISOString();
}

export default defineConfig({
  plugins: [
    voidReact(),
    voidMarkdown({
      shiki: {
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      },
    }),
    docsFallback(),
    lastUpdatedPlugin(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        docs: resolve(rootDir, "docs/index.html"),
        ecosystem: resolve(rootDir, "ecosystem/index.html"),
        blog: resolve(rootDir, "blog/index.html"),
        en: resolve(rootDir, "en/index.html"),
        enDocs: resolve(rootDir, "en/docs/index.html"),
        enEcosystem: resolve(rootDir, "en/ecosystem/index.html"),
        enBlog: resolve(rootDir, "en/blog/index.html"),
      },
    },
  },
});
