import { DefaultTheme } from "vitepress";

export const EcosystemSideBar: DefaultTheme.SidebarItem[] = [
	{
		text: "@ohos-rs",
		collapsed: false,
		items: [
			{ text: "crc32", link: "/ecosystem/package/crc32" },
			{ text: "jieba", link: "/ecosystem/package/jieba" },
			{ text: "argon2", link: "/ecosystem/package/argon2" },
			{ text: "bcrypt", link: "/ecosystem/package/bcrypt" },
			{ text: "jsonwebtoken", link: "/ecosystem/package/jsonwebtoken" },
			{ text: "snappy", link: "/ecosystem/package/snappy" },
			{ text: "xxhash", link: "/ecosystem/package/xxhash" },
			{ text: "image", link: "/ecosystem/package/image" },
		],
	},
	{
		text: "Native-binding",
		collapsed: false,
		items: [
			{ text: "hilog", link: "/ecosystem/binding/hilog" },
			{ text: "init", link: "/ecosystem/binding/init" },
		],
	},
	{
		text: "Third-Party",
		collapsed: false,
		items: [
			{ text: "OpenSSL", link: "/ecosystem/third/openssl" },
			{ text: "cURL", link: "/ecosystem/third/curl" },
			{ text: "MMKV", link: "/ecosystem/third/mmkv" },
			{ text: "avif", link: "/ecosystem/third/avif" },
			{ text: "cronet", link: "/ecosystem/third/cronet" },
		],
	},
];
