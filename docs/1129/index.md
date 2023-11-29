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
# 北向
```java
import com.alibaba.fastjson.JSON;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.common.message.Message;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

// 仅供演示，需要导入相关依赖，如 RocketMQ 的 Java 客户端依赖和数据库驱动等

public class MessageHandler {

    // 模拟接收北向接口推送的消息
    public static void receiveNorthboundMessage(String jsonMessage) {
        // 解析收到的 JSON 消息
        AlarmMessage alarmMessage = JSON.parseObject(jsonMessage, AlarmMessage.class);

        // 存储消息到 RocketMQ
        storeMessageInRocketMQ(jsonMessage);

        // 存储消息内容到数据库告警表
        saveMessageToDatabase(alarmMessage);

        // 调用南向短信网关接口，发送短信给指定用户
        sendSMSViaGateway(alarmMessage);
    }

    // 将消息存储到 RocketMQ
    private static void storeMessageInRocketMQ(String message) {
        try {
            DefaultMQProducer producer = new DefaultMQProducer("producer_group_name");
            producer.start();

            Message mqMessage = new Message("topic_name", "tag", message.getBytes());
            producer.send(mqMessage);

            producer.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 将消息内容存入数据库告警表
    private static void saveMessageToDatabase(AlarmMessage alarmMessage) {
        try {
            // 假设数据库连接信息
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/db_name", "username", "password");

            String query = "INSERT INTO alarm_table (deviceNum, deviceName, deviceAddress, alarmType) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, alarmMessage.getDeviceNum());
            preparedStatement.setString(2, alarmMessage.getDeviceName());
            preparedStatement.setString(3, alarmMessage.getDeviceAddress());
            preparedStatement.setString(4, alarmMessage.getAlarmType());

            preparedStatement.executeUpdate();

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 调用南向短信网关接口发送短信给指定用户
    private static void sendSMSViaGateway(AlarmMessage alarmMessage) {
        // 实现调用南向短信网关接口发送短信的逻辑
        // 省略具体实现
        System.out.println("Sending SMS to specified user: " + alarmMessage);
    }

    // 示例告警消息类
    static class AlarmMessage {
        private String deviceNum;
        private String deviceName;
        private String deviceAddress;
        private String alarmType;

        // 省略构造函数、getter 和 setter 方法
        // 注意：需要提供相应的构造函数和方法来获取设备信息
    }

    // 测试方法
    public static void main(String[] args) {
        // 模拟接收到的北向接口推送的 JSON 消息
        String jsonMessage = "{\n" +
                "    \"deviceNum\": \"37140002031320000495\",\n" +
                "    \"deviceName\":\"视频监控设备\",\n" +
                "    \"deviceAddress\":\"济南市高新区\",\n" +
                "    \"alarmType\": \"运动检测告警\"\n" +
                "}";

        // 处理收到的消息
        receiveNorthboundMessage(jsonMessage);
    }
}
```