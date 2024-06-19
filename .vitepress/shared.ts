import { defineConfig } from "vitepress";

export const shared = defineConfig({
  title: "ohos-rs",
  srcDir: "./src",
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [{ icon: "github", link: "https://github.com/ohos-rs" }],
    search: {
      provider: "local",
    },
  },
});
