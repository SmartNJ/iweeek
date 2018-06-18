---
title:  Linux less总结
date: 2018-06-13 20:46:40
tags: Linux
---


<!-- more -->
## 命令功能

less命令和more目录很相似，但是less有更多的功能。less在执行之前不会读取所有的内容，因此会比在vi编辑器中打开更快。

![](http://p9xqnn501.bkt.clouddn.com/less/less-man.png)

## 命令格式

```
less [-[+]aABcCdeEfFgGiIJKLmMnNqQrRsSuUVwWX~] [-b space] [-h lines] 
     [-j line] [-k keyfile] [-{oO} logfile] [-p pattern] [-P prompt] 
     [-t tag] [-T tagsfile] [-x tab,...] [-y lines] [-[z] lines] 
     [-# shift] [+[+]cmd] [--] [filename]... 
```

## 命令选项

- num *lines*：
- -d：
- -e：文件内容显示完毕后，自动退出。
- -f：强制显示文件。
- -g：不加亮显示搜索到的所有关键词，仅显示当前显示的关键字，以提高显示速度。
- -l：搜索时忽略大小写的差异。
- -N：每一行行首显示行号。
- -s：将连续多个空行压缩成一行显示。
- -S：在单行显示较长的内容，而不换行显示。
- -x<数字>：将TAB字符显示为指定个数的空格字符。


该命令一次显示一屏文本，满屏后停下来，并且在屏幕的底部出现一个提示信息，给出至今己显示的该文件的百分比：--More--（XX%）可以用下列不同的方法对提示做出回答：

- **h**, **H**：显示简短的命令汇总帮助信息。
- Space, ^V, f, ^F：向前滚动N行，默认是一个屏幕的内容。如果N大于屏幕能显示的行数，那么仅显示屏幕能显示的行数。注意，一些系统将^V作为字面字符。
- z：与SPACE类似，如果N已设置，则依据屏幕的大小。
- Esc-Space：与SPACE类似，每次滚动整个屏幕大小的行，即使到达了文件末尾。
- Return, ^N, e, ^E, j, ^J：向前滚动N行，默认是1行。如果N大于屏幕大小，也会显示全部的行数。
- d, ^D：向前滚动N行，默认一个半的屏幕大小。如果N已设置，它成为后续d和u命令的新默认值。
- b, ^B, Esc-v：向后滚动N行，默认是一个屏幕大小。如果N大于屏幕能显示的行数，那么仅显示屏幕能显示的行数。
- w：与Esc-v类似，如果N已设置，则依据屏幕的大小。
- y, ^Y, ^P, k, ^K：向后滚动N行，默认是1行。整个N行都会被现实，即使N大于屏幕大小。注意，一些系统使用^Y作为控制字符。
- u, ^U：向后滚动N行，默认一个半屏幕大小。如果N已设置，它成为后续d和u命令的新默认值。
- Esc-), right arrow：水平滚动N个字符，默认是半个屏幕长度（-#选项）。如果N已设置，它成为未来右箭头和左箭头命令的默认值。
- Esc-(, left arrow：


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
描述：打开文件第一页放入可用的屏幕大小内。more移动文件的百分比值将在底部的实时显示。-c选项
命令：`more /usr/share/dict/words`
输出：
![](http://p9xqnn501.bkt.clouddn.com/more/more.png)

描述：-3表示每次仅显示3行。-c选项将不进行滚屏操作，而是每次刷新这个屏幕。
命令：`more -3 -c /usr/share/dict/words`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-editor.png)

**实例：2. 显示帮助**
描述：-d显示[press space to continue,'q' to quit.]提示。按h键或?键可以显示帮助信息。
输出:
![](http://p9xqnn501.bkt.clouddn.com/more/more-h.png)


**实例：3. 显示行号**
描述：按=键，可以显示当前的行号。
命令：`按=键显示行号`
输出:
![](http://p9xqnn501.bkt.clouddn.com/more/more-=.png)


**实例：4. 查看多个文件的内容**
描述：如果通过通配符传递给more多个文件的的内容，这将为每个文件打开一个缓冲区并显示第一个文件，并显示一个标题以指示正在显示的文件。
命令：`more /usr/share/dict/*`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-n-p.png)
按:n跳到下一个文件的开头。
![](http://p9xqnn501.bkt.clouddn.com/more/more-next-file.png)
按:p要跳回上一个文件的开头。
![](http://p9xqnn501.bkt.clouddn.com/more/more-previous-file.png)

**实例：5. 查看更多**
描述：
按Space键或者z键可以基于当前屏幕的大小向前移动一页。按回车键向前移动一行，或者在按回车键之前按一个数字n，再按回车键，可以直接向前移动n行。按b或者CTRL-B向后移动一页。

**实例：6. 打开文件并定位到指定的行**
描述：打开letter文件，并直接定位到第10行J字母位置。
命令：`more +10 letter`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-to-line-number.png)


**实例：7. 打开文件并定位到第一次匹配的位置**
描述：打开words文件，查找第一次出现以eat开头的单词，并定位到该位置。选项+后跟搜索模式，表示搜索字符串第一次出现的位置，搜索模式应该以/开头，可以是正则表达式。
命令：`more +/^eat /usr/share/dict/words`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-wildcard.png)


**实例：8. 如何在more界面下搜索内容**
描述：在more界面中，按/键后进入搜索模式，输入要搜索的短语，搜索模式接受正则表达式。例如，在words文件中搜索eat，将搜索短语的实例并滚动到页面第一次出现它的位置。
如果要继续查找下一个出现该模式的地方，按n键即可。
命令：`按/键进入搜索模式`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-search.png)


**实例：9. 编辑正在查看的文件**
在more界面中，按v键后将会打开文本编辑器，默认的文本编辑器是$EDITOR变量指定的。当修改完成保存后退出，将会回到more界面。如果$EDITOR没有指定编辑器，那么默认的vi将会被使用。

描述：先查看$EDITOR是否已设置，如果没有，在命令行输入export EDITOR=vim可以临时设置。如果要永久设置该变量，请将其添加到.bashrc文件或.zshrc文件中。
命令：
`export EDITOR=vim`
`按v键进入编辑模式`
输出：

![](http://p9xqnn501.bkt.clouddn.com/more/more-editor.png)


**实例：10. 如何退出more**
描述：按q、Q键或CTRL-C（中断键）退出more界面，并返回到终端提示符。



