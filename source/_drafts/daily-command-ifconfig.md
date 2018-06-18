---
title: Linux ifconfig总结
date: 2018-06-12 16:37:44
tags: Linux
---

ifconfig命令被用于配置和显示Linux内核中网络接口的网络参数。用ifconfig命令配置的网卡信息，在网卡或机器重启后，配置就不存在了。


<!-- more -->
## 命令功能

显示并设置Linux内核中的网络路由表。

## 命令格式

`ifconfig [参数]`

## 命令参数

- add<地址>：设置网络设备IPv6的ip地址；
- del<地址>：删除网络设备IPv6的IP地址；
- down：关闭指定的网络设备；
- <hw<网络设备类型><硬件地址>：设置网络设备的类型与硬件地址；
- io_addr<I/O地址>：设置网络设备的I/O地址；
- irq<IRQ地址>：设置网络设备的IRQ；
- media<网络媒介类型>：设置网络设备的媒介类型；
- mem_start<内存地址>：设置网络设备在主内存所占用的起始地址；
- metric<数目>：指定在计算数据包的转送次数时，所要加上的数目；
- mtu<字节>：设置网络设备的MTU；
- netmask<子网掩码>：设置网络设备的子网掩码；
- tunnel<地址>：建立IPv4与IPv6之间的隧道通信地址；
- up：启动指定的网络设备；
- -broadcast<地址>：将要送往指定地址的数据包当成广播数据包来处理；
- -pointopoint<地址>：与指定地址的网络设备建立直接连线，此模式具有保密功能；
- -promisc：关闭或启动指定网络设备的promiscuous模式；
- IP地址：指定网络设备的IP地址；
- 网络设备：指定网络设备的名称。


## 命令选项

**实例：1. 显示网络设备信息（激活状态的）**
描述：显示激活状态的网络设备信息。
命令：`ifconfig`
输出：
![](http://p9xqnn501.bkt.clouddn.com/ifconfig/ifconfig.png)
说明：
