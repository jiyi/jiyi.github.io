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

# 不使用 sudo 连接 串口
sudo vim /etc/udev/rules.d/70-ttyusb.rules
# 添加
KERNEL=="ttyUSB[0-9]*", MODE="0666"

# 重新插入
minicom -w -c on -b 115200 -D /dev/ttyUSB0
```

## 信号

1. 1 bit 开始位，信号置0，信号变成低电平，开始传输
2. 8 bit 数据
3. 1 bit 结束位，信号置1，信号变成高电平
4. 1 + 8 + 1 是两端约定好的，计算机只需要注意什么时候开始（信号变成低电平并持续1位的时间）

## 串口连接

~~之前测试串口一直没有成功，原来是线没有连好…~~

不是线的问题，换了一个usb转ttl就好了…

