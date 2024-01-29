---
lang: zh-CN
title: CS107E Lecture 1/26
description: cs107e 1月26日的课程
---

# CS107E Lecture 1/26

## ra 是哪个寄存器来着？

寄存器 x1，用来存储返回地址 return address

## jar 做什么的？

保存下一条指令地址到寄存器，然后跳转程序

## jarl 做了什么？

保存下一条指令地址到寄存器，然后根据寄存器跳转

## 怎么写函数？

1. `jal ra, pause` jal 保存下一条指令地址到ra，然后让指令跳转到延时程序上
    - 加载函数
    - 使用默认的ra，可用 `jal pause` 简化
    - 使用的参数保存到 a0-a7，供函数使用
2. `jalr zero, ra, 0` jalr 不保存下一条指令，跳转回之前保存的指令上
    - 函数返回
    - 不使用默认的ra，可用 `jr rs` 简化
    - 使用默认的ra，可用用 `ret` 简化
    - 返回值保存到 a0

## jal 相关的伪指令

- `j imm20` -> `jal zero, imm20`
- `jal imm20` -> `jal ra, imm20`

## jalr 相关的伪指令

- `jr rs` -> `jalr zero, rs, 0`
- `ret` -> `jalr zero, ra, 0`

## `call` 和 `tail`

- call 用来调用远处的子程序
  ```
  auipc x6, offset[31:12]
  jalr ra, x6, offset[11:0]
  ```
- tail 用来尾调用
  ```
  auipc x6, offset[31:12]
  jalr zero, x6, offset[11:0]
  ```
- 这两个的区别只在于 tail 不保存返回地址，从而用在函数结尾处

## caller 和 callee

- 调用者，被调用者