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

# getRequest
```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GetRequestWithToken {

    public static void main(String[] args) {
        String token = "YOUR_GENERATED_TOKEN_HERE"; // 替换为您生成的 token
        String apiUrl = "http://140.249.205.170:32001/console/api/system/cscpCurrentUserDetails";

        try {
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // 设置 Authorization 头部
            conn.setRequestProperty("Authorization", "Bearer " + token);

            // 发起请求
            int responseCode = conn.getResponseCode();

            // 读取响应
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                // 打印获取的信息
                System.out.println("Response: " + response.toString());
            } else {
                System.out.println("GET request failed. Response Code: " + responseCode);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```