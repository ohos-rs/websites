import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ohos-rs",
    description: "A framework for building compiled OpenHarmony SDK in Rust via Node-API(Forked from napi-rs)",
    srcDir: "./src",
    markdown: {
        image: {
            lazyLoading: true
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Docs', link: '/basic.md'}
        ],

        sidebar: [
            {
                text: 'Basic',
                items: [
                    {text: 'Quick Start', link: '/basic.md/quick-start'},
                    {text: 'Simple Project', link: '/basic.md/simple-project'},
                ]
            },
            {
                text: 'Cli',
                items: [
                    {text: 'Init', link: "/cli/init"},
                    {text: 'Build', link: "/cli/build"},
                ]
            },
            {
                text: 'Usage',
                items: [
                    {text: 'Basic', link: "/usage/basic.md"},
                    {text: 'Task', link: "/usage/task.md"},
                ]
            },
            {
                text: 'CD/CD',
                items: [
                    {text: 'CI', link: "/ci/basic.md"},
                ]
            },
            {
                text: "More",
                items: [
                    {text: 'F & Q',link: '/more/f&q'}
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
