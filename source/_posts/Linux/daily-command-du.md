---
title: Linux du总结
date: 2018-06-11 05:50:41
tags: Linux
---

Linux中du（disk usage 的简称）命令用于检查计算机上文件和目录的磁盘使用情况，可以递归显示文件和目录。

<!-- more -->
## 命令格式
du [选项] [文件]

## 命令功能
显示每个文件和目录的磁盘使用空间。

## 命令参数
- -a或-all：显示目录中个别文件的大小。   
- -b或-bytes：显示目录或文件大小时，以byte为单位。   
- -c或--total：除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。 
- -k或--kilobytes：以KB(1024bytes)为单位输出。
- -m或--megabytes：以MB为单位输出。   
- -s或--summarize：仅显示总计，只列出最后加总的值。
- -h或--human-readable：以K，M，G为单位，提高信息的可读性。
- -x或--one-file-xystem：以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。 
- -L<符号链接>或--dereference<符号链接>：显示选项中所指定符号链接的源文件大小。   
- -S或--separate-dirs：显示个别目录的大小时，并不含其子目录的大小。 
- -X<文件>或--exclude-from=<文件>：在<文件>指定目录或文件。   
- --exclude=<目录或文件>：略过指定的目录或文件。    
- -D或--dereference-args ：显示指定符号链接的源文件大小。   
- -H或--si：与-h参数相同，但是K，M，G是以1000为换算单位。   
- -l或--count-links：重复计算硬件链接的文件。  


## 实用命令


**实例：1. 找出 `/root` 目录树及其每个子目录的磁盘使用情况摘要**
描述：以下命令的输出显示了 `/root` 目录以及其子目录的磁盘块数。
命令：du /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-path.png)


**实例：2. 以人类可读格式也就是 kb、mb 等显示文件/目录大小**
命令：du -h /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-h-path.png)

**实例：3. 目录的总磁盘使用大小摘要**
命令：du -s /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-s-path.png)



**实例：4. 所有文件和目录的磁盘使用情况**
命令：du -a /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-a-path.png)


**实例：5. 总的使用磁盘空间**
描述：-c选项在最后一行提供了一个总的使用磁盘空间。
命令：du -c /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-c-path.png)


**实例：6. 排除给定模式的文件或目录**
描述：在计算/root的总大小时排除.ssh文件。
命令：du -h --exclude=".ssh" /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-h-exclude-path.png)

**实例：7. 根据修改时间显示磁盘使用情况**
描述：在计算/root的总大小时排除.ssh文件。
命令：du -h --exclude=".ssh" /root
输出：

![](http://pabfn7ecx.bkt.clouddn.com/du/du-time.png)


