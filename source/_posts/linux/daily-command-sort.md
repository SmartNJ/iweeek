---
title: Linux sort总结
date: 2018-06-11 18:40:13
tags: Linux
---

sort是用于对单个或多个文本文件内容进行排序的Linux程序。

<!-- more -->
## 命令功能

sort命令将许多不同的域按不同的列顺序分类。sort命令以空格作为字段分隔符，将一行分割为多个关键字对文件进行排序。需要注意的是sort命令并不对文件内容进行实际的排序(即文件内容没有修改)，只是将文件内容按有序输出。

## 命令格式

`sort -cmu -o output_file [other_options] +pos1 +pos2 input_files`

## 命令选项

- -c：检查文件是否已经按照顺序排序。
- -m：将几个排序号的文件进行合并。
- -u：删除所有重复行。
- -o<输出文件>：将排序后的结果存入指定的文件。
- -b：忽略每行前面开始出的空格字符。
- -h：人类可阅读的格式。
- -d：排序时，处理英文字母、数字及空格字符外，忽略其他的字符。
- -f：排序时，将小写字母视为大写字母。
- -i：排序时，除了040至176之间的ASCII字符外，忽略其他的字符。
- -M：将前面3个字母依照月份的缩写进行排序。
- -n：按照数值的大小排序。
- -r：以相反的顺序来排序。
- -t<分隔字符>：指定排序时所用的栏位分隔字符。
- +<起始栏位>-<结束栏位>：以指定的栏位来排序，范围由起始栏位到结束栏位的前一栏位。


## 实用命令

**实例：0. 测试文件**
描述：下面是device_sort的清单，包含了用户设备登录次数情况，各域为：（1）用户ID，（2）手机系统版本，（3）登录访问次数。域分隔符为冒号。域号从0开始，第1列用户ID为域0，即分类键0，以此类推。

![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-origin-file.png)


**实例：1. 文件是否已分类**
描述：检查device文件的域用户ID是否已经有序。sort不加任何参数默认以域0（也就是第一列）进行排序，-c选项检查文件是否已按某种顺序排序。
命令：`sort -c device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-origin-file.png)


**实例：2. 使用分隔符**
描述：将device用:作为域分隔符分类，然后按第一列进行排序。实际上读文件时sort操作将行中各域进行比较，这里只返回基于第一域sort的结果。
命令：`sort -t : device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-t.png)

**实例：3. 排序求逆**
描述：反转实例2中的排序结果。这里先按照第一列进行排序，然后反转其结果。
命令：`sort -t: -r device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-r.png)


**实例：4.  使用选项k按指定列排序**
描述：使用选项k指定第1列进行排序。
命令：`sort -k1 -t: device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-k.png)


**实例：5. 数值域排序**

描述：使用n选项指明对数值内容进行排序，否则会按字符串从第一个字符开始进行比较。
命令：`sort -nk3 -t: device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-n.png)


**实例：6. 唯一性排序**

描述：使用u选项过滤所有重复的行，每个重复的行只显示一次。
命令：`sort -u -t: device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-u.png)

**实例：7. 两个文件进行排序、合并，并且删除重复行**

描述：两个文件进行排序、合并，并且删除重复行。
命令：`sort -u device device2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-u-merge.png)


**实例：8. pos用法**

格式：`F[.C][OPTS][,F[.C][OPTS]]`
解释：指定排序域开始和结束的位置，F是字段的序号，C是字符的序号，两者初始都是1，结束位置可以不指定，默认是到行结束位置。如果-t和-b选项都没有指定，那么字段中的字符从前面的空白开始计数。OPTS由一个或多个单个字母排序的选项[bdfgiMhnRrV]，它们将重写全局排序选项，如果没有排序键被指定，sort就会以一整行作为键。-b选项去除每个键的前导空白。

假设有五列字段。
-k 2：表示从第二列开始到最后一列作为排序的关键字。
-k 2,5：表示从第二列开始到第五列作为排序的关键字。
-k 2,2：表示仅以第二列作为排序的关键字。
-k 4 -k 5：-k5是多余的。
-k 2,2 -k 1,1：先以第二列进行排序，再以第一列排序。
-k 2.2,2.5 -k 4.3,4.5：先以第二列的第二个字符开始到第五个字符进行排序，然后先以第四列的第三个字符开始到第五个字符进行排序。

格式：`sort +field_number .characters_in`
描述：从第三列的第二个字符开始排序。
命令：`sort -k3.2 -t: device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-pos.png)

描述：对/root目录执行ls -l的命令，其结果通过管道传递给sort进行排序，先以第二列排序，然后第五列，最后是第九列倒序。
命令：`ls -l /root | sort -k 2,2n -k 5,5n -r -k 9,9`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-k-pos.png)


**实例：9. head和tail与sort配合使用**

格式：`sort +field_number .characters_in`
描述：以第三列的数值形式进行排序，从结果中抽取前3条和倒数3条记录。
命令：
`sort -nk3 -t: device | head -3` 
`sort -nk3 -t: device | tail -3`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-head-tail.png)

**实例：10. awk与sort配合使用**

描述：将sort结果用awk进行加一点附加信息。
命令：`sort -nk3 -t: device | tail -1 | awk -F: '{print $1"--"$2"--"$3}'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-awk.png)

**实例：11. 两个输入文件进行sort，然后把它们连接成一行**
描述：创建两个文件，并用数据填充，然后对这两个文件排序并连接。
命令：
`echo -e "5 Reliable\n2 Fast\n3 Secure\n1 open-source\n4 customizable" > file1.txt`
`echo -e "3 RedHat\n1 Debian\n5 Ubuntu\n2 Kali\n4 Fedora" > file2.txt`
`join <(sort -n file1.txt) <(sort file2.txt)
1 open-source Debian`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-join.png)


**实例：12. 将两个分类文件合并**

描述：device_sorted和device_sorted2是两个已排好序的文件，文件合并前，它们必须以被分类。
命令：`sort -t: -m -k1 device_sorted device_sorted2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-merge.png)


**实例：13. 按照月份顺序进行排序**

描述：M选项对month.txt文件按照月份顺序进行排序。sort命令需要至少3个字符来确认月份名称。
命令：`sort -M month.txt`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-M.png)

**实例：14. 把数据整理成方便人们阅读的形式**

描述：-h选项将把数据整理成方便人们阅读的形式，比如1K、2M、3G、2T，这里面的K、G、M、T代表千、兆、吉、梯。
命令：`ls -lh /root | sort -h -k5`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-h.png)

**实例：15. 随机化结果**
描述：-R选项将结果进行hash随机化排序。
命令：`ls -lh /root | sort -k5 -R`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sort/sort-Random.png)




