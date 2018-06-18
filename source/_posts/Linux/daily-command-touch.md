---
title: Linux touch总结
date: 2018-06-14 13:12:08
tags: Linux
---

touch命令用来创建文件，也可以更改和修改一个文件的时间戳。Linux中的每个文件都与时间戳相关联，而且每个文件都存储上次访问时间，上次修改时间，上次更改时间的信息。因为，无论何时创建一个新文件，访问或者修改现有文件，时间戳都会被自动更新。

<!-- more -->

## 命令功能

touch命令用来修改文件的时间戳。

![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-man.png)

## 命令格式

`touch [选项] [参数]`

## 命令选项
Linux中的文件有三个时间：

- access time（atime）：访问时间，对一次文件的内容就会更新。例如cat，vi/vim，cp，touch命令。
- modification time（mtime）：修改时间，对文件内容修改一次就会更新。例如touch，vi/vim命令。
- status time（ctime）：状态改动时间。通过chmod/chown/chgrp等命令更改一次文件属性，通过touch准确地修改时间等，这个时间就会更新。例如mv，touch，chmod/chown/chgrp，vi/vim等命令。

touch命令选项：

- -a，只改变访问时间。
- -c，如果文件不存在，那就不创建。
- -d，更新访问时间和修改时间。
- -m，只改变修改时间。
- -r，将参照文件ref_file相应的时间戳作为指定文件file时间戳的新值。
- -t，用指定的时间创建文件，格式是[[CC]YY]MMDDhhmm[.SS]。CCYY的范围在1969~2068之内。SS为秒数，范围在0~61之间，这样可以处理闰秒。由于系统的限制，早于1970年1月1日的时间是错误的。

### 示例：1. 创建空文件

描述：若文件不存在，使用touch命令可以轻松地创建一个空文件，或是创建多个。如果文件已存在，那么文件的3个时间：修改时间（mtime）、状态改动时间（ctime）和访问时间（atime）都会被更新为当前时间。stat命令可以查看文件时间。
命令：
`touch my_one`
`stat my_one`
`touch my_one my_two my_three`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch.png)

### 示例：2. 只改变文件的修改时间（mtime）和状态改动时间（ctime）

描述：只改变my_three文件的修改时间为当前时间，同时状态改动时间会在命令执行后更新为当前时间。这个操作并不需要修改文件内容。-m选项只更改文件的修改时间。
命令：`touch -m my_three`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-m.png)

### 示例：3. 只改变文件访问时间（atime）和状态改动时间（ctime）
描述：只改变my_three文件的访问时间为当前时间，同时状态改动时间会在命令执行后更新为当前时间。如果文件不存在，会创建新的空文件。-a选项只更改文件的访问时间。
命令：`touch -a my_three`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-a.png)

### 示例：4. 指定文件的访问时间和修改时间
描述：同时设置文件的访问时间和修改时间为指定时间，同时会更新状态改变时间为当前命令执行后的时间。如果文件不存在，会创建新的空文件。-d选项同时改变文件的访问时间和修改时间。
命令：`touch -d "2018-06-14 14:00:00" my_three`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-d.png)


描述：将my_three文件的访问时间和修改时间修改成两天前。touch还支持像date命令那样修改文件的时间。
命令：`touch -d "2 days ago" my_three`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-d-date.png)


### 示例：5. 避免创建新文件
描述：更新atime、ctime、mtime，如果文件不存在，-c选项不会创建新的文件。
命令：`touch -c leena`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-a.png)


### 示例：6. 使用另一个文件的时间戳
描述：-r选项将my_three的时间戳作为my_two文件的时间戳的新值，这两个文件有相同的时间戳。
命令：`touch -r my_three my_two`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-r.png)


### 示例：7. 使用指定的时间戳创建一个文件

描述：将my_four文件的时间戳指定为1997年6月14日17点00分55秒。时间格式是[[CC]YY]MMDDhhmm[.SS]。
命令：`touch -t 199706141700.55 my_four`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/touch/touch-t.png)
