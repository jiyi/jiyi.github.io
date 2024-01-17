// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData, useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
import './style.css'

// 添加插件
import googleAnalytics from 'vitepress-plugin-google-analytics'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    googleAnalytics({
      id: 'G-1BR5540B1H', // Replace with your GoogleAnalytics ID, which should start with the 'G-'
    })
  },

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();

    // Obtain configuration from: https://giscus.app/
    giscusTalk({
        repo: 'jiyi/jiyi.github.io',
        repoId: 'MDEwOlJlcG9zaXRvcnkxMTc4ODA5Nw==',
        category: 'General', // default: `General`
        categoryId: 'DIC_kwDOALPfQc4CUss4',
        mapping: 'pathname', // default: `pathname`
        inputPosition: 'top', // default: `top`
        lang: 'zh-CN', // default: `zh-CN`
        lightTheme: 'light', // default: `light`
        darkTheme: 'transparent_dark', // default: `transparent_dark`
      }, { frontmatter, route },
        // Whether to activate the comment area on all pages.
        // The default is true, which means enabled, this parameter can be ignored;
        // If it is false, it means it is not enabled.
        // You can use `comment: true` preface to enable it separately on the page.
        true
      );
  }
} satisfies Theme
