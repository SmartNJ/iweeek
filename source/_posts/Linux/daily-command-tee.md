---
title: Linux tee总结
date: 2018-06-09 18:15:07
tags: Linux
---

tee命令可以用字母T来形象地表示，可以在看到输出的同时，也将其存入一个文件。

<!-- more -->
## 命令格式

`tee [选项] [文件]`

## 命令功能

tee命令把输出的一个副本输送到标准输出，另一个副本拷贝到相应的文件中。
tee命令从标准输入中复制到每一个文件，并输出到标准输出。

## 命令参数

- -a或--append：向文件中重定向时使用追加模式。
- -i或--ignore-interrupts：忽略中断（interrupt）信号。

## 实用命令

**实例：1. 输出的标准输出的同时输出到文件**
描述：将ping的内容输出到标准输出，同时也输出到output.txt文件中。
命令：`ping yahoo.com | tee output.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee.png)

**实例：2. 向输出文件追加内容**
描述：将ping的内容输出到标准输出，同时也以追加的方式输出到output.txt文件中。
命令：`ping baidu.com | tee -a output.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee-a.png)


**实例：3. 输出到标准输出两次**
描述：输出到标准输出两次，-表示标准输出。
命令：`ls | tee -`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee--.png)

**实例：4. 同时写入多个文件**
描述：将ping的内容输出到标准输出两次，同时也以追加的方式输出到output.txt文件中。
命令：`ping yahoo.com | tee output.txt log.txt -`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee-multiple--.png)

**实例：5. tee命令的输出内容直接作为另一个命令的输入内容**
描述：列出当前目录下的文件，同时写入到output.txt文件中，然后再将内容通过管道重定向给wc命令统计行数。
命令：`ls -ilh | tee output.txt | wc -l`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee-other.png)

**实例：6. 提升文件写入权限**
描述：使用Vim编辑器打开文件，并且做了跟多更改，然后当尝试保存修改会得到一个报错，那是一个root所拥有的文件，意味着你需要使用sudo权限保存修改。在Vim内使用tee命令来提高权限。
命令：`:w !sudo tee %`
上述命令需要输入root密码，然后就可以保存修改了。

**实例：7. 忽视中断**
描述：-i命令行选项使tee命令忽视通常由ctrl+c组合键发起的中断信号（SIGINT）。tee命令可以优雅的退出。
命令：`ping yahoo.com | tee -i output.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee-i.png)

**实例：8. 把标准错误输出也保存到文件**
描述：使用tee命令把标准错误输出也保存到文件。
命令：`ls "*" 2>&1 | tee ls.txt`
输出：

![](http://p9xqnn501.bkt.clouddn.com/tee/tee-error.png)
