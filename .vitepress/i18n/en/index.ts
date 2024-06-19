import { defineConfig } from "vitepress";
import { BasicSideBar } from "./BasicSideBar";
import { EcosystemSideBar } from "./Ecosystem";
import { BlogSideBar } from "./Blog";

export const en = defineConfig({
	lang: "en-US",
	description:
		"A framework for building compiled OpenHarmony SDK in Rust via Node-API(Forked from napi-rs)",
	themeConfig: {
		nav: [
			{ text: "Home", link: "/en" },
			{ text: "Docs", link: "/en/docs/basic" },
			{ text: "Ecosystem", link: "/en/ecosystem/" },
			{ text: "Community", link: "/en/community/" },
			{ text: "Blog", link: "/en/blog/" },
			{
				text: "About",
				items: [
					{ text: "Logo", link: "/en/about/" },
					{ text: "Issue", link: "https://github.com/ohos-rs/example/issues" },
				],
			},
		],
		sidebar: {
			"/en/docs": BasicSideBar,
			"/en/ecosystem": EcosystemSideBar,
			"/en/blog": BlogSideBar,
			"/en/about": [],
		},
		editLink: {
			pattern:
				"https://github.com/ohos-rs/ohos-rs.github.io/tree/master/src/:path",
			text: "Edit this page on GitHub",
		},
		lastUpdated: {
			text: "Last updated",
		},
	},
});
