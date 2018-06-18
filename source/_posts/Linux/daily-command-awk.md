---
title: Linux awk总结
date: 2018-06-9 16:17:44
tags: Linux
---

awk是一种小巧的编程语言及命令行工具。（其名称得自于它的创始人Alfred Aho、Peter Weinberger 和 Brian Kernighan姓氏的首个字母）。它非常适合服务器上的日志处理，主要是因为awk可以对文件进行操作，通常以可读文本构建行。

<!-- more -->
## 命令功能

在文件或字符串中基于指定规则浏览和抽取信息。awk抽取信息后，才能进行其他文本操作，awk脚本通常用来格式化文本文件中的信息。

## 命令格式
有三种方式调用awk，第一种是命令行方式，例如：
`awk [-F field-separator] 'commands' input-file(s)`
awk默认使用空格作为缺省的域分隔符。如果要浏览诸如passwd文件，此文件是以冒号作为分隔符，则必须指明-F选项。例如：
`awk -F : 'commands' input-file`
第二种方式是将所有awk命令插入一个文件，并使awk程序可执行，然后用awk命令解释器作为脚本的首行，以便通过键入脚本名称来调用它。
第三种方式是将所有的awk命令插入一个单独文件，然后调用：
`awl -f awk-script-file input-file(s)`
-f选项指明在文件awk-script-file中的awk脚本，input_file(s)是使用awk进行浏览的文件名。

## awk脚本

### 代码结构
awk脚本的代码结构很简单，就是一系列的模式（pattern）和动作（action）。

```
# comment
Pattern1 { ACTIONS; }
# comment
Pattern2 { ACTIONS; }
# comment
Pattern3 { ACTIONS; }
# comment
Pattern4 { ACTIONS; }
```
扫描文档的每一行时都必须与每一个模式进行匹配比较，一次只匹配一个模式。

```
this is line 1
this is line 2
```
this is line 1这行会先Pattern1进行匹配，如果匹配成功，就会执行ACTIONS。然后this is line 1会和Pattern2进行匹配，如果匹配失败，就调到Pattern3进行匹配，以此类推。
一旦所有的模式都匹配过了，this is line 2就会以同样的步骤进行匹配。其他的行也一样，直到读取完整个文件。这就是awk的运行模式。

### 数据类型

awk仅有两个主要的数据类型：字符串和数字，它们可以相互转换。
在ACTIONS部分使用=操作符给变量赋值，可以在任意时刻、任意地方声明和使用变量，也可以使用未初始化的变量，默认是空字符串。
awk有数组类型，并且它们是动态的一维关联数组。

### 模式
模式分为三大类：正则表达式、布尔表达式和特殊模式。

所有模式都是可选的，下面的脚本形式会对输入的每一行都会简单地执行ACRIONS。
`{ ACTIONS }`

### 特殊的模式
模式包括两个特殊字段：BEGIN和END。BEGIN在所有输入未被处理之前，即文本浏览动作之前进行匹配。可以初始化脚本变量和所有种类的状态的主要地方。END会在所有的输入都被处理完后，即完成文本浏览动作后进行匹配。可以在退出前进行清除工作和一些最后的输出。
最后一类模式，要把它进行归类有点困难。它处于变量和特殊值之间，我们通常称它们为域（Field）。而且名副其实。

### 域

```
# According to the following line
#
# $1 $2 $3
# 00:34:23 GET /foo/bar.html
# _____________ _____________/
# $0
 
# Hack attempt?
/admin.html$/ && $2 == "DELETE" {
print "Hacker Alert!";
}
```

域（默认地）由空格分隔。$0域代表了一整行的字符串。$1 域是第一块字符串（在任何空格之前），$2\$域是后一块，以此类推。
awk执行时，其浏览域标记为$1, $2, $3...$n。这种方式称为域标识。使用$1, $3标识表示第1和第3域。使用$0$标识表示所有域。
awk浏览到一新行时，即到达域的记录末尾，执行新记录下一行的读动作，重新设置域分隔。


### 动作
最常用和最有用的行为：

```
{ print $0; } # prints $0. In this case, equivalent to 'print' alone
{ exit; } # ends the program
{ next; } # skips to the next line of input
{ a=$1; b=$0 } # variable assignment
{ c[$1] = $2 } # variable assignment (array)
 
{ if (BOOLEAN) { ACTION }
else if (BOOLEAN) { ACTION }
else { ACTION }
}
{ for (i=1; i<x; i++) { ACTION } }
{ for (item in c) { ACTION } }
```
awk里的变量都是全局变量。

### 函数

函数的[通用文档(regular documentation)](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)

```
{ somecall($2) }
```
用户定义的函数：

```
# function arguments are call-by-value
function name (parameter-list) {
	ACTIONS; #same actions as usual
}

# return is valid keyword
function add (val) {
return val+1;
}
```

## 实用命令
**实例：0. 新建测试文件**
描述：新建一个device文件，其中(1)为序号，(2)为Android版本，(3)为访问时间，(4)为IP，(5)为访问次数。本文大部分实例根据这一文件进行说明。
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-origin.png)

**实例：1. 抽取域**
描述：打印第1个（序号）域和第2个（Android版本）域的内容。print用来输出其后跟着的内容，用大括号把print语句括起来，表示一个打印动作。
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-partion-domain.png)

**实例：2. 打印所有记录**
描述：打印所有记录。$0代表所有域。
命令：`awk '{print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-$0.png)

**实例：3. 打印报告头**
描述：在序号和IP地址之间用一些空格使之更容易划分，也可以在域间使用tab键加以划分。本例中加入NO和IP两个信息头以及中划线，\n启动新行，并在\n下一行启动打印文本操作。打印信息头放置在BEGIN模式部分，因为打印信息头被界定为一个动作，必须用大括号括起来。在awk查看第一条记录前，信息头被打印。
命令：`awk 'BEGIN {print "NO        IP\n------------------------"} {print $1"\t"$4}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-Begin.png)


**实例：4. 打印信息尾**
描述：在末行加入end of report信息。END语句在所有文本处理动作执行完之后才被执行，在脚本中的位置是在主要动作之后。
命令：`awk 'BEGIN {print "Version\n-------"} {print $2} END {print "end-of-report"}' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-End.png)

**实例：5. 错误信息提示**
描述：如果将在awk命令中缺少一个双引号，awk将返回错误提示信息。
命令：`awk 'BEGIN {print "Version\n-------"} {print $2} END {print "end-of-report}' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-error.png)

注意：在碰到awk错误时，应从以下几点进行排查：

- 确保整个awk命令引用单引号括起来。
- 确保命令内所有引号成对出现。
- 确保用花括号括起动作语句，用圆括号括起条件语句。
- 可能忘记使用花括号。

描述：如果查询的文件不存在，将得到以下错误信息：
命令：`awk 'END {print NR}' device.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-file-not-found.png)

### 条件操作符

**实例：1. 匹配**
描述：如果field-4以数字4开头，打印它。如果条件满足，则打印匹配的记录行。符号~后紧跟正则表达式，使一域号匹配正则表达式，也可以使用if语句。awk的if后面的条件用()括起来。^尖角符号表示行首。
命令：`awk '{ if ($4 ~ /^4/) print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-if.png)

等同于：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-same-if.png)

**实例：2. 精确匹配**
描述：精确匹配访问次数为1次的记录，确保不匹配访问次数为15次的记录。使用等号==，并用单引号括起条件，也可以使用if语句。
命令：`awk '$5=="1" {print $0}' device`
或者：`awk '{if($5==/1/) print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-==.png)

**实例：3. 不匹配**
描述：不匹配IP地址以4开头的记录。使用!~表示不匹配。
命令：`awk '$4 !~ /^4/' device`
或者：`awk '{ if ($4 !~ /^4/) print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-!~.png)

注意这里不能用!=，因为用引号或者/括起了^4，将只匹配4而不匹配49.65.119.165等。如果查询非49.65.119.165的记录，可做如下操作：
`awk '$4 != "49.65.119.165"' device`

**实例：4. 小于，小于等于，大于，大于等于**
描述：匹配访问次数小于序号的记录。同样的有小于等于（<=），大于（>），大于等于（>=）。
命令：`awk '$4 !~ /^4/' device`
或者：`awk '{ if ($4 !~ /^4/) print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-less-than.png)

**实例：5. 设置大小写**
描述：匹配含有前面是i或I，后面是OS的记录。[]符号可匹配[]内任意字符或单词。
命令：`awk '/[iI]OS/' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-i.png)

**实例：6. 任意字符**
描述：匹配Android版本，第八个字符是7，打印它。表达式/^.......7/表示行首前7个字符任务，第八个是7。
命令：`awk '$2 ~ /^.......7/' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-dot.png)

**实例：7. 或关系匹配**
描述：匹配IP地址以4或者3开头的记录。竖线符|意为两边模式之一。可以得到与[]表达式相同的结果。
命令：`awk '$4 ~ /^(4|3)/' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-or.png)

注意，在使用竖线符时，语句必须用圆括号括起来。另外，除了字符重复出现外，其他的正则表达式在awk中都是合法的。

**实例：8. AND**

描述：匹配Android版本在7.0以上，并且IP地址以4开头的记录。OR，非与之类似。
命令：`awk '$2 ~ /^.......7/ && $4 ~ /^4/' device`
等同于：`awk '{ if ($2 ~ /^.......7/ && $4 ~ /^4/) print $0} ' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-&&.png)

### awk内置变量

awk内置变量如下：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-builtin-variable-table-1.png)

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-builtin-variable-table-2.png)

```
BEGIN { # Can be modified by the user
FS = ","; # Field Separator
RS = "n"; # Record Separator (lines)
OFS = " "; # Output Filed Separator
ORS = "n"; # Output Record Separator (lines)
}
{ # Can't be modified by the user
NF # Number of Fileds in the current Record (lines)
NR # Number of Records seen so far
ARGV / ARGC # Script Arguments
}
```

NF：支持记录域个数，在记录被读之后再设置。
NR：已读的记录数。
FILENAME：告知系统目前正在浏览的实际文件，因为awk可以同时处理许多文件。

**实例：1. NF、NR、FILENAME**

描述：所有记录被打印，并带有记录号（第二和第三列），并在最后输出文件名。使用NF变量显示每一条读记录中有多少个域（5个），使用NR显示已读的记录数，使用FILENAME显示正在处理的文件名。
命令：`awk '{print NF,NR,$0} END {print FILENAME}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-builtin-variable.png)

**实例：2. 判断文件至少有一个记录**

描述：先检查文件中至少有一个记录时才查询IP地址。
命令：`awk 'NR > 0 && $4 ~ /^4/' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-NR.png)


**实例：3. 与echo结合使用**

描述：将变量$PWD的返回值传入awk并显示其目录。需要指定域分隔符/。
命令：`echo $PWD | awk -F / '{print $NF}'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-echo.png)


描述：显示文件名。
命令：`echo "/etc/vimrc" | awk -F / '{print $NF}'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-show-filename.png)

### awk操作符

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-operator.png)

**实例：1. 设置输入域到域变量名**
描述：赋值IP地址域为ip，版本域为version，查询版本大于7的记录，并打印IP地址和版本信息。
命令：`awk '{ip=$4;version=$2; if (version ~ /*7*/) print ip""version}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-set-variable.png)

**实例：2. 域值比较操作**
有两种方式测试数值域是否小于另一数值域。

- 在BEGIN中给变量名赋值。
- 在关系操作中使用实际数值。

描述：找出访问次数大于10次的所有记录。
命令：`awk '{if ($5 > 10) print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-comparable.png)


**实例：3. 修改数值域的值**

当在awk中修改任何域时，实际输入文件是不可修改的，修改的只是保存在缓存里的awk副本，awk会在变量NR或NF变量中反映出修改痕迹。

描述：修改序号为6的记录，将其访问次数减一。
命令：`awk '{if ($1==6) $5=$5-1; print $1, $2, $5 }' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-modify-copy-number-domain.png)


**实例：4. 修改文本域**

描述：修改序号为6的记录，将其版本修改为iOS11.2.3。修改文本域就是对其重新赋值。
命令：`awk '{if ($1==6) ($2="iOS11.2.3"); print $1, $2, $5 }' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-modify-text-copy-domain.png)

**实例：5. 只显示修改记录**

描述：只显示修改后序号为6的记录。
命令：`awk '{if ($1==6) {$2="iOS11.2.3"; print $2}; }' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-modify-and-only-show-modified.png)

**实例：6. 创建新的输出域**

描述：创建新域6保存目前访问次数大于序号的减法值，表达式为'{$6=$5-$1}'，只打印其值大于零的序号和其新域值。在BEGIN部分加入tab键以对齐报告头。也可以赋给新域更有意义的变量名。
命令：`awk 'BEGIN {print "IP\t Difference"} {if ($5 > $1) {$6=$5-$1; print $1 "\t" $6}}' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-add-new-domain.png)

**实例：7. 增加列值**

描述：使用+=累加访问次数的值。awk的每一个操作匹配时，如果没有说明打印记录，那默认会打印所有记录。
命令：`awk '(total+=$5); END {print "total visits : " total}' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-add-column-value.png)

**实例：8. 文件长度相加**

描述：查看当前目录中所有文件的长度及其综合，但要排除子目录，使用ls -l命令，然后管道输出到awk，awk首先剔除首字符d（/^[^d]/）的记录，然后将文件长度相加，并输出每一文件长度及在END部分输出所有文件的长度。
命令：`ls -l | awk '/^[^d]/ {print $9"\t"$5} {total+=$5} END {print "total KB: " total}'` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-acc-file-size.png)


### 内置字符串函数

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-string-function.png)

gsub类似于sed查找和替换。它允许替换一个字符串或字符为另一个字符串或字符，并以正则表达式的形式执行，第一个函数作用于记录$0，第二个gsub函数允许指定目标，如果未指定，默认是$0。
index(s, t)函数返回目标字符串s中查询字符串t的首位置。
length函数返回字符串s字符长度。
match函数测试字符串s是否包含一个正则表达式r定义的匹配。
split函数使用域分隔符fs，将字符串s划分为指定序列a。
sprint函数类似于printf函数，返回基本输出格式fmt的结果字符串exp。
sub(r, s)函数将用s代替$0中最左边最长的子串，该子串被（r）匹配。
sub(s, p)返回字符串s在位置p后的后缀部分。
substr(s, p, n)函数返回字符串s在位置p后长度为n的后缀部分。


**实例：1. gsub**

描述：匹配记录中访问时间为11:35的记录，修改为11:40。注意要用双引号括起来。
命令：`awk 'gsub(/11:35/, "11:40") {print $0}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-gsub.png)


**实例：2. index**
描述：匹配字符串Honey中，ney子串第一次出现的位置，即字符个数。
命令：`awk 'BEGIN {print index("Honey", "ney")}'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-index.png)

**实例：3. length**

描述：匹配序号为6，第二个域的字符长度。也可以直接使用字符串。
命令：`awk '$1==6 {print length($2) "---" $2}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-length.png)


**实例：4. match**

描述：match测试目标字符串是否包含查找字符的一部分，可以使用正则表达式。
命令：
在AWK中查找d，因其不存在，所以返回0。
`awk 'BEGIN {print match("AWK", /d/)}'`
在AWK中查找K，因其存在，所有返回AWK中K出现的首位置字符数。
`awk 'BEGIN {print match("AWK", /K/)}'`
在序号为6的记录中，查找Android的大版本号。
`awk '$1==6 {print match($2, "7")}' device`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-match.png)


**实例：5. split**

描述：如果域中具有分隔符形式的字符串，使用split函数将其分隔，并保存到一个数组中，最后将数组的第一个元素打印出来。
命令：`awk 'BEGIN {print split("123#456#789", myarray, "#")}'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-split.png)


**实例：6. sub**

描述：匹配所有Android，替换为android。注意只在模式第一次出现时进行替换操作。
命令：`awk 'sub(/Android/, "android")' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-sub.png)


**实例：7. substr**

描述：匹配第二个域版本信息中，打印从第一个字符开始到第七个字符。如果给定的长度值远大于字符串长度，awk将从起始位置返回所有字符。另一种形式是返回字符串后缀或指定位置后面的字符。
命令：`awk '$1==5 {print substr($2,1,7)}' device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-substr.png)


**实例：8. 从shell向awk传入字符串**
命令：
使用管道将字符串powerful传入awk，返回其长度。
`echo "powerful" | awk '{print length($0)}'` 
设置文件名为一变量，管道输出到awk，但会不带扩展名的文件名。
`STR="myawk.txt" | echo $STR | awk '{print substr($STR,1,5)}'`
设置文件名为一变量，管道输出到awk，只返回其扩展名。
`TR="myawk.txt" | echo $STR | awk '{print substr($STR,7)}'`

输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-shell.png)


### 字符转义


![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-escape.png)

### printf修饰符

基本语法：`printf([格式控制符], 参数)`
格式控制符通常在引号里。

awkprintf修饰符：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-printf-table.png)

awk printf格式：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-printf-format-table.png)

**实例：1. 字符转换**
描述：通过管道输出65到awk中，printf进行ASCII码字符转换。
命令：
`echo "65" | awk '{printf ("%c\n", $0)}'` 
或者
`awk 'BEGIN {printf "%c\n", 65}'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-char-convert.png)

描述：数字1024转换为浮点数之后，被加入了六个小数点。
命令：
`awk 'BEGIN {printf "%f\n", 1024}'` 

输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-number-convert.png)

**实例：2. 格式化输出**

描述：BEGIN后的第一个花括号嵌入头信息，第二个花括号打印所有用户的IP地址和访问时间，要求IP地址左对齐，23个字符长度，后跟访问时间。
命令：
`awk 'BEGIN {print "IP\t\t\tTime"} {printf "%-23s %s\n", $4, $3}' device` 

输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-printf-format.png)

**实例：3. 向一行awk命令传值**

描述：在命令行中设置VISITS等于10，然后传入awk中，查询访问次数大于10的所有记录。
命令：`awk '{if($5 > VISITS) print $0} ' VISITS=10 device` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-command-line-pass-to-awk.png)

描述：用管道将df -k传入awk，然后抽出第四列，即剩余可利用空间容量。使用$4 ~ /^[0-9]/取得容量数值，最后对命令行if($4 < TRIGGER)上变量TRIGGER的值进行查询。
查看文件系统空间容量，观察其是否达到一定水平。因为要监视的已使用空间容量不断在变化，所以需要再命令行指定一个触发值。
命令：`df -k | awk '($4 ~ /^[0-9]/) {if ($4 < TRIGGER) printf "%-15s %s\n",$6,$4}' TRIGGER=930000` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-df.png)


描述：打印当前注册用户，并加入一定信息。
命令：`who | awk '{print $1 " is logged on"}'` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-who.png)

描述：传入环境变量LOGNAME，显示当前用户名。
命令：`who | awk '{if ($1 == user) print $1" you are connected to " $2}' user=$LOGNAME"}'` 
输出：

![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-env-variable.png)


**实例：4. awk脚本文件**

描述：第一行#! /usr/bin/awk -f告知脚本系统awk命令的位置。在脚本文件后键入文件名之前，需要先对脚本文件加入可执行权限。
命令：`chmod u+x user_tot.awk`
user_tot.awk脚本文件：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-user-tot.png)

描述：执行user_tot.awk脚本文件。
命令：`./user_tot.awk device` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-run-user-tot.png)

**实例：5. 在awk中使用FS变量**

描述：从/etc/passwd文件中抽取第1和第5域，通过FS变量，指定冒号:分隔passwd文件域。第1域时账号名，第5域是账号所有者。
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-passwd-file.png)
命令：`chmod u+x passwd.awk | ./passwd.awk /etc/passwd` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-run-passwd.png)


**实例：6. 向awk脚本传值**

向awk脚本传值与向awk一行命令传值的方式大体相同，格式为：
`awk script_file var=value input_file`

描述：对比检查文件中域号和指定数字。注意不要忘了增加脚本的可执行权限。
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-fieldcheck-file.png)
命令：`chmod u+x fieldcheck.awk | ./fieldcheck.awk MAX=7 FS=":" /etc/passwd` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-run-fieldcheck.png)



描述：从du命令获得输入，并输出块和字节数。
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-duawk-file.png)
命令：`chmod u+x duawk.awk | du /root | ./duawk.awk` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-run-duawk.png)


**实例：9. awk数组**

描述：用split将123#456#789划分开，并存入myarray数组，再使用循环打印各数组元素。
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-array-file.png)
命令：`chmod u+x duawk.awk | du /root | ./duawk.awk` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-script-run-array.png)


**实例：10. 处理由通配符指定的多个文件名**

描述：打印当前目录中以.txt结尾的文件。nextfile告诉awk停止处理当前的输入文件。下一个输入记录读取来自下一个输入文件。
命令：
`awk '{ print FILENAME; nextfile } ' *.txt` 
`awk 'BEGIN{ print "Starting..."} { print FILENAME; nextfile }END{ print "....DONE"} ' *.txt`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/awk/awk-multiple-filename.png)





