---
title: Mysql JDBC 连接池时间转换问题
date: 2018-05-29 12:48:59
tags: Mysql
---

在查询 Mysql 数据库的时候，有时候会产生一个异常：

``` java
Value '0000-00-00 00:00:00' can not be represented as java.sql.Timestamp. Stacktrace follows:
java.sql.SQLException: Value '0000-00-00 00:00:00' can not be represented as java.sql.Timestamp
...
```

<!-- more -->

查找资料

>**Datetimes** with all-zero components (*0000-00-00* ...): These values cannot be represented reliably in Java. Connector/J 3.0.x always converted them to NULL when being read from a ResultSet. 
></br>
>
>Connector/J 3.1 throws an exception by default when these values are encountered, as this is the most correct behavior according to the JDBC and SQL standards. This behavior can be modified using the zeroDateTimeBehavior configuration property. The permissible values are:
> - exception (the default), which throws an SQLException with an SQLState of S1009.
> - convertToNull, which returns NULL instead of the date.
> - round, which rounds the date to the nearest closest value which is 0001-01-01.


这个问题出现的起因是，尝试将一个存储在 Mysql 里的零值日期（`0000-00-00 00:00:00`），转换为一个 Java 日期对象。

关键在于在 Mysql 里 `0000-00-00 00:00:00` 可能是有效的；而在 Java 中，这样的转换是无效的。

因此，Mysql JDBC 驱动将抛出一个 java.sql.SQLException ，因为 Java 不能识别 `0000-00-00 00:00:00` 这样的日期格式。

解决的办法：
1、可以改变数据库的模式（schema），使之允许 NULL 值。

``` sql
UPDATE table SET datefield = NULL WHERE datefield = '0000-00-00 00:00:00';
```
2、在 JDBC 数据库连接池配置中，编辑 JDBC URL ，添加一个 `zeroDateTimeBehavior = convertToNull` 的参数。这样 Java 就会把零值日期转换为 null 值。

``` sql
jdbc:mysql://localhost:3306/yourMySqlDatabase?zeroDateTimeBehavior=convertToNull
```

参考：

[zeroDateTimeBehavior 定义](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-reference-configuration-properties.html)
[zeroDateTimeBehavior 三个选项](https://dev.mysql.com/doc/connector-j/5.1/en/connector-j-installing-upgrading-3-0-to-3-1.html)

