---
title: Linux tail总结
date: 2018-06-13 11:31:58
tags: Linux
---

tail命令用于显示来自文件或者管道结尾（最新实时）的内容。

<!-- more -->
## 命令功能

tail命令用于显示来自文件或者管道结尾（最新实时）的内容。默认情况下，tail命令显示文件的最后10行内容。支持多文件处理，在输出每个文件之前都有一个标识文件名的标题。如果未指定文件，或者文件被指定为破折号「-」，则tail命令从标准输入中读取。

![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-man.png)

## 命令格式

`tail [选项] [文件(s)]`

## 命令选项

- --retry：即是在tail命令启动时，文件不可访问或者文件稍后变得不可访问，都始终尝试打开文件。使用此选项时需要与选项“——follow=name”连用；
- -c<N>或——bytes=<N>：输出文件尾部的N（N为整数）个字节内容；
- -f<name/descriptor>或；--follow<nameldescript>：显示文件最新追加的内容。“name”表示以文件名的方式监视文件的变化。“-f”与“-fdescriptor”等效；
- -F：与选项“-follow=name”和“--retry"连用时功能相同；
- -n<N>或——line=<N>：输出文件的尾部N（N位数字）行内容。
- --pid=<进程号>：与“-f”选项连用，当指定的进程号的进程终止后，自动退出tail命令；
- -q或——quiet或——silent：当有多个文件参数时，不输出各个文件名；
- -s<秒数>或——sleep-interal=<秒数>：与“-f”选项连用，指定监视文件变化时间隔的秒数；
- -v或——verbose：当有多个文件参数时，总是输出各个文件名；
- --help：显示指令的帮助信息；
- --version：显示指令的版本信息。tail -f  /usr/local/webserver/tomcat/logs/catalina.out

## 实用示例

**实例：1. 查看文件的后十行**
描述：查看words文件的后10行。默认情况下，tail命令显示文件的最后10行内容。
命令：`tail letter`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail.png)

**实例：2. 限制要显示的行数**
描述：显示words文件的最后3行。-n选项限制要显示的行数。
命令：
`tail -n 3 letter`
`tail -3 letter`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-n.png)

描述：显示words文件的最后1000行。可以在num后加上后缀，例如：b，KB，K等等。
命令：`tail -n 1K /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-n-1K.png)


**实例：3. 监视日志文件**
描述：显示words文件（日志文件）的最后10行，并且一直监视它，一旦有新的内容加入，就立即打印出来。-f选项将监视文件的更新。
命令：`tail -f /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-f-CTRL-C.png)
注意：tail -f将一直监视着文件，要停止它，按CTRL+C。

**实例：4. 监视日志文件并只输出指定内容**
描述：tail将监视access.log文件，它将通过管道传送access.log的最后十行和任何新加入到文件中的行给grep。grep读取从tail传送过来的输出，只打印出包含IP地址10.10.10.10的那些行。
命令：`tail -f access.log | grep 10.10.10.10`

**实例：5. 监视日志文件并指定刷新间隔**
描述：tail将监视access.log文件，其监视的时间间隔为5秒。
命令：`tail -f -s 5 access.log`

**实例：6. tail -f的代替命令**
描述：与tail -f效果相同的命令是less。使用下面命令打开文件后，按下shift+f，就与tail -f的效果相同了。
命令：
`less /usr/share/dict/words`
press`SHIFT+F`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-less.png)

**实例：7. 限制要显示的字节数**
描述：显示words文件的最后32个字节。-c选项限制显示的字节数。
命令：`tail -c 32 /usr/share/dict/words`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-c.png)

**实例：8. 显示多个文件**
描述：显示多个文件的前十行，同时标题会显示哪个文件正在显示。
命令：`tail /usr/share/dict/words /usr/share/dict/propernames`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-multi-file.png)

**实例：9. 多个文件不显示标题**
描述：显示多个文件的前3行，不显示正在显示文件的标题。
命令：`tail -n 3 -q /usr/share/dict/words /usr/share/dict/propernames`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-q.png)

**实例：10. 与管道配合使用**
描述：显示/etc/目录下的最近修改的前5个文件或文件夹。tail命令可以接受其他命令通过管道传送过来的信息。
命令：`cat letter | tail -n 5`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/tail/tail-pipe.png)
