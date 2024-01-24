---
lang: zh-CN
title: CS107E lab2
description: CS107E lab2
---

# CS107E Lab2

## 实验1，查看把`C`编译成汇编的样子

~~没有 `codegen.c` , 搞不了~~

搞到了，诶嘿 https://gcc.godbolt.org/z/7YYczMjes

### %hi(global) 是什么？

- risc-v 汇编语言操作符
  - https://sourceware.org/binutils/docs/as/RISC_002dV_002dModifiers.html
- 获取全局符号的地址的高20位部分。
  - 和 lui 的功能相对应
- 获取 global 这个符号的地址高位部分

### %lo(global) 和 hi 差不多？

- 是的
- 获取全局符号的地址的低12位部分
- 即获相对于 %hi(global) 这个地址的偏移量
- 合在一起 `%lo(global)(a3)` 就是指向 global 的地址

### 为什么要这么写？

- 教材使用的是 32bit 的 RISC-V，地址长度为 32bit
- global 地址下存储的是4个字节的0，即一个 int 类型，大小是一个 word
- 从一个内存地址中读一个 word 使用指令 `LW rd， imm12(rs1)`
- 需要将以上 `im12(rs1)` 和 `global` 对应起来

### 所以就是套路？

- 是的
- 都这么读全局变量

### num = -num；怎么没了

- 在下面
- `neg a5, a5` 即 `sub a5, zero, a5`
- 顺序变了不影响结果
- 只能认为，编译器觉得这样比较好

### num = 5 * num; 怎么变了

- num 逻辑左移 2 位，即 num * 2^2
- 再相加 `num * 4 + num` = `num * 5`
- 结果是一样的
- 只能认为，编译器觉得这样比较好

### 下一条好长

- 一步一步来
- -1 << 4 即 0xffffffff << 4 即 0xfffffff0
- 取反得 0x0000000f 即 15
- num 是 0 ， `num & 15` 等价于 `num + 15`
- `(12*18 - 1)/2` = 107.5，因为int类型，编译器省略的小数点，得 107
- 最后用了乘法指令 mul

### 那个 & 等价 + 过于奇怪了

- 只能认为，编译器就是这么神奇

### 修改成 `int num = 3;` 怎么样

- 编译器直接把值算出来了
- (-15 & 15) * (107 - 15) = (0xfffffff1 & 0x0000000f) * 92 = 92

### partb 里面，if else 在不同优化条件下汇编指令不一样

- `-Og` 更符合直觉
- `-O2` 跳转更少，可以理解为性能更好

### partc里面，-O2 就啥都没了？

- 啊，不理解，往下看吧

### partd 指针，脑袋要爆炸

- 一步一步来
- `int n = global;`
  - a4 存 global 高位地址
  - a5 存 global 值 g1
- `*prt = val`
  - global 地址里值更改为 g2 = 107
  - a2 存 107
- `*(char *)ptr = val`
  - 107 在 char 范围 -128 ~ 127 之间，忽略
- `ptr[10] = val`
  - 因为 prt 是 int * 类型，所以地址偏移量是 10 * 4
  - a3 存 global 完整地址
- `cptr[10] = val`
  - 因为 cptr 是 char * 类型，所以偏移量 10 * 1
  - sb , Store byte
  - cptr 存储的指针指向地址0，所以使用 10(zero)
- `n = *(ptr + n);
  - a5 存 n 的值
  - ptr 偏移 n，需要`地址 + 4 * n`，即 `a3 + a5 << 2`
  - a5 存从内存拿到的 n 的值
- `n = ptr[n]`
  - 和上一句汇编内容相同

### main

- 对 sp 和 ra 的操作是用来调函数用的
- O2 里面把 part a 和 b 直接放到 main 里面了
- O2 用到了 `tail` 尾调用

### 到最后都没看到 partc

- -Og 里面也没有调用 partc
- 被优化掉了
- 这种延时写法不符合规范

### 🤯

- 休息一会儿

## 实验2，makefile

当自己会了，不搞

## 实验3，测试用例

- 头文件里有`assert.h`，但需要串口。暂时不能用
- 没有 `testing` 文件夹搞不了

## 实验4，