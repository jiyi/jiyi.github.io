import{_ as n,p as s,q as a,a1 as e}from"./framework-5866ffd3.js";const t={},p=e(`<h1 id="vue3-里面数组里对象的处理" tabindex="-1"><a class="header-anchor" href="#vue3-里面数组里对象的处理" aria-hidden="true">#</a> vue3 里面数组里对象的处理</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 定义一个reactive数组
 * [<span class="token punctuation">{</span>id, content, created<span class="token punctuation">}</span>, <span class="token punctuation">{</span><span class="token punctuation">}</span>, ...]
 */</span>
<span class="token keyword">const</span> notes <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment">// 定义已选择的id</span>
<span class="token keyword">const</span> selectedId <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token doc-comment comment">/**
 * 生成已选择的note
 * find有找到返回的是ref对象
 * find没找到到返回的是undefined
 * 可以使用 v-model=&quot;selectedNote.content&quot; 显示与修改notes里的数据
 */</span>
<span class="token keyword">const</span> selectedNote <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    notes<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">note</span> <span class="token operator">=&gt;</span> note<span class="token punctuation">.</span>id <span class="token operator">===</span> selectedId<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * 新增数据
 * reactive 使用 push新增数据
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">addNote</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> time <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> note <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token function">String</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;内容&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">created</span><span class="token operator">:</span> time
    <span class="token punctuation">}</span>
    notes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>note<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 删除已选择的数据
 * reactive 可以使用indexOf查找数组里的数据，参数是对象原始值
 * 使用computed返回的值查找，需要加上value
 * reactive 可以使用splice 删除数组里面的的值
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">removeNote</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> notes<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>selectedNote<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        notes<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 生成排序后的新数组，通过创建时间排序
 * 使用 slice() 返回新数组，使用 sort 排序
 */</span>
<span class="token keyword">const</span> sortedNotes <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
    notes<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>created <span class="token operator">-</span> b<span class="token punctuation">.</span>created<span class="token punctuation">)</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","reactiveArrayByObjectInVue3.html.vue"]]);export{r as default};
