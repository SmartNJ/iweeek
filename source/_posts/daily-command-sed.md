---
title: Linux sed总结
date: 2018-06-20 16:54:10
tags: Linux
---

sed是stream editor（流式编辑器）的缩写，它可以对文本流、指定文件集或标准输入进行文本编辑。sed编辑器默认情况下没有破坏性，所有的输出都被打印到屏幕上。并且它不会修改文件，除非使用shell重定向来保存输出结果。

<!-- more -->
## 命令格式

`sed [选项] '命令' 文本`

## 命令功能

sed是一个强大的文本过滤工具。使用sed可以从文件或字符串中抽取所需信息。
sed命令总是以单个字母开头。
sed多数命令允许在前面加个地址。该地址用于指定输入流的哪一行被编辑，如果省略，默认是对所有行都进行编辑。

## sed正则表达式

表1：sed的正则表达式元字符

|元字符|功 能|示 例|示例的匹配对象|
|:--|:--|:--|:--|
|^|行首定位符|/^iweeek/|匹配所有以iweeek开头的行|
|$|行尾定位符|/iweeek$/|匹配所有以iweeek结尾的行|
|.|匹配除换行外的单个字符|/i...k/|匹配包含字符i、后跟三个任意字符、再跟字母k的行|
|\*|匹配零个或多个前导字符|/\*iweeek/|匹配在零个或多个空格紧跟着模式iweeek的行|
|[]|匹配指定字符组内任一字符|/i[Ww]eeek/|匹配包含iweeek或iWeeek的行|
|[^]|匹配不在指定字符组内任一字符|/[^A-HJ-Z]weeek/|匹配包含weeek，但weeek之前的那个字符不在A至H或J至Z间的行|
|\(..\)|保存已匹配的字符|||
|&|保存查找串以便在替换串中引用|s/iweeek/\*\*&\*\*/|符号&代表查找串。字符串iweeek将替换前后各加了两个\*\*的引用，即iweeek变成\*\*iweeek**|
|\<|词首定位符|/\<iweeek/|匹配包含以iweeek开头的单词的行|
|\\>|词尾定位符|/iweeek\\>/|匹配包含iweeek结尾的单词的行|
|x\\{m\\}|连续m个x|/o\\{5\\}/|分别匹配出现连续5个字母o的行|
|x\\{m,\\}|至少m个x|/o\\{5,\\}/|匹配至少5个连续的o的行|
|x\\{m,n\\}|至少m个x，但不超过n个x|/o\\{5,10\\}/|匹配5~10个连续的o的行|


## sed常用选项

表2：sed的常用选项

|选项|说明|
|:--|:--|
|-n|不产生命令输出，使用print命令来完成输出|
|-e|执行多个命令。在处理输入时，将script中指定的命令添加到已有的命令中，且命令顺序会影响结果|
|-f|执行多个命令。在处理输入时，将file中指定的命令添加到已有的命令中|
|-r|使用扩展正则|
|-i|直接修改文档读取的内容，不在屏幕上输出|

## sed使用地址定位
sed命令在没有给定位置时，默认会处理所有行。
sed支持行寻址模式，在sed编辑器中有两种形式的行寻址：

```
[address]command
也可以将特定地址的多个命令
address {
	command1
	command2
	command3
}
```

sed编辑器会将指定的每条命令作用到匹配指定地址的行上。具体有以下几种地址类型：
1. 以数字方式的行寻址
	- first~step
		- first指其实匹配行，step指步长。例如：sed -n 2~5p。含义：从第二行开始匹配，每隔5行匹配一次，即2,7,12……。
	- $
		- 表示匹配最后一行。
	- addr1, addr2
		- 定址addr1，addr2决定用于对哪些行进行编辑。地址的形式可以是数字、正则表达式或二者的结合。如果没有指定地址，sed将处理输入文件中的所有行。如果定址是一个数字，则这个数字代表行号，如果是逗号分隔的两个行号，那么代表着两行之间的范围（包括两行在内）。范围可以是数字，正则或二者结合。
	- addr1, +N
		- 从addr1这行到往下N行匹配，总共匹配N+1行。
	- addr1, ~N
		-
2. 使用模式过滤器的行寻址
	- /REGEXP/
		- 表示匹配正则的那一行，通过//之间的正则表达式来匹配。
	- \cREGEXPc
		- 表示匹配正则的那一行，通过\c和c之间的正则表达式来匹配，c可以是任意字符。
3. 组合行寻址
	- 数字行寻址和模式行寻址组合起来。例如'3,${s/first/First/ s/second/Second/}'

## sed操作命令
sed操作命令告诉sed如何处理由地址指定的各输入行。如果没有指定地址，sed就会处理输入的所有的行。

表3：sed命令

|命 令|说 明|
|:--|:--|
|a\|在当前行后添加一行或多行|
|c\|用新文本修改（替换）当前行中的文本|
|d|删除行|
|i\|在当前行之前插入文本|
|h|把模式空间里的内容复制到暂存缓存区|
|H|把模式空间里的内容追加到暂存缓存区|
|g|取出暂存缓冲区里的内容，将其复制到模式空间，覆盖该处原有内容|
|G|取出暂存缓冲区里的内容，将其复制到模式空间，追加在原有内容后面|
|l|列出非打印字符|
|p|打印行|
|n|读入下一输入行，并从下一条命令而不是第一条命令开始处理|
|q|结束或退出 sed|
|r|从文件中读取输入行|
|!|对所选行以外的所有行应用命令|
|s|用一个字符串替换另一个|
|N|将数据流的下一行加进来创建一个多行组来处理|
|D|删除多行组中的一行|
|P|打印多行组中的一行|

## sed工作过程
sed编辑器逐行处理文件或标准输入，并将输出结果发送到屏幕。sed把当前正在处理的行保存在一个临时缓存区中，这个缓存区称为模式空间或临时缓存。sed处理完模式空间中的行后（即在该行上执行sed命令后），就把该行发送到屏幕上（除非之前有命令删除这一行或取消打印操作）。sed每处理完输入文件的最后一行后，sed便结束运行。sed把每一行都存在称作保持空间的临时缓存区中，对这个副本进行编辑，不会修改或破坏源文件。



## 报错信息和退出信息

sed通过返回一个状态值来说明执行的结果。如果执行成功，则返回0，如果不成功，则返回非0整数。

## 实用命令

### **p命令打印**
描述：第一个命令显示mydata中所有的内容，sed默认读取所有行。第二个命令匹配行内出现first的行，使用p命令打印出来，可见加上默认的输出，出现了重复的两行。第三个例子中-n选项使默认的输出失效，与p命令搭配实现了只输出匹配的行。
命令：
`sed '' mydata`
`sed '/first/p' mydata`
`sed -n '/first/p' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-p.png)


### **d命令删除**
描述：删掉mydata文件中的第3行。
命令：`sed '3d' mydata`

描述：删掉mydata文件中包含first的行。使用正则表达式匹配，第二个命令中反斜线后面的字符可以任意。
命令：
`sed '/first/d' mydata`
OR
`sed '\?north?d' ceshi`

描述：删掉mydata文件中的第2~3行。
命令：`sed '2~3d' mydata`

描述：删掉mydata文件中的第1和第3行。
命令：`sed '1,3d' mydata`

描述：删掉mydata文件中的第1行，之后删除每次间隔两行的行。
命令：`sed '1,+2d' mydata`

描述：删掉mydata文件中从第3行开始，直到最后一行。
命令：`sed '1,$d' mydata`

描述：删掉mydata文件中从第3行开始，直到最后一行。
命令：`sed '1,$d' mydata`

输出：



### **替换命令**
替换命令在默认情况下只替换每行中出现的第一处，要让替换命令能够替换一行中不同地方出现的文本，需要使用替换标记：
表4：替换标志

|标 志|说 明|
|:--|:--|
|数字|表示替换第几处模式匹配的地方|
|g|表示在行内进行全局替换|
|p|表示将模式空间里的内容打印出来|
|w|表示将替换的结果写入文件|
|x|表示交换暂存缓冲区与模式空间的内容|
|y|表示将字符转换为另一字符（不能对正则表达式使用 y 命令）|

描述：替换每一行中第2次出现的first变为last。
命令：
`echo "first come, first served." | sed 's/first/last/2'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-number.png)


描述：替换第一次出现的first变为last。使用g标志可以替换所有匹配的内容。
命令：
`echo "first come, first served." | sed 's/first/last/'`
`echo "first come, first served." | sed 's/first/last/g'`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-s-g.png)

描述：替换所有的单词a变为A，正则表达式中的\b仅匹配单词。
命令：`echo "Fire is a good servant but a bad master." | sed 's/\ba\b/A/g'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-s-b.png)

描述：替换fairy文件中所有出现的you变为You，并且打印出这些行。-n选项与标志p结合，告诉sed只打印发生替换的那些行。
命令：`sed -n 's/you/You/gp' fairy`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-n-s-p.png)


描述：紧跟在s命令后的字符就是查找串和替换串之间的分隔符。分隔符默认是正斜杠，可以改变为其他字符（换行符，反斜线除外）。这个特点在查找包含字符串中含有正斜杠的例子中很管用，例如查找路径名或生日。
命令：`echo "Content is better than riches?" | sed 's/\?/./'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-s-any-separator.png)



### **模式替代**
描述：使用&来代表替换命令中匹配的模式。这个例子的单词中，以at结尾并且前一个字母任意，所有匹配的单词都将用双引号括起来。
命令：`echo "The cat sleeps in his hat." | sed 's/\b.at\b/"&"/g'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-ampersand.png)

描述：将一个单词来替换一个短语，该单词正好是该短语的子字符串，这个字符串使用了正好使用了通配符。sed用圆括号来定义替换模式中的子模式，在替代模式中使用特殊字符来引用每个子模式。替代字符由反斜线和数字组成，第一个子模式分配字符\1。
在替换命令中使用子模式的圆括号时，必须用转义字符将其标记为分组字符而不是普通的圆括号。
命令：
`echo "That funny cat is pretty" | sed 's/funny \(.at\)/\1/'`
`echo "That funny hat is pretty" | sed 's/funny \(.at\)/\1/'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-s-subpattern-substitution.png)

描述：在大数字中插入逗号。
命令：
`echo "12345678" | sed '{
:start
s/\(.*[0-9]\)\([0-9]\{3\}\)/\1,\2/
t start
}'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-split-big-number.png)




### **指定行的范围：逗号**
行的范围从文件中的一个地址开始，在另一个地址结束。地址范围可以是行号（例如5,10），正则表达式（例如/cat/,/hat/），或者两者的结合(例如/first/,$)，范围是闭合的，包含开始条件的行和结束条件的行，以及两者之间的行。如果结束条件无法满足，就会一直操作到文件结尾。如果结束条件满足，则继续查找满足开始条件的位置，范围重新开始。$观察下面mydata2文件：

![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-mydata2.png)

描述：打印模式2和3之间所有的行。
命令：`sed -n '/2/,/3/p' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-2-3.png)

描述：打印模式1和3之间所有的行。如果1出现在3之后的某一行，则打印的范围从1所在行开始，都下一个3的行货文件的末尾（如果3未出现）。图中第4行到文件结尾都没有再出现过3，因此打印到了文件结尾，在使用d删除的时候尤为要注意这点。
命令：`sed -n '/1/,/3/p' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-1-3.png)

描述：打印第3行开始，到第一个匹配1的行之间的所有行。这里数字行寻址和模式行寻址结合起来用。
命令：`sed -n '3,/1/p' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-range-number-pattern.png)

描述：从第3行开始，到第一个匹配1的行之间的所有行，将各行的行尾（$）替换为字符*$。换行符被移到了新的字符串的后面。最后将结果打印出来。
命令：`sed -n '3,/1/s/$/*/p' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-range-number-pattern-s.png)


### **e命令多重编辑**
-e选项是编辑命令，用于sed执行多个编辑任务的情况下。在下一行开始编辑前，所有的编辑动作将应用到模式缓存区（模式空间）的行上。每个命令可以用单独的-e选项指定，也可以使用连起来写，命令之间用分号隔开。
描述：-e选项用于多重编辑，第一重编辑是第2行到第4行被删除，第二重编辑将1替换为one。因为是逐行进行这两行编辑（这两个命令都在模式空间的当前行上执行），所有编辑命令的顺序会影响结果。例如，如果两条命令都执行的是替换，前一次替换会影响后一次替换。
命令：`sed -e '2,4d' -e 's/1/one/' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-e.png)

### **从文件中读取编辑器命令**
描述：将大量要处理的sed命令放进一个单独的文件中，使用-f选项来指定文件。在这种情况下，不用在每条命令后放一个分号，sed编辑器知道每行都是一条单独的命令。
命令：`sed -f script.sed mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-script.png)


### **a命令追加**
a命令是追加命令，会将新文本追到到文件中当前行（模式空间中的当前行）的后面。
格式：

```
sed '[address] command \
new line 1\
new line 2'
file
```
描述：向含有字符串first行的下一行加入Hello world。
命令：`sed '/first/a\Hello world' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-a.png)

描述：向含有模式first行的下一行加入两行，分别是Hello world和Welcome!。如果追加的内容超过一行，则除最后一行外，其他各行都必须以反斜杠结尾。
命令：

```
sed '/first/a Hello world\
Welcome!
' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-a-more-line.png)


### **i命令插入**
i命令是插入命令，类似于a命令，但不是在当前行后增加文本，而是在当前行前面插入新的文本，即刚读入模式空间的行。

描述：命令i是插入命令。如果在某一行匹配到模式first，就会在该行的上方插入Hello world和反斜杠后面的内容。
命令：
```
sed '/first/i Hello world\
-------------------
' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sad-i.png)


### **c命令修改**
c命令是修改命令，它允许修改数据流中整行文本的内容，旧文本被覆盖。
描述：将匹配模式first的行修改为新的内容。
命令：

```
sed '/first/c \
This line is changed.' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sad-c.png)



### **多行命令**
sed包含三个可用来处理多行文本的特殊命令。

- N：将数据流中的下一行加进来创建一个多行组。
- D：删除多行组中的一行。
- P：打印多行组中的一行。

单行版n命令（next）表示获取下一行到模式空间内，后续的sed命令都将应用到这新获取的行上。记住，通常sed编辑器在移动到数据流中的下一文本行之前，会在当前行上执行完所有定义好的命令。n命令改变了这个流程。

描述：删掉除最后一个空白行之外的所有空白行。
命令：`sed '/^$/d' mydata3`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sad-n.png)

描述：合并文本行，N命令是n命令的多行版，读取匹配模式之后的下一行之后，替换其中的换行符为空格，将两行文本连成一行。
命令：`sed '/first/{ N; s/\n/ /}' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-N-append.png)

描述：查找句中分散在两行中的短语。源文件如下：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-separator-cat.png)
命令：`sed ' 2N; s/The.ideals/The nature/g' longtext`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-separator.png)

描述：注意到上面例子中使用了通配符（.）来匹配空格和换行符这两种情况。但当匹配换行符时，sed从字符串中删掉了换行符，导致两行合并成了一行。下面的例子用了两个替换命令来解决这个问题，一个用来匹配短语出现在多行中的情况，一个用来匹配短语出现在单行中的情况。
命令：

```
sed '2N
s/The ideals/The nature/
s/The\nideals/The\nnature/
' longtext
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-separator-two-way.png)

// TODO
描述：上面的脚本还是有点问题，如果
命令：

```
sed '2N
s/The ideals/The nature/
s/The\nideals/The\nnature/
' longtext
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-separator-two-way.png)



### **y命令转换**
y命令是转换命令，它是唯一可以处理单个字符的sed编辑器命令。字符按照一对一的方式从左到右进行转换。例如y/abc/ABC/，会把小写字母转换成大写字母。

命令格式：

```
[address]y/inchars/ouchars/
```

描述：将第2和第3行中所有的小写字母转换成大写字母。
命令：`sed '2,3y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sad-y.png)

描述：转换命令是一个全局命令，它会从文本中找到所有指定字符自动进行替换，而不考虑它们出现的位置。
命令：`echo "This 1 is a test of 1 try." | sed 'y/123/789/'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-y-more-place.png)

### **q命令退出**
q命令是退出命令，该命令导致sed程序退出，且不再进行其他的处理。

描述：打印完第3行之后，程序退出。
命令：`sed '3q' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-q.png)

描述：打印到匹配模式again的行后，先用s命令替换again为begin，然后q命令让sed退出。
命令：`sed '/again/{s/again/begin/; q; }' mydata2`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-q-more.png)


### **=命令打印行号**
等号命令会打印行在数据流中的当前行号，行号由数据流中的换行符决定。每出现一个换行符，sed编辑器就认为一行文本结束了。
描述：给mydata文件的每行加上行号，行号在当前行的上面一行。
命令：`sed '=' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-line-number.png)

### **l命令打印不可打印的ACSII字符**
l命令（list）可以打印数据流中的文本和不可打印的ASCII字符，任何不可打印的字符要么在其八进制值前加一个反斜线，要么使用标准C风格的命令法，比如\t，开代表制表符。
描述：打印制表符。
命令：`sed -n 'l' tab`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-l.png)



### **写入文件**
w命令用来向文件写入行，该命令格式如下：

`[address]w filename`

描述：替换所有的单词a变为A，w标志可以将sed执行结果输出到文件中。
命令：`echo "Fire is a good servant but a bad master." | sed 's/\ba\b/A/gw sed.out'`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-s-w.png)

### **从文件读取数据**
r命令用来将一个独立文件中的数据插入到数据流中，该命令格式如下：
`[address]r filename`
filename参数指定了数据文件的绝对路径或相对路径。读取命令中使用的地址区间只能指定单独一个行号或文本模式地址。sed编辑器会将文件中的文本插入到指定地址后。

描述：将tab文件的内容插入到mydata文件中，具体插入在匹配模式first的行的后面。
命令：`sed '/first/r tab' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-r.png)

描述：将tab文件的内容插入到mydata文件中，具体插入在匹配模式first的行的后面。
命令：
`
sed '/LIST/ {
r detail.txt
d
}
`
`sed -f placehold.sed placehold`
源文件：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-placehold.png)
sed脚本文件：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-placehold-script.png)
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-placehold-f.png)

### **保持空间**
模式空间（pattern space）是一块活跃的缓冲区，在sed编辑器执行命令时它会保存待检查文本。保持空间（hold space）是sed编辑器的另一块缓冲区域，在处理模式空间中的某些行时，可以用保持空间来临时保存一些行。

|命 令|说 明|
|:--|:--|
|h|将模式空间复制到保持空间|
|H|将模式空间追加到保持空间|
|g|将保持空间复制到模式空间|
|G|将保持空间追加到模式空间|
|x|交换保持空间与模式空间的内容|

描述：用h和g目录将数据在sed编辑器缓冲空间之间移动。
命令：`sed -n '/first/ { h; p; n; p; g; p }' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-hold-space.png)

描述：将第一个数据行输出到第二个数据行的后面。
命令：`sed -n '/first/ { h; n; p; g; p }' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-hold-space-switch.png)

### **!命令排除**
描述：排除匹配模式header的行，感叹号（!)命令用来排除，让原本会起作用的命令不起作用，原本不起作用反而其作用。
命令：`sed -n '/header/!p' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-exclude.png)


描述：将文件的内容反转。
命令：``
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-exclude.png)


### **改变流**
分支（branch）命令b可以基于地址、地址模式或地址区间排除一整块命令。这样就可以对数据流中的特定行执行一组命令。分支（branch）命令b的格式如下：

`[address]b [label]`
address参数决定了哪些行的数据会触发分支命令。label参数定义了要跳转到的位置。如果没有加label参数，跳转命令会跳转到脚本的结尾。

描述：分支命令在数据流中的第2行和第3行处跳过了两个替换命令。
命令：`sed '{2,3b; s/This is/Is this/; s/line./test?/}' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-b.png)

如果不行直接跳到脚本的结尾，可以为分支命令定义一个要跳转的标签，定义跳转的标签以冒号开始，最多是7个字符长度。要指定标签，加到b命令后即可。标签可以跳过地址匹配出的命令，但任然执行脚本中的其他命令。

描述：如果出现匹配模式first的行，程序应该跳到标签为jump1的脚本行。如果分支命令的模式没有匹配，sed编辑器会继续执行脚本中的命令，包括分支标签后的命令。（所有的s替换命令都会在不匹配分支模式的行上执行）。
命令：

```
sed '{/first/b jump1; s/This is the/No jump on/
:jump1
s/This is the/Jump here on/}' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-label.png)


描述：使用分支标签达到循环的效果。
命令：

```
echo "This, is, a, test, to, remove, commas." | sed -n '{
:start
s/,//1p
b start
}'
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-infinite-loop.png)


描述：上面的脚本永远不会结束，在分支命令之前指定一个/,/地址模式，如果没有找到匹配，跳转就应该结束。
命令：

```
echo "This, is, a, test, to, remove, commas." | sed -n '{
:start
s/,//1p
/,/b start
}'
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-limit-loop.png)


### **测试命令**
描述：匹配模式first的行，如果匹配上则不会执行第二个替换命令。反之，则执行之。
命令：

```
sed '{
s/first/matched/
t
s/This is the/No match on/
}' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-t.png)

描述：匹配模式first的行，如果匹配上则不会执行第二个替换命令。反之，则执行之。
命令：

```
sed '{
s/first/matched/
t
s/This is the/No match on/
}' mydata
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-t-limit-loop.png)


### **使用包装脚本**
描述：将脚本封装进shell包装脚本（wrapper），执行之前需要赋予执行权限。$1代表从命令行提取第一个参数，在这里就是需要进行反转的文件名。
命令：`sed -n '{ 1!G; h; $p}' $1`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-reverse-sh.png)
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-run-reverse.png)

### **重定向sed的输出**
描述：使用$()将sed编辑器命令的输出重定向到一个变量中，以备后用。
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-script-fact.png)

### **加倍行间距**
描述：G命令会简单将保持空间内容附加到模式空间内容后，当启动sed编辑器时，保持空间只有一个空行。将它附加到已有行后面，就在已有行后面创建了一个空白行。
命令：`sed 'G' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-G.png)

描述：去掉上例中最后一行的空格。$和!结合表示一旦达到文件最后一行，就不执行G命令操作。
命令：`sed '$!G' mydata`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-G-clean-end.png)


### **对可能含有空白行的文件加倍行间距**
描述：去掉上例中最后一行的空格。
命令：`sed '{ /^$/d; $!G}' mydata4`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/sed/sed-clear-multiple-lines.png)

## 生产环境案例

### **替换指定目录所有文件中匹配的字符串**
描述：将当前目录下所有文件中出现字符串p9xqnn501的地方，全部替换为pabfn7ecx，并直接修改原始文件。
命令：`sed -i '' 's/p9xqnn501/pabfn7ecx/g' *`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/echo/echo.png)


### **删除空格**
描述：删除每行开头的空格。
命令：
`sed 's/^[ ]*//' mydata`
`sed 's/^[[:space:]]*//' mydata`

### **删除空行和开头的#注释**
描述：删除空行和开头的#注释
命令：
`sed -e 's/^#//; s/^$//' mydataΩ`

