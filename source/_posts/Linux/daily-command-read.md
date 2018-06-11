---
title: Linux read总结
date: 2018-06-10 21:36:30
tags: Linux
---

read命令从键盘或文件的某一行文本中读入信息，并将其赋给一个变量。

<!-- more -->

## 命令格式

`read 变量1 [变量2...]`

## 命令功能

read命令从键盘或文件的某一行文本中读入信息，并将其赋给一个变量。在read命令后面，如果只指定了一个变量，那么read会把所有的输入赋给该变量，直至遇到第一个文件结束符或回车。如果没有指定变量名，读取的数据将被自动赋值给特定的变量REPLY。

## 命令参数

- -a：后跟一个变量，该变量会被认为是个数组，然后给其赋值，默认是以空格为分割符。
- -d：后面跟一个标志符，其实只有其后的第一个字符有用，作为结束的标志，会举例说  明。
- -p：后面跟提示信息，即在输入前打印提示信息。
- -e：在输入的时候可以时候命令补全功能。
- -n：后跟一个数字，定义输入文本的长度，很实用。
- -r：屏蔽\，如果没有该选项，则\作为一个转义字符，有的话\就是个正常的字符了。
- -s：安静模式，在输入字符时不再屏幕上显示，例如login时输入密码。
- -t：后面跟秒数，定义输入字符的等待时间。
- -u：后面跟fd，从文件描述符中读入，该文件描述符可以是exec新开启的。
## 实用命令

**实例：1. 从标准输入读取输入并赋值给变量**
描述：从标准输入读取输入并赋值给变量name。
命令：`read name` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-var.png)

**实例：2. 读入并赋给多个变量**
描述：从标准输入读取输入到第一个空格或者回车，将输入的第一个单词放到变量one中，并将该行其他的输入放在变量two中。
命令：`read one two` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-mul-var.png)

**实例：3. 未指定变量**
描述：从标准输入读取一行并赋值给特定变量REPLY。
命令：`read` 

![](http://p9xqnn501.bkt.clouddn.com/read/read.png)

**实例：4. 读入并赋给数组**
描述：把单词清单读入myarray的数组里。
命令：`read -a myarray` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-a.png)

**实例：5. 打印提示**
描述：打印提示（text），等待输入，并将输入存储在REPLY中。
命令：`read -p "text"` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-a.png)

**实例：6. 允许输入包含反斜杠**
描述：允许输入包含反斜杠。
命令：`read -r line` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-r.png)

**实例：7. 等待读取**
描述：指定读取等待时间为3秒。
命令：`read -t 3` 


**实例：8. 读取指定数量的字符**
描述：从输入中读取两个字符并存入变量var，不需要按回车读取。
命令：`read -n 2 var` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-n.png)

**实例：9. 指定结束符**
描述：用定界符“:”结束输入行。
命令：`read -d ":" var` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-d.png)

**实例：10. 终端输入密码不显示密码**
描述：终端输入密码不显示密码。
命令：`read -p "输入密码：" -s pwd` 

![](http://p9xqnn501.bkt.clouddn.com/read/read-s.png)

第二种方式
脚本：

```
#! /usr/bin/bash
stty -echo
read -p "输入密码：" pwd
stty echo
echo
echo 输入完毕。
```
![](http://p9xqnn501.bkt.clouddn.com/read/read-no-echo.png)

