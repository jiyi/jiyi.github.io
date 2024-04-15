---
lang: zh-CN
title: CS107E Lecture C Pointers and Arrays
description: cs107e 课程，指针数组
---

# CS107E Lecture 03 C Pointers and Arrays

[对应之前写的](./uart_c)，重新复习一遍

## 内存(memory)

汇编语言通过 lw 和 sw 指令将数据在内存和寄存器之前传递。这两个指令每次读取或写入 32 bits 即 4bytes 的内容，与寄存器大小相当。这两个汇编指令很自由，而C语言通过类型系统规范了内存数据存取的行为。
- `LW rd,imm12(rs)` 从内存地址 `rs + imm12` 中读取 4 bytes 的数据存入寄存器 `rd` 中
- `SW rs,imm12(rd)` 将寄存器 `rs` 的 32 bits 数据写入地址为 `rd + imm12` 的内存中

## C 指针

C 语言强制每个变量都有特定的类型，指针也是。各种类型的操作是否合法，由编译器说了算，

## 代码对比

- `GPIO` 开始地址是 `0x02000000`
- `PB_CF0` 偏移地址是 `0x30`
  - `PB_CF0` 里面相应位设置为 `0001` 代表输出
- `PB_DAT` 偏移地址是 `0x40`

```mipsasm
# File: blink.s

    lui     a0,0x2000       # 寄存器a0保存GPIO地址
    addi    a1,zero,1       # 寄存器a1保存1，用于对应管脚输出
    sw      a1,0x30(a0)     # PB_CF0 的地址里面写入 1，代表 PB0 管脚做输出

loop:
    xori    a1,a1,1         # 异或，用于电平翻转
    sw      a1,0x40(a0)     # 输出a1的值，1是高电平，0是低电平

    lui     a2,0x3f00       # 寄存器a2用来延时计数
delay:                      # 延时标签
    addi    a2,a2,-1        # 计数减1
    bne     a2,zero,delay   # 计数变0之前一直循环一直延时

    j       loop            # 延时结束，改变输出电平
```

```c
// File: c_blink.c
void main(void) {
    unsigned int *PB_CFG0 = (unsigned int *)0x2000030; // 地址用 uint保存，原因下面解释。
    unsigned int *PB_DATA = (unsigned int *)0x2000040;

    *PB_CFG0 = 1;   // PB0 管脚用于输出

    int state = 1; // 用于电平翻转
    while (1) {
        state = state ^ 1;  // 异或
        *PB_DATA = state;   // PB0 输出值state值
        for (int count = 0x3f00000; count != 0; count--)
            ; // 延时
    }
}
```

## 地址的算法

C 指针地址的的加减的值，是根据指针类型来的，比如`int`指针加一，地址加4，而`char`指针加一，地址加1

```c
unsigned int *base, *neighbor;
base = (unsigned int *)0x2000030; // PB_CFG0
neighbor = base + 1; // 0x2000034, PB_CFG1
```

这就解释了为什么 `GPIO` 的地址用 `uint` 类型保存：因为`GPIO`中寄存器是32位的，使用`uint`类型，可以在指针加减中切换到各个寄存器。

## 进入奇怪的牛角尖

承接上文

之前我有一个错误理解：riscv 是用的64位地址，那么地址的数据类型应该是long类型的啊，所以地址应该是`(unsigned long *)0x20000`才对。

现在明白，指针用的类型，指的是地址所保存的数据的类型，而不是指针地址这个数字的类型。我之前想的，是 `(unsigned long)0x2000`。

## volatile

这个地址内的数据只有本程序在修改，那么就不用；反之，数据受其他因素影响，那么就用。

## GPIO 结构 C 语言实现

```c
struct gpio {
  unsigned int cfg[4]; // 0x0, 0x4, 0x8, 0xC
  unsigned int data; // 0x10
  unsigned int drv[4]; // 0x14, 0x18, 0x1C, 0x20
  unsigned int pull[2]; // 0x24, 0x28
};

volatile struct gpio *pb = (struct gpio *)0x2000030;

pb->cfg[0] = ...
```
