---
lang: zh-CN
title: 坚果云在linux下界面空白
description: 坚果云在linux下界面空白解决方案
---

# 坚果云在linux下界面空白

## 使用环境

- cpu i7-12700f
- gpu nvidia gt 730
- Arch Linux
- xfce
- linx 6.7.2

## 问题

- 坚果云打开主界面显示空白，什么都不显示

## 解决方案

运行环境里面加上
```
WEBKIT_DISABLE_COMPOSITING_MODE=1
```

如在自动启动的命令
```bash
sh -c "(sleep 30 && exec /opt/nutstore/bin/nutstore-pydaemon.py)"
```

更改为

```bash
sh -c "(sleep 30 && WEBKIT_DISABLE_COMPOSITING_MODE=1 exec /opt/nutstore/bin/nutstore-pydaemon.py)"
```

## 原因

n卡的问题

来自: https://github.com/johnfactotum/foliate/issues/1085