import { DefaultTheme } from "vitepress";

export const BasicSideBar: DefaultTheme.SidebarItem[] = [
  {
    text: "Basic",
    link: "/en/docs/basic",
    items: [
      { text: "Quick Start", link: "/en/docs/basic/quick-start" },
      { text: "Simple Project", link: "/en/docs/basic/simple-project" },
    ],
  },
  {
    text: "Cli",
    collapsed: false,
    items: [
      { text: "Init", link: "/en/docs/cli/init" },
      { text: "Build", link: "/en/docs/cli/build" },
      { text: "Artifact", link: "/en/docs/cli/artifact" },
    ],
  },
  {
    text: "Usage",
    collapsed: false,
    items: [
      { text: "Basic", link: "/en/docs/usage/basic" },
      { text: "Task", link: "/en/docs/usage/task" },
      { text: "ThreadSafeFunction", link: "/en/docs/usage/tsfn" },
    ],
  },
  {
    text: "CD/CD",
    collapsed: false,
    items: [
      { text: "CI", link: "/en/docs/ci/basic.md" },
      { text: "zig-build", link: "/en/docs/ci/zig.md" },
    ],
  },
  {
    text: "More",
    items: [
      { text: "Buffer", link: "/en/docs/more/buffer" },
      { text: "F & Q", link: "/en/docs/more/f&q" },
      { text: "Known issue", link: "/en/docs/more/known-issue" },
      { text: "EMU-TLS", link: "/en/docs/more/emu-tls" },
    ],
  },
];
