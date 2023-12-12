---
lang: zh-CN
title: 第一次使用芒果派 Mangopi MQ-Pro
description: mangopi mq-pro 第一次使用遇到的坑
---

# 第一次使用芒果派 Mangopi MQ-Pro
1. 使用官方推荐的 armbian 镜像。
2. 需要 mini hdmi 接口线，之前用树莓派手上的都是micro hdmi，再买一次。
3. 需要 usbc 转接线。我买了一个 usbc 转 usb3 的一对一转接头，就遇到了板上两个 usbc 只能插一个的窘境。
4. 不要错过第一次加电的引导。我第一次没有加显示器，期望使用 `/boot` 下的 `armbian_first_run.txt` 连接wifi，结果wifi没有连成功，接上显示器后只有终端界面，不得不重做了镜像。
5. 使用 `ports.ubuntu.com` 源。xfce 桌面。默认没有开蓝牙服务。
6. 慢。老老实实学硬件知识，不搞啥linux桌面了。
