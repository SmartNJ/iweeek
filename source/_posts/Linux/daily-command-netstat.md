---
title: Linux netstat总结
date: 2018-06-07 09:32:47
tags: Linux
---

netstat用来查看系统中所有的网络套接字连接情况，包括TCP、UDP和Unix套接字。也可以显示路由表，接口状态，masquerade 连接，多播成员（Multicast Memberships）等等。另外，它还可以列出处于监听状态（等待接入请求）的套接字，比如想确认系统中的web服务是否起来，就可以查看80端口有没有打开。

<!-- more -->
## 命令格式
netstat [选项]

## 命令功能
打印网络连接，路由表，接口统计信息，masquerade连接和多播成员。

## 命令参数

- -a或--all：显示所有选项，默认不显示LISTEN相关。
- -t或--tcp：(TCP)仅显示TCP相关选项。
- -u或--udp：(UDP)仅显示UDP相关选项。
- -x或--unix：此参数的效果和指定"-A unix"参数相同。
- -n或--numeric：拒绝显示别名，能显示数字的全部转化成数字。
- -l或--listening：仅列出有在Listen(监听)的服务状态。
- -g或--groups：显示多重广播功能群组组员名单。
- -p或--programs：显示建立相关链接的程序名和PID。
- -r或--route：显示路由信息，路由表。
- -e或--extend：显示扩展信息，例如UID等。
- -s或--statistics：按各个协议进行统计。
- -c或--continuous：每隔一个固定时间，执行该netstat命令。
- -g或--groups：显示多重广播功能群组组员名单。

提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到。

## 输出信息含义
执行netstat后，其输出结果为

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat.png)

netstat的输出结构可以分为两个部分：
一个是Active Internet connections，称为有源TCP连接。其中"Recv-Q"和"Send-Q"指的是接收队列和发送队列。
另一个是Active UNIX domain sockets，称为有源Unix域套接口(和网络套接字一样，但是只能用于本机通信，性能可以提高一倍)。Proto显示连接使用的协议，RefCnt表示连接到本套接口上的进程号，Types显示套接口的类型，State显示套接口当前的状态，Path表示连接到套接口的其它进程使用的路径名。

## 实用命令

### 一、列出所有连接（包括监听和未监听的）
**示例：1. 列出当前所有的连接**
命令：netstat -a
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-a.png)


**示例：2. 列出所有TCP端口**
命令：netstat -at
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-at.png)


**示例：3. 列出所有UDP端口**
描述：-u选项查看UDP端口，-x选项查看UNIX端口。
命令：netstat -au
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-au.png)


### 二、列出所有处于监听状态的 Sockets

**示例：4. 只列出所有监听TCP的端口**
描述：查看本机监听的（l）TCP连接（t）的IP地址（n）。
命令：netstat -tnl
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-tnl.png)


**示例：5. 在netstat的输出中不显示主机，端口和用户名（host，port，user）**
描述：-n选项禁用域名解析功能。例如，查看所有（a）TCP连接的（t）IP地址（n）等信息。
命令：netstat -ant
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-ant.png)

**示例：6. 获取进程名、进程号以及用户ID**
描述：
使用-p选项查看进程信息，-ep选项可以同时查看进程名和用户名。另外，-n和-e选项一起使用，User列的属性就是用户ID，而不是用户名。netstat运行在root权限之下才可以得到运行在root权限下的进程名。
输出：

查看本机监听的（l）TCP连接的（t）进程名（p）和IP地址（n）。
![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-tnlp.png)

查看本机监听的（l）TCP连接的（t）进程名（p）和用户名（e）。
![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-tlpe.png)

查看本机监听的（l）TCP连接的（t）进程名（p）和用户名ID（ne）。
![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-tlpen.png)

**示例：7. 显示每个协议的统计信息**
描述：-s选项可以打印出网络统计数据，包括某个协议下的收发包数量。
命令：netstat -s
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-s.png)


**示例：8. 持续输出netstat信息**
描述：-c选项持续输出信息，默认时间间隔 1 秒。例如，下面这个命令可持续输出 TCP 协议信息。
命令：netstat -c 1
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-c.png)

**示例：9. 查看服务是否在运行**
描述：结合grep，查看ntp服务是否在运行。例如，查看本机所有的（a）监听连接（l）中与ntp服务有关的信息，包括进程信息（p）等额外的信息（e）。
命令：sudo netstat -aple | grep ntp
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-grep.png)

**示例：10. 查看端口被占用的情况**
描述：结合grep，查看端口被占用的情况。例如，查看本机所有的（a）连接中与端口80有关的信息，包括IP地址（n）以及进程信息（p）等额外的信息（e）。
命令：netstat -anpe | grep "80"
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-grep-port.png)

**示例：11. 显示核心路由信息**
描述：-r选项打印内核路由信息，打印出来的信息与route命令输出的信息一样。
命令：netstat -nr
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-rn.png)


**示例：12. 显示网络接口列表**
描述：-i选项打印网络接口信息。
命令：netstat -i
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-i.png)


**示例：13. 显示网络接口的详细信息**
描述：将-e选项和-i选项搭配使用，可以输出用户友好的信息。下面的输出信息与ifconfig输出的信息一样。
命令：netstat -ie
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-ie.png)


**示例：14. 显示多播组信息**
描述：选项-g输出IPv4和IPv6的多播组信息。
命令：netstat -g
输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-g.png)


**示例：15. IP和TCP分析**
描述：查看连接某服务器端口最多的IP地址
命令：watch -d -n0 "netstat -nat | grep '172.16.14.151' | awk '{print $5}' | awk -F: '{print $1}' | sort | uniq -c | sort -nr | head -20"

输出：

![](http://pabfn7ecx.bkt.clouddn.com/netstat/netstat-watch.png)
