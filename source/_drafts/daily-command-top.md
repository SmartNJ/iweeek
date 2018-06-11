---
title: 一日一命令之 top 系统的监视者
date: 2018-05-12 15:20:23
tags: Linux
---

**`top`** 命令用来显示 Linux 的**处理器活动和内核实时管理的任务**。它会显示**正在使用的处理器和内存以及运行进程**等其他信息。

以下是 *12* 个实用的 top 命令小技巧。

<!-- more -->


-------

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
