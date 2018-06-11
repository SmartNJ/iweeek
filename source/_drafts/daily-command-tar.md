---
title: Linux tar 命令
date: 2018-06-2 16:26:43
tags: Linux
---


## 二、什么是“文件压缩”呢？ 
我们知道，在计算机系统中文件的内容是信息，信息实际上就是一个由值 0 和值 1 组成的位（又称为比特）序列，8 个位被组织成一组，称为字节。一般来说，一个字节的 8 位是没有被全部利用起来的，这些没有被利用的位占据了一个文件的大部分空间，而“文件压缩”就是利用复杂的计算方式，将这些没有利用的空间腾出来，以让文件占用的空间变小。

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

上面的压缩格式中，主要是 gzip 和 bzip2 两个压缩命令，它们是 GNU 计划的中的一部分，在此之前是 compress 命令，但它已经不再流行了。bzip2 比 gzip 的压缩比很好，不过 bzip2 通常只能针对一个文件来压缩和解压缩。如果是这样的话，压缩整个开发环境目录就太繁琐了。

因此 tar 命令就出现了，tar 不是一个 “压缩命令”，而是一个“打包命令”。也就是说，tar 可以把很多文件「打包」成一个文件，甚至连目录也可以进行打包。一开始 tar 命令的确是不支持压缩的功能，后来 GNU 计划为了提供给使用者更方便并且更加强大的压缩与打包功能，就把整个 tar 与压缩的功能结合在一起了。

## 四、全能的 tar 命令
既然 tar 不是一个压缩命令，是个打包命令，那么是如何做到打包并压缩的呢？我们先来看一下 tar 命令的常用参数：

### 模式参数
- -c（--create）：创建新的归档文件。
- -r（--append）：与 -c 一样创建新的归档文件，但这是以追加的模式，只能往未压缩过的归档文件中追加，要求指定 -f 参数。
- -t：查看归档文件的内容含有哪些文件，可以看到包括文件名在内的详细信息。
- -u：与 -r 一样，但是只往归档文件添加更新的文件。
- -x：解压缩归档文件。如果一个归档文件里有相同文件名的多个文件，那么会先将每个文件解压，最新的文件将覆盖旧的文件。

在 -c，-r，-u 模式下，会递归遍历指定目录下的所有目录和文件。


### 通用参数

- -j：使用 bzip2 的支持进行压缩和解压缩，文件名最好为 *.tar.bz2。
- -z：使用 gzip 的支持进行压缩和解压缩，文件名最好为 *.tar.gz。
- -v：在压缩/解压缩的过程中，将正在处理的文件名显示出来。
- -f：后面接被处理的文件名，最好把 -f 单独出来写一个参数。
- -C：指定解压的目录。
- -p
- -P：解压时保留绝对路径。
- --exclude=FILE：在打包压缩的时候，不要将 FILE 打包。

最简单的使用 tar 只要记住下面的方式：

- 压缩：tar -jcv -f filename.tar.bz2 被压缩的文件或目录名称
- 查看文件：tar -jtv -f filename.tar.bz2 
- 解压缩：tar -jxv -f filename.tar.gz -C 解压的目录


### 完成任务
根据上面所述，我就根据任务要求，写出了如下的打包压缩命令：

```
root@iZwz90drrwkerfi7bc8mqiZ:/usr/local/webserver# tar -czv \> -f webserver.tar.gz ./ -h --exclude=./nginx/html/backup \> --exclude=./nginx/html/panda_loan_mobile_web \> --exclude=./nginx/html/wzsport-web \> --exclude=./nginx/html/panda_loan_backend_web \> --exclude=./nginx/html/panda_loan_app_web \> --exclude=./nginx/html/wzu_sport_wechat \> --exclude=./logs --exclude=./tomcat_2 \> --exclude=./tomcat/webapps --exclude=./tomcat/backup

```
-czv 表示用 gzip 进行压缩，创建新的备份文件，并在执行过程中显示文件内容，一系列 --exclude 语句将一些不需要归档的目录排除在外。这样就把开发环境 webserver 目录打包并压缩了，之后就可以将这个压缩过的 webserver.tar.gz 文件传送到我们想要地方即可。

## 五、例子

本文讲解的案例在CentOS Linux release 7.4.1708下进行。
### 创建归档文件

```
# tar -cv -f command-18-06-02.tar /home/nijun
tar: Removing leading `/' from member names
/home/nijun/
/home/nijun/.bash_logout
tar: /home/nijun/command-18-06-02.tar: file is the archive; not dumped
/home/nijun/.bashrc
/home/nijun/linux-command/
/home/nijun/apache-tomcat-9.0.7.tar.gz
/home/nijun/.bash_profile
/home/nijun/nginx-1.10.1.tar.gz
```

将/home/nijun目录下的所有文件打包成一个nijun-18-06-02.tar归档文件。使用-c（--create的简写）表示为指定的文件或者目录创建新的归档文件。使用-v表示生成详细的输出，在压缩或者解压的模式中，会列出正在向归档文件读或者写的文件名字，在列表模式下，会生成与ls(1)命令相近的输出。使用-f指定读取或者写入的归档文件，可以用-表示标准输入或者标准输出。

输出信息中有两个tar的提示信息，第一个tar表示将文件绝对路径中的/符号移除，下面会讲到。第二个tar提示我们/home/nijun/nijun-18-06-02.tar这个tar文件是一个归档文件，不会被备份，由此可以看出，自tar命令运行起，归档文件就已经生成在了当前目录当中，会被当成要被归档的文件处理，所以我们最好不要在当前目录进行打包，而是在上级目录打包。


### 创建tar.gz归档文件

```
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
将/home/nijun/images目录下的所有图片打包并用gzip支持压缩成一个归档文件。使用-z表示要使用gzip支持来压缩或者解压文件。注意gzip的压缩的文件格式最好写成tar.gz。（注：tar.gz 和 tgz 是同一个意思）


### 创建tar.bz2归档文件

bzip2 比 gzip 的压缩比好，但是会花更长的时间。使用-j选项来打包压缩更高压缩比的文件。下面的例子将/home/nijun/images下的图片压缩成一个MyImages-18-06-02.tar.bz2文件。（注：tar.bz2 和 tbz 与 tb2 是同一个意思）
```
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

注意：在使用-j参数的时候遇到一个奇怪的问题，查了一下其实是bzip2命令没有安装，使用 yum install bzip2 安装即可。

```
tar (child): bzip2: Cannot exec: No such file or directory
tar (child): Error is not recoverable: exiting now
```

### 去归档（untar）归档文件
下面的例子将MyImages-18-06-02.tar.bz2去归档至指定的目录，其中-C参数指定要把文件去归档的目录。注意这里没有指定-j参数，因为tar会自动判断解压的类型。

使用-x参数去解压一个归档文件，如果归档文件中有两个相同名字的文件，那么每一个文件都会被解压出来，然后最新的会覆盖旧的文件。

```
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar.bz2 -C /home/nijun/public_images
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

### 解压tar.gz归档文件
与去归档文件一样，解压 tar.gz 归档文件可以解压到指定的不同目录。
```
## Untar files in Current Directory ##
# tar -xv -f MyImages-18-06-02.tar.gz
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar.gz -C /home/nijun/public_images_gz
```

### 解压tar.bz2归档文件
与tar.gz类似，解压 tar.bz2 归档文件可以解压到指定的不同目录。
```
## Untar files in Current Directory ##
# tar -xv -f MyImages-18-06-02.tar.bz2
## Untar files in specified Directory ##
# tar -xv -f MyImages-18-06-02.tar.bz2 -C /home/nijun/public_images_bz2
```


### 打印出归档文件信息列表

列表模式，使用-t选项查看归档文件含有哪些文件，可以看到包括文件名在内的详细信息，在该模式下使用-v选项，会生成与ls(1)命令相近的输出。下面的例子将列出command-18-06-02.tar中的文件信息。

```
# tar -tv -f command-18-06-02.tar
drwx------ nijun/nijun       0 2018-06-02 21:03 home/nijun/
-rw-r--r-- nijun/nijun      18 2016-12-07 07:19 home/nijun/.bash_logout
-rw-r--r-- nijun/nijun     231 2016-12-07 07:19 home/nijun/.bashrc
-rw-r--r-- root/root   9517889 2018-04-04 04:19 home/nijun/apache-tomcat-9.0.7.tar.gz
-rw-r--r-- nijun/nijun     193 2016-12-07 07:19 home/nijun/.bash_profile
-rw-r--r-- root/root    909077 2016-06-01 00:38 home/nijun/nginx-1.10.1.tar.gz
```

### 打印出tar.gz或tar.bz2文件列表
下面的例子将列出MyImages-18-06-02.tar.bz2中的文件信息，
```
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
```
# tar -xv -f command-18-06-02.tar home/nijun/.bashrc
home/nijun/.bashrc
```

### 从tar.gz或tar.bz2中去归档单个文件
下面的例子将从tar.gz或tar.bz2中去归档名为alejandro-gonzalez-17189.jpg这一个文件。
```
# tar -zxv -f MyImages-18-06-02.tar.gz home/nijun/images/alejandro-gonzalez-17189.jpg
OR
# tar -jxv -f MyImages-18-06-02.tar.bz2 home/nijun/images/alejandro-gonzalez-17189.jpg
home/nijun/images/alejandro-gonzalez-17189.jpg
```

### 从tar，tar.gz或tar.bz2中去归档多个文件
下面的例子将从tar.gz或tar.bz2中去归档名为alejandro-gonzalez-17189.jpg这一个文件。
```
# tar -xv -f MyImages-18-06-02.tar.gz "file 1" "file 2"
OR
# tar -zxv -f MyImages-18-06-02.tar.gz "file 1" "file 2"
OR
# tar -jxv -f MyImages-18-06-02.tar.bz2 "file 1" "file 2"
```

### 用通配符解压一组文件
我们可以使用通配符--wildcards选项来指定要解压的文件。
```
# tar -xv -f MyImages-18-06-02.tar.tar --wildcards '*b*.jpg'
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
选项-r和-u，它们和-c类似都是向归档文件中添加文件，但是-c选项每次会重新创建一个新的归档文件，不管原文件是否存在。-r和-u的区别是，-r不会覆盖原文件，而是会向其中追加新的文件，即使文件没有发生任何变化，都会被再次添加进去，即重复添加。而-u则会判断是否比归档文件中的更新，若是才会添加执行添加操作。下面的例子是将xyz.txt文件添加进入command-18-06-02.tar。
```
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

### 向tar.gz或tar.bz2添加文件或目录
如果你想要往已经压缩过的归档文件中添加新的文件，你可能要失望了，因为tar命令不支持向压缩好的归档文件添加文件，若执意要运行，那么会得到如下的错误信息。
```
# tar -rv -f command-18-06-02.tar.gz xyz.txt
OR
# tar -rv -f command-18-06-02.tar.bz2 xyz.txt
tar: Cannot update compressed archives
tar: Error is not recoverable: exiting now
```

### 检查归档文件的大小

```
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
我们肯定遇到过这样的情况——将一个大的文件传输到另一台服务器，这时候如果文件很大的话，不利于网络传输。这里我们使用[split命令]()来将文件进行切割。

使用-b选项用来指定每个部分的大小，并用MyImage.tar.bz2.part作为创建后每个部分的前缀。

```
# split -b 10M MyImages-18-06-02.tar.bz2 "MyImage.tar.bz2.part"
# ls -ilh MyImage.tar.bz2.part*
393273 -rw-r--r-- 1 root root  10M Jun  2 23:00 MyImage.tar.bz2.partaa
393274 -rw-r--r-- 1 root root  10M Jun  2 23:00 MyImage.tar.bz2.partab
393275 -rw-r--r-- 1 root root 9.3M Jun  2 23:00 MyImage.tar.bz2.partac
```

当我们通过网络将文件传输好之后，使用cat命令合并多个部分文件。

```
# cat MyImage.tar.bz2.parta* > MyImage.tar.bz2.joined
# ls -ilh *joined
393276 -rw-r--r-- 1 root root 30M Jun  2 23:08 MyImage.tar.bz2.joined
```


### 排除根目录
我们在执行 tar 命令备份根目录下的内容时，会有如下的提示：

```
$ tar -jcv -f etc.tar.gz /etctar: Removing leading '/' from member names
...
```
这个提示表示 tar 将会去掉根目录 `/`，那么为什么要去掉根目录呢？是的，是为了避免解压之后覆盖源文件。如果不需要这个默认操作，那么可以指定 -P 参数，这样就会添加根目录了，但是不推荐这样做。


### 有时候我们会看到 tarfile 和 tarball，它们是什么意思呢？
tar -cv -f filename.tar 就称为 tarfile。

tar -jcv -f filename.tar.bz2 就称为 tarball（tar 球）。

### tar 命令与管道命令的结合使用
如果想要把 tar 命令和 scp 命令的功能结合起来，则可以使用如下的形式把打包压缩好的文件传输到 119.23.12.36 服务器上 /root/backup 目录下。
```
$ tar -czvp -f - /usr/local/webserver --exclude=FILE ... | ssh root@119.23.12.36 "cat > /root/backup/webserver.tar.gz"
```
当然也可以从 119.23.12.36 服务器上还原备份文件到本地系统中。

```
$ ssh root@39.106.14.66 "cat /root/backup/webserver.tar.gz" | tar -zxvp -f -
```
在本地系统中，使用 tar 命令进行文件拷贝操作。下面的命令，先将 /etc 目录下的内容打包，然后通过管道传输到当前目录的 backup 中。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

```
$ tar -cv -f - /etc | tar -xv -f - -C ./backup
```

其中第一个 `-` 代表 standard output 输出文件，第二个 `-` 代表 standard input 输入文件，我们可以把 - 想象成内存中的一个设备（缓冲区）。  


参考：
https://www.cyberciti.biz/faq/howto-use-tar-command-through-network-over-ssh-session/