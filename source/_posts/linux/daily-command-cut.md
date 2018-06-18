---
title: Linux cut总结
date: 2018-06-13 8:12:02
tags: Linux
---

cut命令用来从标准输入或文本文件中剪切列或域。

<!-- more -->
## 命令功能

cut命令用来显示行中的指定部分，删除文件中指定字段。它也可以用于按字节位置、字符和分隔符来剪切部分行。也可以从CSV等文件格式中剪切数据。

## 命令格式

`cut [选项] 文件1 文件2`

## 命令选项

```
- -b：仅显示行中指定直接范围的内容。
- -c：仅显示行中指定范围的字符。
- -d：指定字段的分隔符，默认的字段分隔符为“TAB”。
- -f：显示指定字段的内容。
- -n：与“-b”选项连用，不分割多字节字符。
- --complement：补足被选择的字节、字符或字段。
- --out-delimiter=<字段分隔符>：指定输出内容是的字段分割符。
- --help：显示指令的帮助信息。
- --version：显示指令的版本信息。
```


## 实用示例

cut命令可以将一串字符作为列来显示：

- N-：从第N个字节、字符、字段到结尾。
- N-M：从第N个字节、字符、字段到第M个（包括M在内）字节、字符、字段。
- -M：从第1个字节、字符、字段到第M个（包括M在内）字节、字符、字段。

上面是表示法，下面的选项分别表示字节、字符、字段：

- -b：字节
- -c：字符
- -f：字段

**实例：1. 按字节位置切割**
描述：三个例子切割的分别是（1）第2个、（2）第1和第2个、（3）第2和第3个、（4）第1和第2个、（5）第1和第3个字节位置的内容。-b选项通过指定一个字节位置来切出一行的一部分。
命令：
`echo 'baz' | cut -b 2`
`echo 'baz' | cut -b -2`
`echo 'baz' | cut -b 2-`
`echo 'baz' | cut -b 1-2`
`echo 'baz' | cut -b 1,3` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/cut/cut-b.png)

**实例：2. 按字符位置切割**
描述：两个例子切割的分别是第1个和第6个、第1至3个字符位置的内容。-c选项通过指定一个字符位置来切出一行的一部分。
命令：
`echo '♣foobar' | cut -c 1,6`
`echo '♣foobar' | cut -c 1-4`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/cut/cut-c.png)


**实例：3. 根据分隔符进行剪切**
描述：两个例子以逗号,作为分隔符进行切割，切割的分别是第1个、第1和第4个字段位置的内容。-d选项指定一个分隔符，-f选项指定选取的字段。
命令：
`cut -d , -f 1 names.csv`
`cut -d , -f 1,4 names.csv`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/cut/cut-d-f.png)


**实例：4. 提取指定字段之外的列**
描述：第一个例子选取第1个字符之外的其他字符，第二个例子选取第2个字段之外的列。--complement用于提取指定字段之外的字节、字符或列。
命令：
`echo 'foo' | cut --complement -c 1`
`cut -f2 -d, --complement names.csv`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/cut/cut-complement.png)


**实例：5. 输出分隔符**
描述：选取第1、3、4个字段，并用空格替换分号后显示。或者使用$'\n'的形式替换为换行。
命令：
`echo 'how;now;brown;cow' | cut -d ';' -f 1,3,4 --output-delimiter ' '`
`echo 'how;now;brown;cow' | cut -d ';' -f 1,3,4 --output-delimiter $'\n'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/cut/cut-output-delimiter.png)
