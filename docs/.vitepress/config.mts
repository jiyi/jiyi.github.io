import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: "Jiyi's Blog",
  description: "A VitePress Site",

  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'TodayILearn', link: '/til/index', activeMatch: '/til/' },
      { text: 'CS107E', link: '/cs107e/index', activeMatch: '/cs107e/'},
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiyi/jiyi.github.io' }
    ],

    sidebar: {
      '/til/': [
        {
          text: 'Today I Learn',
          base: '/til/',
          items: [
            { text: 'Index', link: 'index' },
            { text: 'vuepress 部署', link: 'helloVuePress' },
            { text: 'vue3 里面数组里对象的处理', link: 'reactiveArrayByObjectInVue3' },
            { text: '自用archlinux装机指', link: 'reinstallArchlinux' },
            { text: 'podman 踩坑', link: 'podman-compose' },
            { text: 'spring boot 管理依赖', link: 'spring-boot-parent' },
            { text: 'Linux下坚果云界面空白', link: 'nutstore-empty'}
          ],
        },
      ],
      '/cs107e/': [
        {
          text: 'CS107E',
          base: '/cs107e/',
          items: [
            { text: 'Index', link: 'index' },
            { text: 'CS107E 换 RISC-V 了', link: 'cs107e-risc-v' },
            { text: 'CS107E 第一周', link: '1st-week' },
            { text: 'lab 1', link: 'lab1' },
            { text: 'Assignment1', link: 'assignment1' },
            { text: 'Lecture 1/19', link: 'lecture-0119' },
            { text: 'Lecture 1/22', link: 'lecture-0122' },
            { text: 'Lab 2', link: 'lab2' },
            { text: 'Assignment2', link: 'assignment2' },
            { text: 'Lecture 1/26', link: 'lecture-0126' },
          ],
        },
        {
          text: '番外',
          base: '/cs107e/',
          items: [
            { text: '第一次使用芒果派 Mangopi MQ-Pro', link: 'mangopi' },
            { text: '_Static_assert 在代码里是做什么用的', link: 'static-assert'},
            { text: 'uart.c 的代码', link: 'uart_c' },
          ]
        },
      ]
    },

    editLink: {
      pattern: 'https://github.com/jiyi/jiyi.github.io/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '这个页面有'
    },

    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'short',
        // timeStyle: 'short',
      },
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

  },

  sitemap: {
    hostname: 'https://jiyi.dev',
  },

})
