---
lang: zh-CN
title: CS107E Lecture 1/29
description: cs107e 1月29日的课程
---

# CS107E Lecture 1/26，串口通信

## 命令

```bash
# 安装串口模块
sudo apt install python3-serial

# 查看串口
python3 -m serial.tools.list_ports

# minicom 启动
sudo minicom -w -c on -b 115200 -D /dev/ttyUSB0

# minicom 退出
# Ctrl + A 后 X

```