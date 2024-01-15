---
lang: zh-CN
title: uart.c 的代码
description: 看一遍uart.c的代码
---
# 接着[_Static_assert](./static-assert.md)看一遍uart.c的代码（未完成）

## module
```c
typedef struct {
    int index;
    gpio_id_t tx, rx;
    unsigned int fn;
} uart_config_t;

static struct {
    volatile uart_t *uart_base, *uart;
    uart_config_t config;
} module = { .uart_base = UART_BASE,
             .uart = NULL, // will be set in uart_init
};
```
- 定义了一个全局变量 `module`
- `volatile` 告诉程序在用这个变量的时候总是从对应地址中读取，而不使用缓存。常用在驱动代码中。

## uart_reinit_custom

```c
void uart_reinit_custom(int uart_id, gpio_id_t tx, gpio_id_t rx, unsigned int gpio_fn) {

    ...

    // 设置使用哪个UART，指定GPIO端口，
    module.config.index = uart_id;
    module.config.tx = tx;
    module.config.rx = rx;
    module.config.fn = gpio_fn; // ？？
    module.uart = module.uart_base + module.config.index;

    // clock up peripheral
    // gating bits [0:5], reset bits [16:21]
    // `CCU_UART_BGR_REG` 地址 `0x090C`
    // `0x90C` 寄存器 0-5位代表控制 UART0-5 的时钟控制，置1为打开时钟
    // `0x90C` 寄存器 16-21 位代表控制 UART0-5 的复位，置1为解除reset状态
    uint32_t bit = 1 << module.config.index;
    uint32_t reset = bit << 16;
    ccu_enable_bus_clk(CCU_UART_BGR_REG, bit, reset);

    // configure GPIOs
    // 使能两个GPIO口，TODO 不理解为什么要pullup，为什么要用 GPIO_FN_ALT6
    gpio_set_function(module.config.tx, module.config.fn);
    gpio_set_pullup(module.config.tx);
    gpio_set_function(module.config.rx, module.config.fn);
    gpio_set_pullup(module.config.rx);

    // configure baud rate
    uint32_t baud = 115200;
    module.uart->regs.fcr = 1;      // enable TX/RX fifo，UART FIFO Control Register
    module.uart->regs.halt = 1;     // temporarily disable TX transfer，UART Halt TX Register

    uint32_t sys_clock_rate = 24 * 1000000;
    uint32_t udiv = sys_clock_rate / (16 * baud);
    module.uart->regs.lcr |= LCR_DLAB;  // set DLAB = 1 to access DLL/DLH, UART Line Control Register
    module.uart->regs.dll = udiv & 0xff;        // low byte of divisor -> DLL, UART Divisor Latch Low Register
    module.uart->regs.dlh = (udiv >> 8) & 0xff; // hi byte of divisor -> DLH, UART Divisor Latch High Register
    module.uart->regs.lcr &= ~LCR_DLAB; // set DLAB = 0 to access RBR/THR
    module.uart->regs.halt = 0;     // re-enable TX transfer

    // configure data-parity-stop (low 4 bits of LCR)
    uint8_t data = 0b11;    // 8 data
    uint8_t parity = 0b0;   // no parity
    uint8_t stop = 0b0;     // 1 stop
    uint8_t settings = (parity << 3) | (stop << 2) | (data << 0);
    while (module.uart->regs.usr & USR_BUSY) ; // wait until uart not busy
    // clear low 4 bits, replace with settings 8-n-1
    module.uart->regs.lcr = (module.uart->regs.lcr & ~0b1111) | settings;

    module.uart->regs.mcr = 0;    // disable modem control
    module.uart->regs.ier = 0;    // disable interrupts by default
}
```

## confirm_uart_initalized

```c
static void confirm_uart_initialized(const char *fn_name) { // 函数的参数是`函数名`
    if (module.uart != NULL && fn_name == NULL) {
        // 如果全局变量`module.uart`不为空，且参数函数名为空，则抛出错误
        error("uart_init() must be called only once");
    } else if (module.uart == NULL && fn_name != NULL) {
        // 如果全局变量`module.uart`为空，且参数函数不为空，代表还没有调用`uart_init`
        // if uart_init has not been called, there is no serial connection to read/write
        // All calls to uart operations are dead ends (that means no printf/assert!)
        // Force a call to uart_init here to enable reporting of problem
        // (otherwise lack of output is ultra mysterious)
        uart_reinit_custom(0, GPIO_PB8, GPIO_PB9, GPIO_FN_ALT6);
        error("uart_init() must be called before using %s()", fn_name);
    }
}
```
## uart_reinit_custom

```c
void uart_reinit_custom(int uart_id, gpio_id_t tx, gpio_id_t rx, unsigned int gpio_fn) {
    if (module.uart) {  // shut down previous if active
        uart_flush();
        gpio_set_function(module.config.tx, GPIO_FN_DISABLED); // disconnect gpio
        gpio_set_pullnone(module.config.tx);
        gpio_set_function(module.config.rx, GPIO_FN_DISABLED);
        gpio_set_pullnone(module.config.rx);
        module.uart = NULL;
    }
    ...
}
```
- 如果激活过uart，做以下操作把它关闭掉
- `uart_flush()`: