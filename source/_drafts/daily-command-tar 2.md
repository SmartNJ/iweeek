---
title: Linux tar 命令
date: 2018-06-2 16:26:43
tags: Linux
---


## 二、什么是“文件压缩”？ 
我们知道，在计算机系统中文件的内容是信息，信息实际上就是一个由值0和值1组成的位（又称为比特）序列，8个位被组织成一组，称为字节。一般来说，一个字节的8位是没有被全部利用起来的，这些没有被利用的位占据了一个文件的大部分空间，而“文件压缩”就是利用复杂的计算方式，将这些没有利用的空间腾出来，以让文件占用的空间变小。

简单来说，「压缩」就是把文件中没有完全填满的空间填满。压缩过的文件不能直接被操作系统所使用，因此，「解压缩」就是指把文件「还原」为未压缩之前的模样。压缩前与压缩后的文件所占用的磁盘空间大小之比就是「压缩比」。


## 三、常见的压缩格式
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

## 四、全能的 tar 命令
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

### 创建归档文件

示例：打包一个目录。
描述：将/home/nijun这个目录打包，生成文件名为command-18-06-02.tar的归档文件，保存在当前目录下。
``` shell
# tar -cv -f command-18-06-02.tar /home/nijun
/home/nijun/
/home/nijun/.bash_logout
/home/nijun/.bashrc
/home/nijun/apache-tomcat-9.0.7.tar.gz
/home/nijun/.bash_profile
/home/nijun/nginx-1.10.1.tar.gz
```

-c（--create的简写）参数，这表示为指定的文件或者目录创建新的归档文件。使用-f指定读取或者写入的归档文件，可以用-表示标准输入或者标准输出。使用-v表示生成详细的输出，在压缩或者解压的模式中，会列出正在向归档文件读或者写的文件名字。

### 创建tar.gz归档文件

示例：打包并且使用gzip压缩。
描述：将/home/nijun/images目录下的所有文件以及目录中的文件打包，并用gzip进行压缩，生成名为MyImages-18-06-02.tar.gz的归档文件，放在当前目录下。

``` shell
# tar -zcv -f MyImages-18-06-02.tar.gz /home/nijun/images
OR
# tar -zcv -f MyImages-18-06-02.tar.tgz /home/nijun/images
/home/nijun/images/
/home/nijun/images/alejandro-gonzalez-17189.jpg
/home/nijun/images/brooke-lark-275181.jpg
/home/nijun/images/brenda-godinez-228181.jpg
/home/nijun/images/artur-rutkowski-97622.jpg
/home/nijun/images/ben-white-138743.jpg
/home/nijun/images/adrian-infernus-281832.jpg
/home/nijun/images/arkady-lifshits-117993.jpg
/home/nijun/images/aleks-dahlberg-274646.jpg
```
-z表示要使用gzip支持来压缩或者解压文件，注意gzip的压缩的文件格式最好写成tar.gz。（注：tar.gz 和 tgz 是同一个意思）


### 打包压缩排除某些文件

示例：打包压缩并排除某些文件。
描述：将/home/nijun/images目录下的所有文件以及目录中的文件打包，并用gzip进行压缩，生成名为MyImages-18-06-02.tar.gz的归档文件，放在当前目录下。

``` shell

```


### 创建tar.bz2归档文件（）

示例：
描述：下面的例子是将/home/nijun/images目录打包，并用bzip2进行压缩，生成名为MyImages-18-06-02.tar.bz2的归档文件，放在当前目录下。

``` shell
# tar -jcv -f MyImages-18-06-02.tar.bz2 /home/nijun/images
OR
# tar -jcv -f MyImages-18-06-02.tar.tbz /home/nijun/images
OR
# tar -jcv -f MyImages-18-06-02.tar.tb2 /home/nijun/images
/home/nijun/images/
/home/nijun/images/alejandro-gonzalez-17189.jpg
/home/nijun/images/brooke-lark-275181.jpg
/home/nijun/images/brenda-godinez-228181.jpg
/home/nijun/images/artur-rutkowski-97622.jpg
/home/nijun/images/ben-white-138743.jpg
/home/nijun/images/adrian-infernus-281832.jpg
/home/nijun/images/arkady-lifshits-117993.jpg
/home/nijun/images/aleks-dahlberg-274646.jpg
```

-j参数表示用bzip2来打包压缩文件，bzip2比gzip的压缩比更好，但花的时间也更长。（注：tar.bz2 和 tbz 与 tb2 是同一个意思）

注意：在使用-j参数的时候遇到一个奇怪的问题，查了一下其实是bzip2命令没有安装，使用yum install bzip2安装即可。

``` shell
tar (child): bzip2: Cannot exec: No such file or directory
tar (child): Error is not recoverable: exiting now
```

### 去归档（untar）归档文件
示例：
描述：将名为MyImages-18-06-02.tar的归档文件去归档至指定的目录下。

```shell
## Untar files in Current Directory ##
# tar -xv -f MyImages-18-06-02.tar
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar -C /home/nijun/public_images
home/nijun/images/
home/nijun/images/alejandro-gonzalez-17189.jpg
home/nijun/images/brooke-lark-275181.jpg
home/nijun/images/brenda-godinez-228181.jpg
home/nijun/images/artur-rutkowski-97622.jpg
home/nijun/images/ben-white-138743.jpg
home/nijun/images/adrian-infernus-281832.jpg
home/nijun/images/arkady-lifshits-117993.jpg
home/nijun/images/aleks-dahlberg-274646.jpg
```

其中，-x参数表示去解压一个归档文件，如果归档文件中有两个相同名字的文件，那么每一个文件都会被解压出来，然后最新的会覆盖旧的文件。注意这里没有指定-j参数，因为tar看到指定了-x参数，就知道这是解压操作，会自动判断该解压包的压缩类型。最后的-C参数是指要把归档文件去归档后，存放的目录。


### 解压tar.gz归档文件

下面的例子是将名为MyImages-18-06-02.tar.gz的归档文件去归档至指定的目录下。与去归档文件一样，解压tar.gz归档文件可以通过-C参数解压到指定的目录，这里是public_images_gz目录。
```shell
## Untar files in Current Directory ##
# tar -xv -f MyImages-18-06-02.tar.gz
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar.gz -C /home/nijun/public_images_gz
```

### 解压tar.bz2归档文件
下面的例子是将名为MyImages-18-06-02.bz2的归档文件去归档至指定的目录下。与去归档文件一样，解压tar.bz2归档文件可以通过-C参数解压到指定的目录，这里是public_images_bz2目录。

```shell
## Untar files in Current Directory ##
# tar -xv -f MyImages-18-06-02.tar.bz2
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar.bz2 -C /home/nijun/public_images_bz2
```

### 打印出tar.gz或tar.bz2文件列表
下面的例子将列出MyImages-18-06-02.tar.bz2中的文件信息。列表模式，使用-t选项查看归档文件含有哪些文件，可以看到包括文件名在内的详细信息，在该模式下使用-v选项，会生成与ls(1)命令相近的输出。下面的例子将列出command-18-06-02.tar中的文件信息。

```shell
# tar -tv -f MyImages-18-06-02.tar.gz
OR
# tar -tv -f MyImages-18-06-02.tar.bz2
drwxr-xr-x root/root         0 2018-06-02 21:36 home/nijun/images/
-rw-r--r-- root/root   2176861 2018-06-02 21:26 home/nijun/images/alejandro-gonzalez-17189.jpg
-rw-r--r-- root/root   7766016 2018-06-02 21:26 home/nijun/images/brooke-lark-275181.jpg
-rw-r--r-- root/root   8452524 2018-06-02 21:26 home/nijun/images/brenda-godinez-228181.jpg
-rw-r--r-- root/root   1131986 2018-06-02 21:26 home/nijun/images/artur-rutkowski-97622.jpg
-rw-r--r-- root/root   5819220 2018-06-02 21:26 home/nijun/images/ben-white-138743.jpg
-rw-r--r-- root/root   2123308 2018-06-02 21:26 home/nijun/images/adrian-infernus-281832.jpg
-rw-r--r-- root/root   4078520 2018-06-02 21:26 home/nijun/images/arkady-lifshits-117993.jpg
-rw-r--r-- root/root   1640699 2018-06-02 21:26 home/nijun/images/aleks-dahlberg-274646.jpg
```

### 去归档单个文件
下面的例子可以将home/nijun/.bashrc这一个文件从归档文件中提取出来。

```shell
# tar -xv -f command-18-06-02.tar home/nijun/.bashrc
home/nijun/.bashrc
```

### 从tar.gz或tar.bz2中去归档单个文件
下面的例子将从tar.gz或tar.bz2中去归档名为alejandro-gonzalez-17189.jpg这一个文件。

```shell
# tar -zxv -f MyImages-18-06-02.tar.gz home/nijun/images/alejandro-gonzalez-17189.jpg
OR
# tar -jxv -f MyImages-18-06-02.tar.bz2 home/nijun/images/alejandro-gonzalez-17189.jpg
home/nijun/images/alejandro-gonzalez-17189.jpg
```

### 从tar，tar.gz或tar.bz2中去归档多个文件
下面的例子将从tar，tar.gz或tar.bz2中提取file1和file2等多个文件。

```shell
# tar -xv -f MyImages-18-06-02.tar "file 1" "file 2"
OR
# tar -zxv -f MyImages-18-06-02.tar.gz "file 1" "file 2"
OR
# tar -jxv -f MyImages-18-06-02.tar.bz2 "file 1" "file 2"
```

### 用通配符解压一组文件
我们可以使用通配符--wildcards选项，用通配符来指定要解压的文件。

```shell
# tar -xv -f MyImages-18-06-02.tar --wildcards '*b*.jpg'
OR
# tar -zxv -f MyImages-18-06-02.tar.gz --wildcards '*b*.jpg'
OR
# tar -jxv -f MyImages-18-06-02.tar.bz2 --wildcards '*b*.jpg'
home/nijun/images/brooke-lark-275181.jpg
home/nijun/images/brenda-godinez-228181.jpg
home/nijun/images/ben-white-138743.jpg
home/nijun/images/aleks-dahlberg-274646.jpg
```

### 向归档文件添加文件或目录
下面的例子是将xyz.txt文件添加进入command-18-06-02.tar中。

```shell
# tar -tv -f command-18-06-02.tar
-rw-r--r-- root/root   9517889 2018-04-04 04:19 home/nijun/apache-tomcat-9.0.7.tar.gz
# tar -rv -f command-18-06-02.tar xyz.txt
OR
# tar -uv -f command-18-06-02.tar xyz.txt
xyz.txt
[root@iz2zeabw0e4r5tqk5ew2zqz nijun]# tar -tv -f command-18-06-02.tar
-rw-r--r-- root/root   9517889 2018-04-04 04:19 home/nijun/apache-tomcat-9.0.7.tar.gz
-rw-r--r-- root/root         5 2018-06-02 22:15 xyz.txt
```
这里的参数-r和-u，它们和-c参数类似，都是向归档文件中添加文件，但是-c选项每次会重新创建一个新的归档文件，不管原文件是否存在。-r和-u的区别是，-r不会覆盖原文件，它会向其中追加新的文件，即使文件没有发生任何变化，也会被再次添加进去，也就是将重复添加。而-u则会判断是否比归档文件中的更加新，若是才会添加执行添加操作。


### 向tar.gz或tar.bz2添加文件或目录
如果你想要往已经压缩过的归档文件中添加新的文件，你可能要失望了，因为tar命令不支持向压缩好的归档文件添加文件，若执意要运行，那么会得到如下的错误信息。

```shell
# tar -rv -f command-18-06-02.tar.gz xyz.txt
OR
# tar -rv -f command-18-06-02.tar.bz2 xyz.txt
tar: Cannot update compressed archives
tar: Error is not recoverable: exiting now
```

### 检查归档文件的大小


```shell
# tar -cv -f MyImages-18-06-02.tar ./images | wc -c
OR
# wc -c MyImages-18-06-02.tar
33198080 MyImages-18-06-02.tar
# wc -c MyImages-18-06-02.tar.gz
31845034 MyImages-18-06-02.tar.gz
# wc -c MyImages-18-06-02.tar.bz2
30620274 MyImages-18-06-02.tar.bz2
```

### 将tar归档文件切分为多个指定大小的文件
我们肯定遇到过这样的情况——将一个大的文件传输到另一台服务器，这时候如果文件很大的话，不利于网络传输。这里我们使用[split]()命令来将文件进行切割。

使用-b选项用来指定每个部分的大小，并用MyImage.tar.bz2.part作为创建后每个部分的前缀。

```shell
# split -b 10M MyImages-18-06-02.tar.bz2 "MyImage.tar.bz2.part"
# ls -ilh MyImage.tar.bz2.part*
393273 -rw-r--r-- 1 root root  10M Jun  2 23:00 MyImage.tar.bz2.partaa
393274 -rw-r--r-- 1 root root  10M Jun  2 23:00 MyImage.tar.bz2.partab
393275 -rw-r--r-- 1 root root 9.3M Jun  2 23:00 MyImage.tar.bz2.partac
```

当我们通过网络将文件传输好之后，使用cat命令合并多个部分文件。

```shell
# cat MyImage.tar.bz2.parta* > MyImage.tar.bz2.joined
# ls -ilh *joined
393276 -rw-r--r-- 1 root root 30M Jun  2 23:08 MyImage.tar.bz2.joined
```

### 有时候我们会看到 tarfile 和 tarball，它们是什么意思呢？
tar -cv -f filename.tar 就称为tarfile。

tar -jcv -f filename.tar.bz2 就称为tarball（tar 球）。

### tar 命令与管道命令实现远程传输

下面的命令将使用tar和管道执行一系列操作，首先将/usr/local/webserver目录用打包，并用gzip压缩，排除掉一些不需要打包的目录或文件，不生成归档文件，直接将输出内容变成输入内容传输到接下来的命令。第二步ssh命令，先连接到目标服务器，然后执行引号中的cat命令，cat命令的输入来源就是前一步当中，tar命令产生的归档文件输出流，cat命令将输入流写入到/root/backup/webserver.tar.gz中。

shell
```shell
$ tar -czvp -f - /usr/local/webserver --exclude=FILE ... | ssh root@119.23.12.36 "cat > /root/backup/webserver.tar.gz"
```

反过来，也可以从119.23.12.36服务器上还原备份文件到本地系统中。具体执行顺序是，先连接登录到远程服务器，然后使用cat命令读取/root/backup/webserver.tar.gz的内容作为输出流，传输到本地系统中，以输入流的形式传给tar命令，然后tar执行解压操作。

```shell
$ ssh root@39.106.14.66 "cat /root/backup/webserver.tar.gz" | tar -zxvp -f -shell
```

### 模拟文件拷贝
在本地系统中，使用tar命令进行文件拷贝操作。下面的命令，先将/etc目录下的内容打包，然后通过管道传输到当前目录的backup中。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

```shell
$ tar -cv -f - /etc | tar -xv -f - -C ./backup
```

其中第一个`-`代表standard output输出文件，第二个`-`代表standard input输入文件，我们可以把-想象成内存中的一个设备（缓冲区）。  


参考：
https://www.cyberciti.biz/faq/howto-use-tar-command-through-network-over-ssh-session/
https://www.freebsd.org/cgi/man.cgi?query=tar&apropos=0&sektion=0&manpath=FreeBSD+11.1-RELEASE+and+Ports&arch=default&format=html