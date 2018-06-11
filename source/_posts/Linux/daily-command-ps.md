---
title: Linux ps总结
date: 2018-06-04 10:09:39
tags: Linux
---

为了查阅系统上面正在运行当中的程序，可以利用静态的ps或者是动态的top，本文就来介绍ps的相关用法。

Linux中的ps命令是Process Status的缩写。ps命令用来列出系统中当前运行的那些进程。ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。

<!-- more -->

要对进程进行监测和控制，首先必须要了解当前进程的情况，也就是需要查看当前进程，而 ps 命令就是最基本同时也是非常强大的进程查看命令。使用该命令可以确定有哪些进程正在运行和运行的状态、进程是否结束、进程有没有僵死、哪些进程占用了过多的资源等等。总之大部分信息都是可以通过执行该命令得到的。

ps 为我们提供了进程的一次性的查看，它所提供的查看结果并不动态连续的；如果想对进程时间监控，应该用 top 工具。

kill 命令用于杀死进程。

```
# ps aux <== 观察系统所有的程序数据
# ps -lA <== 观察系统所有的程序数据
# ps axjf <== 连同部分程序树
```
选项与参数：
-A：所有的不同process均显示出来，与-e具有同样的效果。
-a：不与terminal有关的所有process。
-u：有效使用者（effective user）相关的process。
-e：列出所有程序，与-A效果相同。
x：通常与a这个参数一起使用，可列出完整的信息。
l：较长、较详细的输出该该PID的信息。
j：工作的格式(jobs format)。
-f：做一个更为完整的输出。



实例：仅观察自己的bash相关程序：ps -l
描述：ps默认只显示属于当前用户这次登录的PID与相关信息，-l参数显示更详细的信息。
命令：ps -l
输出：

```
# ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0 16215 16213  0  80   0 - 28845 wait   pts/1    00:00:00 bash
0 R     0 16308 16215  0  80   0 - 37232 -      pts/1    00:00:00 ps
```

每个字段具体的含义如下：

- F：代表这个程序的旗标（process flags），说明这个程序的总结权限，常见的有：
	- 若为4表示此程序的权限为root。
	- 若为1表示此子程序仅进行复制（fork）而没有实际执行（exec）。
- S：代表这个程序的状态（STAT)，主要的状态有：
	- R（Running)：该程序正在运行中。
	- S（Sleep）：该程序目前正在睡眠状态（idle），但可以被唤醒（signal）。
	- D：不可被唤醒的睡眠状态，例如，程序可能在等待I/O的情况。
	- T：停止状态（stop），可能是在工作控制（背景暂停）或出错（traced）状态。
	- Z：僵尸（Zombie）状态，程序已经终止但却无法被移除到内存外。
- UID/PID/PPID：代表程序被该UID所拥有/程序的PID号码/程序的父程序PID号码。
- C：代表CPU使用率，单位为百分比。
- PRI/NI：Priority/Nice的缩写，代表程序被CPU所执行的优先顺序，数值越小代表程序越快被CPU执行。
- ADDR/SZ/WCHAN：都与内存有关，ADDR是kernel function，指出该程序在内存的哪个部分，如果是个running的程序，一般就会显示“-”，SZ代表程序用掉多少内存，WCHAN表示目前程序是否运行中，同样的，若为-表示正在运行中。
- TTY：登陆者的终端机位置，若为远端登陆则使用动态终端接口（pts/n）。
- TIME：使用掉的CPU时间，此程序实际花费CPU运行的时间，而不是系统时间。
- CMD：command的缩写，造成此程序的出发程序是什么。


实例：显示指定用户信息
描述：列出指定用户的进程信息。
命令：ps -u root
输出：
```
# ps -u root
  PID TTY          TIME CMD
    1 ?        00:00:01 systemd
    2 ?        00:00:00 kthreadd
    3 ?        00:00:00 ksoftirqd/0
```

实例：显示所有进程信息，连同命令行
描述：-e参数与-A参数一样显示所有进程信息，-a将不显示命令行。
命令：ps -ef
输出：
```
# ps -ef
OR
# ps -Af
	UID        PID  PPID  C STIME TTY          TIME CMD
	root         1     0  0 Jun02 ?        00:00:01 /usr/lib/systemd/systemd --switched-root --system --deserialize 21
	root         2     0  0 Jun02 ?        00:00:00 [kthreadd]
	...
```

实例：观察系统所有程序
描述：列出目前所有的正在内存当中的程序，ps aux会依照PID的顺序来排序显示。
命令：ps aux
输出：

```
# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  43212  3532 ?        Ss   Jun02   0:01 /usr/lib/system
root         2  0.0  0.0      0     0 ?        S    Jun02   0:00 [kthreadd]

```

各个字段的意义：
- User：该process属于哪个使用者账号。
- PID：该process使用掉的CPU资源百分比。
- %CPU：该process所占用的实体内存百分比。
- %MEM：该process所占用的实体内存百分比。
- VSZ：该process使用掉的虚拟内存量（KBytes）。
- RSS：该process占用的固定的内存量（KBytes）。
- TTY：该process是在哪个终端机上面运行，若与终端机无关则显示？。另外，tty1-tty6是本机上面的登陆者程序，如果是pts/0等等的，则表示为网络连接的主机程序。
- STAT：该process目前的状态，状态显示与ps -l的S旗标相同（R/S/T/Z）。
- START：该process被触发启动的时间。
- TIME：该process实际使用CPU运行的时间。
- COMMAND：该process的实际指令是什么。

实例：找出指定程序。
描述：通过ps打印出所有的process信息，再使用grep过滤结果信息，查找指定程序的PID。
命令：ps aux | egrep '(cron|syslog)'
输出：

```
# ps aux | egrep '(cron|syslog)'
root       450  0.0  0.0 126220  1604 ?        Ss   Jun02   0:00 /usr/sbin/crond -n
root       687  0.0  0.2 224044  5332 ?        Ssl  Jun02   0:00 /usr/sbin/rsyslogd -n
root      1029  0.0  0.0 122032  1488 ?        Sl   Jun02   0:43 /usr/local/cloudmonitor/wrapper/bin/./wrapper /usr/local/cloudmonitor/wrapper/bin/../conf/wrapper.conf wrapper.syslog.ident=cloudmonitor wrapper.pidfile=/usr/local/cloudmonitor/wrapper/bin/./cloudmonitor.pid wrapper.daemonize=TRUE wrapper.name=cloudmonitor wrapper.displayname=cloudmonitor wrapper.statusfile=/usr/local/cloudmonitor/wrapper/bin/./cloudmonitor.status wrapper.java.statusfile=/usr/local/cloudmonitor/wrapper/bin/./cloudmonitor.java.status wrapper.lockfile=/var/lock/subsys/cloudmonitor wrapper.script.version=3.5.27
root     16939  0.0  0.0 112644   980 pts/3    R+   12:32   0:00 grep -E --color=auto (cron|syslog)
```

实例：显示程序树
描述：显示类似程序树的进程信息。
命令：ps -axjf
输出：

``` shell
# ps -axjf
 PPID   PID  PGID   SID TTY      TPGID STAT   UID   TIME COMMAND
    0     2     0     0 ?           -1 S        0   0:00 [kthreadd]
    2     3     0     0 ?           -1 S        0   0:00  \_ [ksoftirqd/0]
...
15920 15922 15922 15922 pts/2    15922 Ss+      0   0:00  |   \_ -bash
 2099 16451 16451 16451 ?           -1 Ss       0   0:00  \_ sshd: root@pts/3
16451 16453 16453 16453 pts/3    16550 Ss       0   0:00      \_ -bash
16453 16499 16499 16453 pts/3    16550 S        0   0:00          \_ bash
16499 16511 16511 16453 pts/3    16550 S        0   0:00              \_ sudo su -
16511 16512 16511 16453 pts/3    16550 S        0   0:00                  \_ su -
16512 16513 16513 16453 pts/3    16550 S        0   0:00                      \_ -bash
16513 16530 16530 16453 pts/3    16550 S        0   0:00                          \_ bash
16530 16550 16550 16453 pts/3    16550 R+       0   0:00                              \_ ps -axjf
```


进阶：使用管道与其他命令


实例：使用管道与其他命令
描述：列出目前所有的正在内存当中的程序，ps aux会依照PID的顺序来排序显示，只显示排在前面的一部分数据。
命令：ps -aux | head


实例：列出目前所有的正在内存当中的程序，ps aux会依照PID的顺序来排序显示，只显示排在前面的一部分数据。
命令：ps -aux > out.txt

实例：指定显示的格式。
描述：-o显示指定的格式输出，--sort=-%mem指定以倒序显示程序。
命令：ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head
输出：

```
# ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head
  PID  PPID CMD                         %MEM %CPU
 1248  1029 /usr/local/cloudmonitor/jre  3.6  0.4
  690     1 /usr/bin/python -Es /usr/sb  0.8  0.0
  976     1 /usr/local/aegis/aegis_clie  0.6  0.1
  423     1 /usr/lib/polkit-1/polkitd -  0.6  0.0
16409  2099 sshd: root@pts/0             0.3  0.0
15920  2099 sshd: root@pts/2             0.3  0.0
16213  2099 sshd: root@pts/1             0.3  0.0
16451  2099 sshd: root@pts/3             0.3  0.0
  687     1 /usr/sbin/rsyslogd -n        0.2  0.0
```

参考：

https://www.tecmint.com/find-linux-processes-memory-ram-cpu-usage/
