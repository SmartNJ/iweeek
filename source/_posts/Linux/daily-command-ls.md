---
title: Linux ls总结
date: 2018-06-15 16:37:59
tags: Linux
---

ls（list）命令用来列出目标目录（缺省为当前目录）中所有子目录和文件。

<!-- more -->
## 命令功能

ls（list）命令用来列出目标目录（缺省为当前目录）中所有子目录和文件。


![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-man.png)

## 命令格式

`ls [选项] [参数]`

## 命令选项

```
-a：列出任何以.开头的文件（常用）。
-A：列出除.与..之外的任何文件。
-c：显示的最后更改时间（ctime）。默认以创建时间（最后更改时间）排序，最新的排在前面；如果与-l搭配使用，那么会以文件名排序；如果与-lt搭配，会显示创建时间（最后更改时间），根据时间排序。
-B：忽略备份文件，Linux中的备份文件以波浪号（~）结尾。
-d：仅列出目录本身，而不是列出目录内的文件数据（常用）
-f：不排序，与启用-aU，不启用-ls --color效果一样。
-F：根据文件、目录等信息，给与附加数据结构，例如：
	- @：代表一个符号链接。
	- *：代表可执行文件。
	- /：代表目录。
	- =：代表socket文件。
	- |：代表FIFO文件。
-g：像-l，但不列出拥有者。
-G：在-l下，不列出组名字。
-h：以人类可读的形式，打印文件大小，例如1K、234M、2G等等。
-i：打印inode信息。
-l：使用长数据串格式。
-r：排序时反转列表。
-R：递归列出子目录。
-s：列出每个文件分配的blocks大小。
-S：根据文件大小排序，最大的列在前面。
-t：根据最近修改时间排序，最新的列在前面。
-u：与-l搭配显示访问时间（atime）。
-U：不排序，按照目录顺序列出所有文件。
--author：在-l下，打印出作者的信息。
--color=never：不根据文件特性显示颜色。
--color=always：显示颜色。
--color=auto：系统自动判断是否显示颜色。
--format：以各种格式输出目录的内容。下文将介绍。
--full-time：以完整时间模式（包括年、月、日、时、分）输出。
--sort：根据不同规则排序。下文将介绍。
--time-style=[STYLE]：设置日期格式输出格式。
--time={atime,ctime}：将时间显示为atime、ctime和mtime其中一个，默认显示的是内容修改时间。
	- atime：访问时间。
	- ctime：权限改变属性时间。
	- mtime：内容修改时间。
```


### 示例：1. 查看文件和目录
描述：ls命令最基本的形式会显示当前目录下的文件和目录。
命令：`ls`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls.png)

### 示例：2. 区分文件和目录
描述：如果用户用的不是支持彩色的终端仿真器，可以用-F选项的ls命令轻松区分文件和目录。-F参数在目录名后加了正斜线（/），在可执行文件的后面加了星号。有关的指示符如下：

- @：代表一个符号链接。
- *：代表可执行文件。
- /：代表目录。
- =：代表socket文件。
- |：代表FIFO文件。
命令：`ls -F`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-F.png)

### 示例：3. 显示隐藏文件和普通文件
描述：显示当前目录下的所有以点号开头的隐藏文件和普通文件及目录。-a选项可以显示将隐藏文件显示出来。如果要跳过输出中的（.）和（..），使用-A选项。
命令：
`ls -a`
`ls -A`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-a.png)


### 示例：4. 递归显示文件
描述：列出当前目录下包含的子目录中的文件。-R选项，它叫做递归选项，它先显示了当前目录下的内容，然后还显示了所有子目录及其内容，如果子目录有跟多的子目录，-R选项会继续进行遍历。-F -R可以合并起来，如-FR。
命令：
`ls -F -R`
`ls -FR`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-R.png)


### 示例：5. 查看长（详细）列表
描述：显示文件或目录的附加信息。-l显示文件或者目录的大小，修改日期和时间，文件或者文件夹的名字和拥有者，以及它的权限信息。
命令：`ls -l`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-l.png)

以.开头的文件是隐藏文件，（.）（..）分别代表当前目录和上一级目录，目录的颜色是以蓝色显示的。
每一行都包含了关于文件（或目录）的下述信息：

- 第1字段：文件属性字段
文件属性字段总共有10个字母组成，第一个字符表示文件类型：
字符（-）：普通文件。
字母（d）：目录。
字母（l）：链接文件。
字母（c）：字符设备文件（character）。
字母（b）：块设备文件（block），一般置于/dev目录下，设备文件是普通文件和程序访问硬件设备的入口，一类特殊文件。
字母（p）：命令管道文件。与shell编程有关的文件。
字母（s）：sock文件。与shell编程有关的文件。
第1个字符后面的9个字母表示该文件或目录的权限位。三个为一组，均为rwx三个参数的组合。[r]代表可读、[w]代表可写、[x]代表可执行。如果没有权限，则会出现减号[-]。第一组为文件拥有者可具备的权限，第二个为加入此群组之账号的权限，第三组为非本人且没有加入本群组之其他账号的权限。

- 第2字段：如果一个文件不是目录，此时这一字段表示文件所具有的硬链接数。
- 第3字段：文件属主的用户名
- 第4字段：文件属组的组名。
- 第5字段：文件的大小（以字节为单位）。
- 第6字段：文件的上次修改时间。
- 第7字段：文件名或目录名。


### 示例：6. 列出每个文件分配的blocks大小
描述：-s列出每个文件分配的blocks大小。-s与-l搭配使用，第一列的数字就是该文件的blocks大小。
命令：`ls -ls`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-show-blocks.png)

注意到第一行的total后跟的数字，它是指当前目录下所有文件所占用的空间总和。文件系统在格式化时就规范好了块（block）的大小，每个block仅能容纳一个文件，如果块大小为4K，而文件只有1K，则会有3K的空间被浪费。第一列数字的总和就是total的值。


### 示例：7. 查看文件的author
描述：--author选项与-l相结合可以在第五列显示每个文件的作者。
命令：`ls -l --author`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-author.png)

注意到第一行的total后跟的数字，它是指当前目录下所有文件所占用的空间总和。文件系统在格式化时就规范好了块（block）的大小，每个block仅能容纳一个文件，如果块大小为4K，而文件只有1K，则会有3K的空间被浪费。第一列数字的总和就是total的值。

### 示例：8. 以字节为单位打印文件大小
描述：使用--block-size选项，以千字节或兆字节等为单词显示文件的大小。
命令：`ls -l --block-size=k [file-name]`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-block-size.png)

### 示例：9. 使ls在输出中仅显示文件名和文件大小
描述：使-h选项和-s选项配合使用，让ls输出仅包含文件/目录名称及其各自的大小。
命令：`ls -s -h`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-s-h.png)


### 示例：10. 过滤输出列表
描述：过滤器l?tter与目录中的两个文件匹配。问号可用于过滤器字符串中替代任意位置的单个字符。
命令：`ls -l l?tter`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-one-letter.png)

描述：使用星号找到了四个名字以l开头的文件。和问号一样，可以把星号放在过滤器中的任意位置。
命令：`ls -l l*`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-asterisk.png)

描述：中括号表示一个字符位置并给出多个可能的选择。例如列出文件名为latter或letter的文件。
命令：`ls -l l[ae]tter`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-metacharacter-wildcards.png)


描述：中括号[a-i]还可以表示从一个字母范围里匹配。
命令：`ls -l f[a-i]ll`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-range.png)

描述：感叹号（!）将不需要的内容排除在外。
命令：`ls -l f[!a]ll`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-exclamation.png)



### 示例：11. 以人类可阅读的格式列出文件信息
描述：-h选项会将文件大小变为K，M，G等人类可阅读的格式。
命令：`ls -lh`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-h.png)


### 示例：12. 反转显示结果
描述：-r参数将默认的显示结构进行倒序显示。
命令：`ls -r`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-reverse.png)

### 示例：13. 按照修改时间的从远到近顺序排列
描述：-t参数将按照时间从近到远进行排序。
命令：`ls -lt`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-t.png)

### 示例：14. 按照文件的大小排列
描述：-S参数按照文件的大小进行排序。
命令：`ls -lS`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-S.png)


### 示例：15. 自定义显示日期格式
描述：--time-style=[STYLE]可以自定义的文件修改日期格式进行显示。也可以直接使用--full-time显示最全的时间信息。[STYLE]的选项如下：

```
- full-iso
- long-iso
- iso
- locale
- +%H:%M:%S:%D
```

命令：
`ls -l --time-style=iso`
`ls --full-time ~`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-time-style.png)

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-full-time.png)



### 示例：16. 根据不同的规则进行排序
描述：根据--sort不同的规则进行排序。可选值如下（括号里表示等效的命令行参数）：

- extension(-X)：根据文件扩展名排序。
- size(-S)：根据文件大小排序。
- time(-t)：根据时间先后排序。
- version(-v)
- none(-U)

命令：`ls -l --sort=extension`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-sort-extension.png)


### 示例：17.更改ls命令输出格式
描述：–-format可以以各种格式输出目录的内容，例如逗号，水平、垂直分隔等等。可选值如下：

```
- comma：逗号。
- horizontal或across：水平。
- long或verbose：长列表，如-l选项。
- single-column：单列。
- vertical：垂直排列，根据屏幕宽度决定显示几列。
```
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-commas.png)

![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-single-column.png)

### 示例：18.使ls隐藏特定类型的文件
描述：使用--hide可以强制ls命令在输出中隐藏特定类型的文件。例如，在输出中隐藏以.txt结尾的文件。
命令：`ls --hide=*.txt`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ls/ls-hide.png)







