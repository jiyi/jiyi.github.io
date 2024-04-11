---
lang: zh-CN
title: SICP section 1.2.3
description: SICP section 1.2.3 的笔记
---

# SICP section 1.2.3 增长的阶

引入了 `Big Theta (Θ)`

## 练习 1.14

![image-20240411141201700](../assets/image-20240411141201700.png)

从树形结构上看，和斐波那契方法是一样的，那么结论应该是空间增长是 Θ(n)，步数增长是Θ(2<sup>n</sup>)?


## 练习 1.15

```scheme
; 数的立方
(define (cube x)
  (* x x x))

(define (p x)
  (- (* 3 x) (* 4 (cube x))))

(define (sine angle)
  (if (<= (abs angle) 0.1)
      angle ; 角度不大于0.1，sin(angle) ≈ angle
      (p (sine (/ angle 3.0))))) ; 角度大于0.1，使用 angle/3 的公式计算
```
```scheme
(sine 12.15)
(p (sine 4.05))
(p (p (sine 1.35)))
(p (p (p (sine 0.45))))
(p (p (p (p (sine 0.15)))))
(p (p (p (p (p (sine 0.05))))))
```
调用了5次

抄答案 空间和步数的增长阶是 Θ(log a)

## TODO 这一节我没有理解