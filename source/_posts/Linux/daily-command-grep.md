---
title: Linux grep总结
date: 2018-06-09 00:39:12
tags: Linux
---

grep是一个强大的文本搜索工具，用于搜索与正则表达式匹配的行的纯文本数据。如果将 grep 拆分为 `g/re/p`，其实代表全局搜索正则表达式并打印结果（globally search a regular expression and print），也就是从文件中搜索模式，然后打印匹配的行到屏幕。不过grep只能使用基本的正则表达式来搜索文本，并且在查找字符串时，是以整行为单位进行数据筛选的。
egrep命令等同于grep -E，可以使用扩展的正则表达式来对文本进行搜索。fgrep命令等同于grep -F，可以使用固定的字符串来对文本进行搜索，不支持正则表达式，执行速度很快。

<!-- more -->

## 命令格式
`grep [选项] '搜索字符串'文件`

## 命令功能
grep用于搜索与正则表达式匹配的行的纯文本数据。它在一个或多个文件中搜索字符串模板。如果模板包括空格，则必须被引用，模板后的所有字符串被看作文件名。搜索的结果被送到标准输出，不影响源文件内容。
grep可用于shell脚本，因为grep通过返回一个状态值来说明搜索的状态，如果模板搜索成功，则返回0，如果搜索不成功，则返回1，如果搜索的文件不存在，则返回2。

## 命令参数

- ？：同时显示匹配行上下的？行，同-C选项。
- -a或--text：不要忽略二进制的数据。   
- -A<显示行数>或--after-context=<显示行数>：除了显示符合范本样式的那一列之外，并显示该行之后的内容。   
- -b或--byte-offset：在显示符合样式的那一行之前，标示出该行第一个字符的编号。   
- -B<显示行数>或--before-context=<显示行数>：除了显示符合样式的那一行之外，并显示该行之前的内容。   
- -c或--count：只打印匹配的行数，不显示匹配的内容。   
- -C<显示行数>或--context=<显示行数>或-<显示行数>：除了显示符合样式的那一行之外，并显示该行之前后的内容。   
- -d<动作>或--directories=<动作>：当指定要查找的是目录而非文件时，必须使用这项参数，否则grep指令将回报信息并停止动作。   
- -e<范本样式>或--regexp=<范本样式>：指定字符串做为查找文件内容的样式。   
- -E或--extended-regexp：将样式为延伸的普通表示法来使用。   
- -f<规则文件>或--file=<规则文件>：指定规则文件，从文件中提取规则，其内容含有一个或多个规则样式，让grep查找符合规则条件的文件内容，格式为每行一个规则样式。空文件包含0个规则，什么都不匹配，
- -F或--fixed-regexp：将样式视为固定字符串的列表。   
- -G或--basic-regexp：将样式视为普通的表示法来使用。   
- -h或--no-filename：在显示符合样式的那一行之前，不标示该行所属的文件名称前缀。   
- -H或--with-filename：在显示符合样式的那一行之前，表示该行所属的文件名称。   
- -i或--ignore-case：忽略字符大小写的差别。   
- -l或--file-with-matches：列出文件内容符合指定的样式的文件名称。   
- -L或--files-without-match：列出文件内容不符合指定的样式的文件名称。   
- -n或--line-number：在显示符合样式的那一行之前，标示出该行的列数编号。   
- -o：只输出文件中匹配到的部分。
- -q或--quiet或--silent：不显示任何信息。   
- -r或--recursive：此参数的效果和指定“-d recurse”参数相同。   
- -s或--no-messages：不显示错误信息。   
- -v或--revert-match：显示不包含匹配文本的所有行。   
- -V或--version：显示版本信息。   
- -w或--word-regexp：只显示全字符合的列。   
- -x或--line-regexp：只显示全列符合的列。   
- -y：此参数的效果和指定“-i”参数相同。


## 规则表达式

grep正则表达式元字符集（基本集）：

- ^：锚定行的开始，如：'^grep'匹配所有以grep开头的行。
- $：锚定行的结束，如：'grep$'匹配所有以grep结尾的行。
- .：匹配一个非换行符的字符，如：'gr.p'匹配gr后接一个任意字符，然后是p。
- \*：匹配零个或多个先前字符，如：'*grep'匹配所有一个或多个空格后紧跟grep的行。
- .* ：一起用代表任意字符。   
- [] ：匹配一个指定范围内的字符，如'[Gg]rep'匹配Grep和grep。
- [^]：匹配一个不在指定范围内的字符，如：'[^A-FH-Z]rep'匹配不包含A-R和T-Z的一个字母开头，紧跟rep的行。
- \(..\)：标记匹配字符，如'\(love\)'，love被标记为1。
- \<：锚定单词的开始，如:'\<grep'匹配包含以grep开头的单词的行。
- \>：锚定单词的结束，如'grep\>'匹配包含以grep结尾的单词的行。
- x\{m\}：重复字符x，m次，如：'o\{5\}'匹配包含5个o的行。
- x\{m,\}：重复字符x,至少m次，如：'o\{5,\}'匹配至少有5个o的行。
- x\{m,n\}：重复字符x，至少m次，不多于n次，如：'o\{5,10\}'匹配5--10个o的行。   
- \w：匹配文字和数字字符，也就是[A-Za-z0-9]，如：'G\w*p'匹配以G后跟零个或多个文字或数字字符，然后是p。   
- \W：\w的反置形式，匹配一个或多个非单词字符，如点号句号等。   
- \b：单词锁定符，如: '\bgrep\b'只匹配grep。  

egrep和grep -E的元字符扩展集

- +：匹配一个或多个先前的字符。如'[a-z]+able'，匹配一个或多个小写字母后跟able的串，如loveable，enable，disable等。
- ？：匹配零个或多个先前的字符。如'gr?p'匹配gr后跟一个或没有字符，然后是p的行。
- a|b|c：匹配a或b或c。如grep|sed匹配grep或sed。
- ()：分组符号，如love(able|rs)ov+匹配loveable或lovers，匹配一个或多个ov。
- x{m},x{m,},x{m,n}：作用同x\{m\}，x\{m,\}，x\{m,n\}

POSIX字符类

为了在不同国家的字符编码中保持一致，POSIX（The Portable Operating System Interface）增加了特殊的字符类。

- [[:alnum:]]：文字数字字符。
- [[:alpha:]]：文字字符。
- [[:digit:]]：数字字符。
- [[:lower:]]：小写字符。
- [[:cntrl:]]：控制字符。、
- [[:print:]]：非空字符（包括空格）。
- [[:punct:]]：标点符号。
- [[:space:]]：所有空白字符（新行，空格，制表符）。
- [[:upper:]]：大写字符。
- [[:xdigit:]]：十六机制数字（0-9，a-f，A-F）。


## 实用命令


**实例：1. 查找文件**
描述：-i表示忽略大小写。-y与-i的效果相同。
命令：`find . -name "*.txt" | grep -i find`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-i.png)


**实例：2. 搜索并过滤文件**
描述：-v选项告诉grep反转其匹配的输出，也就是打印所有不匹配的行。
命令：`find . -name "*.txt" | grep -v find`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-v.png)

**实例：3. 只查找特定的文件**
描述：以下命令表示搜索以.txt结尾的文件，然后通过重定向到grep，筛选文件名中含有字符串find的结果，再次重定向到grep，筛选结果中不存在users的结果。
命令：`find . -name "*.txt" | grep -i find | grep -vi users`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-grep.png)

**实例：4. 显示指定字符串位置向前或者向后的行**
描述：显示匹配到eth0的行以及后面的10行。-A和-B，显示匹配的行和行数，显示匹配的字符串行之前或之后。-A=after，-B=before。
命令：`ifconfig | grep -A 10 eth0`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-A.png)

描述：显示匹配到lo的行以及前面的10行。-b将显示该行第一个字符的编号。
命令：`ifconfig | grep -b -B 10 lo`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-B.png)

**实例：5. 只显示匹配到的部分**
描述：从ifconfig的输出中搜索net，显示每行的第一个字符的编号，并且只显示文件中匹配的部分。-o选项只输出文件中匹配到的部分。
命令：`ifconfig | grep -b -o net`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-o.png)


**实例：6. 打印匹配周围的行**
描述：显示匹配到字符串lo的行以及前后各1行。-C选项会打印出匹配字符串之前和之后出现的行。
命令：`ifconfig | grep -C 1 lo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-C.png)

**实例：7. 为匹配的字符串计数**
描述：统计匹配到的字符串数量。-c与wc命令一样可以统计字符数。
命令：`ifconfig | grep -c lo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-cc.png)


**实例：8. 按给定的字符串搜索文件并显示行号**
描述：在find.txt文件中查找hello字符串，并显示所在的行。在编辑错误时调试文件，-n选项可以为文件中的行显示行号。
命令：`grep -n -i "hello" find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-n.png)

**实例：9. 匹配多个模式**
描述：在find.txt中搜索匹配Hello或者as的行。-e选项指定字符串作为查找文件的模式，可以使用多个。
命令：`grep find.txt -e Hello -e as`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-e.png)


**实例：10. 在所有目录中递归搜索字符串**
描述：在find.txt文件中查找hello字符串，并显示所在的行。-r可以递归搜索当前目录及其所有子目录。
命令：`grep -r -i "hello"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-r.png)

描述：-h参数将不显示该行所属的文件名称，默认-H是显示的。
命令：`grep -r -h -i "hello"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-r-h.png)

**实例：11. 搜索整个模式**
描述：从ifconfig的输出中搜索RUNNING字符串出现的行。
命令：`ifconfig | grep -w "RUNNING"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex.png)

**实例：12. 在gzip压缩文件中搜索**
描述：从find.tar.gz压缩包里查找hello字符串。
命令：`zgrep -i hello find.tar.gz`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-zgrep.png)

**实例：13. 搜索目录并列出内容含有指定字符串的文件名称**
描述：从/root目录下列出文件内容中含有Hello字样的文件名称，忽略大小写。-l列出的是符合指定字符串的文件名称，-L列出的是不符合指定字符串的文件名称。
命令：`grep -i -l Hello /root/*`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-l.png)

**实例：14. 只列出包含或者不包含的文件内容**
描述：在当前目录下所有以.txt结尾的文件中，列出文件内容中含有Hello字样的文件名称，忽略大小写。--include只搜索匹配正则表达式的文件。
命令：`grep -i -r hello . --include "*.txt"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-include.png)

描述：在当前目录下所有不以.txt结尾的文件中，列出文件内容中含有Hello字样的文件名称，忽略大小写。--exclude搜索不匹配正则表达式的文件。
命令：`grep -i -r hello . --exclude "*.txt"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-exclude.png)

## 正则表达式用法


**实例：15. 显示所有以f开头的文件中包含hello的行**
描述：在当前目录下显示所有以f开头的文件中包含hello的行。
命令：`grep -i 'hello' f*`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-*.png)


**实例：16. 显示在多个文件中匹配hello的行**
描述：在当前目录下显示所有以f开头的文件中包含hello的行。
命令：`grep -i 'hello' find.txt xy12.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-multiple.png)


**实例：17. 模式出现几率**
描述：在当前目录下所有文件中，搜索所有包含两个字母a的行。
命令：`grep "a\{2\}" find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-probability.png)

**实例：18. 模式出现几率**
描述：在当前目录下所有文件中，搜索所有超过9个字母的单词的行。
命令：`grep -i '[a-z]\{9\}' find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-number.png)

描述：-b选项将锁定为单词。
命令：`grep -i '\b[a-z]\{9\}\b' find.txt`

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-number-b.png)

描述：搜索超过9个字母的单词的行。
命令：`grep -i '\b[a-z]\{9,\}\b' find.txt`

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-number-to-more.png)

描述：搜索9-11个字母的单词的行。
命令：`grep -i '\b[a-z]\{9,11\}\b' find.txt`

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-number-to-number.png)

**实例：19. 使用grep匹配「与」或者「或」模式**
描述：搜索see或者in字符串所在的行。-E选项使用扩展模式匹配。|表示两边之一或者全部，可以使用任意多的|。
命令：`grep -E 'see|in' find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-or.png)

**实例：20. 空行**
描述：搜索文件中所有的空行。结合^和`$`可查询空行。
命令：`grep -n '^$' find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-blank-lines.png)

**实例：21. 匹配特殊字符**
描述：搜索含有特殊含义的字符，诸如`$.'"*[]^|\+?`，必须在特定字符前加\。
命令：`grep "\^" find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-punct.png)

**实例：22. 分组**
描述：如果Hello被匹配，则ell就被存储到内存中，并标记为1，然后搜索任意个字符（.\*），这些字符后面紧跟着另外一个ell（\1），找到就显示该行。如果用egrep或grep -E，就不用"\"号进行转义，直接写成'H(ell)o.\*\1'就可以了。
命令：`grep -i 'H\(ell\)o.*\1' find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-group.png)

**实例：23. 复杂情况**
描述：搜索以tion，tions，come，comes结尾的单词。
命令：`egrep "([a-z]*tion|come)(s)?" find.txt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-regex-complication.png)

<!-- 使用 -f 用文件指定待查找的模式 https://linux.cn/article-5453-1.html -->
## POSIX用法

**实例：24. 搜索以字母或数字（Alphanumeric）开头的行**
描述：起始于[A-Z]，[a-z]，[0-9]。
命令：`grep "^[[:alnum:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-alphanumeric.png)

**实例：25. 搜索以字母（Alpha）开头的行**
描述：起始于[A-Z]，[a-z]。
命令：`grep "^[[:alpha:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-alpha.png)


**实例：26. 搜索以空白（Blank）字符串开头的行**
描述：起始于[Tab & Space]。
命令：`grep "^[[:blank:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-blank.png)

**实例：27. 搜索以数字（Digit）字符串开头的行**
描述：起始于[0-9]。
命令：`grep "^[[:digit:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-digit.png)

**实例：28. 搜索以小写字母（Lower）字符串开头的行**
描述：起始于[a-z]。
命令：`grep "^[[:lower:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-lowercase.png)

**实例：29. 搜索以大写字母（Uppercase）字符串开头的行**
描述：起始于[A-Z]。
命令：`grep "^[[:upper:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-uppercase.png)


**实例：30. 搜索以标点符号（Punctuation）字符串开头的行**
描述：起始于[! ” # $ % & ‘ ( ) * + , – . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~. ]。
命令：`grep "^[[:puct:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-punctuation.png)


**实例：31. 搜索图形符号**
描述：字母数字和标点符号统称为图形字符。
命令：`grep "^[[:graph:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-graphical.png)

**实例：32. 搜索可打印的字符（Printable Characters）**
描述：可打印的字符包括：字母数字，标点符号和空格字符。
命令：`grep "^[[:print:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-printable.png)

**实例：33. 搜索空格字符（Space Characters）**
描述：类似于[tab, newline, vertical tab, form feed, carriage return, and space]。
命令：`grep "^[[:space:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-space.png)



**实例：34. 搜索以十六进制（Hexadecimal）字符串开头的行**
描述：起始于[0-9, A-F and a-f]。
命令：`grep "^[[:xdigit:]]" iweeek`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/grep/grep-hexadecimal.png)


