module.exports = {
    title: 'Dolly\'s Blog',
    description: 'Happiness is real when shared.',
    // base: '/vuepress-dolly-blog/',
    head: [
        ['link',{ rel:'icon', href:'/favicon.ico'}]
    ],
    themeConfig: {
        nextLinks: true,
        prevLinks: true,
        smoothScroll: true,
        sidebar: "auto",
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        // logo: '/logo.png',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Projects', link: '/projects'},
            {text: 'Tags', link: '/tags/'},
            {text: 'TimeLine', link: '/timeline/'}
        ],
        footer: {
            contact: [
                {
                    type: 'codepen',
                    link: '/',
                },
                {
                    type: 'codesandbox',
                    link: '/',
                },
                {
                    type: 'facebook',
                    link: '/',
                },
                {
                    type: 'github',
                    link: 'https://github.com/vuepressjs/vuepress-theme-blog',
                },
                {
                    type: 'gitlab',
                    link: '/',
                },
                {
                    type: 'instagram',
                    link: '/',
                },
                {
                    type: 'linkedin',
                    link: '/',
                },
                {
                    type: 'mail',
                    link: '/',
                },
                {
                    type: 'messenger',
                    link: '/',
                },
                {
                    type:'music',
                    link:'/'
                },
                {
                    type: 'phone',
                    link: '/',
                },
                {
                    type: 'twitter',
                    link: 'https://twitter.com/vuepressjs',
                },
                {
                    type:'video',
                    link:'/'
                },
                {
                    type: 'web',
                    link: '/',
                },
                {
                    type: 'youtube',
                    link: '/'
                }
            ],
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                    text: 'MIT Licensed | Copyright © 2020-present Dolly',
                    link: '',
                },
            ],
        }
    },
    plugins: ['@vuepress/nprogress']
}
