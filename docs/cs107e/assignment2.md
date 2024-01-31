---
lang: zh-CN
title: CS107E Assignment 2
description: cs107e 里的家庭作业2
---

# cs107e 里的家庭作业2

## 从哪里开始呢…

先看一遍 https://cs107e.github.io/assignments/assign2/

## 我需要做什么？

先实现 `gpio.c`, `timer.c`, `timer_asm.s` 这些通用模块，然后实现 `clock.c` 这个作业程序。

## 抄准备文件

文件来自 `$CS107E`

### memmap 直接抄 lib/memmap.ld

```memmap
STACK_SIZE = 0x100000; /* 1 MB */

SECTIONS
{
    .text  0x40000000     :  { *(.text.start) *(.text*) }
    .rodata               :  { *(.rodata*) *(.srodata*) }
    __text_end            = .;
    .data  ALIGN(0x20000) :  { *(.sdata*) }
    __bss_start           = .;
    .bss                  :  { *(.bss*)  *(.sbss*) *(COMMON) }
    __bss_end             = .;
    .heap  0x44000000     :  { __heap_start = .; }
    .stack 0x50000000 - STACK_SIZE : {
        __heap_max = .;
        . = . + STACK_SIZE;
        __stack_top = .;
    }
}

/* Force link of _start and verify correct position */
ENTRY(_start_gdb)
ASSERT(_start == ADDR(.text), "_start symbol must be placed first in text section")
```

### start.s 抄 src/start.s

删除 mango.h 相关的内容

```s
.attribute arch, "rv64im_zicsr"

# Identify this section as the one to go first in binary image
.section ".text.start"

.globl _start
_start:
.cfi_startproc
.cfi_undefined ra           # tell gdb this is start routine

    csrc    mstatus, 1<<3   # global disable interrupts, mstatus.mie = 0
.globl _start_gdb
_start_gdb:                 # entry for gdb will skip csr as not avail in sim
    addi    fp,zero,0       # init fp
    la      sp,__stack_top  # init sp (stack grows down)
    jal     _cstart

hang: j hang
    ret
.cfi_endproc

.align 8
_trap_handler:
    j _trap_handler        # if exception raised, hang
```

### cstart.c 抄 src/cstart.c

删除 string.h 和 mango.h 相关的内容

```c
extern void main(void);
void _cstart(void);

// The C function _cstart is called from the assembly in start.s
// _cstart zeroes out the BSS section and then calls the main function
void _cstart(void) {
    extern char __bss_start, __bss_end;
    main();
}
```

### Makefile

```makefile
NAME = clock

ARCH = -march=rv64im -mabi=lp64
ASFLAGS = $(ARCH)
CFLAGS = $(ARCH) -g -Og -I$$CS107E/include -Wall -ffreestanding
LDFLAGS = -nostdlib -T memmap

all : $(NAME).bin

%.bin: %.elf
	riscv64-unknown-elf-objcopy $< -O binary $@

%.elf: %.o start.o cstart.o gpio.o timer.o timer_asm.o
	riscv64-unknown-elf-gcc $(LDFLAGS) $^ -o $@

%.o: %.c
	riscv64-unknown-elf-gcc $(CFLAGS) -c $< -o $@

%.o: %.s
	riscv64-unknown-elf-as $(ASFLAGS) $< -o $@

clean:
	rm -f *.o *.bin *.elf *.list *~

run: $(NAME).bin
	mango-run $<

.PHONY: all clean run
.PRECIOUS: %.elf %.o
```

## gpio.c 的实现

1. `gpio_set_function`
2. `gpio_get_function`
3. 测试
4. `gpio_write`
5. `gpio_read`
6. 测试

## timer_asm.s 和 timer.c 的实现

1. `timer_get_ticks`
2. 测试

## 表

- PG12 连接第二个按钮
