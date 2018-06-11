---
title: 一日一命令之 find 根据指定的条件查找文件和目录
date: 2018-05-13 14:03:42
tags: Linux
---

**`find` 命令**根据指定的条件查找文件和目录。查找可用于多种条件，例如你可以通过**权限，用户，组，文件类型，日期，大小和其他可能的条件**来查找文件。

按照查找条件的不同，可以将 35 个查找命令示例分为五个部分。

* [*第一部分：查找带名称的文件的基本查找命令*](#第一部分：查找带名称的文件的基本查找命令)
* [*第二部分：根据权限查找文件*](#第二部分：根据权限查找文件)
* [*第三部分：基于所有者和组查找文件*](#第三部分：基于所有者和组查找文件)
* [*第四部分：根据日期和时间查找文件和目录*](#第四部分：根据日期和时间查找文件和目录)
* [*第五部分：根据大小查找文件和目录*](#第五部分：根据大小查找文件和目录)


<!-- more -->

--------

# 第一部分：查找带名称的文件的基本查找命令

实例：1、在当前目录中使用名称查找文件

```shell
# find . -name tecmint.txt
./tecmint.txt
```

实例：2、在主目录下查找文件

```shell
# find /home -name tecmint.txt
/home/tecmint.txt
```

实例：3、使用名称查找文件并忽略大小写
描述：在 `/home` 目录找到所有名称为 `tecmint.txt` 的文件，忽略大小写。

```shell
# find /home -I name tecmint.txt
```
实例：4、使用名字查找目录

```shell
$ find / -type d -name Tecmint
/Tecmint
```
实例：5、使用名字查找 PHP 文件

```shell
# find . -type f -name tecmint.php
./tecmint.php
```

实例：6、查找所有的 PHP 文件

```shell
# find . -type f -name “*.php"
./tecmint.php
./login.php
./index.php
```


--------


# 第二部分：根据权限查找文件

实例：7、查找权限为 777 的文件

```shell
# find . -type f -perm 777 -print
```
实例：8、查找权限不为 777 的文件

```shell
$ find . -type f ! -perm 777 
```
实例：9、查找所有权限为 644 的 SGID 文件

```shell
# find . -perm 2644
```

实例：10、查找所有权限为 551 的 Stickt Bit 文件

```shell
# find / -perm 1511
```
实例：11、找到所有 SUID 文件

```shell
# find / -perm /u=s
```
实例：12、找到所有 SGID 文件

```shell
# find / -perm /g=s
```
实例：13、查找所有只读文件 

```shell
# find . -perm /u=s
```
实例：14、查找所有可执行文件

```shell
# find . -perm /a=x
```
实例：15、查找所有权限为 777 的文件，将其改为 644

```shell
# find / -type f -perm 0777 -print -exec chmod 644{} \;
```
实例：16、查找所有权限为 777 的目录，将其改为 755

```shell
# find / -type d -perm 777 -print -exec chmod 755{} \;
```
实例：17、查找并删除单个文件

```shell
# find . -type f -name "test.log" -exec rm -f {} \;
```
实例：18、查找并删除多个文件

```shell
# find . -type f -name "*.txt" -exec rm -f {} \;
```
实例：19、查找所有空文件

```shell
# find . -type f -empty
```
实例：20、查找所有空目录

```shell
# find . -type d -empty
```
实例：21、查找所有隐藏文件

```shell
# find . -type f -name ".*"
```

--------

# 第三部分：基于所有者和组查找文件

实例：22、查找基于用户的单个文件

```shell
# find . -user root -name tecmint.txt
```

实例：23、查找所有用户文件
查找所有 `root` 用户的文件

```shell
# find . -user root 
```

实例：24、查找基于组的文件
描述：在当前目录查找属于 developer 组的所有文件。

```shell
# find . -group developer
```

实例：25、查找用户特定的文件

```shell
# find . -user root -iname “*.txt"
```

--------

# 第四部分：根据日期和时间查找文件和目录

实例：26、查找 50 天前修改过的文件

```shell
# find . -mtime 50 
```

实例：27、查找 50 天前访问过的文件

```shell
# find . -atime 50 
```

实例：28、查找 50-100 天前修改过的文件

```shell
# find . -mtime +50 -mtime -100
```

实例：29、查找在 1 小时之内改变过（Changed）的文件 

```shell
# find . -cmin -60
```

实例：30、查找在 1 小时之内修改过（Modified）的文件

```shell
# find . -mmin -60
```

实例：31、查找在 1 小时之内访问过（Accessed）的文件

```shell
# find . -amin -60
```

--------

# 第五部分：根据大小查找文件和目录

实例：32、查找所有大小为 50MB 的文件

```shell
# find . -size 50M
```

实例：33、查找所有大小在 50MB - 100MB 之间的文件

```shell
# find . -size +50M -size -100M
```

实例：34、查找并删除 100MB 的文件

```shell
# find . -size +100M -exec rm -rf {} \;
```

实例：35、查找指定文件并删除

```shell
# find . -type f -name *.mp3 -size +10M -exec rm {} \;
```

------

References:

- [35-practical-examples-of-linux-find-command](https://www.tecmint.com/35-practical-examples-of-linux-find-command/)
