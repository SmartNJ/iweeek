---
title: Linux cat总结
date: 2018-06-10 23:58:31
tags: Linux
---

cat（concatenate）命令可以创建单个或多个文件，查看文件的内容和控制字符，连接文件以及在终端或文件中重定向输出。

<!-- more -->

## 命令格式

`cat [选项] [文件]`

## 命令功能

cat（concatenate）命令可以创建单个或多个文件，查看文件的内容和控制字符，连接文件以及在终端或文件中重定向输出。
cat命令不会在文件分页处停下来，而是一下子显示完整整个文件。如果希望每次显示一页，可以使用more命令或把cat命令的输出通过管道传递到另外一个具有分页功能的命令中。

## 命令选项

- -n或-number：显示行号。
- -b或--number-nonblank：和-n相似，只不过对于空白行不编号。
- -s或--squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行。
- -A：显示不可打印字符，行尾显示$，等价于-vET。
- -v或--show-nonprinting：使用^和M-引用，除了LFD和TAB之外。
- -E或--show-ends：在每行结束处显示$。
- -e：等价于"-vE"选项。
- -T或--show-tabs 将TAB字符显示为^I。
- -t：显示 tab 分隔符，等价于"-vT"选项。

## 实用命令

**实例：1. 显示文件的内容**
描述：打印passwd文件的所有内容。
命令：`cat /etc/passwd` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-file.png)


**实例：2. 查看终端中多个文件的内容**
描述：打印linux.txt和Find.txt两个文件的内容。
命令：`cat linux.txt Find.txt`
等同于：`cat linux.txt; cat Find.txt;` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-mul-file.png)


**实例：3. 从文件中读入内容**
描述：从文件fairy中读取内容，通过cat显示到标准输出上。cat默认是加上<操作符。
命令：`cat < fairy` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-read.png)


**实例：4. 与more或less命令配合使用**
描述：输入完成后，按CTRL+D退出输入。输入的内容通过IO重定向创建文件被写入到test文件中。
命令：`cat /etc/passwd | more` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-more.png)


**实例：5. 显示行号**
描述：在打印的行前加上行号，从1开始。
命令：`cat -n fairy` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-n.png)

**实例：6. 在结尾显示`$`符号**
描述：`$`符号将出现在每行的末尾和每个空行之间，这个选项有助于压缩行数。
命令：`cat -e fairy` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-e.png)


**实例：7. 显示TAB分隔符**
描述：TAB空格将以^I显示。
命令：`cat -T test` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-T.png)


**实例：8. 通过IO重定向创建文件**
描述：输入完成后，按CTRL+D退出输入。输入的内容通过IO重定向创建文件被写入到test文件中。
命令：`cat > test` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-to-file.png)


**实例：9. 使用重定向机制追加到文件中**
描述：将文件aa的内容追加到文件bb中。
命令：`cat aa >> bb` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-append.png)

**实例：10. 重定向多个文件到一个文件中**
描述：将文件aa和bb的内容合并输入到cc文件中。若cc不存在，则创建，若存在，则覆盖它。
命令：`cat aa bb > cc` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-merge.png)

**实例：11. 重定向多个文件到一个文件中并排序**
描述：将文件aa，bb和cc的内容合并，通过管道并排序后输入到dd文件中。若dd不存在，则创建，若存在，则覆盖它。
命令：`cat aa bb cc | sort > dd` 

![](http://pabfn7ecx.bkt.clouddn.com/cat/cat-merge-and-sort.png)


