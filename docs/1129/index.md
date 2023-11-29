# CURD

```
1.	有用户表（cscp_user）,用户角色表（cscp_user_role）,角色菜单表（cscp_role_menu）,菜单表（cscp_menus），给定一个用户（cscp_user表username字段为【kao1】），需要查出来此用户的权限码，即cscp_menus表的字段（permission_code）
```
```sql
SELECT DISTINCT cm.permission_code
FROM cscp_user u
JOIN cscp_user_role ur ON u.user_id = ur.user_id
JOIN cscp_role_menu rm ON ur.role_id = rm.role_id
JOIN cscp_menus cm ON rm.menu_id = cm.menu_id
WHERE u.username = 'kao1';
```

# jwt
```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtGenerator {

    public static void main(String[] args) {

        // 设置载荷/Payload
        String subject = "test";
        String authorities = "42AD697D,7173EC98,D961DC2A,F1D0F803,cscp.authority,cscp.form.query,cscp.logging.operation,cscp.org.edit,cscp.org.query,cscp.quanxian,cscp.report.view,cscp.role,cscp.role.add,cscp.role.del,cscp.role.edit,cscp.sr,cscp.user.add,cscp.user.del,cscp.user.edit,cscp.user.query,cscp.workbench";
        int rem = 1;
        long id = 77;
        String tenantId = "demo";
        String ip = "10.0.0.1";
        String issuedAt = "2022-01-02 16:51:26";
        Date expiration = new Date(System.currentTimeMillis() + 30 * 24 * 60 * 60 * 1000); // 一个月后过期

        // 设置签名密钥
        String secretKey = "AqU3nspkcZ";

        // 生成JWT token
        String token = Jwts.builder()
                .setSubject(subject)
                .claim("auth", authorities)
                .claim("rem", rem)
                .claim("id", id)
                .claim("tenantId", tenantId)
                .claim("ip", ip)
                .claim("issuedAt", issuedAt)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
                .compact();

        // 打印生成的token
        System.out.println(token);
    }
}

```