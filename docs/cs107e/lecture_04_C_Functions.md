---
lang: zh-CN
title: CS107E Lecture C Functions
description: cs107e 课程，C 函数
---

# CS107E Lecture C Functions

对应 [前面的 Lecture 1/26](./lecture-0126)

## Jump 指令对比

- `jal rd, imm20`: 记录返回地址，根据立即数(标签)跳转
- `jalr rd, imm12(rs)`: 记录返回地址，根据寄存器地址跳转
- `j imm20`: 伪指令 `jal zero, imm20` 根据标签跳转，不记录返回地址
- `jr rs`: 伪指令 `jalr zero, 0(rs)` 根据寄存器地址跳转，不记录返回值

jump 指令实际操作的是 `pc` 寄存器，即下一条指令从哪个地址里取。

## `pc` 是个多少位的寄存器？

和通用寄存器一样，是`xlen`长度，即在32位架构中为32位，在64位架构中为64位。

## `call fn`

当 fn 在 imm12 大小内，指令可翻译为

```
jalr ra, (fn)ra
```

当 fn 超过 imm12，指令是

```
auipc ra, fn[31:12]
jalr ra, (fn[11:0])ra
```

## ABI

- Application binary interface
- 用于描述计算机科学中不同程序模块之间如何通过二进制形式进行交互的一套规则

## 寄存器所有权

- a0-a7 用于函数参数和返回值
- t0-t6 临时数
- 以上由被调用者，也就是被调用的函数内使用和修改
- s0-s11 调用者拥有的寄存器，栈相关

## 栈

- 初始化时给寄存器`sp`(r2)一个地址，代表栈所在的最高地址
- 使用栈时，先将`sp`地址下降相应几位，然后把对应寄存器的值存入下降的那几个地址中
- 将入栈前的地址存入`s0`
- 出栈时，先把栈上对应的值取出来放入对应寄存器，然后`sp`值上升，即栈回到入栈前状态
