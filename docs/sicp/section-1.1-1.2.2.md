---
lang: zh-CN
title: SICP 第一章
description: SICP 第一章的笔记
---

# SICP 第一章

## 应用序和正则序

- 应用序，`applicative order`
  - 先求值参数而后应用
  - 解释器里使用的方式
- 正则序，`normal order`
  - 完全展开后归约

## 函数和过程

- 过程，`procedure`
  - 之前书里面定义的程序“函数”都是过程
  - 计算机科学里，人们通常关心的行动性的描述（怎么做）
- 函数，`function`
  - 常规数学函数
  - 数学里，人们通常关心的是说明性的描述（是什么）

## 递归计算过程和递归过程

- 递归计算过程，`a recursive process`
  - 计算过程的进展方式
- 递归过程，`a recursive procedure`
  - 语法上的事实
  - 过程定义中直接或间接地引用了该过程本身

## 尾递归

- tail-recursive
  - It will execute an iterative process in constant space, even if the iterative process is described by a recursive procedure.
  - 它将在常量空间中执行迭代过程，即使这个迭代过程是用递归过程描述的。

## 练习 1.9

```scheme
(define (+ a b)
  (if (= a 0)
    b
    (inc (+ (dec a) b))))
```
```scheme
(+ 3 4)
(inc (+ 2 4))
(inc (inc ( + 1 4)))
(inc (inc (inc (+ 0 4))))
(inc (inc (inc 4)))
(inc (inc 5))
(inc 6)
7
```
```scheme
(defin (+ a b)
  (if (= a 0)
    b
    (+ (dec a) (inc b))))
```
```scheme
(+ 3 4)
(+ 2 5)
(+ 1 6)
(+ 0 7)
7
```

## 换零钱

总数为a的现金，换成n种硬币的计算方式
- 将现金数`a`换成除了第一种硬币外的，即换成`n-1`种硬币的方式数，加上
- 将现金数`a-d`换成所有n种硬币的方式数的总数
  - d 代表第一种硬币的值
- 即`没有使用第一种硬币`的方式数加上`必须使用第一种硬币`的方式数
  - 将问题递归地归约为`更少硬币种类`和`更少现金数`的问题

```scheme
(define (count-change amount)
  (cc amount 5))
; 5种美元，1分，5分，10分，25分，50分

(define (cc amount kinds-of-coins)
  (cond ((= amount 0) 1)
        ((< amount 0) 0)
        ((= kinds-of-coins 0) 0)
        (else (+ (cc
                  amount
                  (- kinds-of-coins 1))
                (cc
                  (- amount (first-denomination kinds-of-coins))
                  kinds-of-coins)))))

(define (first-denomination kinds-of-coins)
  (cond ((= kinds-of-coins 1) 1)
        ((= kinds-of-coins 2) 5)
        ((= kinds-of-coins 3) 10)
        ((= kinds-of-coins 4) 25)
        ((= kinds-of-coins 5) 50)))
```

- 算1美元`(count-change 100)`答案292，挺快
- 算10美元`(count-change 1000)`答案801451，就很慢

