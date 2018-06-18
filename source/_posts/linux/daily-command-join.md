---
title: Linux join总结
date: 2018-06-12 16:59:13
tags: Linux
---

join命令用来将两个分类文本文件的行连在一起。与SQL语言中的join命令相似。

<!-- more -->
## 命令功能

join命令根据两个分类文本文件的两个相同字段，将两个文件连接起来，结果写入标准输出。默认连接字段是由空格分隔的第一个字段。

## 命令格式

`join [选项] 文件1 文件2`

## 命令选项

- -a<1或2>：除了显示原来的输出内容之外，还显示指令文件中没有匹配的行。
- -e<字符串>：若[文件1]与[文件2]中找不到指定的栏位，则在输出中填入选项中的字符串。
- -i或--ignore-case：比较栏位内容时，忽略大小写的差异。
- -o<格式>：按照指定的格式来显示结果。
- -t<字符>：使用栏位的分割字符。
- -v<1或2>：更-a相同，但是只显示文件中没有匹配的行。
- -1<栏位>：连接[文件1]指定的栏位。
- -2<栏位>：连接[文件2]指定的栏位。


## 实用命令

**实例：1. 相同域连接**
描述：将foodtype.txt和foods.txt两个文件共享的第一个字段作为连接字段，将文件连接起来。
命令：`join foodtype.txt foods.txt` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-two-file.png)


**实例：2. 不同域连接**
描述：将wine.txt的第二列和reviews.txt的第一列连接起来。也可以使用-j选项，即-j1 2 -j2 1。
命令：`join -1 2 -2 1 wine.txt reviews.txt` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-1-2.png)

**实例：3. 先排序再连接**

描述：如果上述两个文件指定的文件未排序，那么在连接的时候会发生错误。
命令：`join -1 2 -2 1 wine.txt reviews.txt` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-sort-file.png)


描述：先按wine.txt的第二列排好序，再按reviews的第一列排好序，最后将两个排好序的文件连接起来。
命令：`join -1 2 -2 1 <(sort -k 2 wine.txt) <(sort reviews.txt)` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-sort.png)


**实例：4. 指定字段分隔符**
描述：将names.csv和transactions.csv两个文件指定分隔符为，号进行连接，-t选项指定字段分隔符。
命令：`join -1 2 -2 3 -t , names.csv transactions.csv` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-t.png)


**实例：5. 指定显示的字段**
描述：-o选项指定连接的输出格式。
命令：`join -1 2 -2 3 -t , -o 1.1,1.2,1.3,2.2,2.1 names.csv transactions.csv` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-o.png)

**实例：6. 用默认字符串代替未匹配的字段**
描述：-e选项告诉join当找不到匹配项的时候应该用什么字符串来替换空位，-o选项告诉join哪些不匹配的字段应该被代替。-e只能与-o搭配使用。

- 0,1.1,2.2：0表示匹配的关键字段。
	- 1.1：表示第一个文件中第一个字段。
	- 2.2：表示第二个文件中第二个字段。

命令：
`join -a 1 -a 2 -e "NULL" -o 1.1,1.2,2.2 foods.txt foodtype.txt` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-e.png)


**实例：7. 显示匹配和不匹配的行**
描述：既显示成功匹配的行，也显示两个文件中不匹配的所有行。-a选项可选值为1或2，分别表示前后两个文件，意思是显示指定文件中不匹配的行。
命令：
`join -a 1 foods.txt foodtype.txt` 
`join -a 2 foods.txt foodtype.txt` 
`join -a 1 -a 2 foods.txt foodtype.txt`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-a.png)


**实例：8. 只显示不匹配的行**
描述：只两个文件中不匹配的所有行。-v选项可选值为1或2，分别表示前后两个文件，意思是只显示指定文件中不匹配的行，将忽略已匹配连接的行。
命令：
`join -v 1 -v 2 foods.txt foodtype.txt` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/join/join-v.png)


