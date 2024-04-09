---
lang: zh-CN
title: CISP 环境安装
description: CISP 环境安装
---

# CISP 环境安装

## 用什么编辑器？

**Emacs**

## 为什么？

emacs 配 lisp，犹如用手指挖鼻孔那么自然

## 为什么不用xxx？

像是用脚趾挖鼻孔

## 从那里抄的？

[参考][Setting up Emacs for SICP from Scratch]


## 流程

### 安装 mit-scheme

macos里面

```bash
brew install mit-scheme
```

### emacs 添加源

修改 `~/.emacs.d/init.el`

```lisp
(require 'package)
(setq package-archives '(("gnu" . "https://mirrors.ustc.edu.cn/elpa/gnu/")
                         ("melpa" . "https://mirrors.ustc.edu.cn/elpa/melpa/")
                         ("nongnu" . "https://mirrors.ustc.edu.cn/elpa/nongnu/")))
```

### Emacs 安装 Geiser

重新打开 emacs，安装 geiser-mit

```
M-x package-install RET geiser-mit
```

#### 解释
- `M-x` 是快捷键，通常是 alt 键按住再按 x 键，然后同时松开
- `RET` 是回车
- 第一次使用 package-install 时会刷新源
- 安装 `geiser-mit` 时会同时安装 `geiser`

### Emacs 中添加 Geiser 配置

编辑 `~/.emacs.d/init.el`，添加

```list
(setq geiser-mit-binary "/usr/local/bin/scheme")
(setq geiser-active-implementations '(mit))
```

重启 emacs 或使用 `M-x eval-buffer` 让配置生效

### 配置文件

如果Emacs没有其他配置，那么以上操作结束后配置如下
```lisp
(require 'package)
(setq package-archives '(("gnu" . "https://mirrors.ustc.edu.cn/elpa/gnu/")
                         ("melpa" . "https://mirrors.ustc.edu.cn/elpa/melpa/")
                         ("nongnu" . "https://mirrors.ustc.edu.cn/elpa/nongnu/")))
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages '(geiser-mit)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

(setq geiser-mit-binary "/usr/local/bin/scheme")
(setq geiser-active-implementations '(mit))

```

## 使用



## 参考

[Setting up Emacs for SICP from Scratch]: https://medium.com/@joshfeltonm/setting-up-emacs-for-sicp-from-scratch-daa6473885c5 这是占位符
