---
title: Linux route总结
date: 2018-06-12 15:23:32
tags: Linux
---

route命令用来显示并设置Linux内核中的网络路由表，route命令设置的路由主要是静态路由。要实现两个不同的子网之间的通信，需要一台连接两个网络的路由器，或者同时位于两个网络的网关来实现。

<!-- more -->
## 命令功能

显示并设置Linux内核中的网络路由表。

## 命令格式

route [选项] [参数]

## 命令选项

- -A：设置地址类型；
- -C：打印将Linux核心的路由缓存；
- -v：详细信息模式；
- -n：不执行DNS反向查找，直接显示数字形式的IP地址；
- -e：netstat格式显示路由表；
- -net：到一个网络的路由表；
- -host：到一个主机的路由表。


## 命令选项

- Add：增加指定的路由记录；
- Del：删除指定的路由记录；
- Target：目的网络或目的主机；
- gw：设置默认网关；
- mss：设置TCP的最大区块长度（MSS），单位MB；
- window：指定通过路由表的TCP连接的TCP窗口大小；
- dev：路由记录所表示的网络接口。

## 实用命令

**实例：1. 显示当前路由**
描述：在显示当前路由。-n选项不执行DNS反向查找，直接显示数字形式的IP地址。
命令：
`route` 
`route -n`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/route/route-n.png)

其中Flags为路由标志，标记当前网络节点的状态，Flags标志说明：

- U Up表示此路由当前为启动状态。
- H Host，表示此网关为一主机。
- G Gateway，表示此网关为一路由器。
- R Reinstate Route，使用动态路由重新初始化的路由。
- D Dynamically,此路由是动态性地写入。
- M Modified，此路由是由路由守护程序或导向器动态修改。
- ! 表示此路由当前为关闭状态。

**实例：2. 添加网关/设置网关**
描述：增加一条到达244.0.0.0的路由。
命令：`route add -net 224.0.0.0 netmask 240.0.0.0 dev eth0`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/route/route-add.png)


**实例：3. 屏蔽一条路由**
描述：增加一条屏蔽的路由，目的地址为224.x.x.x将被拒绝。
命令：`route add -net 224.0.0.0 netmask 240.0.0.0 dev eth0`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/route/route-reject.png)

**实例：4. 删除路由记录**
描述：删除刚才创建的两条记录。
命令：
`route del -net 224.0.0.0 netmask 240.0.0.0`
`route del -net 224.0.0.0 netmask 240.0.0.0 reject`
输出：
![](http://pabfn7ecx.bkt.clouddn.com/route/route-del.png)

**实例：5. 删除和添加设置默认网关**
描述：不建议在连接到远程主机的时候删除默认网关，会导致断开远程主机的连接。不过在命令行下命令不会永久保存，当网卡重启或者机器重启之后，该路由就失效了。
命令：
`route del default gw 172.16.63.253`
`route add default gw 172.16.63.253`

