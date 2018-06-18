---
title: Linux scp总结
date: 2018-06-11 14:16:41
tags: Linux
---


scp是安全拷贝协议Secure Copy Protocol的缩写，和众多Linux/Unix使用者所熟知的拷贝（cp）命令一样。scp的使用方式类似于cp命令，cp命令将一个文件或文件夹从本地操作系统的一个位置（源）拷贝到目标位置（目的），而scp用来将文件或文件夹从网络上的一个主机拷贝到另一个主机当中去。

<!-- more -->

## 命令格式

`top source_file_name username@destination_host:destination_folder`

一句话解释：以username用户拷贝source_file到destination_host上的destination_folder里。

## 命令作用

scp命令用来在服务器之间安全传输文件，scp传输是加密的。

## 命令选项

- -1：强制scp命令使用协议ssh1。
- -2：强制scp命令使用协议ssh2。
- -4：强行使用IPV4地址。
- -6：强行使用IPV6地址。
- -B：采取批量模式（避免询问密码或口令）。
- -C：启用压缩。通过指明-C参数来开启压缩模式。
- -c：加密方式
	- 选择在传输过程中用来加密的加密方式 这个选项会被直接传递到ssh。
- -F：ssh配置
	- 给ssh指定一个用来替代默认配置的配置文件。这个选项会被直接传递到ssh。
- -i：identity_file从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。  
- -l：限速
	- 限制命令使用的带宽，默认单位是Kbit/s。
- -P：端口
	- 指定需要的连接的远程主机的端口。  
	- 注意，这个选项使用的是一个大写的“P”，因为小写的“-p”已经用来保留目标文件的时间和模式相关信息。
- -p：保留文件原来的修改时间，访问时间以及权限模式。
- -q：静默模式：不显示来自ssh命令的进度信息，警告和诊断信息。
- -r：递归拷贝整个目录。
	- 注意，scp命令在树形遍历的时候同样会跟随符号连接，复制所连接的文件。
- -v：详细模式。scp和ssh将会打印出处理过程中的调试信息。这可以帮助你调试连接、认证和配置方面的问题。

## 实用示例

**实例：1. 从远程服务器复制文件到本地目录**
描述：从远程39.106.99.114机器上的/root/develop/目录中下载scp.tar.gz文件到本地/root/目录中。
命令：`scp root@39.106.99.114:/root/develop/scp.tar.gz /root/`


**实例：2. 从远程服务器复制目录到本地**
描述：从远程39.106.99.114机器上的/root/develop/目录中下载所有文件到本地/root/目录中。
命令：`scp -r root@39.106.99.114:/root/develop/ /root/`

**实例：3. 上传本地目录文件到远程服务器**
描述：将本地当前目录中的scp.tar.gz文件上传到39.106.99.114机器上的/root/develpop/目录中。
命令：`scp scp.tar.gz root@39.106.99.114:/root/develop/`

**实例：4. 上传本地目录到远程服务器**
描述：将本地root/dev/目录中所有文件上传到39.106.99.114机器上的/root/develop/目录中。
命令：`scp -r /root/dev/ root@39.106.99.114:/root/develop/`

## 基础示例

**实例：1. v：得到认证、调试等相关细节信息**
描述：-v选项，可以得到认证、调试等相关细节信息。
命令：`scp -v index.html root@39.106.99.114:/root/scp/`

**实例：2. r：递归拷贝整个目录**
描述：-r选项，递归拷贝整个目录。
命令：`scp -r ./iweeek root@39.106.99.114:/root/scp/`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/scp/scp-r.png)

**实例：3. q：静默模式**
描述：-q选项，可以关闭进度信息以及警告和诊断信息。
命令：`scp -r -q ./iweeek root@39.106.99.114:/root/scp/`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/scp/scp-q.png)

**实例：4. l：限制命令使用的带宽**
描述：-l选项来指定命令使用的带宽，在此我们将速度限制为512Kbit/s，也就是64KB/s。因为带宽是以千比特/秒（kbps）表示的，而8比特等于1字节。
命令：`scp -l 512 index.html root@39.106.99.114:/root/scp/`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/scp/scp-l.png)

**实例：5. p：保留原始信息**
描述：-p选项，可以保留目标文件的更新时间，访问时间和权限模式。
命令：`scp -c blowfish index.html root@39.106.99.114:/root/`

**实例：6. P：指定端口**
描述：ssh默认使用22端口，-p选项可以指定所需的端口号。
命令：`scp -P 2222 index.html root@39.106.99.114:/root/`

**实例：7. C：开启压缩模式**
描述：-C选项开启压缩模式，scp会不停压缩所传输的文件来节省传输过程中的带宽和时间。它特别之处在于压缩是在网络传输中进行，当文件传到目标服务器时，它会变回压缩之前的原始大小。
压缩的方法不是适用于所有文件。当源文件已经被压缩过了，那就没办法再压缩很多了。诸如那些像.zip，.rar，pictures和.iso的文件，用-C参数就没什么意义。
命令：`scp -C index.html root@39.106.99.114:/root/`

**实例：8. c：选择加密数据的加密方式**
描述：scp默认使用AES-128的加密方式，可以通过-c参数来指定其他的加密方式。
命令：`scp -c blowfish index.html root@39.106.99.114:/root/`

