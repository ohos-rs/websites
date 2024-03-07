import {defineConfig} from 'vitepress'
import {BasicSideBar} from "./BasicSideBar.mjs";

export default defineConfig({
    title: "ohos-rs",
    description: "A framework for building compiled OpenHarmony SDK in Rust via Node-API(Forked from napi-rs)",
    srcDir: "./src",
    markdown: {
        image: {
            lazyLoading: true
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    themeConfig: {
        logo: "/logo.svg",
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Docs', link: '/docs/basic'},
            {
                text: 'About', items: [
                    {text: 'Logo', link: '/about/'},
                    {text: 'Issue', link: 'https://github.com/ohos-rs/example/issues'}
                ]
            }
        ],
        sidebar: {
            "/docs": BasicSideBar,
            "/about": []
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ohos-rs'}
        ],
        editLink: {
            pattern: 'https://github.com/ohos-rs/ohos-rs.github.io/tree/master/src/:path',
            text: 'Edit this page on GitHub'
        },
        lastUpdated: {
            text: "Last updated"
        }
    },

})
