---
title: Linux touch总结
date: 2018-05-11 07:53:08
tags: Linux
---

Linux 中的每个文件都与时间戳相关联，而且每个文件都存储上次访问时间，上次修改时间，上次更改时间的信息。因为，无论何时创建一个新文件，访问或者修改现有文件，时间戳都会被自动更新。

本篇将介绍几个 **touch** 命令的实用例子，touch 命令是 Unix/Linux 下的一个标准的程序，常常被用来创建，更改和修改一个文件的时间戳。在此之前，先来看一下 touch 命令的选项（options）。

<!-- more -->

- -a，只改变访问时间
- -c，如果文件不存在，那就不创建
- -d，更新访问时间和修改时间
- -m，只改变修改时间
- -r，使用访问时间和修改时间
- -t，用指定的时间创建文件



# 1、创建一个空（0字节）文件 

```shell
# touch sheena
```
# 2、创建多个文件

```shell
# touch sheena meena leena
```

# 3、更改文件访问（Access）时间和修改（Modification）时间
要更改或更新名为 leena 文件的上次访问和修改时间，请用 `-a` 选项，以下命令设置文件的当前时间和日期，如果 leena 文件不存在，它将创建新的空文件。

```shell
# touch -a leena
```
find 命令和 ls 命令使用时间戳来列出和查找文件。

# 4、避免创建新文件

```shell
# touch -c leena
```

# 5、更改文件修改时间
如果想要更改名为 leena 文件的唯一修改时间，请使用 `-m` 选项，它只会更新文件的最后修改时间（不是访问时间）。

```shell
# touch -m leena
```

# 6、明确设置访问和修改时间
可以使用touch命令使用 `-c` 和 `-t` 选项明确设置时间

```shell
# touch -c -t YYMMDDhh leena
```
例如创建一个当前年（2018）12 月 10 日 17:30 作为时间戳的文件

```shell
# touch -c -t 12101730 leena
```

# 7、使用另一个文件的时间戳
使用 `-r` 选项将使用 leena 文件的时间戳更新 meena 文件的时间戳，这两个文件有相同的时间戳。

```shell
# touch -r leena meena
```
# 8、使用指定的时间戳创建一个文件

```shell
# touch -t YYMMDDHHMM.SS tecmint
```
例如我要创建一个文件，时间戳是 2012 年 12 月 10 日 18:30:55。

```shell
# touch -t 201212101830.55 tecmint
```


--------

References:

- https://www.tecmint.com/8-pratical-examples-of-linux-touch-command/