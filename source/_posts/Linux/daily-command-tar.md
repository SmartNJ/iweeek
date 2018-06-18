---
title: Linux tar总结
date: 2018-06-2 16:26:43
tags: Linux
---

## 一、什么是“文件压缩”？ 
我们知道，在计算机系统中文件的内容是信息，信息实际上就是一个由值0和值1组成的位（又称为比特）序列，8个位被组织成一组，称为字节。一般来说，一个字节的8位是没有被全部利用起来的，这些没有被利用的位占据了一个文件的大部分空间，而“文件压缩”就是利用复杂的计算方式，将这些没有利用的空间腾出来，以让文件占用的空间变小。

简单来说，「压缩」就是把文件中没有完全填满的空间填满。压缩过的文件不能直接被操作系统所使用，因此，「解压缩」就是指把文件「还原」为未压缩之前的模样。压缩前与压缩后的文件所占用的磁盘空间大小之比就是「压缩比」。


<!-- more -->

## 二、常见的压缩格式
Linux 中常见的压缩格式有：

```
*.Z：compress 程序压缩的文件。
*.gz：gzip 程序压缩的文件。
*.bz2：bzip2 程序压缩的文件。
*.tar：tar 程序打包的数据，没有被压缩过。
*.tar.gz（简写为 .tgz）：tar 程序打包的数据，经过 gzip 的压缩。
*.tar.bz2（简写为 .tbz2）：tar 程序打包的数据，经过 bzip2 的压缩。
```

上面的压缩格式中，主要是gzip和bzip2两个压缩命令，它们是GNU计划的中的一部分，在此之前是compress命令，但它已经不再流行了。bzip2比gzip的压缩比很好，不过bzip2通常只能针对一个文件来压缩和解压缩。如果是这样的话，压缩整个开发环境目录就太繁琐了。

因此tar命令就出现了，tar不是一个 “压缩命令”，而是一个“打包命令”。也就是说，tar可以把很多文件「打包」成一个文件，甚至连目录也可以进行打包。一开始tar命令的确是不支持压缩的功能，后来GNU计划为了提供给使用者更方便并且更加强大的压缩与打包功能，就把整个tar与压缩的功能结合在一起了。

仅仅打包起来的tar文件俗称tarfile文件，经过压缩的tar文件叫做tarball文件。

## 三、全能的 tar 命令
### 概要
tar可以将多个目录或文件打成一个大文件，同时支持gzip/bzip2

归档：tar {-c} [option...] -f destination source
追加归档：tar {-r | -u} -f source [option...] destination
解压：tar {-t | -x} -f source [option...] -C destination

最简单的使用 tar 只要记住下面的方式：

- 压缩：tar -jcv -f filename.tar.bz2 被压缩的文件或目录名称
- 查看文件：tar -jtv -f filename.tar.bz2 
- 解压缩：tar -jxv -f filename.tar.gz -C 解压到哪里

filename.tar.bz2 既然tar不是一个压缩命令，是个打包命令，那么是如何做到打包并压缩的呢？我们先来看一下tar命令的常用参数：

### 模式参数
- -c（--create）：创建新的归档文件。
- -r（--append）：与-c一样创建新的归档文件，但这是以追加的模式，只能往未压缩过的归档文件中追加，要求指定-f参数。
- -t：查看归档文件的内容含有哪些文件，可以看到包括文件名在内的详细信息。
- -u：与-r一样，但是只往归档文件添加更新的文件。
- -x：解压缩归档文件。如果一个归档文件里有相同文件名的多个文件，那么会先将每个文件解压，最新的文件将覆盖旧的文件。

tar分为三种模式，-c，-r，-u三个一类，为归档/压缩模式，在该模式下，tar会递归遍历指定目录下的所有目录和文件，并创建归档文件。-x表示为去归档/解压模式，-t表示为打印列表模式。


### 通用参数

- -j：使用bzip2的支持进行压缩和解压缩，文件名最好为*.tar.bz2。
- -z：使用gzip的支持进行压缩和解压缩，文件名最好为*.tar.gz。
- -v：在压缩/解压缩的过程中，将正在处理的文件名显示出来。
- -f：后面接被处理的文件名，最好把-f单独出来写一个参数。
- -C：指定解压的目录。
- -p：保留文件的原始信息，权限等等
- -P：解压时保留绝对路径。
- --exclude=FILE：在打包压缩的时候，不要将FILE打包。

## 五、例子

本文讲解的案例在CentOS Linux release 7.4.1708下进行。

### 打包并创建归档文件

示例：打包一个目录。
描述：将/home/nijun这个目录打包，生成文件名为command-18-06-02.tar的归档文件，保存在当前目录下。
``` shell
# tar -cv -f command-18-06-02.tar /home/nijun
/home/nijun/.bash_logout
/home/nijun/.bashrc
/home/nijun/apache-tomcat-9.0.7.tar.gz
/home/nijun/.bash_profile
/home/nijun/nginx-1.10.1.tar.gz
```

-c（--create的简写）参数，这表示为指定的文件或者目录创建新的归档文件。使用-f指定读取或者写入的归档文件，可以用-表示标准输入或者标准输出，-f可以与其他参数连起来写，必须保证f参数后面跟的是文件名。但不推荐这样写，因为参数调换顺序是允许的，如果写成-cfv就会导致压缩后的文件名变成了v。

使用-v表示生成详细的输出，在压缩或者解压的模式中，会列出正在向归档文件读或者写的文件名字。

### 创建tar.gz归档文件

示例：打包并且使用gzip压缩。
描述：将/home/nijun/images目录下的所有文件以及目录中的文件打包，并用gzip进行压缩，生成名为MyImages-18-06-02.tar.gz的归档文件，放在当前目录下。

``` shell
# tar -zcv -f MyImages-18-06-02.tar.gz /home/nijun/images
OR
# tar -zcv -f MyImages-18-06-02.tar.tgz /home/nijun/images
/home/nijun/images/alejandro-gonzalez-17189.jpg
/home/nijun/images/brooke-lark-275181.jpg
/home/nijun/images/brenda-godinez-228181.jpg
/home/nijun/images/artur-rutkowski-97622.jpg
/home/nijun/images/ben-white-138743.jpg
```
-z表示要使用gzip支持来压缩或者解压文件，注意gzip的压缩的文件格式最好写成tar.gz。（注：tar.gz 和 tgz 是同一个意思）


### 打包压缩排除某些文件

示例：打包压缩并排除某些文件。
描述：将/home/nijun/images目录下，排除brooke-lark-275181.jpg和ben-white-138743.jpg之外的所有文件打包，并用gzip进行压缩，生成名为MyImages-18-06-02.tar.gz的归档文件，放在当前目录下。

``` shell
# tar -czv -f MyImages-18-06-02.tar.gz --exclude=./brooke-lark-275181.jpg --exclude=./ben-white-138743.jpg /home/nijun/images
/home/nijun/images/alejandro-gonzalez-17189.jpg
/home/nijun/images/brenda-godinez-228181.jpg
/home/nijun/images/artur-rutkowski-97622.jpg
```

### 解压归档文件（默认）
示例：解压，默认解压
描述：将名为MyImages-18-06-02.tar的归档文件解压至当前目录下。

```shell
## Untar files in Current Directory ##
# tar -xvf MyImages-18-06-02.tar
home/nijun/images/alejandro-gonzalez-17189.jpg
home/nijun/images/brenda-godinez-228181.jpg
home/nijun/images/artur-rutkowski-97622.jpg
```

其中，-x参数表示去解压一个归档文件，如果归档文件中有两个相同名字的文件，那么每一个文件都会被解压出来，然后最新的会覆盖旧的文件。注意这里没有指定-j参数，因为tar看到指定了-x参数，就知道这是解压操作，会自动判断该解压包的压缩类型。

### 解压归档文件并指定目录

示例：解压到一个指定目录
描述：将名为MyImages-18-06-02.tar.gz的归档文件解压至一个指定的目录。

```shell
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar -C /home/nijun/public_images
home/nijun/public_images/alejandro-gonzalez-17189.jpg
home/nijun/public_images/brenda-godinez-228181.jpg
home/nijun/public_images/artur-rutkowski-97622.jpg
```

### 查看压缩包文件信息

示例：查看压缩包文件信息
描述：列出MyImages-18-06-02.tar.bz2中的文件信息，-v参数，会生成与ls(1)命令相近的输出。

```shell
# tar -tv -f MyImages-18-06-02.tar.gz
OR
# tar -tv -f MyImages-18-06-02.tar.bz2
-rw-r--r-- root/root   2176861 2018-06-02 21:26 home/nijun/images/alejandro-gonzalez-17189.jpg
-rw-r--r-- root/root   8452524 2018-06-02 21:26 home/nijun/images/brenda-godinez-228181.jpg
-rw-r--r-- root/root   1131986 2018-06-02 21:26 home/nijun/images/artur-rutkowski-97622.jpg
```

### 解压单个文件

示例：解压单个文件
描述：将home/nijun/.bashrc这一个文件从归档文件中提取出来。

```shell
# tar -xv -f command-18-06-02.tar home/nijun/.bashrc
home/nijun/.bashrc
```

### 解压多个指定的文件

示例：解压多个指定的文件。
描述：将file1、file2等多个文件从归档文件中提取出来，可以用空格隔开多个文件，也可以用通配符的形式。

```shell
# tar -zxv -f MyImages-18-06-02.tar.gz "file 1" "file 2"
OR
# tar -zxv -f MyImages-18-06-02.tar.gz --wildcards '*b*.jpg'
home/nijun/images/brooke-lark-275181.jpg
home/nijun/images/brenda-godinez-228181.jpg
home/nijun/images/ben-white-138743.jpg
home/nijun/images/aleks-dahlberg-274646.jpg
```

参考：
https://www.cyberciti.biz/faq/howto-use-tar-command-through-network-over-ssh-session/
https://www.freebsd.org/cgi/man.cgi?query=tar&apropos=0&sektion=0&manpath=FreeBSD+11.1-RELEASE+and+Ports&arch=default&format=html
