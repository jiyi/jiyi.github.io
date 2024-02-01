---
lang: zh-CN
title: CS107E lab3
description: CS107E lab3 Debugging and Testing，调测
---

# CS107E lab3 调试和测试

## 没有`riscv-unknown-elf-gdb`

用 `gdb-multiarch`

```bash
gdb-multiarch
(gdb) set architecture riscv:rv64
The target architecture is set to "riscv:rv64".
```

来自 https://unix.stackexchange.com/questions/748867/riscv64-unknown-elf-gdb-not-found-after-installing-gcc-riscv64-linux-gnu-debian


