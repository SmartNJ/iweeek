---
title: Linux ping总结
date: 2018-06-12 11:18:24
tags: Linux
---

ping命令用来测试主机之间网络的连通性。执行ping指令会使用ICMP传输协议，发出要求回应的信息，可以根据远程主机输出的信息来确定其是否可访问（不是绝对的），有些服务器为了防止通过ping探测到，通过防火墙设置了禁止ping或者在内核参数中禁止ping，这样就不能通过ping确定该主机是否处于开启状态。

<!-- more -->
## 命令功能

ping通过发送ICMP ECHO_REQUEST数据包到网络主机（send ICMP ECHO_REQUEST packets to network hosts），并显示响应情况。

![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-man.png)

## 命令格式

`ping [选项] [主机名或IP地址]`

## 命令选项

- -d：使用Socket的SO_DEBUG功能；
- -c<完成次数>：设置完成要求回应的次数；
- -f：极限检测；
- -i<间隔秒数>：指定收发信息的间隔时间；
- -I<网络界面>：使用指定的网络界面送出数据包；
- -l<前置载入>：设置在送出要求信息之前，先行发出的数据包；
- -n：只输出数值；
- -p<范本样式>：设置填满数据包的范本样式；
- -q：不显示指令执行过程，开头和结尾的相关信息除外；
- -r：忽略普通的Routing Table，直接将数据包送到远端主机上；
- -R：记录路由过程；
- -s<数据包大小>：设置数据包的大小；
- -t<存活数值>：设置存活数值TTL的大小；
- -v：详细显示指令的执行过程。


## 实用实例

**实例：1. 使用ping命令**
ping命令不断向网络发送请求，当收到响应时，将收到包含如下信息的输出：

![](http://pabfn7ecx.bkt.clouddn.com/ping/ping.png)

第一行表示每次向域名/IP地址发送指定大小的数据包。接下来的数行是响应信息，具体包含以下字段：

- 接收的字节数
- IP地址
- 序列号
- 响应的时间

最后一行是此次ping命令执行的统计信息：发送6个数据包，其中6个目标主机已收到，丢包率为0，总耗时5000毫秒。


**实例：2. 更改ping数据包之间的时间间隔**
描述：每隔3秒发送一个数据包。-i选项指定包之间的时间间隔。
命令：`ping -i 3 iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-i.png)


**实例：3. 更改ping数据包大小**
描述：默认情况下，ping数据包中的字节数为56（如果包含8个字节的ICMP头，则为64）。可以使用-s选项更改此值。例如，发送一个1024字节的数据包（1032包括ICMP头）：
命令：`ping -s 1024 iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-s.png)

**实例：4. 发送指定数量的ping数据包**
描述：ping的默认行为是保持发送数据包知道用户中断为止。使用-c选项可以在发送一定数量的数据包之后强制ping停止执行。例如，在发送3个数据包之后，停止执行：
命令：`ping -c 3 iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-host.png)


**实例：5. 指定时间间隔和发送次数**
描述：总共花费20秒发出10个数据包，数据包的时间间隔为2秒。
命令：`ping -i 2 -c 10 127.0.0.1` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-i-c.png)

**实例：6. 设置ping的硬超时（最长运行时间）**
描述：每隔3秒发送一个数据包，最长运行10秒。可见，最多输出发送4个数据包。-w选项指定ping的退出时间，单位是秒。以下是官方解释：

```
       -w deadline
              Specify a timeout, in seconds, before ping exits regardless of how many packets have
              been  sent or received. In this case ping does not stop after count packet are sent,
              it waits either for deadline expire or until count probes are answered or  for  some
              error notification from network.
```
命令：`ping -w 10 -i 3 iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-w.png)


**实例：7. 设置ping的软超时**
描述：-w选项确保ping在截止日期过期后停止，-W选项也可以使ping停止，但仅限于目标端没有响应时。以下是官方解释：

```
       -W timeout
              Time to wait for a response, in seconds. The option affects only
              timeout  in  absence  of any responses, otherwise ping waits for
              two RTTs.
```
命令：`ping -W 3 iweeek.com` 



**实例：8. 使用ping启动大量数据包**
描述：-f选项可以启动大量数据包。下面是官方的解释：

```
       -f     Flood  ping. For every ECHO_REQUEST sent a period ``.'' is printed,
              while for ever ECHO_REPLY received a backspace  is  printed.   This
              provides a rapid display of how many packets are being dropped.  If
              interval is not given, it sets interval to zero and outputs packets
              as  fast  as they come back or one hundred times per second, which‐
              ever is more.  Only the super-user may use this  option  with  zero
              interval.
```
命令：`ping -f iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-f.png)


**实例：9. 在每行之前打印ping时间戳**
描述：-D选项可以打印unix时间和微妙的组合。
命令：`ping -D iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-D.png)


**实例：10. 不显示具体请求信息**
描述：-q不显示发送和接收的美和请求之间发生的所有事情，而只是开始和结束时的输出。
命令：`ping -q iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-q.png)

**实例：11. 多参数使用**
描述：向域名iweeek.com发送5个数据包，每个间隔2秒，数据包大小为1024字节，TTL值为255，测试其连通性。
命令：`ping -c 5 -i 2 -s 1024 -t 255 iweeek.com` 
输出：
![](http://pabfn7ecx.bkt.clouddn.com/ping/ping-mul-params.png)


