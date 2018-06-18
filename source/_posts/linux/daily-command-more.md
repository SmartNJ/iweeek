---
title: Linux more总结
date: 2018-06-13 14:23:45
tags: Linux
---


more命令是一个基于vi编辑器文本过滤器，它以全屏幕的方式按页显示文本文件的内容，支持vi中的关键字定位操作。more内置若干快捷键，常用的有H（获得帮助信息），Enter（向下翻滚一行），空格（向下滚动一屏），Q（退出命令）。

<!-- more -->
## 命令功能

more命令用于一次查看一个或多个文件的内容。它支持通过文件向前和向后导航，主要用于查看文件的内容。它还支持搜索字符串或正则表达式，并在文本编辑器中的当前位置打开文件。
![](http://pabfn7ecx.bkt.clouddn.com/more/more-man.png)

## 命令格式

`more [-dlfpcsu] [-num lines] [+/pattern] [+linenum] [file ...]`

## 命令选项

- -num *lines*：指定每屏显示的行数。
- -d：显示“[press space to continue,'q' to quit.]”和“[Press 'h' for instructions]”。当一个非法的按键按下时，会响铃。
- -c：不进行滚屏操作。每次刷新这个屏幕。
- -s：将多个空行压缩成一行显示。
- -u：禁止下划线。
- +*num*：从指定数字的行开始显示。
- **+/** *正则表达式*：指定搜索的正则表达式。

该命令一次显示一屏文本，满屏后停下来，并且在屏幕的底部出现一个提示信息，给出至今己显示的该文件的百分比：--More--（XX%）可以用下列不同的方法对提示做出回答：

- **h**, **?**：显示简短的命令汇总帮助信息。
- [*k*]**SPACE**, [*k*]**z**：显示文本的下一屏内容。
- [*k*]**RETURN**：只显示文本的下一行内容。
- [*k*]**d**,[*k*]**^D**：滚动k行，初始滚动11行。
- **q**, **Q**, **^C**：退出more命令。
- [*k*]**s**：跳过k行，默认是1行。
- [*k*]**f**：跳出k个屏幕大小的行，默认是1行。
- **b**, **^B**：显示上一屏的内容，默认是1行，仅在浏览文件时起作用，通过管道传送过来的是无效的。
- **'**：返回到上一次搜索开始的位置。
- **=**：显示当前行号。
- [*k*]**/** *pattern*：进入搜索模式，搜索第k次出现匹配正则表达式的地方，默认是第一次出现的地方。按n键继续搜索下一个匹配项。
- [*k*]**n**：搜索第k次出现上次匹配上一次正则表达式的地方，默认是1。
- **!** *command*, **:!** *command*：在子shell中执行命令。
- **v**：用$EDITOR指定的编辑器打开当前行。如果未指定，则默认用/usr/bin/vi打开。
- **^L**：与-c选项相同，重绘屏幕，不进行滚屏。
- [*k*]**:n**：如果有多个文件，跳到下一个文件。
- [*k*]**:p**：如果有多个文件，跳到上一个文件。
- **:f**：显示当前文件的名字和行号。
- **.**：重复上一次的命令。



## 实用示例

**实例：1. 查看文件的内容**
描述：打开文件第一页放入可用的屏幕大小内。more移动文件的百分比值将在底部的实时显示。
命令：`more /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/more/more.png)

描述：-3表示每次仅显示3行。-c选项将不进行滚屏操作，而是每次刷新这个屏幕。
命令：`more -3 -c /usr/share/dict/words`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-editor.png)

**实例：2. 显示帮助**
描述：-d显示[press space to continue,'q' to quit.]提示。按h键或?键可以显示帮助信息。
输出:
![](http://pabfn7ecx.bkt.clouddn.com/more/more-h.png)


**实例：3. 显示行号**
描述：按=键，可以显示当前的行号。
命令：`按=键显示行号`
输出:
![](http://pabfn7ecx.bkt.clouddn.com/more/more-=.png)


**实例：4. 查看多个文件的内容**
描述：如果通过通配符传递给more多个文件的的内容，这将为每个文件打开一个缓冲区并显示第一个文件，并显示一个标题以指示正在显示的文件。
命令：`more /usr/share/dict/*`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-n-p.png)
按:n跳到下一个文件的开头。
![](http://pabfn7ecx.bkt.clouddn.com/more/more-next-file.png)
按:p要跳回上一个文件的开头。
![](http://pabfn7ecx.bkt.clouddn.com/more/more-previous-file.png)

**实例：5. 查看更多**
描述：
按Space键或者z键可以基于当前屏幕的大小向前移动一页。按回车键向前移动一行，或者在按回车键之前按一个数字n，再按回车键，可以直接向前移动n行。按b或者CTRL-B向后移动一页。

**实例：6. 打开文件并定位到指定的行**
描述：打开letter文件，并直接定位到第10行J字母位置。
命令：`more +10 letter`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-to-line-number.png)


**实例：7. 打开文件并定位到第一次匹配的位置**
描述：打开words文件，查找第一次出现以eat开头的单词，并定位到该位置。选项+后跟搜索模式，表示搜索字符串第一次出现的位置，搜索模式应该以/开头，可以是正则表达式。
命令：`more +/^eat /usr/share/dict/words`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-wildcard.png)


**实例：8. 如何在more界面下搜索内容**
描述：在more界面中，按/键后进入搜索模式，输入要搜索的短语，搜索模式接受正则表达式。例如，在words文件中搜索eat，将搜索短语的实例并滚动到页面第一次出现它的位置。
如果要继续查找下一个出现该模式的地方，按n键即可。
命令：`按/键进入搜索模式`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-search.png)


**实例：9. 编辑正在查看的文件**
在more界面中，按v键后将会打开文本编辑器，默认的文本编辑器是$EDITOR变量指定的。当修改完成保存后退出，将会回到more界面。如果$EDITOR没有指定编辑器，那么默认的vi将会被使用。

描述：先查看$EDITOR是否已设置，如果没有，在命令行输入export EDITOR=vim可以临时设置。如果要永久设置该变量，请将其添加到.bashrc文件或.zshrc文件中。
命令：
`export EDITOR=vim`
`按v键进入编辑模式`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-editor.png)

**实例：9. 命令行搜索正则表达式**
模式：从words文件中搜索单词中含有eat的位置，每次显示3行，从第10行开始搜索，并加以提示。
命令：`more -d -3 +/eat +10 /usr/share/dict/words`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/more/more-editor.png)



**实例：10. 如何退出more**
描述：按q、Q键或CTRL-C（中断键）退出more界面，并返回到终端提示符。



