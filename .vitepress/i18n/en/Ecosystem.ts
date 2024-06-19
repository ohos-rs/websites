import { DefaultTheme } from "vitepress";

export const EcosystemSideBar: DefaultTheme.SidebarItem[] = [
	{
		text: "@ohos-rs",
		collapsed: false,
		items: [
			{ text: "crc32", link: "/en/ecosystem/package/crc32" },
			{ text: "jieba", link: "/en/ecosystem/package/jieba" },
			{ text: "argon2", link: "/en/ecosystem/package/argon2" },
			{ text: "bcrypt", link: "/en/ecosystem/package/bcrypt" },
			{ text: "jsonwebtoken", link: "/en/ecosystem/package/jsonwebtoken" },
			{ text: "snappy", link: "/en/ecosystem/package/snappy" },
			{ text: "xxhash", link: "/en/ecosystem/package/xxhash" },
			{ text: "image", link: "/en/ecosystem/package/image" },
		],
	},
	{
		text: "Native-binding",
		collapsed: false,
		items: [
			{ text: "hilog", link: "/en/ecosystem/binding/hilog" },
			{ text: "init", link: "/en/ecosystem/binding/init" },
		],
	},
	{
		text: "Polyfill",
		collapsed: false,
		items: [
			{
				text: "AbortController",
				link: "/en/ecosystem/polyfill/abort-controller",
			},
		],
	},
	{
		text: "Third-Party",
		collapsed: false,
		items: [
			{ text: "OpenSSL", link: "/en/ecosystem/third/openssl" },
			{ text: "cURL", link: "/en/ecosystem/third/curl" },
			{ text: "MMKV", link: "/en/ecosystem/third/mmkv" },
			{ text: "avif", link: "/en/ecosystem/third/avif" },
			{ text: "cronet", link: "/en/ecosystem/third/cronet" },
			{ text: "BoringSSL", link: "/en/ecosystem/third/boringssl" },
		],
	},
];
