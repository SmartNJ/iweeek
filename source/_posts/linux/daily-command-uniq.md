---
title: Linux uniq总结
date: 2018-06-12 08:53:22
tags: Linux
---

uniq命令用于报告或忽略文件中的重复行。

<!-- more -->
## 命令功能

uniq命令可以轻松地从文件中找到重复的行，而且可以删除重复项，显示重复项出现的次数，只显示重复的行，只显示唯一的行。
请注意，除非重复行是相邻的，否则uniq不会删除它们。因此可能需要先对它们进行排序，或将排序命令与uniq组合使用。

## 命令格式

`uniq [选项] [文件]`

## 命令选项

- -c或——count：在每列旁边显示该行重复出现的次数；
- -d或--repeated：仅显示重复出现的行列；
- -f<栏位>或--skip-fields=<栏位>：忽略比较指定的栏位；
- -s<字符位置>或--skip-chars=<字符位置>：忽略比较指定的字符；
- -u或——unique：仅显示出一次的行列；
- -w<字符位置>或--check-chars=<字符位置>：指定要比较的字符。


## 实用命令

**实例：1. 默认情况**
描述：uniq命令删除了给定文件中所有连续重复的行。可以看到输出中，第1行和第3行重复了，第2行和第5行重复了。这是因为uniq命令只有在相邻的情况下才会删除重复的行
命令：`uniq device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq.png)

**实例：2. 删除所有重复的行**
描述：经过排序之后，所有相同的行都连续地排在一起，达到了删除所有行的目的。
命令：
`sort -u device`
`sort device | uniq`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-sort.png)


**实例：3. 仅显示不连续重复的单一行**
描述：只显示device中不连续重复的单一行，只有10:aaa:43是唯一的。
命令：`uniq -u device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-u.png)


**实例：4. 找出重复的行**
显示device文件中连续出现的重复行。同样，不连续重复的相同行是不重复的行。

描述：33:fff:221出现了两次，因为它们不是连续的。
命令：`uniq -d device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-d.png)

描述：在device文件中的第一行插入一行11:eee:49，但输出中没有出现，因为它们不是连续的。
命令：
`vim device <修改文件>`
`uniq -d device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-d5.png)

描述：先排序，然后真正找出重复的行。
命令：`sort device | uniq -d`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-d3.png)

描述：先排序，然后将所有重复的行全部显示出来。
命令：`sort device | uniq -D`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-d4.png)

**实例：5. 统计各行在出现的次数**
描述：-c选项统计device文件中各行重复的次数。
命令：`uniq -c device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-c.png)

描述：下面的例子，检查给定文件中每一行重复出现的行数。
命令：`sort device | uniq -c | sort -nr`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-c-sort.png)

**实例：6. 将比较限制为N个字符**
描述：只比较每行的第一个字符。输出中可以看到，前两行被当做相同的行。-d选项将比较限制为N个字符。
命令：`uniq -d -w 1 device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-w.png)

**实例：7. 忽略N个字符后比较**
描述：下面的命令将忽略在文件中每行的前七个字符后，再进行比较。-s选项来忽略比较前N个字符。
命令：`uniq -d -s 7 device`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-s.png)

**实例：8. 忽略N个字段后比较**

描述：先将device文件的内容排序后，用awk格式化输出。-t和-F指定sort和awk的域分隔符。
命令：`sort -t: device | awk -F: '{print $1" "$2" "$3}'`

描述：忽略两个字段后进行比较。从输出中看到，第三个字段只有49和221是重复的。-f选项指定忽略N个字段后，再进行比较。
命令：`sort -t: device | awk -F: '{print $1" "$2" "$3}' | uniq -d -f 2`

输出：
![](http://pabfn7ecx.bkt.clouddn.com/uniq/uniq-f.png)





