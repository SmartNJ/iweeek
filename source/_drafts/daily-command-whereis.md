---
title: Linux whereis总结
date: 2018-06-13 23:37:14
tags: Linux
---



<!-- more -->
## 命令功能

whereis命令用来定位指令的二进制程序、源代码文件、man手册页等相关文件的路径。

whereis命令在标准Linux路径下搜索，即PATH环境变量指定的目录中。

![](http://p9xqnn501.bkt.clouddn.com/whereis/whereis-man.png)

## 命令格式

`whereis [选项] 命令`

## 命令选项

- -b：只查找二进制文件。
- -m：只查找说明文件。
- -s：只查找原始代码文件。
- -u：查找不包含指定类型的文件。
- -B<目录>：只在设置的目录下查找二进制文件。
- -M<目录>：只在设置的目录下查找说明文件。
- -S<目录>：只在设置的目录下查找原始代码文件。
- -f：不显示文件名前的路径名称。


## 实用示例

**实例：1. 只查找命令的二进制程序**
描述：列出命令的二进制程序。
命令：`whereis -b pwd ls printf passwd`
输出：
![](http://p9xqnn501.bkt.clouddn.com/whereis/whereis-b.png)


**实例：1. 只查找命令的二进制程序**
描述：列出命令的二进制程序。
命令：`whereis -m pwd ls printf passwd`
输出：
![](http://p9xqnn501.bkt.clouddn.com/whereis/whereis-m.png)


**实例：1. 只查找命令的二进制程序**
描述：列出命令的二进制程序。
命令：`whereis -s pwd ls printf passwd`

