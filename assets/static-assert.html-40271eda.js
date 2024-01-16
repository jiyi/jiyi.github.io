const n=JSON.parse('{"key":"v-3b77490d","path":"/cs107e/static-assert.html","title":"_Static_assert 是干什么用的","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"_Static_assert 是干什么用的","description":"_Static_assert，在uart.c里面如何使用的"},"headers":[{"level":2,"title":"为什么是0x02500000？","slug":"为什么是0x02500000","link":"#为什么是0x02500000","children":[]},{"level":2,"title":"为什么硬件地址是共用体union类型？","slug":"为什么硬件地址是共用体union类型","link":"#为什么硬件地址是共用体union类型","children":[]},{"level":2,"title":"_Static_assert 在这里的作用","slug":"static-assert-在这里的作用","link":"#static-assert-在这里的作用","children":[]},{"level":2,"title":"没有意义","slug":"没有意义","link":"#没有意义","children":[]}],"git":{"updatedTime":1705030443000,"contributors":[{"name":"Jiyi","email":"jiyilc.sd@chinatelecom.cn","commits":1}]},"filePathRelative":"cs107e/static-assert.md","excerpt":"<h1> _Static_assert</h1>\\n<p>_Static_assert()接受两个参数，如果第一个参数是<code>false</code>，则编译器显示第二个参数，并且编译失败。</p>\\n<h1> 例子</h1>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token comment\\">// structs defined to match layout of hardware registers</span>\\n<span class=\\"token keyword\\">typedef</span> <span class=\\"token keyword\\">union</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">struct</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">union</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">uint32_t</span> rbr<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// receive buffer register</span>\\n            <span class=\\"token class-name\\">uint32_t</span> thr<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// transmit holding register</span>\\n            <span class=\\"token class-name\\">uint32_t</span> dll<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// divisor latch (LSB)</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">union</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">uint32_t</span> dlh<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// divisor latch (MSB)</span>\\n            <span class=\\"token class-name\\">uint32_t</span> ier<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// interrupt enable register</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">union</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token class-name\\">uint32_t</span> iir<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// interrupt identification register</span>\\n            <span class=\\"token class-name\\">uint32_t</span> fcr<span class=\\"token punctuation\\">;</span>   <span class=\\"token comment\\">// FIFO control register</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">uint32_t</span> lcr<span class=\\"token punctuation\\">;</span>       <span class=\\"token comment\\">// line control register</span>\\n        <span class=\\"token class-name\\">uint32_t</span> mcr<span class=\\"token punctuation\\">;</span>       <span class=\\"token comment\\">// modem control register</span>\\n        <span class=\\"token class-name\\">uint32_t</span> lsr<span class=\\"token punctuation\\">;</span>       <span class=\\"token comment\\">// line status register</span>\\n        <span class=\\"token class-name\\">uint32_t</span> reserved<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">25</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">uint32_t</span> usr<span class=\\"token punctuation\\">;</span>       <span class=\\"token comment\\">// busy status, at offset 0x7c</span>\\n        <span class=\\"token class-name\\">uint32_t</span> reserved2<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">9</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token class-name\\">uint32_t</span> halt<span class=\\"token punctuation\\">;</span>      <span class=\\"token comment\\">// at offset 0xa4</span>\\n    <span class=\\"token punctuation\\">}</span> regs<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">unsigned</span> <span class=\\"token keyword\\">char</span> padding<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0x400</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token class-name\\">uart_t</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">define</span> <span class=\\"token macro-name\\">UART_BASE</span> <span class=\\"token expression\\"><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">uart_t</span> <span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token number\\">0x02500000</span><span class=\\"token punctuation\\">)</span></span></span>\\n<span class=\\"token keyword\\">_Static_assert</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span><span class=\\"token punctuation\\">(</span>UART_BASE<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span>regs<span class=\\"token punctuation\\">.</span>lcr<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">==</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">uint32_t</span> <span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token number\\">0x0250000C</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"UART0 lcr reg must be at address 0x0250000C\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">_Static_assert</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span><span class=\\"token punctuation\\">(</span>UART_BASE<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span>regs<span class=\\"token punctuation\\">.</span>dlh<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">==</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">uint32_t</span> <span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token number\\">0x02500404</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"UART1 dlh reg must be at address 0x02500404\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{n as data};
