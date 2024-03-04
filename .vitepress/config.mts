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
            {text: 'Docs', link: '/basic'}
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
                items: [
                    {text: 'Init', link: "/cli/init"},
                    {text: 'Build', link: "/cli/build.md"},
                ]
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/ohos-rs'}
        ]
    }
})
