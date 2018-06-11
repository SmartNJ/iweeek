---
title: Linux pipe总结
date: 2018-06-09 19:39:41
tags: Linux
---

管道能把一个命令的输出传递给另一个命令作为输入。管道用竖杠|表示.

<!-- more -->
## 命令格式

`命令1|命令2`

## 命令功能

管道能处理经由前面一个指令传出的正确输出信息，即standard output信息，但对于standard error信息没有直接处理能力。然后传递给下一个命令，作为标准的输入standard input，管道右边的命令必须能够接收标准输入流命令。

能接收标准输入的命令才可以用在管道右边，否则传递过程中数据会被抛弃。常用来接收数据管道命令有：sed，awk，cut，head，top，less，more，wc，join，sort，split等等。

## 管道命令与重定向的区别

1. 左边的命令应该有标准输出 | 右边的命令应该接受标准输入
   左边的命令应该有标准输出 > 右边只能是文件
   左边的命令应该需要标准输入 < 右边只能是文件
   
2. 管道触发两个子进程执行|两边的程序，而重定向时在一个进程内执行。


## 实用命令

**实例：1. 重定向**
描述：重定向符号，右边只能是文件（普通文件，文件描述符，文件设备）。
命令：`grep -n 'Hello' < find.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/pipe/redirect-grep.png)

**实例：1. 管道**
描述：管道两边都必须是shell命令。
命令：`cat find.txt | grep -n 'Hello'`
输出：

![](http://p9xqnn501.bkt.clouddn.com/pipe/pipe-grep.png)




