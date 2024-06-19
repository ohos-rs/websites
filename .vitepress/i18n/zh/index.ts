import { defineConfig } from "vitepress";
import { BasicSideBar } from "./BasicSideBar";
import { EcosystemSideBar } from "./Ecosystem";
import { BlogSideBar } from "./Blog";

export const zh = defineConfig({
	lang: "zh-Hans",
	description: "基于 Rust 实现的鸿蒙原生模块开发框架（基于 napi-rs 实现）",
	themeConfig: {
		nav: [
			{ text: "主页", link: "/" },
			{ text: "文档", link: "/docs/basic" },
			{ text: "生态", link: "/ecosystem/" },
			{ text: "社区", link: "/community/" },
			{ text: "博客", link: "/blog/" },
			{
				text: "关于",
				items: [
					{ text: "Logo", link: "/about/" },
					{ text: "Issue", link: "https://github.com/ohos-rs/example/issues" },
				],
			},
		],
		sidebar: {
			"/docs": BasicSideBar,
			"/ecosystem": EcosystemSideBar,
			"/blog": BlogSideBar,
			"/about": [],
		},
		editLink: {
			pattern:
				"https://github.com/ohos-rs/ohos-rs.github.io/tree/master/src/:path",
			text: "编辑本页",
		},
		lastUpdated: {
			text: "最新更新于",
		},
	},
});
