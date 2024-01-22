---
lang: zh-CN
title: CS107E Lecture 1/19
description: cs107e 1月19日的课程
---

# CS107E Lecture 1/19

## `PC` 的区别

- 之前学到的知识是
  - PC寄存器用来存储指向下一条指令的地址
- 在`RISC-V`中
  - > the program counter **pc** holds the address of the current instruction.
  - `pc` 保存的是当前指令
  - 按顺序读取的下一条指令是 `pc + 4`
  - 跳转指令让 `pc + 偏移量`

## 指令

### `addi rd, rs1, imm12`

`imm12` 代表12bit的立即数

### `j offset`

是伪指令，实际指令是 `jal zero, offset`

### `jar rd, label`

- `rd` 存储顺序执行的指令地址，即当前 pc + 4
  - 用来恢复跳转前的指令状态
- `label` 是 imm20
- `imm20`，20bit，2^20^ , 长度为 `1M`
- 偏移地址的计算为 pc + (imm20 << 1)
  - 左移了一位，21bit 可以代表带符号的1M长度
  - 即跳转范围是`±1M`地址
- 损失了1bit地址精度？
  - 没有损失
  - 因为指令地址是4的倍数

### `beq rs1, rs2, label`

- `label` 是 imm12
- 跳转范围是 `±4K` 的地址
- `bge`, `bne` 等指令同上

## GCC

### -O

来自 https://wiki.gentoo.org/wiki/GCC_optimization/zh-cn

- 用来优化编译
- 后面选项指代编译优化级别

#### -Og

- 既满足了编译速度
- 又满足了调试需求
- 还满足了运行时性能

### -ffreestanding

- 用于交叉编译
- 只用有限的平台无关的标准头文件
- 见 https://cs107e.github.io/guides/gcc/

### -g

- 编译时生成调试信息
- 用于调试

### -Wall

- 开启所有警告
- 让编译器输出所有警告信息

### -c

- 编译或汇编源文件，但不进行链接。
- 最终输出是每个源文件一个目标文件。
- 用于 `.c .i .s` 文件

### -march

- 用于指定生成代码的目标体系结构

#### -march=rv64imac

- 支持imac指令集
  - i 整形指令集
  - m 乘除法指令集
  - a 原子指令集
  - c 压缩指令集
- 可以用 `rv64gc` 替代
  - g 指代 imafd
  - f 单精度浮点指令集
  - d 双精度浮点指令集

### -mabi

- Application Binary Interface
- 用于指定目标体系结构的ABI（应用程序二进制接口）
- ABI定义了应用程序和操作系统之间的接口规范，包括函数调用约定、寄存器使用、数据类型大小等

#### -mabi=lp64

- 指针占 64 位
- long 占 64 位
- int 占 32 位
- 见 https://gcc.gnu.org/onlinedocs/gcc-7.5.0/gcc/RISC-V-Options.html

### -nostdlib

- 告诉编译器不要使用标准库
- 用于嵌入式系统或者在编写底层代码

### -emain

- 告诉编译器将main函数作为程序的入口点