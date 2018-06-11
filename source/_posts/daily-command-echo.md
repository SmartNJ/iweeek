---
title: Linux echo总结
date: 2018-06-03 16:43:46
tags: Linux
---

echo用来在标准输出或者文件中显示一行文本或者字符串。

<!-- more -->

## 命令格式
echo [选项] [字符串]

当echo命令不带任何选项或字符串使用时，它会在显示屏上返回一个空白行，后面换一行跟上命令提示符。这是因为按下回车键就是发送一个信号给系统以开始一个新行，而echo重复了该信号。

## 命令功能
echo命令是内建的shell命令，用于显示变量的值或者打印一行文本。

## 命令参数

- -n 不要在echo命令输出后换行。
- -e 使反斜线转义生效。
- -E 使反斜线转义失效（默认）。

如果使用-e选项，则可以使用如下转义序列：

- \ 反斜线
- \a 警告（BEL）
- \b 退格
- \c 不产生进一步输出，不换行。
- \e 转义
- \f 换页
- \n 新行
- \r 换行字符
- \t 水平制表
- \v 垂直制表
- \0NNN 八进制值表示的字节NNN（1到3个数字）
- \xHH 十六进制值表示的字节NNN（1到2个数字）

## 实用命令


**实例：1. 输入一行文本并显示在标准输出上**
命令：`echo A Linux-based system is a modular Unix-like operating system.`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo.png)


**实例：2. 输出一个声明的变量值**
命令：`echo The value of variable x = $x`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-variable.png)


**实例：3. 使用\b选项**
命令：`echo -e "A \bLinux-based \bsystem \bis \ba \bmodular \bUnix-like \boperating \bsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-b.png)

**实例：4. 显示系统定义的变量的值**
命令：`echo $USER $HOME`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-$.png)

**实例：5. 使用\n选项**
命令：`echo -e "A \nLinux-based \nsystem \nis \na \nmodular \nUnix-like \noperating \nsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-n.png)

**实例：6. 使用\t选项**
命令：`echo -e "A \tLinux-based \tsystem \tis \ta \tmodular \tUnix-like \toperating \tsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-t.png)

**实例：7. 同时使用换行\n与水平制表符\t**
命令：`echo -e "\n\tA \n\tLinux-based \n\tsystem \n\tis \n\ta \n\tmodular \n\tUnix-like \n\toperating \n\tsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-n-t.png)

**实例：8. 使用\v选项**
命令：`echo -e "A \vLinux-based \vsystem \vis \va \vmodular \vUnix-like \voperating \vsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-v.png)

**实例：9. 同时使用换行\n与垂直制表符\v**
命令：`echo -e "\n\vA \n\vLinux-based \n\vsystem \n\vis \n\va \n\vmodular \n\vUnix-like \n\voperating \n\vsystem."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-n-v.png)

**实例：10. 使用\r选项**
命令：`echo -e "A \rLinux-based system is a modular Unix-like operating system."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-r.png)

**实例 11. 使用\c选项**
命令：`echo -e "A Linux-based system \cis a modular Unix-like operating system."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-c.png)

**实例：12. -n会在echo完后不会输出新行**
命令：`echo -n "A Linux-based system is a modular Unix-like operating system."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo--n.png)


**实例：13. 使用\a选项**
描述：-e后面跟上\a选项会听到声音警告。
命令：`echo -e "A Linux-based system is a \amodular Unix-like operating system."`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-a.png)

**实例：14. 使用echo命令打印所有的文件和文件夹（ls命令的替代）**
命令：`echo *`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-*.png)

**实例：15. 打印制定的文件类型**
描述：打印所有的以.txt结尾的文件。
命令：`echo *.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-*-txt.png)

**实例：16. echo可以使用重定向符来输出到一个文件而不是标准输出**
命令：`echo "A Linux-based system is a modular Unix-like operating system." > linux.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-redirect.png)

**实例：17. 设置echo命令彩色输出**
echo命令可以修改字体类型，字体背景色以及字体颜色，转义序列\033可以用于改变字体属性。要使转义序列生效，必须使用-e选项。下面列出了部分转义代码：

- [0m: 正常
- [1m: 粗体
- [4m: 字体加上下划线
- [7m: 逆转前景和背景色
- [8m: 不可见字符
- [9m: 跨行字体
- [30m: 灰色字体
- [31m: 红色字体
- [32m: 绿色字体
- [33m: 棕色字体
- [34m: 蓝色字体
- [35m: 紫色字体
- [36m: 浅蓝色字体
- [37m: 浅灰字体
- [38m: 黑色字体
- [40m: 黑色背景
- [41m: 红色背景
- [42m: 绿色背景
- [43m: 棕色背景
- [44m: 蓝色背景
- [45m: 紫色背景
- [46m: 浅蓝色背景
- [47m: 浅灰色背景


描述：Magic of Linux变成粗体，of Linux将逆转前景和背景色，并且底色是绿色的。
命令：`echo -e "\033[1mMagic \033[32m\033[7mof Linux\033[0m"`
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-033.png)


**实例：17. 在文本中用抑音符来执行命令**
命令：echo "$LOGNAME carried them out at \`date\`"
输出：

![](http://p9xqnn501.bkt.clouddn.com/echo/echo-date.png)

