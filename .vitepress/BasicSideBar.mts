export const BasicSideBar = [
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
];