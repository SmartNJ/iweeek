---
title: Linux top总结
date: 2018-05-12 15:20:23
tags: Linux
---

top命令可以实时动态地查看系统的整体运行情况，是一个综合了多方信息监测系统西能和运行信息的使用工具。top命令提供了互动式的界面，用热键管理。

<!-- more -->

## 命令格式

`top [选项]`

## 命令功能

top命令用来显示Linux的处理器活动和内核实时管理的任务。它会显示正在使用的处理器和内存以及运行进程等其他信息。

## 命令参数

- -b：以批处理模式操作。
- -c：显示完整的命令。
- -d：屏幕刷新间隔时间。
- -I：忽略失效过程。
- -s：保密模式。
- -S：累积模式。
- -i<时间>：设置间隔时间。
- -u<用户名>：指定用户名。
- -p<进程号>：指定进程。
- -n<次数>：循环显示的次数。

## top交互命令

在top命令执行过程中可以使用的一些交互命令。这些命令都是单字母的，如果在命令行中使用了-s选项， 其中一些命令可能会被屏蔽。

```
h：显示帮助画面，给出一些简短的命令总结说明；
k：终止一个进程；
i：忽略闲置和僵死进程，这是一个开关式命令；
q：退出程序；
r：重新安排一个进程的优先级别；
S：切换到累计模式；
s：改变两次刷新之间的延迟时间（单位为s），如果有小数，就换算成ms。输入0值则系统将不断刷新，默认值是5s；
f或者F：从当前显示中添加或者删除项目；
o或者O：改变显示项目的顺序；
l：切换显示平均负载和启动时间信息；
m：切换显示内存信息；
t：切换显示进程和CPU状态信息；
c：切换显示命令名称和完整命令行；
M：根据驻留内存大小进行排序；
P：根据CPU使用百分比大小进行排序；
T：根据时间/累计时间进行排序；
w：将当前设置写入~/.toprc文件中。
```

## 界面解释

![](http://p748dqat4.bkt.clouddn.com/top/top-field.png)

统计信息区前五行是系统整体的统计信息。
**系统运行时间和平均负载**
第一行是任务队列信息，同uptime命令的执行结果，可以使用l命令切换uptime的显示。其内容如下：

08:42:05 # 当前时间。
up 8 days, 11:56  # 系统运行时间。
1 users # 当前登录用户数。
load average: 0.10, 0.04, 0.05 # 系统负载，即任务队列平均长度。分别为1、5、15min前到现在平均值。

**任务**
第二行为进程信息。内容如下：

Tasks:
62 total：进程总数[键入H可查看线程数]。
2 running：正在运行的进程。
60 sleeping：睡眠进程。
0 stopped：停止的进程。
0 zombie：僵尸进程数。

**CPU状态**
第三行为CPU状态信息，当有多个CPU时，这些内容可能会超过两行。内容如下：

- us, user：运行(未调整优先级的) 用户进程的CPU百分比。
- sy，system：运行内核进程的CPU百分比。
- ni，niced：运行已调整优先级的用户进程的CPU百分比。
- wa，IO wait：用于等待IO完成的CPU百分比。
- hi：处理硬件中断的CPU百分比。
- si：处理软件中断的CPU百分比。
- st：这个虚拟机被hypervisor偷去的CPU百分比。（译注：如果当前处于一个hypervisor下的vm，实际上hypervisor也是要消耗一部分CPU处理时间的）。

**内存使用**
倒数第2、3行为内存相关信息，内存显示可以用m命令切换：

KiB Mem: 1883724 total, 187736 free, # 分别是物理内存总量、空闲内存总量。
120536 used, 1575452 buffers # 使用物理内存总量、用作内核缓存内存量。
KiB Swap: 1044476 total, 713552 used, # 分别是交换分区量、使用交换分区总量。
330924 free, 10052032 cached # 空闲交换区总量、缓存交换区总量。

**字段/列**
最后一行则是进程相关的资源占用信息：

- PID：进程的ID，进程的唯一标识符。
- USER：进程所有者的实际用户名。
- PR：进程的优先级别，范围0-99，越小越优先被执行。
- NI：nice值。范围-20-19，负值表示高优先级，正值表示低优先级。在top里，PR-NI=20，默认启动一个进程，nice是0。
- VIRT：进程占用的虚拟内存。
- RES：进程占用的物理内存。
- SHR：进程使用的共享内存。
- S：进程的状态。
	- D：表示不可终端的睡眠状态。
	- R：表示正在运行。
	- S：表示休眠。
	- T：表示作业控制信号下已停止。
	- t：表示在调试状态的停止。
	- Z：表示僵死状态。
- %CPU：自从上一次更新到现在任务所使用的CPU使用率。
- %MEM：进程使用的物理内存和总内存的百分比。
- TIME+：该进程启动后占用的总的CPU时间，即占用CPU使用时间的累加值，精确到百分之一秒。
- COMMAND：进程启动命令名称。

## 交互命令

**实例：1. h:帮助**
描述：在top状态下，按h或者?显示交互命令的帮助菜单。
输出：

![](http://p9xqnn501.bkt.clouddn.com/top/top-h.png)

**实例：1. 手动刷新**
描述：在top状态下，按空格或者回车进行手动刷新。top命令默认在一个特定间隔（3秒）后刷新显示。

**实例：1. A:切换交替显示模式**

描述：在top状态下，按A，可以在全屏和交替模式间切换。在交替模式下会显示4个窗口。

- Def（默认字段组）
- Job（任务字段组）
- Mem（内存字段组）
- Usr（用户字段组）

这四组字段共有一个独立的可配置的概括区域和它自己的可配置任务区域。4个窗口中只有一个窗口是当前窗口。当前窗口的名称显示在左上方。只有当前窗口才会接受你键盘交互命令。
![](http://p9xqnn501.bkt.clouddn.com/top/top-A.png)
可以用a和w在4个窗口间切换，a移到后一个窗口，w移到前一个窗口。用g命令可以输入一个数字来选择当前窗口。


**实例：1. 按照内存使用大小排序**
描述：在top状态下，按shift+m，可以按照内存使用大小排序进程。
输出：

![](http://p9xqnn501.bkt.clouddn.com/top/top-M.png)

**实例：1. 显示命令名称和完整命令行**
描述：在top状态下，按c，显示命令名称和完整命令行。也可以使用如下命令行。
命令：`top -c`
输出：

![](http://p9xqnn501.bkt.clouddn.com/top/top-c.png)



# 1、top 命令显示

```shell
# top
```

# 2、用 `O` 排序
按（`Shift+O`）对字段进行排序。按回车返回 top 界面。

![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-sort.png)

# 3、显示特定用户进程

```shell
# top -u root
```

# 4、突出显示 top 的运行过程

在 top 界面按 `z`，将以高亮显示运行过程。

![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-z-highlight.png)

# 5、显示进程的绝对路径

在 top 界面按 `c`，将显示正在运行的进程的绝对路径。

![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-show-process-path.png)

# 6、更改延迟（屏幕刷新间隔）

默认情况下，屏幕刷新间隔为 3.0 秒，按 `d` 可以更改。

![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-change-delay.png)

# 7、按 `k` 杀死正在运行的进程


![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-to-kill-process.png)

# 8、按 `Shift + P` 为CPU 利用率排序

# 9、按 `r` 来 Renice 进程的优先级

![](http://p748dqat4.bkt.clouddn.com/Linux/top/top-to-renice-process-priority.png)

# 10、保存 top 命令结果
保存在 `/root/` 目录下

```shell
# top -n 1 -b> top-output.txt
```

# 11、按 `h` 获得 top 命令帮助

# 12、特定重复次数后退出 top
top 输出保持刷新，直到按 `q`。下面的命令将在 10 次重复之后自动退出。

```shell
#top -n 10
```



参考：
https://www.tecmint.com/12-top-command-examples-in-linux/
https://www.tecmint.com/find-processes-by-memory-usage-top-batch-mode/
