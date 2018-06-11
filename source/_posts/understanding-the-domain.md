---
title: 浅谈域名
date: 2018-04-18 09:57:53
tags: 域名
categories: [网站, 域名]
---

前段时间创建了 [GitHub Pages](https://pages.github.com/) 之后，随便也申请了一个属于我自己的域名。那么从申请域名到最后的设置自定义 GitHub Pages 域名，中间到底究竟发生了什么，本文就来说说离我们并不遥远的**「域名」**。


<!-- more -->

---------------

## 域名（Domain Name）

域名就是一串由点分隔的文字，更具体地说，是一段人类容易识别的文字，它的作用很简单，就是给一个 IP 取一个人们都够记住他的名字。域名是不区分大小写的。

## 根域（DNS Root Zone）

通常我们知道的域名，例如 `example.com` ，其实是完整域名的缩写。真正的全称为 `example.com.`，请注意最后的`.`，这个就是根域。它的现实体现为全球的 13 台**固定 IP** 的**根域名服务器**（root zone name servers），从 `a.root-servers.net` 到 `m.root.servers.net` 。在下文`完全限定域名`中还会提到它。

当我们在进行 DNS 查询的时候，如果一个全新的域名从来没有进行过查询，那么，最终会向这 13 台根域服务器进行请求。不过，现在的浏览器已经基本上默认不再添加这个「多余」的点了。

事实上，并不是真正的 13 台，而是 13 组，每一台在全球都有很多的镜像节点，所以你不用担心其中一台挂了会引起全球混乱。

## 顶级域名（Top-level Domain - TLD）
> A top-level domain (TLD) is one of the domains at the highest level in the hierarchical Domain Name System of the Internet. The top-level domain names are installed in the root zone of the name space. For all domains in lower levels, it is the last part of the domain name, that is, the last label of a fully qualified domain name. For example, in the domain name www.example.com, the top-level domain is `com.`

**顶级域名**，是域名系统中层次最高的域名，具体表现为低级域名的最后一部分。例如：`iweeek.com` 其中的`.com`就是一个顶级域名，它是一种「不完全限定域名」（partially qualified domain name - PQDN）。

常用的顶级域名分为几种：

1. 国家顶级域名，例如`.cn`, `.jp`
2. 机构顶级域名，例如`.com`, `.edu`, `.org`
3. 还有其他分类

## 完全限定域名（Fully Qualified Domain Name - FQDN）

在介绍「完全限定域名」之前（和上文提到过「不完全限定域名」），先来看张图：

![完全限定域名的层次结构图](http://p748dqat4.bkt.clouddn.com/The-hierarchy-of-labels-in-a-fully-qualified-domain%E2%80%93name.png)

这是一张完全限定域名的层次结构图，`ru.wikipedia.org.`中每一个被`.`分隔开的部分，在树形层次结构图中体现到具体的一个节点，根据树的数据结构特点，每个完全限定域名都是唯一的，也就是说，不存在歧义。另外，每一级域名控制它下一级的域名分配。

因为 DNS 的根域名（**ROOT**） 没有被命名，所以它以空字符串表示，体现在域名上，就用 `.` 代替表示为 **ROOT**。例如：`www.iweeek.com.`，显式地指定一个绝对域名，以空白的顶级域名标签结束（虽然末尾只看到`.`）。

下图是「完全限定域名」的一个例子：
![](http://p748dqat4.bkt.clouddn.com/domain-example.jpg)


## 二级域名（Second-level domain）

一般我们所说的申请域名，就是申请的二级域名，在顶级域名的左侧加上一个自定义文字段。例如：`iweeek.com`。写到这里，肯定有人问，是不是有 N 级域名呢？答案是肯定的，形如

> `二级域名.顶级域名.`，`三级域名.二级域名.顶级.域名`......

一个域名至少包含一个二级域名（iweeek）和一个顶级域名（com），顶级域名有时候也叫作一级域名。

需要注意的是，一个完整字符串 `三级域名.二级域名.顶级域名.` 就是一个域名，例如：`static.iweeek.com.` 这个是一个三级域名。

## 子域名（Subdomain Name）

在「我们通常所说的域名」的基础上，又加入了子域名的概念，在「一个」域名的前面加上新的字段，代表这个域名下的某个特定的主机或者协议。最常用的就是 WWW 协议，例如：www.iweeek.com 就是 iweeek.com 的一个子域名，**GitHub Pages** 推荐使用 `www` 子域名作为自定义域名。

需要注意的是，子域名的概念在不同的域名中是不同的，请看上图 `pc15.tek.iweeek.com.` 的例子，`tek.iweeek.com.`是`iweeek.com.`的子域名，而`pc15.tek.iweeek.com.`则是`tek.iweeek.com.`的子域名，它们的上一级域名是不同的，这是相对的一个概念。


-------------

## 域名系统（Domain Name System - DNS）

### 什么是域名系统？
**域名系统**是互联网的一项服务。

### 干什么用的？
**域名系统**的主要任务就是所谓的域名解析，通俗点说，就是你给域名系统一个域名，它会给你一个 IP 地址。

在域名解析的过程中，简单的理解就是把一个人类记得住的域名变成网络中机器认识的 IP 地址。

### DNS 是如何工作的？
DNS 服务器上存在一个数据库，数据库里保存了已经解析过的域名和 IP 地址相互映射记录，这么多 DNS 服务器就组成了一个**分布式数据库**。

还是以查询 `pc15.tek.iweeek.com.` 为例：

1. 客户端发送查询报文 `query pc15.tek.iweeek.com. ` 至 DNS 服务器，DNS 服务器首先检查自身缓存，如果存在记录则直接返回结果。
2. 如果记录不存在，则 DNS 服务器向根域名服务器发送查询报文 `query pc15.tek.iweeek.com. `，根域名服务器返回 `.com` 域的权威域名服务器地址，这一级首先会返回的是顶级域名的权威域名服务器。
3. DNS服务器向 `.com` 域的权威域名服务器发送查询报文 `query pc15.tek.iweeek.com. `，得到 `.iweeek.com` 域的权威域名服务器地址。
4. DNS服务器向 `.iweeek.com ` 域的权威域名服务器发送查询报文 `query pc15.tek.iweeek.com. `，得到 `.tek.iweeek.com` 域的权威域名服务器地址。
5. DNS服务器向 `.tek.iweeek.com ` 域的权威域名服务器发送查询报文 `query pc15.tek.iweeek.com. `，得到主机 `pc15` 的A记录，存入自身缓存并返回给客户端。
6. 下次如果再次查询 `pc15.tek.iweeek.com.` ，那么第 `1` 步，DNS 服务器可以在缓存中找到这条记录，就直接返回给客户端了。


## A 记录（A Record）

> An A record maps a domain name to the IP address (IPv4) of the computer hosting the domain. Simply put, an A record is used to find the IP address of a computer connected to the internet from a name.

**A 记录**在 DNS 中的意义就是，域名到 IP 地址的转换。所以，当我们在 DNS 服务器中添加一个 A 记录时，是告诉服务器，将这个特定的域名映射到一个 IP 地址。


## CNAME 记录（Canonical Name Record）

**CNAME** 的意思，简单来说就是**别名**，即将一个域名映射到另一个域名（区别于 A 记录的 IP）。CNAME 通常有两种用法：

* **不同顶级域名之间的跳转**
例如：我的域名是 `iweeek.com`（顶级域名为 `.com`），如果我希望，当我访问这个域名的时候，其实是访问我的 `iweeek.github.io`（顶级域名为 `.io`），虽然它们是不同的顶级域名，但是我可以用 **CNAME** 记录映射。

* **将一个子域名映射到域名**
例如：我的域名是 `iweeek.com`，如果我希望，当我访问 `www.iweeek.com` （一个 www 子域名）的时候，仍旧访问 `iweeek.com` 这个域名指向的内容，就可以利用 **CNAME** 将 `www.iweeek.com` 映射到 `iweeek.com`。


例如我在阿里云中的域名配置：

![](http://p748dqat4.bkt.clouddn.com/dns-iweeek.png)

A 记录的主机记录是 `@`，表示为空的意思，由于这是 `iweeek.com` 的解析设置，所以相当于：

```
iweeek.com.           A       151.101.229.147
www.iweeek.com.       CNAME   iweeek.com.
```

`151.101.229.147` 是我的 `iweeek.github.io` 的 IP 地址。上面的例子也就是说，域名 `iweeek.com.` 映射到 `151.101.229.147` 这个 GitHub 服务器，然后 `www.iweeek.com.` 映射到 `iweeek.com.`。

## NS 记录（Name Serve Record）

**NS 记录**简单来说，就是声明谁来负责解析我这个域名，指定了负责解析我这个域名的域名服务器地址。这条记录赋予我们一个特殊的能力，就是，我可以让自己指定一个 DNS 解析服务器，而不一定使用域名提供商自带的域名解析服务器。一般来讲，是两条记录，一条主服务器，一条副服务器，例如我在阿里云服务里分配的 DNS 服务器就是`dns3.hichina.com`，` dns4.hichina.com`。

> "If you want to know about hosts in the foo.com zone, ask the name server ns1.bar.com"

其大致意思是：如果你想知道谁负责 `foo.com`这个域名的解析，就找`ns1.bar.com`域名服务器。


## DNS 解析的工作流程

例如使用我的子域名进行 DNS 追踪，命令如下：

`dig +trace www.iweeek.com`

结果如下：

```
; <<>> DiG 9.8.3-P1 <<>> +trace www.iweeek.com
;; global options: +cmd
.			218335	IN	NS	a.root-servers.net.
.			218335	IN	NS	b.root-servers.net.
.			218335	IN	NS	c.root-servers.net.
...
;; Received 228 bytes from 192.168.199.1#53(192.168.199.1) in 156 ms

com.			172800	IN	NS	a.gtld-servers.net.
com.			172800	IN	NS	b.gtld-servers.net.
com.			172800	IN	NS	c.gtld-servers.net.
...
;; Received 492 bytes from 198.97.190.53#53(198.97.190.53) in 679 ms

iweeek.com.		172800	IN	NS	dns3.hichina.com.
iweeek.com.		172800	IN	NS	dns4.hichina.com.
;; Received 334 bytes from 192.31.80.30#53(192.31.80.30) in 650 ms

www.iweeek.com.		600	IN	CNAME	iweeek.com.
;; Received 56 bytes from 140.205.41.14#53(140.205.41.14) in 31 ms
```
可以看到，以查找域名地址 `www.iweeek.com` 为例。首先，从最权威的 13 台根域名服务器查找，其中包含互联网上所有顶级域名的域名服务器信息。接着，在查询其中一个根域名服务器的时候，根域名服务器可能不会直接包含`www.iweeek.com`的记录，在这种情况下，根域名服务器会提供一些`com.`顶级域名服务器的**引用信息（referral）**，再次查询其中一个`com.`时，解析器可能会再次提供`iweeek.com.`（NS 记录表示域名服务器`dns3.hichina.com.`将会处理它）的一些信息。于是它会再次查询`www.iweeek.com.`（这是一个 CNAME 记录），这时，域名服务器正好有`iweeek.com.`的权威数据（authoritative data），递归查找到此终止。

这时，再次请求另一个域名，例如：`blog.iweeek.com.`，由于解析器之前已确定`com.`的权威名称服务器（authoritative name servers），所以这次它不需要从头开始解决过程，而是从域（zone）`com.`开始查找，从而避免对根域名服务器的另一个查询。


## 告诉 GitHub 你的域名

在项目下建立一个名为 `CNAME` （注意一定要大写）文件，在其中写上给你的主页分配的域名地址，例如：`example.com` 或者 `blog.example.com`，不能是 `http://iweeek.com`。这个操作的实际作用是什么？

- 当直接访问 `github.io` 的时候，GitHub 知道如何 redirect 到哪里。

```
Rebuilt URL to: iweeek.github.io/
  Trying 151.101.229.147...
TCP_NODELAY set
Connected to iweeek.github.io (151.101.229.147) port 80 (#0)
GET / HTTP/1.1
Host: iweeek.github.io
User-Agent: curl/7.54.0
Accept: */*
HTTP/1.1 301 Moved Permanently
Server: GitHub.com
Content-Type: text/html
Location: https://www.iweeek.com/
X-GitHub-Request-Id: EA10:30DF:E210B:F6A83:5AD6B9D7
Content-Length: 178
Accept-Ranges: bytes
Date: Wed, 18 Apr 2018 03:22:00 GMT
Via: 1.1 varnish
Age: 0
Connection: keep-alive
X-Served-By: cache-hnd18730-HND
X-Cache: MISS
X-Cache-Hits: 0
X-Timer: S1524021720.208656,VS0,VE116
Vary: Accept-Encoding
X-Fastly-Request-ID: dc9abadf58c0e71cf1d9c4de07b6607932f15f1b
```
也就是说，当你指定了 **CNAME** 之后，我们再次访问一个 `github.io` 的网站时，我们会发现，域名自动变成了我们指定的自定义域名。这是因为 **CNAME** 中指出了自定义域名是什么，所以，当我们访问 `github.io`的时候，会触发http 301。

- 当用你的域名访问的时候，github知道去哪个 io 里面找

当然，当我们直接使用自定义域名访问的时候，由于 `DNS` 服务器中 **CNAME** 的配置，最终我们会访问 `github.io`的主机，当主机收到我们的请求的时候，会拿我们 `http` 请求中的 `host` 和 `repository` 中的 **CNAME 文件** 比较，从而知道，当前的域名应该访问哪个具体的 `xxx.github.io` 的内容。


----------------

呼~~，总算是写完了，在找资料上面花了很长时间，不过也算是拼拼凑凑地完成了。在此感谢 [winterttr](http://winterTTr.me/2015/10/23/from-dns-to-github-custom-domain/index.html)，我只是在他的基础上，添加了一些自己的理解。

----------------

References：

- [Fully qualified domain name - wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)
- [What is Fully Qualified Domain Name?](http://www.omnisecu.com/tcpip/fully-qualified-domain-name-fqdn-and-partially-qualified-domain-name-pqdn.php)
- [DNS Root Zone](https://en.wikipedia.org/wiki/DNS_root_zone)
- [DNS Zone](https://en.wikipedia.org/wiki/DNS_zone)
- [中文 RFC 文档](http://man.chinaunix.net/develop/rfc/default.htm)
- [Subdomain - wikipedia](https://en.wikipedia.org/wiki/Subdomain)
- [Top-level domain - wikipedia](https://en.wikipedia.org/wiki/Top-level_domain)
- [Domain Name System - wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System)
- [Using a custom domain with GitHub Pages - Github](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
- [Differences-a-cname-records](https://support.dnsimple.com/articles/differences-a-cname-records/)
- [How does dig +trace actually work?](https://superuser.com/questions/715632/how-does-dig-trace-actually-work)
