---
lang: zh-CN
title: CS107E Lecture 2/2
description: cs107e 2月2日的课程，Modules, Libraries, and Linking
---

# CS107E Lecture 2/2 Modules, Libraries, and Linking

## static 和 extern 的区别

- `static` 对外不可见，只在模块内使用，无须链接
- `extern` 暴露给其他模块使用，由链接器操作

## riscv64-unknown-elf-nm 是什么？

- nm 命令显示关于指定 File 中符号的信息
- `-n` 按符号对应地址的顺序排序