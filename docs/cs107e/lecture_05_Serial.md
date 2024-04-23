---
lang: zh-CN
title: CS107E Lecture Serial communication
description: cs107e 课程，串行通信
---

# CS107E Lecture Serial communication

对应 [lecture-0129](./lecture-0129)

## String 函数

- `strcat(dst, src)` 将 `src` 连接到 `dsc`
- `strlcat(dst, src, n)` 将 `src` 的最多n个字符连接到`dst`
- `strcpy(dst, src)` 将 `src` 复制到 `dst`
- `strncpy(dst, src, n)` 将 `src` 的前n个字符复制到 `dst`
- `strlen(s)` 返回字符串`s`的长度，不包括`\0`
- `stcmp(s1, s2)` 比较`s1`和`s2`的字典顺序
  - s1 < s2，返回负值
  - s1 == s2，返回 0
  - s1 > s2, 返回正值
- `strncmp(s1, s2, n)` 只比较前n个字符