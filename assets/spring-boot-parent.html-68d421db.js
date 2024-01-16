const o=JSON.parse('{"key":"v-6a0ab87a","path":"/til/spring-boot-parent.html","title":"在 parent 不是spring-boot的情况下管理sping-boot依赖","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1680080107000,"contributors":[{"name":"Jiyi","email":"jiyixx@gmail.com","commits":1}]},"filePathRelative":"til/spring-boot-parent.md","excerpt":"<h1> 在 parent 不是spring-boot的情况下管理sping-boot依赖</h1>\\n<p>在一些特殊情况下，我们的工程无法直接继承 <code>org.springframework.boot:spring-boot-starter-parent</code>，这时就可能失去Spring Boot的很多便利之处。为此，我们需要自己在<code>pom.xml</code>中做些额外的工作。</p>\\n<p>首先，增加<code>&lt;dependencyManagement/&gt;</code>，导入<code>org.springframework.boot:spring-boot-dependencies</code>中的依赖项，这样就能利用其中定义的依赖了:</p>"}');export{o as data};
