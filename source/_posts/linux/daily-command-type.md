---
title: Linux type总结
date: 2018-06-13 08:56:25
tags: Linux
---

type命令用于查找Linux命令的信息。顾名思义，它可以轻松找出给定的命令是否是别名、shell内置命令、文件、函数或关键字。另外，也可以找到命令的实际路径。

<!-- more -->
## 命令功能

type命令用来显示指定命令的类型，可以轻松找出给定的命令是否是别名、shell内置命令、文件、函数或关键字。另外，也可以找到命令的实际路径。

## 命令格式

`type [选项] 命令`

## 命令选项

- -t：仅找出 Linux 命令的类型，输出“file”、“alias”或者“builtin”，分别表示给定的指令为“外部指令”、“命令别名”或者“内部指令”。
- -p：如果给出的指令为外部指令，则显示其绝对路径。
- -a：在环境变量“PATH”指定的路径中，显示给定指令的信息，包括命令别名。

## 命令类型

- alias：别名。
- keyword：函数，Shell保留字。
- function：函数，Shell函数。
- builtin：内建命令，Shell内建命令。
- file：文件，磁盘文件，外部命令。
- unfound：没有找到。

## 实用示例

**实例：1. 仅找出Linux命令的类型**
描述：-t选项仅找出Linux命令的类型。例如别名，它不显示被别名的内容。如果该命令找不到，你将在终端中看不到任何内容。
命令：
`type -t ls`
`type -t mkdir`
`type -t pwd`
`type -t if`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/type/type-t.png)

**实例：2. 找出命令的绝对路径**
描述：-p选项可以找出给定Linux命令的绝对路径，这与which命令很像。如果给定的命令是别名、内建命令或是函数，则不会打印任何内容。在这种情况下，-P选项将强制查找路径查找。
命令：
`type -p date`
`type -p cat`
`type -p pwd`
`type -P pwd`
`which pwd`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/type/type-p-P.png)

**实例：3. 显示命令的所有信息**
描述：-a选项显示命令的所有信息，包括给定命令的类型及其绝度路径。
命令：
`type -a ls`
`type -a echo`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/type/type-a.png)



