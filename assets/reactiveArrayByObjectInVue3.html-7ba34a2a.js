const n=JSON.parse(`{"key":"v-efb8f8fc","path":"/til/reactiveArrayByObjectInVue3.html","title":"vue3 里面reactive数组中对象的处理","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"vue3 里面reactive数组中对象的处理","description":"vue3 reactive 数组，里面存储对象，如何对对象进行添加，修改，删除"},"headers":[],"git":{"updatedTime":1678763445000,"contributors":[{"name":"Jiyi","email":"jiyixx@gmail.com","commits":2}]},"filePathRelative":"til/reactiveArrayByObjectInVue3.md","excerpt":"<h1> vue3 里面数组里对象的处理</h1>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token doc-comment comment\\">/**\\n * 定义一个reactive数组\\n * [<span class=\\"token punctuation\\">{</span>id, content, created<span class=\\"token punctuation\\">}</span>, <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>, ...]\\n */</span>\\n<span class=\\"token keyword\\">const</span> notes <span class=\\"token operator\\">=</span> <span class=\\"token function\\">reactive</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token comment\\">// 定义已选择的id</span>\\n<span class=\\"token keyword\\">const</span> selectedId <span class=\\"token operator\\">=</span> <span class=\\"token function\\">ref</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token doc-comment comment\\">/**\\n * 生成已选择的note\\n * find有找到返回的是ref对象\\n * find没找到到返回的是undefined\\n * 可以使用 v-model=\\"selectedNote.content\\" 显示与修改notes里的数据\\n */</span>\\n<span class=\\"token keyword\\">const</span> selectedNote <span class=\\"token operator\\">=</span> <span class=\\"token function\\">computed</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span>\\n    notes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">find</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">note</span> <span class=\\"token operator\\">=&gt;</span> note<span class=\\"token punctuation\\">.</span>id <span class=\\"token operator\\">===</span> selectedId<span class=\\"token punctuation\\">.</span>value<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * 新增数据\\n * reactive 使用 push新增数据\\n */</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">addNote</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> time <span class=\\"token operator\\">=</span> Date<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">now</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">const</span> note <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token literal-property property\\">id</span><span class=\\"token operator\\">:</span> <span class=\\"token function\\">String</span><span class=\\"token punctuation\\">(</span>time<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token literal-property property\\">content</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">'内容'</span><span class=\\"token punctuation\\">,</span>\\n        <span class=\\"token literal-property property\\">created</span><span class=\\"token operator\\">:</span> time\\n    <span class=\\"token punctuation\\">}</span>\\n    notes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">push</span><span class=\\"token punctuation\\">(</span>note<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * 删除已选择的数据\\n * reactive 可以使用indexOf查找数组里的数据，参数是对象原始值\\n * 使用computed返回的值查找，需要加上value\\n * reactive 可以使用splice 删除数组里面的的值\\n */</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">removeNote</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> index <span class=\\"token operator\\">=</span> notes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">indexOf</span><span class=\\"token punctuation\\">(</span>selectedNote<span class=\\"token punctuation\\">.</span>value<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>index <span class=\\"token operator\\">!==</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        notes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">splice</span><span class=\\"token punctuation\\">(</span>index<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token doc-comment comment\\">/**\\n * 生成排序后的新数组，通过创建时间排序\\n * 使用 slice() 返回新数组，使用 sort 排序\\n */</span>\\n<span class=\\"token keyword\\">const</span> sortedNotes <span class=\\"token operator\\">=</span> <span class=\\"token function\\">computed</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span>\\n    notes<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">slice</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n        <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">sort</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a<span class=\\"token punctuation\\">,</span> b</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> a<span class=\\"token punctuation\\">.</span>created <span class=\\"token operator\\">-</span> b<span class=\\"token punctuation\\">.</span>created<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">)</span>\\n\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}`);export{n as data};
