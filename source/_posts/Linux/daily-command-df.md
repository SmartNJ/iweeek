---
title: Linux df总结
date: 2018-06-11 06:16:12
tags: Linux
---

df（disk filesystem 的简称）用于显示 Linux 系统的磁盘利用率。


<!-- more -->
## 命令格式
df [选项] [文件]

## 命令功能
显示文件系统磁盘空间使用情况。默认显示单位为KB。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

## 命令参数

- -a或--all：全部文件系统列表。
- -h或--human-readable：方便阅读方式显示。
- -H或--si：等于“-h”，但是计算式，1K=1000，而不是1K=1024。
- -i或--inodes：显示inode信息。
- -k或--kilobytes：区块为1024字节。
- -l或--local：只显示本地文件系统。
- -m或--megabytes：区块为1048576字节。
- --no-sync：忽略sync命令。
- -P或--portability：输出格式为POSIX。
- --sync：在取得磁盘信息前，先执行sync命令。
- -T或--print-type：文件系统类型。
- --block-size=<区块大小>：指定区块大小。
- -t<文件系统类型>或--type=<文件系统类型>：只显示选定文件系统的磁盘信息。
- -x<文件系统类型>或--exclude-type=<文件系统类型>：不显示选定文件系统的磁盘信息。
- --help：显示帮助信息。
- --version：显示版本信息。

## 实用命令

**实例：1. 检查文件系统磁盘空间使用情况**
描述：显示设备名称、总块数、总磁盘空间、已用磁盘空间、可用磁盘空间和文件系统上的挂载点。
命令：df
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df.png)


**实例：2. 以人类可读的格式显示磁盘使用情况**
描述：以人类可读格式显示信息。
命令：df -h
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-h.png)

**实例：3. 检查所有文件系统磁盘使用空间信息**
描述：与上述相同，但它也显示虚拟文件系统的信息以及所有文件系统磁盘使用情况和内存使用情况。
命令：df -a
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-a.png)


**实例：4. 显示文件系统的类型**
描述：以人类可读格式（h）显示文件系统的类型（T）信息。
命令：df -hT
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-hT.png)



**实例：5. 检查特定分区的信息**
描述：-hT将以可读格式显示/root的信息。
命令：df -hT /root
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-hT-path.png)

**实例：6. 筛选指定的文件系统类型**
描述：筛选文件系统类型为ext4的磁盘使用情况。
命令：df -t ext4 -hT
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-t.png)

**实例：7. 排除指定的文件系统类型**
描述：排除文件系统类型为ext4的磁盘，显示剩下的磁盘类型使用情况。
命令：df -x ext4 -hT
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-x.png)


**实例：8. 显示文件系统的inodes信息**
描述：-i选项显示文件系统使用的inode数量及其百分比的信息。
命令：df -i
输出：

![](http://p9xqnn501.bkt.clouddn.com/df/df-i.png)

