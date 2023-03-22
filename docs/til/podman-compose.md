---
lang: zh-CN
title: podman 踩坑
description: 使用podman踩了几个坑，主要花时间的是找podman解析container名称的问题
---

# podman 踩坑

新装了archlinux，寻思着自己也不用啥docker很复杂的功能，试试podman吧，没想到还是踩了几个坑

```shell
sudo pacman -S podman
```

## 使用Dockerfile

```shell
podman build --tag tagName .
```

就下不到包了，需要在`/etc/containers/registries.conf`里面新增一条

```bash
unqualified-search-registries = ["docker.io"]
```

用来指定从docker库里下。刚用的时候还加了换成163的源的设置，没想到有几个包下载不下来，把换源给去掉就能正常下载了。速度能接受，就不细追究是不是设置的问题了。

## 使用 docker-compose.yml

```shell
sudo pacman -S podman-compose
podman-compose up
```

项目启动起来了，但是又没完全启动起来，nginx说解析不了container名称。
这有点劝退，docker-compse的容器名解析还是很方便的，不能用还得用回docker。

找了一圈，archlinux wiki 上也没看出所以然。看到在[github上的解释](https://github.com/containers/podman-compose/issues/531#issuecomment-1199824070)，抱着试试看的心情安装了

```shell
sudo pacman -S aardvark
```

就可以解析了。查了一下archlinx包，podman-compose 和 podman-dnsname 都没有相关的依赖建议，我还认为是自己安装过得太快没细看，就…既然能用就不细究了

## 题外话

使用了podman才发现的奇怪的点：`busybox`测试网络，ping需要root权限。