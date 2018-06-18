---
title: Linux head总结
date: 2018-06-13 10:16:29
tags: Linux
---

head命令用于显示来自文件或者管道开头的内容。

<!-- more -->
## 命令功能

head命令用于显示来自文件或者管道开头的内容。默认情况下，head命令显示文件的头10行内容。支持多文件处理，在输出每个文件之前都有一个标识文件名的标题。如果未指定文件，或者文件被指定为破折号「-」，则head命令从标准输入中读取。

![](http://pabfn7ecx.bkt.clouddn.com/head/head-man.png)

## 命令格式

`head [选项] [文件]`

## 命令选项

- -n, --bytes=[-]*num*：指定显示头部内容的行数；
- -c, --lines=[-]*num*：指定显示头部内容的字节数；
- -v, --vervose：总是显示文件名的头信息；
- -q, --quirt, --silent：不显示文件名的头信息。
- --help：显示一段帮助信息后退出。
- --version：打印版本后退出。

上面选项中的*num*可能有一个乘数后缀：

- b：512
- kB：1000
- K：1024
- MB：1000*1000
- M：1024*1024
- GB：1000\*1000\*1000
- G：1024\*1024\*1024

还有T，P，E，Z，Y等等。

## 实用示例

**实例：1. 查看文件的前十行**
描述：查看words文件的前10行。默认情况下，head命令显示文件的头10行内容。
命令：`head /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head.png)

**实例：2. 限制要显示的行数**
描述：显示words文件的前3行。-n选项限制要显示的行数。
命令：
`head -n 3 /usr/share/dict/words`
`head -3 /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-n.png)

描述：显示words文件的前1000行。可以在num后加上后缀，例如：b，KB，K等等。
命令：`head -n 1K /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-n-1K.png)


**实例：3. 限制要显示的字节数**
描述：显示words文件的前16个字节。-c选项限制显示的字节数。
命令：`head -c 16 /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-c.png)

**实例：4. 显示多个文件**
描述：显示多个文件的前十行，同时标题会显示哪个文件正在显示。
命令：`head /usr/share/dict/words /usr/share/dict/propernames`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-multi-file.png)

描述：显示多个文件和标准输入的前三行，同时标题会显示哪个文件正在显示。
命令：`head -n 3 /usr/share/dict/words /usr/share/dict/propernames -`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-standard-input.png.png)

**实例：5. 多个文件不显示标题**
描述：显示多个文件的前十行，不显示正在显示文件的标题。
命令：`head -q /usr/share/dict/words /usr/share/dict/propernames`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-q.png)

**实例：6. 与管道配合使用**
描述：显示/etc/目录下的最近修改的前5个文件或文件夹。head命令可以接受其他命令通过管道传送过来的信息。
命令：`ls -t /etc/ | head -n 5`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/head/head-pipe.png)
