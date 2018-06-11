---
title: GDB 用法总结（转载）
date: 2018-05-27 10:10:07
tags: C
---

本文转载自：[gdb 入门](http://docs.linuxtone.org/ebooks/C&CPP/c/ch10.html)


程序中除了一目了然的 Bug 之外都需要一定的调试手段来分析到底错在哪。到目前为止我们的调试手段只有一种：根据程序执行时的出错现象假设错误原因，然后在代码中适当的位置插入 printf，执行程序并分析打印结果，如果结果和预期的一样，就基本上证明了自己假设的错误原因，就可以动手修正 Bug 了，如果结果和预期的不一样，就根据结果做进一步的假设和分析。

<!-- more -->

## 一、概述

本文介绍一种非常强大的调试工具 gdb，可以完全操控程序的运行，使得程序就像你手里的玩具一样，叫它走就走，叫它停就停，并且随时可以查看程序中所有的内部状态，比如各变量的值、传给函数的参数、当前执行的语句位置等。掌握了 gdb 的用法以后，调试的手段就更加丰富了。但要注意，即使调试的手段非常丰富了，其基本思想仍然是“分析现象 -> 假设错误原因 -> 产生新的现象去验证假设”这样一个循环，根据现象如何假设错误原因，以及如何设计新的现象去验证假设，这都需要非常严密的分析和思考，如果因为手里有了强大的工具就滥用，而忽视了严谨的思维，往往会治标不治本地修正 Bug，导致一个错误现象消失了但 Bug 仍然存在，甚至是把程序越改越错。本文根据原作者提供的几个错误实例经过删减，来讲解如何使用 gdb 调试程序，在最后总结一部分常用的 gdb 命令。



## 二、安装

```shell
$ sudo apt-get install libc6-dbg gdb valgrind 
```

## 三、用法

查找帮助信息
```shell
$ gdb -help 
```

在编译时要加上-g选项，生成的目标文件才能用gdb进行调试，生成可执行文件之后，使用 `gdb` 命令：

```shell
$ gcc -g father.c -o father
$ gdb fatherGNU gdb (Ubuntu 7.7-0ubuntu3.1) 7.7Copyright (C) 2014 Free Software Foundation, Inc.License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>This is free software: you are free to change and redistribute it.There is NO WARRANTY, to the extent permitted by law.  Type "show copying"and "show warranty" for details.This GDB was configured as "x86_64-linux-gnu".(gdb) 
```
-g 选项的作用是在目标文件中加入源代码的信息，比如目标文件中第几条机器指令对应源代码的第几行，但并不是把整个源文件嵌入到目标文件中，所以在调试时目标文件时必须保证 gdb 也能找到源文件。gdb 提供一个类似 shell 的命令行环境，上面的 (gdb) 就是提示符，在这个提示符下输入 help 可以查看命令的类别：

### 1、help 命令

```armasm
(gdb) helpList of classes of commands:aliases -- Aliases of other commandsbreakpoints -- Making program stop at certain pointsdata -- Examining datafiles -- Specifying and examining filesinternals -- Maintenance commandsobscure -- Obscure featuresrunning -- Running the programstack -- Examining the stackstatus -- Status inquiriessupport -- Support facilitiestracepoints -- Tracing of program execution without stopping the programuser-defined -- User-defined commandsType "help" followed by a class name for a list of commands in that class.Type "help all" for the list of all commands.Type "help" followed by command name for full documentation.Type "apropos word" to search for commands related to "word".Command name abbreviations are allowed if unambiguous.(gdb) 
```
可以进一步查看某一类别中有哪些命令，例如查看 running 类别下有哪些命令可以用：

```armasm
(gdb) help runningRunning the program.List of commands:advance -- Continue the program up to the given location (same form as args for break command)attach -- Attach to a process or file outside of GDBcontinue -- Continue program being debuggeddetach -- Detach a process or file previously attacheddetach checkpoint -- Detach from a checkpoint (experimental)detach inferiors -- Detach from inferior ID (or list of IDS)disconnect -- Disconnect from a target...
```

### 2、list 命令

用 `list` 命令从第一行开始列出源代码：

```armasm
(gdb) list 11	int g(int x)2	{3	    return x+5;4	}5	6	int f(int x)7	{8	    return g(x);9	}10	
```

一次只列 10 行，如果要从 11 行开始继续列源代码：

```armasm
(gdb) list
```

也可以什么都不输直接敲回车，gdb提供了一个很方便的功能，在提示符下直接敲回车表示用适当的参数重复上一条命令。

```armasm
(gdb) (直接回车)
(gdb)11	int main(void)12	{13	    return f(10)+1;14	}
```

gdb 有很多常用命令有简写形式，例如 list 命令可以写成 l，要列一个函数的源代码也可以用函数名做参数：

```armasm
(gdb) l main7	{8	    return g(x);9	}10	11	int main(void)12	{13	    return f(10)+1;14	}
```

### 3、quit 命令
现在退出 gdb 环境：

```x86asm
(gdb) quit
```

现在把源代码改名或移到别处，再用gdb调试目标文件，就列不出源代码了：

``` x86asm
$ mv father.c fathe.c
$ gdb father
......
(gdb) l
5	father.c: No such file or directory.
	in fathe.c
```

### 4、start 命令

可见gcc的-g选项并不是把源代码嵌入到目标文件中的，在调试目标文件时也需要源文件。现在把源代码恢复原样，我们继续调试。首先用start命令开始执行程序：

```x86asm
nijun@ubuntu:~/C语言程序设计$ gdb father...(gdb) startTemporary breakpoint 1 at 0x400517: file father.c, line 13.Starting program: /home/nijun/C语言程序设计/father Temporary breakpoint 1, main () at father.c:1313	    return f(10)+1;(gdb)
```

### 5、next 命令 & step 命令

这表示停在 main 函数中变量定义之后的第一条语句处等待我们发命令，gdb列出这条语句表示它还没执行，并且马上要执行。我们可以用 `next` 命令（简写为 `n`）控制这些语句一条一条地执行，或者用 `step` 命令（简写为`s`）：

```x86asm
(gdb) sf (x=10) at father.c:88	    return g(x);
```

### 6、backtrace 命令

它停在了函数中变量定义之后的第一条语句处。在函数中有几种查看状态的办法， `backtrace` 命令（简写为`bt`）可以查看函数调用的栈帧：

```x86asm
(gdb) bt#0  f (x=10) at father.c:8#1  0x0000000000400521 in main () at father.c:13 
```

### 7、info 命令

可见当前的 f 函数是被 main 函数调用的，main传进来的参数是 x=10。main函数的栈帧编号为 `1`，f 的栈帧编号为 `0` 。现在可以用 `info` 命令（简写为 `i`）查看 f 局部变量的值，但这里我们没有局部变量：）

```x86asm
(gdb) i localsNo locals.
```
### 8、frame 命令

如果想查看 main 函数当前局部变量的值也可以做到，先用 `frame` 命令（简写为 `f`）选择 `1` 号栈帧然后再查看局部变量：

```x86asm
(gdb) f 1#1  0x0000000000400521 in main () at father.c:1313	    return f(10)+1;
(gdb) i localsNo locals.
```
### 9、print 命令

我们知道，未经初始化的局部变量具有不确定的值。用print命令（简写为p）打出变量参数 x 的值：

```x86asm
(gdb) p x$1 = 10
```
### 10、display 命令

用 `display` 命令使得每次停下来的时候都显示当前 x 值，用 `si` 命令执行一步汇编指令。

```x86asm
(gdb) display x1: x = 10
(gdb) si4	}1: x = 10
```
### 11、break 命令

用 `break` 命令（简写为 `b`）在第9行设一个断点（Breakpoint）：

```x86asm
(gdb) list1	int g(int x)2	{3	    return x+5;4	}5	6	int f(int x)7	{8	    return g(x);9	}10	(gdb) b 8Breakpoint 2 at 0x400507: file father.c, line 8.
```

### 12、continue 命令

break命令的参数也可以是函数名，表示在某一个函数开头设断点。现在用continue命令（简写为c）连续运行而非单步运行，程序到达断点会自动停下来，这样就可以停在下一次循环的开头：

```x86asm
(gdb) cContinuing.Breakpoint 2, f (x=10) at father.c:88	    return g(x);
```

### 13、操作 breakpoint 断点

用 `info breakpoints` 命令可以查看已经设置的断点：

```x86asm
(gdb) info breakpointsNum     Type           Disp Enb Address            What2       breakpoint     keep y   0x0000000000400507 in f at father.c:8	breakpoint already hit 1 time4       breakpoint     keep y   0x0000000000400507 in f at father.c:8	breakpoint already hit 1 time
```

每个断点都有一个编号，可以用编号指定删除某个断点：

```x86asm
(gdb) delete breakpoints 4
(gdb) info breakpointsNum     Type           Disp Enb Address            What2       breakpoint     keep y   0x0000000000400507 in f at father.c:8	breakpoint already hit 1 time(gdb) 
```

有时候一个断点暂时不想用可以禁用掉而不必删除，这样以后想用的时候可以直接启用，而不必重新从代码里找应该在哪一行设断点：

```x86asm
(gdb) disable breakpoints 2(gdb) info breakpointsNum     Type           Disp Enb Address            What2       breakpoint     keep n   0x0000000000400507 in f at father.c:8	breakpoint already hit 1 time(gdb) enable breakpoints 2(gdb) info breakpointsNum     Type           Disp Enb Address            What2       breakpoint     keep y   0x0000000000400507 in f at father.c:8	breakpoint already hit 1 time
```

gdb的断点功能非常灵活，还可以设置断点在满足某个条件时才激活，例如我们仍然在循环开头设置断点，但是仅当 x 不等于 0 时才中断，然后用 `run` 命令（简写为 `r`）重新从程序开头连续执行：

```x86asm
(gdb) break 8 if x != 0Note: breakpoint 2 also set at pc 0x400507.Breakpoint 5 at 0x400507: file father.c, line 8.
```

### 14、examine 命令

我们还可以用 `examine` 命令（简写是 `x`）来查看内存地址中的值，下面的命令表示从 `rsp` 寄存器里的地址值开始，向后取 16 个地址的内容，每个默认是 4 字节，`x` 表示以十六进制表示 ：

```x86asm
(gdb) x/16x $rsp0x7fffffffd9b8:	0xffffd9d0	0x00007fff	0x00400511	0x000000000x7fffffffd9c8:	0x00400400	0x0000000a	0xffffd9e0	0x00007fff0x7fffffffd9d8:	0x00400521	0x00000000	0x00000000	0x000000000x7fffffffd9e8:	0xf7a35ec5	0x00007fff	0x00000000	0x00000000(gdb) 
```

### 15、操作 Watchpoint 观察点

可以用观察点（Watchpoint）来跟踪。我们知道断点是当程序执行到某一代码行时中断，而观察点是当程序访问某一存储单元时中断，如果我们不知道某一存储单元是在哪里被改动的，这时候观察点尤其有用。

```x86asm
(gdb) watch xHardware watchpoint 6: x(gdb) info watchpointsNum     Type           Disp Enb Address            What6       hw watchpoint  keep y                      x
```


## 四、总结

目前仅仅是简单地学会了 gdb 的一些基础用法，剩下更加高级的功能，等需要用到的时候再去查即可。

|命令（简写）|作用|
|:--|:--|
|backtrace（或bt）|查看各级函数调用及参数|
|finish|执行到当前函数返回，然后停下来等待命令|
|frame（或f） 帧编号|选择栈帧|
|info（或i） locals|查看当前栈帧局部变量的值|
|list（或l）|列出源代码，接着上次的位置往下列，每次列10行|
|list 行号|列出从第几行开始的源代码|
|list 函数名|列出某个函数的源代码|
|next（或n）|执行下一行语句|
|print（或p）|打印表达式的值，通过表达式可以修改变量的值或者调用函数|
|set var|修改变量的值|
|start|开始执行程序，停在main函数第一行语句前面等待命令|
|step（或s）|执行下一行语句，如果有函数调用则进入到函数中|
|break（或b） 行号|在某一行设置断点|
|break 函数名|在某个函数开头设置断点|
|break...if...|设置条件断点|
|continue（或c）|从当前位置开始连续而非单步执行程序|
|delete breakpoints|删除断点|
|display 变量名|跟踪查看一个变量，每次停下来都显示它的值|
|disable breakpoints|禁用断点|
|enable breakpoints|启用断点|
|info（或i） breakpoints|查看当前设置了哪些断点|
|run（或r）|从头开始连续而非单步执行程序|
|undisplay|取消对先前设置的那些变量的跟踪|
|watch|设置观察点|
|info（或i） watchpoints|查看当前设置了哪些观察点|
|x|从某个位置开始打印存储器的一段内容，全部当成字节来看，而不区分哪些字节属于哪些变量|


## 五、参考
[gdb 入门](http://docs.linuxtone.org/ebooks/C&CPP/c/ch10.html)
[gdb 手册](http://sourceware.org/gdb/current/onlinedocs/gdb/)