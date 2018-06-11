---
title: Linux ls总结
date: 2018-06-03 16:37:59
tags: Linux
---

在Linux当中，ls指令可以说是最常被用到的，它用来显示文件或者目录的相关信息。不过，它并没有显示全部的信息，默认显示的只有非隐藏文件名、以文件名进行排序以及文件名代表的颜色显示而已。

如果想要加入其它的显示信息，那么可以加入一些有用的选项来丰富显示数据内容。

<!-- more -->

选项与参数：

```
-a：列出任何以.开头的文件（常用）
-A：列出除.与..之外的任何文件。
-c：默认以创建时间（最近修改时间）排序，最新的排在前面；如果与-l搭配使用，那么会以文件名排序；如果与-lt搭配，会显示创建时间（最近修改时间），根据时间排序。
-d：仅列出目录本身，而不是列出目录内的文件数据（常用）
-f：不排序，与启用-aU，不启用-ls --color效果一样。
-F：根据文件、目录等信息，给与附加数据结构，例如
	*：代表可执行文件；/：代表目录；=：代表socket文件；|：代表FIFO文件；
-g：像-l，但不列出拥有者。
-G：在-l下，不列出组名字。
-h：以人类可读的形式，打印文件大小，例如1K、234M、2G等等。
-i：打印inode信息。
-l：使用长数据串格式。
-r：排序时反转列表。
-R：递归列出子目录。
-s：列出每个文件分配的blocks大小。
-S：根据文件大小排序，最大的列在前面。
-t：根据最近修改时间排序，最新的列在前面。
-U：不排序，按照目录顺序列出所有文件。
--author：在-l下，打印出作者的信息。
--color=never：不根据文件特性显示颜色。
--color=always：显示颜色。
--color=auto：系统自动判断是否显示颜色。
--full-time：以完整时间模式（包括年、月、日、时、分）输出。
--time={atime,ctime}：输出access时间或改变权限属性时间（ctime），而不是内容变更时间（modification time）。
```


### 示例：查看详细信息
描述：-l显示文件或者目录的大小，修改日期和时间，文件或者文件夹的名字和拥有者，以及它的权限信息。

```
# ls -l
total 32428
-rw-r--r-- 1 root root 2123308 Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root 2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root 1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root 4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root 1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root 5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root 8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root 7766016 Jun  2 21:26 brooke-lark-275181.jpg
```

### 示例：查看所有文件的详细信息
描述：将当前主文件夹下的所有文件列出来（含隐藏文件），并显示该文件的详细信息。

``` shell
# ls -al ~
total 56
dr-xr-x---.  6 root root 4096 Sep  5  2017 .
dr-xr-xr-x. 18 root root 4096 Jun  2 20:46 ..
-rw-------   1 root root 7280 Jun  3 14:08 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-r--r--.  1 root root  176 Dec 29  2013 .bashrc
drwx------   3 root root 4096 Aug 18  2017 .cache
-rw-r--r--.  1 root root  100 Dec 29  2013 .cshrc
drwxr-xr-x   2 root root 4096 Aug 23  2017 .oracle_jre_usage
drwxr-xr-x   2 root root 4096 Aug 18  2017 .pip
-rw-r--r--   1 root root   64 Aug 18  2017 .pydistutils.cfg
drwx------   2 root root 4096 Sep 11  2017 .ssh
-rw-r--r--.  1 root root  129 Dec 29  2013 .tcshrc
```
以.开头的文件是隐藏文件，（.）（..）分别代表当前目录和上一级目录，目录的颜色是以蓝色显示的。

第一栏drwxr-xr-x代表文件的类型和权限，一共十个字符。第一个字符代表这个文件是“目录、文件或链接文件等等”。接下来的字符中以三个为一组，均为rwx三个参数的组合。[r]代表可读、[w]代表可写、[x]代表可执行，如果没有权限，则会出现减号[-]。第一组为文件拥有者可具备的权限，第二个为加入此群组之账号的权限，第三组为非本人且没有加入本群组之其他账号的权限。
第二栏表示有多少文件名链接到此节点（i-node）。
第三栏表示这个文件（或目录）的拥有者账号。
第四栏表示这个文件的所属群组。
第五栏为这个文件的容量大小，默认单位为Bytes。
第六栏位这个文件的创建日期或是最近修改的日期。
第七栏为这个文件的文件名。

### 示例：以人类可阅读的格式列出文件信息
描述：-h参数会将文件大小变为K，M，G等人类可阅读的格式。

```
# ls -lh
total 32M
-rw-r--r-- 1 root root 2.1M Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root 2.1M Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root 1.6M Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root 3.9M Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root 1.1M Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root 5.6M Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root 8.1M Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root 7.5M Jun  2 21:26 brooke-lark-275181.jpg
```

### 示例：反转显示结果。
描述：-r参数将默认的显示结构进行倒序显示。

```
# ls -rl
total 32428
-rw-r--r-- 1 root root 7766016 Jun  2 21:26 brooke-lark-275181.jpg
-rw-r--r-- 1 root root 8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root 5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root 1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root 4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root 1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root 2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root 2123308 Jun  2 21:26 adrian-infernus-281832.jpg
```

### 示例：按照修改时间的从远到近顺序排列
描述：-t参数将按照时间从近到远进行排序，-r参数将结果反转。

```
# ls -ltr
total 32428
-rw-r--r-- 1 root root 2123308 Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root 2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root 1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root 4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root 1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root 5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root 8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root 7766016 Jun  2 21:26 brooke-lark-275181.jpg
```


### 示例：按照文件的大小排列
描述：-S参数按照文件的大小进行排序。

```
# ls -lS
total 32428
-rw-r--r-- 1 root root 8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root 7766016 Jun  2 21:26 brooke-lark-275181.jpg
-rw-r--r-- 1 root root 5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root 4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root 2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root 2123308 Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root 1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root 1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
```



### 示例：列出不同的日期格式
描述：打印出文件，并以自定义的文件修改日期格式进行显示。

```
# ls -l --time-style=[STYLE]              
OR
# ls --full-time ~
```

[STYLE]的选项如下：
```
# ls -l --time-style=full-iso
# ls -l --time-style=long-iso
# ls -l --time-style=iso
# ls -l --time-style=locale
# ls -l --time-style=+%H:%M:%S:%D
```

```
# ls -l --time-style=full-iso
-rw-r--r-- 1 root root 2123308 2018-06-02 21:26:29.160954097 +0800 adrian-infernus-281832.jpg
# ls -l --time-style=long-iso
-rw-r--r-- 1 root root 2123308 2018-06-02 21:26 adrian-infernus-281832.jpg
# ls -l --time-style=iso
-rw-r--r-- 1 root root 2123308 06-02 21:26 adrian-infernus-281832.jpg
# ls -l --time-style=locale
-rw-r--r-- 1 root root 2123308 Jun  2 21:26 adrian-infernus-281832.jpg
# ls -l --time-style=+%H:%M:%S:%D
-rw-r--r-- 1 root root 2123308 21:26:29:06/02/18 adrian-infernus-281832.jpg
# ls --full-time ./
-rw-r--r-- 1 root root 2123308 2018-06-02 21:26:29.160954097 +0800 adrian-infernus-281832.jpg
```



### 示例：根据不同的规则进行排序。
描述：--sort根据不同的规则进行排序。

```
# ls --sort=extension(-X)
# ls --sort=size(-S)
# ls --sort=time(-t)
# ls --sort=version(-v)
# ls --sort=none(-U)
```

```
# ls -l --sort=size
total 194000
-rw-r--r-- 1 root root 10444800 Jun  2 22:21 command-18-06-02.tar
-rw-r--r-- 1 root root  9648754 Jun  2 23:00 MyImage.tar.bz2.partac
-rw-r--r-- 1 root root  9517889 Apr  4 04:19 apache-tomcat-9.0.7.tar.gz
-rw-r--r-- 1 root root   909077 Jun  1  2016 nginx-1.10.1.tar.gz
drwxr-xr-x 3 root root     4096 Jun  2 22:03 home
drwxr-xr-x 2 root root     4096 Jun  2 22:50 images
drwxr-xr-x 3 root root     4096 Jun  2 21:43 public images
-rw-r--r-- 1 root root        5 Jun  2 22:15 xyz.txt
```

```
# ls --sort=extension
image.tar.gz                  aleks-dahlberg-274646.jpg   ben-white-138743.jpg       abc.txt
adrian-infernus-281832.jpg    arkady-lifshits-117993.jpg  brenda-godinez-228181.jpg
alejandro-gonzalez-17189.jpg  artur-rutkowski-97622.jpg   brooke-lark-275181.jpg
```


### 示例：以各种格式输出目录的内容。
描述：以各种格式输出目录的内容，例如逗号，水平、垂直分隔等等。

- across
- comma
- horizontal
- long
- single-column
- verbose
- vertical

```
# ls –-format=across .
abc.txt                    adrian-infernus-281832.jpg  alejandro-gonzalez-17189.jpg
aleks-dahlberg-274646.jpg  arkady-lifshits-117993.jpg  artur-rutkowski-97622.jpg
ben-white-138743.jpg       brenda-godinez-228181.jpg   brooke-lark-275181.jpg
image.tar.gz

# ls --format=comma
abc.txt, adrian-infernus-281832.jpg, alejandro-gonzalez-17189.jpg,
aleks-dahlberg-274646.jpg, arkady-lifshits-117993.jpg, artur-rutkowski-97622.jpg,
ben-white-138743.jpg, brenda-godinez-228181.jpg, brooke-lark-275181.jpg, image.tar.gz

# ls --format=horizontal
abc.txt                    adrian-infernus-281832.jpg  alejandro-gonzalez-17189.jpg
aleks-dahlberg-274646.jpg  arkady-lifshits-117993.jpg  artur-rutkowski-97622.jpg
ben-white-138743.jpg       brenda-godinez-228181.jpg   brooke-lark-275181.jpg
image.tar.gz

# ls --format=long
total 63528
-rw-r--r-- 1 root root        6 Jun  2 22:37 abc.txt
-rw-r--r-- 1 root root  2123308 Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root  2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root  1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root  4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root  1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root  5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root  8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root  7766016 Jun  2 21:26 brooke-lark-275181.jpg
-rw-r--r-- 1 root root 31844978 Jun  3 21:42 image.tar.gz

# ls --format=single-column
abc.txt
adrian-infernus-281832.jpg
alejandro-gonzalez-17189.jpg
aleks-dahlberg-274646.jpg
arkady-lifshits-117993.jpg
artur-rutkowski-97622.jpg
ben-white-138743.jpg
brenda-godinez-228181.jpg
brooke-lark-275181.jpg
image.tar.gz

# ls --format=verbose
total 63528
-rw-r--r-- 1 root root        6 Jun  2 22:37 abc.txt
-rw-r--r-- 1 root root  2123308 Jun  2 21:26 adrian-infernus-281832.jpg
-rw-r--r-- 1 root root  2176861 Jun  2 21:26 alejandro-gonzalez-17189.jpg
-rw-r--r-- 1 root root  1640699 Jun  2 21:26 aleks-dahlberg-274646.jpg
-rw-r--r-- 1 root root  4078520 Jun  2 21:26 arkady-lifshits-117993.jpg
-rw-r--r-- 1 root root  1131986 Jun  2 21:26 artur-rutkowski-97622.jpg
-rw-r--r-- 1 root root  5819220 Jun  2 21:26 ben-white-138743.jpg
-rw-r--r-- 1 root root  8452524 Jun  2 21:26 brenda-godinez-228181.jpg
-rw-r--r-- 1 root root  7766016 Jun  2 21:26 brooke-lark-275181.jpg
-rw-r--r-- 1 root root 31844978 Jun  3 21:42 image.tar.gz

# ls --format=vertical
abc.txt                       arkady-lifshits-117993.jpg  brooke-lark-275181.jpg
adrian-infernus-281832.jpg    artur-rutkowski-97622.jpg   image.tar.gz
alejandro-gonzalez-17189.jpg  ben-white-138743.jpg
aleks-dahlberg-274646.jpg     brenda-godinez-228181.jpg
```



### 示例：列出文件的同时，不显示颜色。
描述：文件名末显示出该文件名代表的类型。

```
# ls -alF --color=never ~
total 56
dr-xr-x---.  6 root root 4096 Sep  5  2017 ./
dr-xr-xr-x. 18 root root 4096 Jun  2 20:46 ../
-rw-------   1 root root 7280 Jun  3 14:08 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-r--r--.  1 root root  176 Dec 29  2013 .bashrc
drwx------   3 root root 4096 Aug 18  2017 .cache/
-rw-r--r--.  1 root root  100 Dec 29  2013 .cshrc
drwxr-xr-x   2 root root 4096 Aug 23  2017 .oracle_jre_usage/
drwxr-xr-x   2 root root 4096 Aug 18  2017 .pip/
-rw-r--r--   1 root root   64 Aug 18  2017 .pydistutils.cfg
drwx------   2 root root 4096 Sep 11  2017 .ssh/
-rw-r--r--.  1 root root  129 Dec 29  2013 .tcshrc
```



       -c     with -lt: sort by, and show, ctime (time of last modification
              of file status information); with -l: show ctime and sort by
              name; otherwise: sort by ctime, newest first
              
              with -lt: sort by, and show, access time; with -l: show access
              time and sort by name; otherwise: sort by access time, newest
              first
    
    	-g     like -l, but do not list owner


       -G, --no-group
              in a long listing, don't print group names
              
       --si   likewise, but use powers of 1000 not 1024




参考：

https://www.tecmint.com/15-basic-ls-command-examples-in-linux/

https://www.tecmint.com/linux-ls-command-tricks/

