---
lang: zh-CN
title: archlinux 下的防火墙
description: 在 archlinux 下使用 firewalld ，配置zerotire
comment: true
---

# archlinux 下使用 firewalld

## 背景

公司在检查电脑安全，查出我的电脑有几个低级别安全漏洞，主要是`ssh`方面的。所以想让公司查不着。

## 网络结构

电脑两个网卡：一个网卡接公司网络，一个网卡接自己的内网

### 公司网络

公司两个网络，通过两个vlan 分开，起到一个网卡使用两个网段的效果

### 自己内网

一个 `openwrt` 虚拟机作为内网路由器，通过nat的方式获取由公司网络互联网，通过桥接的方式连接另一个网卡，给其他设备提供网络

### 其他

有个 zerotire 提供内网穿透

## sshd 设置

开始不想使用防火墙，想直接改 sshd 设置，让 ssh server 只监听某几个网段，使只有在自己内网和zerotire内网中才能ssh进来。

```bash
# /etc/ssh/sshd_config
ListenAddress 192.168.10.2 # 电脑的openwrt内网ip
ListenAddress 10.0.0.10 # zerotire 的ip
```

然后重启 sshd 服务后，`ss -tnlp | grep 22`，就可以看到只有以上两个ip在监听22端口。需求满足。

**但是**

重启之后，发现使用zerotire进不去，需要再次手动重启一次sshd服务，才能使用。

查找发现，重启后，只有`192.168.10.2`这个ip在监听22端口，`10.0.0.10` 并不存在。猜测原因是`sshd`服务启动比`zerotire`服务早，sshd 没有发现这 10.0.0.10 这个ip，所以就没有提供这个ip的监听。因为原来默认是对 `0.0.0.0` 的监听，所以改监听之前不影响zerotire。

注释掉以上两个监听配置，换防火墙的方式

## firewalld

为什么不用`ufw`？因为最近在搞红帽的证，用firewalld加强印象。

### 思路

把有安全检查的网络加到firewalld的work这个zone里面，并禁止ssh；把zerotire的网络添加到trusted 这个zone里面，完全信任zerotire里的所有服务，其他网络使用默认的public这个zone。

```bash
# 把有安全检查的网络(vlan1)添加到work
sudo firewall-cmd --zone=work --add-interface=VLAN1
# 把work中的ssh服务去掉
sudo firewall-cmd --zone=work --remove-service=ssh
# 以上，公司网段vlan1中就屏蔽了ssh

# 把zerotire 网络添加到信任
sudo firewall-cmd --zone=trusted --add-interface=ztppiuwzbp

# 测试没问题后，保存为永久设置
sudo firewall-cmd --runtime-to-permanent
```

## 学习中的问题

### 啥是zone？

用来应用不同规则的区域，主要目的是区分规则的大类。特定的zone有特定的功能。

学习中的主要困惑就是zone的概念，开始以为系统总体在一个zone里面，实际不然。实际是一个网卡绑定一个zone，所有active的zone都在使用。而以上网卡不止是物理上的网卡，也是虚拟网卡或vlan。所以可以把不同概念上的网段应用到不同zone中去，起到分区域管理的目的。

### 啥是public？

firewalld 的默认区域zone，没啥特别的。

### 啥是active？

已经激活的zone。在用zone都是激活的，有添加interface的zone都是激活的。

### default 的用处

默认zone，firewalld 的默认是public，也可以改成别的zone。没有在别的zone里面的网卡或ip，都走这里面的规则。

### 和 docker 结合使用

firewalld 有个 docker zone，暂时不需要特别设置。同样概念在虚拟机上也适用。

## 来源

主要学习了这篇才算入了点门：
https://www.xuliangwei.com/oldxu/1521.html
