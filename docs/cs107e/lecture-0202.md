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

## 全局名称

- `.text` 指的是代码本身，即构成程序的机器代码，被视为只读
- `.bss` 用于存储在程序中未初始化的全局内容
- `.data` 用于存储在程序中初始化的全局内容
- `.rodata` 是只读数据，这是在程序中声明为变量或其他内容但声明为只读（const）的全局内容

## c 代码和全局名称

来自 https://github.com/dwelch67/raspberrypi/tree/master/bssdata

```c
unsigned int fun2 ( unsigned int );
const unsigned int x=2; // 只读，存在 .rodata 或 .text 里面
unsigned int y; // 未初始化，存在 .bss 里面，初始化为0
unsigned int z=7; // 已初始化的变量，出现在程序指令的开始部分
void fun ( unsigned int a )
{
    unsigned int n; // 局部变量，存储在栈或寄存器中

    n=5;
    fun2(a);
    fun2(x);
    fun2(y);
    fun2(z);
    fun2(n);
}
```