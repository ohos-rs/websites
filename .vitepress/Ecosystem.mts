import {DefaultTheme} from "vitepress";

export const EcosystemSideBar: DefaultTheme.SidebarItem[] = [
    {
        text: '@ohos-rs',
        collapsed: false,
        items: [
            {text: '@ohos-rs/crc32', link: '/ecosystem/package/crc32'},
            {text: '@ohos-rs/jieba', link: '/ecosystem/package/jieba'},
        ]
    },
    {
        text: 'Native-binding',
        collapsed: false,
        items: [
            {text: 'hilog', link: "/ecosystem/binding/hilog"},
            {text: 'init', link: "/ecosystem/binding/init"},
        ]
    },
];