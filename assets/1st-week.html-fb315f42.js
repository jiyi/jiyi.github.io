import{_ as l,M as o,p as c,q as t,R as e,t as n,N as a,a1 as i}from"./framework-5866ffd3.js";const d="/assets/image-20240113110521079-0bc4e424.png",r={},u=e("h1",{id:"cs107e-第一周",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#cs107e-第一周","aria-hidden":"true"},"#"),n(" CS107E 第一周")],-1),p=e("h2",{id:"装东西",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#装东西","aria-hidden":"true"},"#"),n(" 装东西")],-1),b=e("p",null,[n("给的指导教程里面，macos arm版的支持度比其他要好一点，主要体现在一开始没有intel版的编译工具（现在有了），wsl版的编译工具编译"),e("code",null,"sample_build"),n("代码不成功（现在可以了），wsl版没有"),e("code",null,"riscv64-unknown-elf-gdb"),n("（文档更新暂时不需要gdb了）。毕竟这个课第一次用riscv教学。")],-1),h=e("p",null,[e("s",null,"基于个人习惯，用虚拟机装ubuntu搞实验环境")],-1),m=e("li",null,[e("s",null,"虚拟机安装 Ubuntu 22.04 server")],-1),v={href:"https://cs107e.github.io/guides/install/devtools-wsl/",target:"_blank",rel:"noopener noreferrer"},_=e("ul",null,[e("li",null,[e("s",null,[n("只看 "),e("code",null,"Install riscv-unknown-elf toolchain"),n("部分")])])],-1),k={href:"https://xboot.org/xfel/#/",target:"_blank",rel:"noopener noreferrer"},f=e("ul",null,[e("li",null,[e("s",null,"编译安装xfel到Ubuntu中")])],-1),g=e("blockquote",null,[e("p",null,"发现教程里面的riscv安装包用的是Debian 12.2 的，那我直接虚拟机安装 Debian 就好了嘛")],-1),x=e("h3",{id:"搭建-debian-12-2-虚拟机实验环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#搭建-debian-12-2-虚拟机实验环境","aria-hidden":"true"},"#"),n(" 搭建 Debian 12.2 虚拟机实验环境")],-1),B={href:"https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/debian-12.4.0-amd64-netinst.iso",target:"_blank",rel:"noopener noreferrer"},w=i(`<li>安装Debian，安装 <code>SSH server</code> 和 <code>standard system utilties</code>，不安装桌面</li><li>进入系统安装必要包<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> <span class="token function">sudo</span> <span class="token function">vim</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li>安装虚拟机工具，顺便安装了gcc, make, linux-header等东西</li><li>用户加入到sudo组里面<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">usermod</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-G</span> <span class="token function">sudo</span> jiyi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li>安装交叉编译工具<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gcc-riscv64-unknown-elf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,5),C={href:"https://xboot.org/xfel/#/",target:"_blank",rel:"noopener noreferrer"},E=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/xboot/xfel.git
<span class="token builtin class-name">cd</span> xfel
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> libusb-1.0-0-dev pkg-config
<span class="token function">make</span>
<span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
<span class="token comment"># 使用以下命令就能检测到插上OTG口芒果派</span>
xfel version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),F=i(`<li>cs107e环境<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/cs107e_home
<span class="token builtin class-name">cd</span> ~/cs107e_home
<span class="token function">git</span> clone https://github.com/cs107e/cs107e.github.io.git
<span class="token function">vim</span> ~/.bashrc
<span class="token comment"># 添加以下两行</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CS107E</span><span class="token operator">=~</span>/cs107e_home/cs107e.github.io/cs107e
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$CS107E</span>/bin

<span class="token builtin class-name">source</span> ~/.bashrc
<span class="token builtin class-name">cd</span> <span class="token variable">$CS107E</span>/sample_build
<span class="token function">make</span>
<span class="token comment"># 没报错就是第6步安装正常</span>

<span class="token builtin class-name">cd</span> <span class="token variable">$CS107E</span>/bin
mango-run blink-actled.bin
<span class="token comment"># 芒果派led开始闪，说明第7步安装正常</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),I=e("h2",{id:"学东西",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#学东西","aria-hidden":"true"},"#"),n(" 学东西")],-1),P={href:"https://www.bilibili.com/video/BV1Q5411w7z5",target:"_blank",rel:"noopener noreferrer"},S=e("h3",{id:"risc-的5级流水线",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#risc-的5级流水线","aria-hidden":"true"},"#"),n(" RISC 的5级流水线")],-1),G={href:"https://ripes.me/",target:"_blank",rel:"noopener noreferrer"},M=i('<ul><li>IF = Instruction Fetch <ul><li>从指令存储器中获取指令</li></ul></li><li>ID = Instruction Decode <ul><li>译码并读取寄存器</li></ul></li><li>EX = Execute <ul><li>执行指令</li></ul></li><li>MEM = Memory access <ul><li>从数据存储器中读取数据</li></ul></li><li>WB = Register write back <ul><li>将结果写回寄存器</li></ul></li></ul><h3 id="_1gb的内存大小是0x40000000" tabindex="-1"><a class="header-anchor" href="#_1gb的内存大小是0x40000000" aria-hidden="true">#</a> 1GB的内存大小是0x40000000</h3><p>一位16进制代表4位二进制，0x40000000 是1后面跟<code>4*7+2=30</code>个0的二进制数，即2<sup>30</sup>个地址。</p><p>1个地址代表1byte=1B=8bit的数据。</p><p>2<sup>10</sup> 是 0x00000400 是 1KB<br> 2<sup>20</sup> 是 0x00100000 是 1MB 是 1K个1KB<br> 2<sup>30</sup> 是 0x40000000 是 1GB 是 1K个1MB</p><p>严格来说以上地址都应该<strong>减1</strong>，即1GB的内存大小是0x40000000-1</p><h3 id="指令存储" tabindex="-1"><a class="header-anchor" href="#指令存储" aria-hidden="true">#</a> 指令存储</h3><p><code>add x3, x1, x2</code> 将寄存器 x1 + x2 结果放入 x3 中</p><p><img src="'+d+'" alt="image-20240113110521079"></p><p>以上指令长32bit，为<code>0x0020 81B3</code></p><p>每个内存地址存储8bit，小端存储，则以上指令在内存中的顺序是 B3, 81, 20, 00</p><h3 id="点亮led" tabindex="-1"><a class="header-anchor" href="#点亮led" aria-hidden="true">#</a> 点亮LED</h3><ul><li>led内里大头是负极</li><li>MMIO(Memory mapping I/O)就是<strong>通过将外围设备映射到内存空间，便于CPU的访问</strong></li><li>GPIO地址从<code>0x0200 0000</code>开始</li><li>内存(DRAM)地址从<code>0x4000 0000</code> 开始，<code>0xBFFF FFFF</code> 结束，共2G可用地址</li><li>用了两个寄存器 <code>PB_CFG0</code> 和 <code>PB_CFG1</code> 共52bit，设置13个PB接口 PB0 到 PB12</li><li>每个GPIO，fn0(0000)是输入，fn1(0001)是输出，fn9-13保留，其他位看文档</li><li>用了一个寄存器 <code>PB_DAT</code> 共 13bit，用于13个PB口的读写或拉高降低</li><li>当CFG设置为输出(1)，DAT设1是高电平，0是低电平</li><li>MangoPi 默认启用<code>FEL</code>模式(Firmware Exchange Loader)（固件更换器？），用xfel 进行控制</li><li><code>lui</code> 高位立即数装载指令，把立即数左移12位，存入寄存器中 <ul><li>0x2000 &lt;&lt; 12 == <code>0x0200 0000</code> （左移 3个4bit，16进制加3个0）</li></ul></li><li><code>sw</code> 字存储指令，把寄存器加上偏移量的地址，用目标寄存器中的值进行设置</li><li>有伪指令 <code>li rd, immediate</code> 立即数加载指令可替代 <code>addi a1, zero, 1</code><ul><li>hexdump后为<code>93 05 10 00</code>，即指令<code>0x00100593</code></li><li>二进制为 <code>0b0000 0000 0001 0000 0000 0101 1001 0011</code></li><li>以指令分割 <code>000000000001 00000 000 01011 0010011</code></li><li>得到汇编指令 <code>addi x11,x0,1</code></li><li>即 <code>addi a1, zero, 1</code></li><li>结论：立即数不大的时候<code>li</code>使用的就是<code>addi</code>指令</li></ul></li><li>命令行<code>riscv64-unknown-elf-as on.s -o on.o</code><ul><li>将指定汇编文件 <code>on.s</code> 编译成指定名称 <code>on.o</code></li><li><code>-o</code> 指定输出的文件名</li></ul></li><li>命令行 <code>riscv64-unknown-elf-objcopy on.o -O binary on.bin</code><ul><li><code>-O binary</code> 输出为原始的二进制文件</li><li>使用xfel运行程序，原始二进制就够了</li></ul></li></ul>',13);function D(y,O){const s=o("ExternalLinkIcon");return c(),t("div",null,[u,p,b,h,e("ul",null,[m,e("li",null,[e("s",null,[e("a",v,[n("安装编译环境"),a(s)])]),_]),e("li",null,[e("s",null,[e("a",k,[n("安装xfel"),a(s)])]),f])]),g,x,e("ol",null,[e("li",null,[n("下载"),e("a",B,[n("镜像"),a(s)])]),w,e("li",null,[e("a",C,[n("安装xfel"),a(s)]),E]),F]),I,e("p",null,[n("第一周是汇编和riscv，官方讲义过于简略了。去B站看"),e("a",P,[n("循序渐进，学习开发一个RISC-V上的操作系统 - 汪辰 - 2021春"),a(s)])]),S,e("p",null,[n("为了看懂"),e("a",G,[n("ripes.me"),a(s)]),n("的Stage。来源 https://www.sunnychen.top/archives/rvintropipeline https://en.wikipedia.org/wiki/Classic_RISC_pipeline")]),M])}const T=l(r,[["render",D],["__file","1st-week.html.vue"]]);export{T as default};
