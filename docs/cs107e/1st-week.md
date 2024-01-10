---
lang: zh-CN
title: CS107E 第一周
description: CS107E 第一周都做了什么
---

# CS107E 第一周
## 装东西
给的指导教程里面，macos arm版的支持度比其他要好一点，主要体现在一开始没有intel版的编译工具（现在有了），wsl版的编译工具编译`sample_build`代码不成功（现在可以了），wsl版没有`riscv64-unknown-elf-gdb`（暂时）。毕竟这个课第一次用riscv教学。

基于个人习惯，用虚拟机装ubuntu搞实验环境
- 虚拟机安装 Ubuntu 22.04 server
- [安装编译环境](https://cs107e.github.io/guides/install/devtools-wsl/)
  - 只看 `Install riscv-unknown-elf toolchain`部分
- [安装xfel](https://xboot.org/xfel/#/)
  - 编译安装xfel到Ubuntu中

## 学东西
第一周是汇编和riscv，官方讲义过于简略了。去B站看[循序渐进，学习开发一个RISC-V上的操作系统 - 汪辰 - 2021春](https://www.bilibili.com/video/BV1Q5411w7z5)

### RISC 的5级流水线
为了看懂[ripes.me](https://ripes.me/)的Stage。来源 https://www.sunnychen.top/archives/rvintropipeline https://en.wikipedia.org/wiki/Classic_RISC_pipeline
- IF = Instruction Fetch
  - 从指令存储器中获取指令
- ID = Instruction Decode
  - 译码并读取寄存器
- EX = Execute
  - 执行指令
- MEM = Memory access
  - 从数据存储器中读取数据
- WB = Register write back
  - 将结果写回寄存器

### 1GB的内存地址是0x40000000
一位16进制代表4位二进制，0x40000000 是1后面跟`4*7+2=30`个0的二进制数，即2<sup>30</sup>个地址。

1个地址代表1byte=1B=8bit的数据。

2<sup>10</sup> 是 0x00000400 是 1KB\
2<sup>20</sup> 是 0x00100000 是 1MB 是 1K个1KB\
2<sup>30</sup> 是 0x40000000 是 1GB 是 1K个1MB

严格来说以上地址都应该**减1**，即1GB的内存地址是0x40000000-1