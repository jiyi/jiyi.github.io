---
lang: zh-CN
title: CS107E Lecture Modules, Linking
description: cs107e 课程，模块和链接
---

# CS107E Lecture Modules, Linking

对应 [lecture 02/02](./lecture-0202)

## 本节没啥好写的

[示例代码](https://github.com/cs107e/cs107e.github.io/tree/master/lectures/Linking/code/larson)有用，可以和之前的家庭作业2里面自己写的代码做对比。

尝试看看 https://github.com/dwelch67/raspberrypi/ 里面 [baremetal](https://github.com/dwelch67/raspberrypi/tree/master/baremetal) 和 [bssdata](https://github.com/dwelch67/raspberrypi/tree/master/bssdata) 两个相关阅读

## Bare metal programming

裸机编程意味着直接与硬件对话，绕过操作系统。

### 文风

全是英文没有图，啰唆但是有趣。

很羡慕这种能说/写很多话的人。

### Arm 处理器的两种启动方式

- 通常是读取地址 `0x00000000` 里面的指令。
- Cortex-M 读取 `0x00000004` 里存储的**值**，运行**值**指向的地址里面的指令。

### 树莓派的启动方式

- 树莓派有一个`GPU`和一个`Arm`处理器
- `GPU` 首先启动，读取SD卡里面的`kernel.img`到内存地址`0x00008000`中。
- 在`0x00000000` 中放置指令用于跳转到 `0x00008000`
- `GPU` 启动 `Arm` 从`0x00000000`

### TODO 有时间再看