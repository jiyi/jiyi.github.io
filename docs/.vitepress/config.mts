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
      { text: '公开课', items: [
        { text: 'CS107E', link: '/cs107e/index', activeMatch: '/cs107e/'},
        { text: 'SICP', link: '/sicp/index', activeMatch: '/sicp/'},
      ]},
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
            { text: 'vuepress 部署', link: 'helloVuePress' },
            { text: 'vue3 里面数组里对象的处理', link: 'reactiveArrayByObjectInVue3' },
            { text: '自用archlinux装机指南', link: 'reinstallArchlinux' },
            { text: 'podman 踩坑', link: 'podman-compose' },
            { text: 'spring boot 管理依赖', link: 'spring-boot-parent' },
            { text: 'Linux下坚果云界面空白', link: 'nutstore-empty'},
            { text: '买台arm电脑', link: 'buy-a-arm-device'},
            { text: 'archlinux 下使用 firewalld', link: 'archlinux-firewalld'},
          ],
        },
      ],
      '/cs107e/': [
        {
          text: 'CS107E',
          base: '/cs107e/',
          items: [
            { text: 'CS107E 换 RISC-V 了', link: 'cs107e-risc-v' },
            { text: 'CS107E 第一周', link: '1st-week' },
            { text: 'lab 1', link: 'lab1' },
            { text: 'Assignment1', link: 'assignment1' },
            { text: 'Lecture 1/19', link: 'lecture-0119' },
            { text: 'Lecture 1/22', link: 'lecture-0122' },
            { text: 'Lab 2', link: 'lab2' },
            { text: 'Lecture 1/26', link: 'lecture-0126' },
            { text: 'Lecture 1/29', link: 'lecture-0129' },
            { text: 'Lab 3 调试测试', link: 'lab3' },
            { text: 'Lecture 2/2 Modules, Libraries, and Linking', link: 'lecture-0202'},
            { text: 'Lecture 2/5 Memory Management', link: 'lecture-0205'},
            { text: '期中复习', link: 'mid-review' },
            { text: 'Lecture C Pointers and Arrays', link: 'lecture_03_C_Pointers'},
            { text: 'Lecture C Functions', link: 'lecture_04_C_Functions'},
            { text: 'Assignment2', link: 'assignment2' },
            { text: 'Lecture Serial', link: 'lecture_05_Serial' },
            { text: 'Lecture Modules and Linking', link: 'lecture_06_Linking' },
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
      ],
      '/sicp/': [
        {
          text: 'SICP',
          base: '/sicp/',
          items: [
            { text: '环境安装', link: 'install' },
            { text: 'section-1.1-1.2.2', link: 'section-1.1-1.2.2' },
            { text: 'section-1.2.3', link: 'section-1.2.3' },
          ],
        },
      ],
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
