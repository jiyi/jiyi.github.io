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
