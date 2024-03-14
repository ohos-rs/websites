import {DefaultTheme} from "vitepress";

export const BasicSideBar: DefaultTheme.SidebarItem[] = [
    {
        text: 'Basic',
        link: '/docs/basic',
        items: [
            {text: 'Quick Start', link: '/docs/basic/quick-start'},
            {text: 'Simple Project', link: '/docs/basic/simple-project'},
        ]
    },
    {
        text: 'Cli',
        collapsed: false,
        items: [
            {text: 'Init', link: "/docs/cli/init"},
            {text: 'Build', link: "/docs/cli/build"},
        ]
    },
    {
        text: 'Usage',
        collapsed: false,
        items: [
            {text: 'Basic', link: "/docs/usage/basic"},
            {text: 'Task', link: "/docs/usage/task"},
            {text: 'ThreadSafeFunction', link: "/docs/usage/tsfn"}
        ]
    },
    {
        text: 'CD/CD',
        collapsed: false,
        items: [
            {text: 'CI', link: "/docs/ci/basic.md"},
        ]
    },
    {
        text: "More",
        items: [
            {text: 'F & Q', link: '/docs/more/f&q'},
            {text: 'Known issue',link: '/docs/more/known-issue'}
        ]
    }
];