import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'
import { blogPlugin } from "vuepress-plugin-blog2";
import { commentPlugin } from "vuepress-plugin-comment2";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  lang: 'zh-CN',
  port: 8888,
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'TodayILearn',
        link: '/til'
      }
    ],
    sidebar: false
  }),
  plugins: [
    blogPlugin({

    }),
    commentPlugin({
      provider: "Giscus",
      repo: "jiyi/jiyi.github.io",
      repoId: "MDEwOlJlcG9zaXRvcnkxMTc4ODA5Nw==",
      category: "Announcements",
      categoryId: "DIC_kwDOALPfQc4CUss3",
    }),
    googleAnalyticsPlugin({
      id: 'G-1BR5540B1H',
    }),
  ],
})