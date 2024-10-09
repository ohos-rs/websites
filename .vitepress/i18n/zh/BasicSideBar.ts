import { DefaultTheme } from "vitepress";

export const BasicSideBar: DefaultTheme.SidebarItem[] = [
	{
		text: "简介",
		link: "/docs/basic",
		items: [
			{ text: "快速开始", link: "/docs/basic/quick-start" },
			{ text: "从 0 新建项目", link: "/docs/basic/simple-project" },
		],
	},
	{
		text: "脚手架",
		collapsed: false,
		items: [
			{ text: "init", link: "/docs/cli/init" },
			{ text: "build", link: "/docs/cli/build" },
			{ text: "artifact", link: "/docs/cli/artifact" },
			{ text: "cargo", link: "/docs/cli/cargo" },
			{ text: "doctor", link: "/docs/cli/doctor" },
		],
	},
	{
		text: "用法",
		collapsed: false,
		items: [
			{ text: "基本用法", link: "/docs/usage/basic" },
			{ text: "Task", link: "/docs/usage/task" },
			{ text: "ThreadSafeFunction", link: "/docs/usage/tsfn" },
			{ text: "ArkRuntime", link: "/docs/usage/ark_runtime" },
		],
	},
	{
		text: "CD/CD",
		collapsed: false,
		items: [
			{ text: "CI", link: "/docs/ci/basic.md" },
			{ text: "zig-build", link: "/docs/ci/zig.md" },
		],
	},
	{
		text: "More",
		items: [
			{ text: "Diff", link: "/docs/more/diff" },
			{ text: "Buffer", link: "/docs/more/buffer" },
			{ text: "常见问题", link: "/docs/more/f&q" },
			{ text: "N-API", link: "/docs/more/known-issue" },
			{ text: "EMU-TLS", link: "/docs/more/emu-tls" },
		],
	},
];
