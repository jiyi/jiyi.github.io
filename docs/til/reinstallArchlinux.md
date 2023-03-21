---
lang: zh-CN
title: 自用archlinux装机指南
description: 备份用装机指南，自用linux工作电脑，intel cpu，nvidia亮机卡。个人偏好，使用德沃夏克键盘布局，btrfs，xfce，kitty，fish
---

# 台式机安装archlinux
备份用装机指南，自用linux工作电脑，intel cpu，nvidia亮机卡，两个硬盘，一个固态，一个机械。  
个人偏好明显，使用德沃夏克键盘布局，btrfs，xfce，kitty，fish

## ventoy 进入liveCD

### 改变键盘布局

```shell
loadkeys dvorak
```

### 上网

自动获取IP的网络什么都不用管，直接上网

#### 手动ip

```shell
ip link
ip address add 192.168.11.2/26 dev enp3s0
ip route add default via 192.168.11.1 dev enp3s0
vim /etc/resolv.conf
```

```bash
nameserver 114.114.114.114
```

### ssh

```shell
passwd # 设置root密码，相同局域网的其他电脑就可以远程安装了
```

### 时间同步

```shell
timedatectl set-ntp true
```

### 分区

```shell
fdisk -l # 查看分区情况
fdisk /dev/nvme0n1 # 对磁盘进行分区
```

> 800M boot+efi
> 20G swap，因为16G内存，未来如果做休眠用的到
> 剩下的 linux
> 因为使用systemd-boot启动，内核放到btrfs做起来有点麻烦，所以内核还是放在fat32里面

### 格式化

```shell
mkfs.fat -F 32 /dev/nvme0n1p1 # boot 分区
mkswap /dev/nvme0n1p2 # swap 分区
mkfs.btrfs -L mylabel -f /dev/nvme0n1p3 # 使用btrfs
# -f: --force force overwrite
```

### Btrfs

#### 选项一：新建分区

```shell
mkdir /mnt/btrfs
mount /dev/nvme0n1p3 /mnt/btrfs

# 可以简写为 btrfs sub cr 
btrfs subvolume create /mnt/btrfs/@
btrfs subvolume create /mnt/btrfs/@home
btrfs subvolume create /mnt/btrfs/@logs
btrfs subvolume create /mnt/btrfs/@pkgs

# 可以简写为 btrfs sub li
btrfs subvolume list /mnt/btrfs

mkdir /mnt/arch
mount -o noatime,nodiratime,compress=zstd,subvol=@ /dev/nvme0n1p3 /mnt/arch
mkdir -p /mnt/arch/mnt/btrfs-root
mkdir -p /mnt/arch/home
mkdir -p /mnt/arch/var/cache/pacman
mkdir -p /mnt/arch/var/log

mount -o noatime,nodiratime,compress=zstd,subvol=@home /dev/nvme0n1p3 /mnt/arch/home
mount -o noatime,nodiratime,compress=zstd,subvol=@logs /dev/nvme0n1p3 /mnt/arch/var/log
mount -o noatime,nodiratime,compress=zstd,subvol=@pkgs /dev/nvme0n1p3 /mnt/arch/var/cache/pacman
mount -o noatime,nodiratime,compress=zstd,subvol=/ /dev/nvme0n1p3 /mnt/arch/mnt/btrfs-root
```

#### 选项二：原来就是btrfs格式，未格式化

```shell
btrfs subvolume snapshot /mnt/btrfs/@ /mnt/btrfs/@backup_root # 对原root分区做快照
btrfs subvolume delete /mnt/btrfs/@ # 删除原分区
btrfs subvolume create /mnt/btrfs/@ # 新建root分区
```

### 其他分区

```shell
mount /dev/nvme0n1p1 /mnt/arch/boot
swapon /dev/nvme0n1p2
```

### 安装包

```shell
pacstrap /mnt base base-devel linux linux-headers linux-firmware
pacstrap /mnt vim btrfs-progs openssh intel-ucode git fish
```

```shell
# 如果遇到了unknown trust错误，用以下命令
pacman -Sy archlinux-keyring
```

### 生成分区文件

```shell
genfstab -U /mnt/arch >> /mnt/arch/etc/fstab
```

## 进入chroot

```shell
arch-chroot /mnt/arch
```

### 时区

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
```

### 语言

```shell
vim /etc/locale.gen
```

```bash
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
```

```shell
locale-gen
vim /etc/locale.conf
```

```bash
LANG=en_US.UTF-8 # 命令行界面使用英文，因为中文显示不正常
```

### 设置键盘

```shell
vim /etc/vconsole.conf # 设置命令行界面的键盘布局
```

```bash
KEYMAP=dvorak
```

### 主机名

```shell
vim /etc/hostname
```

```bash
arch
```

```shell
vim /etc/hosts
```

```bash
127.0.0.1 localhost
::1 localhost
127.0.1.1 ctarch.localdomain arch
```

### 内核模块

```shell
vim /etc/mkinitcpio.conf
```

> 添加 btrfs 到 MODULES=(...)行和HOOKS=(...)行

```bash
MODULES=(btrfs)
HOOKS=(base udev autodetect modconf block filesystems keyboard fsck btrfs)
```

```shell
mkinitcpio -p linux
```

### systemd-boot

```shell
bootctl install # 默认安装到 /boot 中
ls -l /dev/disk/by-something # 查询硬盘的label uuid 等信息
vim /boot/loa]der/entries/arch.conf # 上面查询到的写入，可以在此目录中放入多个启动文件，都能自动读取到
```

```bash
title Arch Linux
linux /vmlinuz-linux
initrd /intel-ucode.img
initrd /initramfs-linux.img
options root=PARTUUID=thth-ththt-th rw rootflags=subvol=@
```

```shell
vim /boot/loader/loader.conf # 设置启动项
```

```bash
default arch.conf
timeout 2
```

### 准备登录

```shell
passwd # root 密码
useradd -m -s /usr/bin/fish jiyi # 使用fish作为默认shell
passwd jiyi
EDITOR=vim visudo
```

```bash
jiyi ALL=(ALL) NOPASSWD: ALL # sudo 不输入密码
```

### 退出重启

```shell
exit
umount -R /mnt/arch
umount -R /mnt/btrfs
reboot
```

## 进入新系统

普通用户登录，不用root

### 上网

使用systemd-network

```shell
sudo systemctl enable --now systemd-networkd.service
sudo systemctl enable --now systemd-resolved.service
sudo vim /etc/systemd/network/20-wired.network
```

```bash
[Match]
Name=enp3s0

[Network]
Address=192.168.11.2/24
Gateway=192.168.11.1
DNS=192.168.11.1

# 或者用DHCP
# DHCP=ipv4
```

### AUR

```
sudo vim /etc/pacman.conf
```

```bash
[archlinuxcn]  
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch  
```

> 去掉[multilib]一节中两行的注释，来开启 32 位库支持。

```shell
sudo pacman -S archlinuxcn-keyring
sudo pacman -S yay
```

### 桌面用[[xfce4]] + lightdm

```shell
yay -S xorg # all
yay -S xfce4 # all
yay -S xfce4-goodies # all
yay -S gvfs # 用来自动挂盘
yay -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings 
sudo systemctl enable lightdm
yay -S pulseaudio # 声音
sudo vim /etc/lightdm/lightdm-gtk-greeter.conf
```

```bash
[greeter]
indicators = ~host;~spacer;~clock;~spacer;~layout;~language;~session;~a11y;~power
```

### X11 键盘改布局

```shell
sudo localectl --no-convert set-x11-keymap dvorak
```

> 改变了 `/etc/X11/xorg.conf.d/00-keyboard.cong` 文件

### X11 桌面默认中文

```shell
vim .xprofile
```

```bash
export LANG=zh_CN.UTF-8
```

### 应用

```shell
yay -S clash-for-windows-bin
```

> 网络不行，可以从另一台电脑下载包，存储在 .cache/yay/clash-for-windows-bin/文件夹里面。
> 注意安装的时用的包名子和下载的包名字有区别

```shell
yay -S 1password
yay -S firefox firefox-i18n-zh-cn
```

```shell
yay -S zerotier-one
sudo systemctl enable --now zerotier-one
sudo zerotier-cli join e533
sudo zerotier-cli orbit 2 2
```

```shell
yay -S visual-studio-code-bin
```

```shell
yay -S nutstore
yay -S remmina libvncserver freerdp # gnome-keyring 需要吗
yay -S typora
yay -S logseq-desktop-bin # archlinuxcn 更新慢了两周
yay -S google-chrome
yay -S gitahead-git # 依赖装了gnome-keyring
```

### 轨迹球

通过`xev`找到鼠标相应的按钮，通过`xbindkeys`和`xautomation`做功能绑定

```shell
yay -S xbindkeys xautomation
echo "xbindkeys" >> ~/.xprofile
vim ~/.xbindkeysrc
```

```bash
# 功能键代替中健
"xte 'mouseclick 2'"
b:12 + Release

# 功能键复制 
"xte 'keydown Control_L' 'key Insert' 'keyup Control_L'"
b:10 + Release

# 功能键粘贴
"xte 'keydown Shift_L' 'key Insert' 'keyup Shift_L'"
b:11 + Release
```

### 显卡

```shell
yay -S nvidia-470xx-dkms nvidia-settings lib32-nvidia-470xx-utils
sudo vim /etc/mkinitcpio.conf # 删除掉`HOOKS`里面的`kms`
sudo mkinitcpio -p linux
```

### 备用内核

```shell
yay -S linux-lts linux-lts-headers
sudo vim /boot/loader/entries/arch-lts.conf
```

```bash
title Arch Linux LTS
linux /vmlinuz-linux-lts
initrd /intel-ucode.img
initrd /initramfs-linux-lts.img
options root=PARTUUID=f0c651f5-3c90-cf42-91a9-cb51629e713e rw rootflags=subvol=@ nvidia-drm.modeset=1 ibt=off
```

### 输入法

```shell
sudo pacman -S fcitx5-im fcitx5-chinese-addons
vim ~/.xprofile
```

```bash
export INPUT_METHOD=fcitx5
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export GLFW_IM_MODULE=ibus
```

### 虚拟机
先设置桥接，让虚拟机与宿主用同一个网络

```bash
# /etc/systemd/network/br0.netdev
[NetDev]
Name=br0
Kind=bridge
```

```bash
# /etc/systemd/network/10_bind.network 
[Match]
Name=enp3s0

[Network]
Bridge=br0
```

```bash
# /etc/systemd/network/20-wired.network
[Match]
Name=br0

[Network]
Address=192.168.11.13/24
Gateway=192.168.11.1
DNS=114.114.114.114
```

```shell
sudo pacman -S qemu-full libvirt virt-manager virt-viewer
sudo systemctl enable --now libvirtd.service
```

### 编程环境

```shell
yay -S jdk8-openjdk
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm env use --global 16
```

### 有且只有一个kitty，打开并移动到当前工作区

```shell
yay -S wmctrl
wmctrl -lx # l代表列出，x代表class，加起来就是列出所有窗口的class
sh -c "wmctrl -x -R kitty.kitty || kitty" # 添加到全局快捷键里面，我用super+enter
```

# 参考
[https://archlinuxstudio.github.io/ArchLinuxTutorial]  
[https://snowfrs.com/2019/08/10/intall-archlinux-with-btrfs.html]  
[https://xuanwo.io/2018/11/15/record-for-btrfs-conversion/]  
[https://blog.kaaass.net/archives/1748]  
[https://wiki.archlinux.org/]