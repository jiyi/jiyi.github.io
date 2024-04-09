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

## 配置从那里抄的？

[参考][Setting up Emacs for SICP from Scratch]

## 安装流程

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

## 使用，只需要两个快捷键

### 打开REPL

emacs 打开一个scheme源文件，例如 `hello.scm`

```lisp
"Hello World"
```

使用 `M-x run-geiser` 或快捷键 `C-c C-z` 打开 REPL

现在光标在`REPL`里面，可以再按一次 `C-c C-z` 让光标返回之前的编辑文件中，`C-c C-z` 让光标在scheme源文件和REPL中来回切换。

### 运行源文件

光标移动到"Hello World"处，输入快捷键 `C-c C-c`，就会看到Emacs最下面显示输出的内容。这条指令只会运行光标附近的源代码。

在"Hello World"下面一行写一个函数

```lisp
(define (fib n)
  (if (< n 2) 1
      (+ (fib (- n 1)) (fib (- n 2)))))
```

输入 `C-c C-c`, 就会看到Emacs最下面输出定义的函数名 `fib`，再输入 `C-c C-z`，切换到 `REPL`，运行这个函数 `(fib 10)`，就会看到结果`89`

### 其他

知道以上两个快捷键就足够手不离键盘开始愉快的学习了，其他快捷键参考[Geiser网站][geiser]，比如
- `REPL` 下使用 `C-c C-q` 退出 `REPL`
- scheme 源文件下 `C-c C-r` 运行所选内容
- scheme 源文件下 `C-c C-b` 运行所打开的源文件

### 解释

- `C-c C-z`，按住`Ctrl`不放，按下`c`，松开`c`，按下`z`，松开`Ctrl` 和 `z`
- `REPL`，“Read–eval–print loop”，“交互式开发环境”，“命令行模式”


[Setting up Emacs for SICP from Scratch]: https://medium.com/@joshfeltonm/setting-up-emacs-for-sicp-from-scratch-daa6473885c5

[Geiser]: https://github.com/emacsmirror/geiser