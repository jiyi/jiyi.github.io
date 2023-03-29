# 在 parent 不是spring-boot的情况下管理sping-boot依赖

在一些特殊情况下，我们的工程无法直接继承 `org.springframework.boot:spring-boot-starter-parent`，这时就可能失去Spring Boot的很多便利之处。为此，我们需要自己在`pom.xml`中做些额外的工作。

首先，增加`<dependencyManagement/>`，导入`org.springframework.boot:spring-boot-dependencies`中的依赖项，这样就能利用其中定义的依赖了:
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot<groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.6.3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
接着，在`<build/>`中增加`org.springframework.boot:spring-boot-maven-plugin`，这样打包时就能用上 Spring Boot 的插件，打出可执行的 Jar 包:
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>2.6.3</version>
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```
通过上述修改，我们就能在不继承 `org.springframework.boot:spring-boot-starter-parent` 的情况下继续让 Spring Boot 替我们管理依赖并构建可执行 Jar 包了。

# 来自
《学透Spring：从入门到项目实战》作者：丁雪丰
