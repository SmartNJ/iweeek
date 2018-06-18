---
title: Linux find总结
date: 2018-06-08 14:03:42
tags: Linux
---

find命令根据指定的条件查找文件和目录。查找可用于多种条件，例如你可以通过权限，用户，组，文件类型，日期，大小和其他可能的条件来查找文件。

<!-- more -->

## 命令格式
`find pathname [options] [-print -exec -ok]`

参数解释：
pathname：find命令所查找的目录路径。例如用.来表示当前目录，用/来表示系统根目录。
-print：find命令将匹配的文件输出到标准输出。
-exec：find命令将匹配的文件执行该参数所给出的shell命令。相应的命令的形式为'command' {} \;，注意{}和\;之间的空格。
-ok：和-exec的作用相同，但会以一种更加安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。

## 命令功能

在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。如果使用该命令时，不设置任何参数，则find命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

## 命令选项

```
- -amin<分钟>：查找在指定时间曾被存取过的文件或目录，单位以分钟计算；
- -anewer<参考文件或目录>：查找其存取时间较指定文件或目录的存取时间更接近现在的文件或目录；
- -atime<24小时数>：查找在指定时间曾被存取过的文件或目录，单位以24小时计算；
- -cmin<分钟>：查找在指定时间之时被更改过的文件或目录；
- -cnewer<参考文件或目录>查找其更改时间较指定文件或目录的更改时间更接近现在的文件或目录；
- -ctime<24小时数>：查找在指定时间之时被更改的文件或目录，单位以24小时计算；
- -daystart：从本日开始计算时间；
- -depth：从指定目录下最深层的子目录开始查找；
- -delete：删除文件，默认实现了depth选项。注意不要将delete放在find条件语句之前，不然有可能在执行查找之前，将该目录下的所有文件删除。
- -expty：寻找文件大小为0 Byte的文件，或目录下没有任何子目录或文件的空目录；
- -exec<执行指令>：假设find指令的回传值为True，就执行该指令；执行指令将为每一个匹配的文件执行一次。
- -false：将find指令的回传值皆设为False；
- -fls<列表文件>：此参数的效果和指定“-ls”参数类似，但会把结果保存为指定的列表文件；
- -follow：排除符号连接；
- -fprint<列表文件>：此参数的效果和指定“-print”参数类似，但会把结果保存成指定的列表文件；
- -fprint0<列表文件>：此参数的效果和指定“-print0”参数类似，但会把结果保存成指定的列表文件；
- -fprintf<列表文件><输出格式>：此参数的效果和指定“-printf”参数类似，但会把结果保存成指定的列表文件；
- -fstype<文件系统类型>：只寻找该文件系统类型下的文件或目录；
- -gid<群组识别码>：查找符合指定之群组识别码的文件或目录；
- -group<群组名称>：查找符合指定之群组名称的文件或目录；
- -help或——help：在线帮助；
- -ilname<范本样式>：此参数的效果和指定“-lname”参数类似，但忽略字符大小写的差别；
- -iname<范本样式>：此参数的效果和指定“-name”参数类似，但忽略字符大小写的差别；
- -inum<inode编号>：查找符合指定的inode编号的文件或目录；
- -ipath<范本样式>：此参数的效果和指定“-path”参数类似，但忽略字符大小写的差别；
- -iregex<范本样式>：此参数的效果和指定“-regexe”参数类似，但忽略字符大小写的差别；
- -links<连接数目>：查找符合指定的硬连接数目的文件或目录；
- -iname<范本样式>：指定字符串作为寻找符号连接的范本样式；
- -ls：假设find指令的回传值为Ture，就将文件或目录名称列出到标准输出；
- -maxdepth<目录层级>：设置最大目录层级；
- -mindepth<目录层级>：设置最小目录层级；
- -mmin<分钟>：查找在指定时间曾被更改过的文件或目录，单位以分钟计算；
- -mount：此参数的效果和指定“-xdev”相同；
- -mtime<24小时数>：查找在指定时间曾被更改过的文件或目录，单位以24小时计算；
- -name<范本样式>：指定字符串作为寻找文件或目录的范本样式；
- -newer<参考文件或目录>：查找其更改时间较指定文件或目录的更改时间更接近现在的文件或目录；
- -nogroup：找出不属于本地主机群组识别码的文件或目录；
- -noleaf：不去考虑目录至少需拥有两个硬连接存在；
- -nouser：找出不属于本地主机用户识别码的文件或目录；
- -ok<执行指令>：此参数的效果和指定“-exec”类似，但在执行指令之前会先询问用户，若回答“y”或“Y”，则放弃执行命令；
- -path<范本样式>：指定字符串作为寻找目录的范本样式；
- -perm<权限数值>：查找符合指定的权限数值的文件或目录；
- -print：假设find指令的回传值为Ture，就将文件或目录名称列出到标准输出。格式为每列一个名称，每个名称前皆有“./”字符串；
- -print0：假设find指令的回传值为Ture，就将文件或目录名称列出到标准输出。格式为全部的名称皆在同一行；
- -printf<输出格式>：假设find指令的回传值为Ture，就将文件或目录名称列出到标准输出。格式可以自行指定；
- -prune：不寻找字符串作为寻找文件或目录的范本样式;
- -regex<范本样式>：指定字符串作为寻找文件或目录的范本样式；
- -size<文件大小>：查找符合指定的文件大小的文件；
- -true：将find指令的回传值皆设为True；
- -typ<文件类型>：只寻找符合指定的文件类型的文件；
- -uid<用户识别码>：查找符合指定的用户识别码的文件或目录；
- -used<日数>：查找文件或目录被更改之后在指定时间曾被存取过的文件或目录，单位以日计算；
- -user<拥有者名称>：查找符和指定的拥有者名称的文件或目录；
- -version或——version：显示版本信息；
- -xdev：将范围局限在先行的文件系统中；
- -xtype<文件类型>：此参数的效果和指定“-type”参数类似，差别在于它针对符号连接检查。
动作参数：

```



## 实用命令

按照查找条件的不同，可以将 44 个查找命令示例分为五个部分。

* [*第一部分：根据名称查找文件*](#第一部分：根据名称查找文件)
* [*第二部分：根据权限查找文件*](#第二部分：根据权限查找文件)
* [*第三部分：根据所有者和组查找文件*](#第三部分：根据所有者和组查找文件)
* [*第四部分：根据日期和时间查找*](#第四部分：根据日期和时间查找)
* [*第五部分：根据大小查找文件和目录*](#第五部分：根据大小查找文件和目录)
* [*第六部分：根据文件内容或路径查找*](#第六部分：根据文件内容或路径查找)
* [*第七部分：借助exec或ok选项来执行shell命令*](#第七部分：借助exec或ok选项来执行shell命令)

## 第一部分：根据name或type查找文件

**实例：1. 列出当前目录及子目录下所有文件和文件夹**
命令：`find . 等同于 find . -name "*"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-all.png)


**实例：2. 指定目录下使用名称查找文件**
描述：在当前目录下查找名字（name）为find.txt的文件。
命令：`find . -name find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-name.png)

**实例：3. 使用名称查找文件并忽略大小写**
描述：在当前目录找到名称为find.txt的文件，忽略大小写(iname)。
命令：`find . -iname find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-iname.png)


**实例：4. 根据文件类型查找**

形式：find . -type 类型参数

类型参数列表：

- f：普通文件
- l：符号连接
- d：目录
- c：字符设备
- b：块设备
- s：套接字
- p: Fifo

描述：在指定目录中找到名称为find（name find）的文件（type f）。
命令：`find / -type f -name find`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-type-f.png)

描述：在指定目录中找到名称为findd（name findd）的目录（type d）。
命令：`find / -type d -name findd`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-type-d.png)


**实例：5. 根据目录深度搜索**

描述：从文件系统的根目录开始，查找一个名为xyz.txt的文件，find将首先匹配所有的文件然后再进入子目录中查找。
命令：`find / -depth -name "xyz.txt"`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/find/find-depth.png)


描述：搜索出深度距离当前目录最多3个子目录的所有文件。
命令：`find /home/nijun -maxdepth 3 -type f`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/find/find-maxdepth.png)


描述：搜索出深度距离当前目录至少2个子目录的所有文件。
命令：`find /home/nijun -mindepth 2 -type f`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/find/find-mindepth.png)


**实例：5. 使用通配符查找文件**
描述：在指定目录中找到所有以.txt或(-o).mp3结尾的文件。
命令：`find . -type f -name "*.txt" -o -name "*.mp3"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-name-or.png)


描述：在当前目录查找文件名以两个小写字母开头，跟着是两个数字，最后是*.txt的文件。-print选项会输出到标准输出中。
命令：`find . -name "[a-z][a-z][0-9][0-9].txt" -print`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-name-wildcard.png)


## 第二部分：根据权限查找文件


**实例：6. 查找符合指定的权限数值的文件或目录**
描述：查找权限为777的文件。-print将文件或目录的名称列出到标准输出，格式为每列一个名称。
命令：`find . -type f -perm 777 -print`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-perm.png)

**实例：7. 查找不符合指定的权限数值的文件或目录**
描述：查找权限不为777的文件。
命令：`find . -type f ! -perm 777`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-!-perm.png)


**实例：8. 查找所有权限为644的SGID文件**
描述：在指定目录中找到名称为find的文件。
命令：`find . -perm 2644`

**实例：9. 查找所有权限为551的Stickt Bit文件**
命令：`find / -perm 1511`

**实例：10. 找到所有SUID文件**
命令：`find / -perm /u=s`

**实例：11. 找到所有SGID文件**
命令：`find / -perm /g=s`

**实例：12. 查找所有只读文件**
命令：`find . -perm /u=r`

**实例：13. 查找所有可执行文件**
命令：`find . -perm /a=x`

**实例：13. 查找对所有人可读的文件**
描述：在主目录中查找对所有人可读的文件。
命令：`find ~ -perm -o=r`

**实例：14. 查找所有权限为777的文件，将其改为644**
命令：`find / -type f -perm 0777 -print -exec chmod 644{} \;`

**实例：15. 查找所有权限为777的目录，将其改为755**
命令：`find / -type d -perm 777 -print -exec chmod 755{} \;`

**实例：16. 查找并删除单个文件**
命令：`find . -type f -name "test.log" -exec rm -f {} \;`

**实例：17. 查找并删除多个文件**
命令：`find . -type f -name "*.txt" -exec rm -f {} \;`

**实例：18. 查找所有空文件**
命令：`find . -type f -empty`

**实例：19. 查找所有空目录**
命令：`find . -type d -empty`

**实例：20. 查找所有隐藏文件**
描述：在当前目录下查找所有隐藏文件（dotfile）。
命令：`find . -type f -name ".*"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-dotfile.png)


**实例：20. 忽略某个目录**
描述：-prune选项指出需要忽略的目录，如果使用了-depth选项，那么-prune选项会被find命令忽略。
命令：`find . -name "best" -prune -o -print`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-prune.png)

## 第三部分：根据所有者和组查找文件

**实例：21. 查找基于用户的单个文件**
描述：查找文件属主为root的find.txt文件。-user指定文件拥有者的名字，也可以是UID。
命令：`find . -user root -name find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-user-name.png)

**实例：22. 查找所有用户文件**
命令：`find . -user root`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-user.png)

**实例：22. 查找没有有效账户的文件**
描述：-nouser选项查找那些属主在/etc/passwd文件中没有有效账户的文件。
命令：`find /home -nouser -print`

**实例：23. 查找基于组的文件**
命令：`find . -group root`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-group.png)

**实例：22. 查找没有有效用户组的文件**
描述：-nogroup选项查找没有有效所属用户组的所有文件。
命令：`find / -nogroup -print` 


**实例：24. 查找用户特定的文件**
命令：`find . -user root -iname "*.txt"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-user-wildcard.png)


## 第四部分：根据日期和时间查找

形式：`find . -type f 时间戳`

UNIX/Linux文件系统每个文件都有三种时间戳：

- 访问时间 （-atime/天，-amin/分钟）：用户最近一次访问时间。
- 修改时间 （-mtime/天，-mmin/分钟）：文件最后一次修改时间。
- 变化时间 （-ctime/天，-cmin/分钟）：文件数据元（例如权限等）最后一次修改时间。

除非你确切地知道你想要的时间，否则可能需要在 + （大于）或 - （小于）的后面加上数字。

/home/nijun/images目录中文件:
![](http://pabfn7ecx.bkt.clouddn.com/find/find-ls.png)

**实例：25. 查找3天以前被修改过的所有文件**
命令：`find . -mtime +3`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-mtime-after.png)

**实例：26. 查找5天以内被访问过的所有文件**
命令：`find . -atime -5`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-atime-before.png)

**实例：26. 查找恰好4天前访问过的文件**
命令：`find . -atime 4`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-atime.png)

**实例：27. 查找2-7天前访问过的文件**
描述：在当前目录中查找两天以前，七天以内的文件。
命令：`find . -mtime +2 -mtime -7`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-mtime-between.png)

**实例：28. 查找在1小时之内改变过（Changed）的文件或目录**
描述：在当前目录查找在1小时之内改变过的文件或目录，mmin和amin同理。
命令：`find . -cmin -60`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-c.png)


**实例：30. 查找比某个文件新或旧的文件**
一般形式：newest_file_name ! oldest_file_name
描述：查找更改时间比文件brooke-lark-275181.jpg新但比文件abc.txt旧的所有文件。
命令：`find . -type f -newer brooke-lark-275181.jpg ! -newer abc.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-newer.png)

**实例：30. 新建指定时间戳文件查找时间范围内的文件**
描述：使用touch -t命令新建一个自定义时间戳（6月6日8点30分）的文件，用来满足时间范围查找的要求。然后查找比这个文件更新的文件或目录。
命令：`touch -t 06060830 dstamp`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-touch.png)

命令：`find . -newer det/dstamp  -print`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/find/find-newfile-newer.png)

**实例：30. 筛选出上周拍的照片**
描述：在/home/nijun目录下，忽略大小写地查找以.jpeg和.jpg为后缀的，修改时间在七天以内的所有文件。
命令：`find /home/nijun -iname '*.jpeg' -o -iname '*.jpg' -type f -mtime -7`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-images.png)


## 第五部分：根据大小查找文件和目录

形式：`find . -type f -size 文件大小单元`

文件大小单元：

- b —— 块（512字节）
- c —— 字节
- w —— 字（2字节）
- k —— 千字节
- M —— 兆字节
- G —— 吉字节

**实例：31. 查找文件大小恰好等于31MB的所有文件**
描述：在当前目录下查找文件大小恰好等于31MB的所有文件。
命令：`find . -size 31M`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-size.png)

**实例：31. 查找文件大小小于10MB的文件**
描述：在当前目录下查找文件大小小于10MB的所有文件。
命令：`find . -size 10M`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-size-smaller.png)

**实例：31. 查找文件大小大于5MB的文件**
描述：在当前目录下查找文件大小大于5MB的所有文件。
命令：`find . -size +5M`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-size-bigger.png)

**实例：32. 查找所有大小在5MB-10MB之间的文件**
描述：在当前目录下查找文件大小在5MB到10MB的所有文件。
命令：`find . -size +5M -size -10M`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-size-between.png)

**实例：33. 查找并删除巨大的（假设大于1G）文件**
描述：-delete选项可以代替rm命令删除查找到的文件。
命令：`find . -size +1G -exec rm -rf {} \;`
或者：`find . -size +1G -delete`

**实例：34. 查找指定文件并删除**
描述：查找以.mp3为后缀，文件大于10M（-size +10M）的所有文件（-type f），并执行（-exec）删除命令删除之。
命令：`find . -type f -name *.mp3 -size +10M -exec rm {} \;`

## 第六部分：根据文件内容或路径查找

**实例：35. 根据文件内容查找**
描述：查找当前目录下的所有文件中，内容含有hello的所有行。
命令：`find . -type f -name "*" | xargs grep "hello"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-type-f-xargs-grep.png)

**实例：36. 匹配文件路径或者文件**
描述：查找/usr目录下所有路径中带有local字样的文件或目录。
命令：`find /usr/ -path "*local*"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-path.png)


**实例：37. 基于正则表达式匹配文件路径**
描述：用-regex查找以.txt或.mp3结尾的文件。-iregex则是忽略大小写。
命令：`find . -regex ".*\(\.txt\|\.mp3\)$"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-regex.png)


**实例：38. 使用mount选项**
描述：在当前的文件系统中查找文件（不进入其他文件系统）查找以.txt结尾的文件。
命令：`find . -mount -name "*.txt"  -print`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/find/find-mount.png)


## 第七部分：借助exec或ok选项来执行shell命令


**实例：38. 与chown命令结合使用**
描述：找出当前目录下所有root的文件，并把所有权更改为用户jack。 {} 用于与 -exec 选项结合使用来匹配所有文件，然后会被替换为相应的文件名。
命令：`find . -type f -user root -exec chown jack {} \;`


**实例：39. 与rm命令结合使用**
描述：找出当前目录下最近一天内修改的所有文件并删除它们。-ok 和 -exec 行为一样，不过它会给出提示，是否执行相应的操作。按y键删除文件，按n键不删除。
命令：`find . -mtime -1 -ok rm {} \;`

![](http://pabfn7ecx.bkt.clouddn.com/find/find-ok-rm.png)


**实例：40. 与cat命令结合使用**
描述：查找当前目录下所有.txt文件并把他们拼接起来写入到all.txt文件中。
命令：`find . -type f -name "*.txt" -exec cat {} \; > all.txt`

**实例：41. 与cp结合使用**
描述：查找当前目录下30天以前并且以.log结尾的文件，将它们拷贝到./old目录中。
命令：`find . -type f -mtime +30 -name "*.log" -exec cp {} old \;`

**实例：41. 与grep结合使用**
描述：查找/etc目录下名字带有passwd的文件中，含有nijun字样的内容。
命令：`find /etc -name "passwd*" -exec grep "nijun" {} \;`

![](http://pabfn7ecx.bkt.clouddn.com/find/find-grep.png)

**实例：42. 与printf结合使用**
描述：找出当前目录下所有.txt文件并以“File:文件名”的形式打印出来。
命令：`find . -type f -name "*.txt" -exec printf "File: %s\n" {} \;`

**实例：43. 执行多条命令**
描述：因为单行命令中-exec参数中无法使用多个命令，以下方法可以实现在-exec之后接受多条命令。
命令：`-exec ./text.sh {} \;`

**实例：44. 搜索但跳出指定的目录**
描述：查找当前目录或者子目录下所有.txt文件，但是跳过子目录output。
命令：`find . -path "./output" -prune -o -name "*.txt" -print;`


