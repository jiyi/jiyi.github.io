# Hello VuePress
将vuepress部署在github上，项目初始化之后直接看文档的部署部分。
1. 没有修改base，因为直接发布到jiyi.github.io
2. 使用github actions，按照 https://v2.vuepress.vuejs.org/zh/guide/deployment.html#github-pages 文档创建了文件，使用了配置样例。其中修改了branches，把main修改成了master。node我本地用了16，所以也修改成了16。其中有疑惑的部分是`GITHUB_TOKEN`要不要改，网上搜到的教程用的都是`ACCESS_TOKEN`。没有改，部署成功。
3. 部署上之后原来的域名不能用了，需要新增一条`fqdn: jiyi.dev`放到部署文件里面。最终文件如下

```yaml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [master]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # 选择要使用的 pnpm 版本
          version: 7
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: 16
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site
        run: pnpm docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
          # CNAME
          fqdn: jiyi.dev
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```