---
title: Linux IO Redirection总结
date: 2018-06-09 20:40:05
tags: Linux
---

一个文件描述符就是文件系统为了跟踪这个打开的文件而分配给它的一个数字，可以将其理解为文件指针的一个简单版本，与C语言中的文件句柄的概念类似。
Linux中默认情况下始终有3个「文件」处于打开状态，分别是stdin（键盘）、stdout（屏幕）和stderr（错误消息输出到屏幕上）。这3个文件和其他打开的文件都可以被重定向。重定向，就是捕捉一个文件、命令、程序、脚本，或者是脚本中的代码块的输出，然后将这些输出作为输入发送到另一个文件、命令、程序或脚本中。
每个打开的文件都会分配一个文件描述符。stdin、stdout和stderr的文件描述符分别是0、1和2。除了这3个文件，对于其他需要打开的文件，保留了文件描述符3到9。在某些情况下，将这些额外的文件描述符分配给 stdin、stdout 或 stderr 作为临时的副本链接是非常有用的。在经过复杂的重定向和刷新之后需要把它们恢复成正常状态。

<!-- more -->

## 命令格式

`命令1|命令2`

## 命令列表

command > filename：把标准输出重定向到一个新文件中。
command >> filename：把标准输出重定向到一个文件中（追加）。
command 1 > filename：把标准输出重定向到一个文件中。
command > filename 2>&1：把标准输出和标准错误一起重定向到一个文件中。
command 2 > filename：把标准错误重定向到一个文件中。
command 2 >> filename：把标准错误重定向到一个文件中（追加）。
command >> filename 2>&1：把标准输出和标准错误一起重定向到一个文件中（追加）。
command < filename > filename2：command命令以filename文件作为标准输入，以filename2文件作为标准输出。
command < filename：command命令以filename文件作为标准输入。
command << delimiter：从标准输入中读入，直至遇到delimiter分界符。
command <& m：把文件描述符m作为标准输入。
command >& m：把标准输出重定向到文件描述符m中。
command <&-：关闭标准输入。

## 实用命令

**实例：1. > file**
描述：将ls命令的stdout重定向到dir-tree.list文件。如果这个文件不存在，那就创建它，否则就覆盖。
命令：`ls -lR > dir-tree.list`
输出：

![](http://p9xqnn501.bkt.clouddn.com/redirection/redirection->.png)

描述：清空文件。>将会把文件dir-tree.list变为一个空文件（size为0）。如果文件不存在，那会创建一个0长度的文件（与touch的效果相同）。:是一个占位符，不产生任何输出。也可以省略:占位符。
命令：`: > dir-tree.list`
或者：`> dir-tree.list`
输出：

![](http://p9xqnn501.bkt.clouddn.com/redirection/redirection-clear.png)

**实例：1. >> file**
描述：将stdout重定向到一个文件。如果文件不存在，那么就创建它，如果存在，那么就追加到文件后边。
命令：
```
script.sh 1 > filename
# 重定向 stdout 到文件"filename".
script.sh 1 >> filename
# 重定向并追加 stdout 到文件"filename".
script.sh 2 > filename
# 重定向 stderr 到文件"filename".
script.sh 2 >> filename
# 重定向并追加 stderr 到文件"filename".
```

**实例：1. &> afile**
描述：将ls命令的stdout重定向到dir-tree.list文件。如果这个文件不存在，那就创建它，否则就覆盖。
命令：`ls -lR > dir-tree.list`
输出：


![](http://p9xqnn501.bkt.clouddn.com/redirection/redirection-clear.png)

