import {defineConfig} from 'vitepress'

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
            {text: 'Docs', link: '/basic'},
            {text: 'About', link: '/about'}
        ],

        sidebar: [
            {
                text: 'Basic',
                items: [
                    {text: 'Quick Start', link: '/basic/quick-start'},
                    {text: 'Simple Project', link: '/basic/simple-project'},
                ]
            },
            {
                text: 'Cli',
                collapsed: false,
                items: [
                    {text: 'Init', link: "/cli/init"},
                    {text: 'Build', link: "/cli/build"},
                ]
            },
            {
                text: 'Usage',
                collapsed: false,
                items: [
                    {text: 'Basic', link: "/usage/basic"},
                    {text: 'Task', link: "/usage/task"},
                    {text: 'ThreadSafeFunction', link: "/usage/tsfn"}
                ]
            },
            {
                text: 'Ecosystem',
                collapsed: false,
                items: [
                    {text: '@ohos-rs/crc32', link: "/ecosystem/crc32"}
                ]
            },
            {
                text: 'CD/CD',
                collapsed: false,
                items: [
                    {text: 'CI', link: "/ci/basic.md"},
                ]
            },
            {
                text: "More",
                items: [
                    {text: 'F & Q', link: '/more/f&q'}
                ]
            }
        ],
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
