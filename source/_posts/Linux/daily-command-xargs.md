---
title: Linux xargs总结
date: 2018-06-08 14:36:56
tags: Linux
---

xargs命令是给其他命令传递参数的一个过滤器，可以直接将一个程序的输出作为另一个程序的输入（例如文本过滤或模式搜索工具，如grep，sed，awk等）。

<!-- more -->

## 命令格式
`xargs [选项] [命令]`

## 命令功能
xargs是给其他命令传递参数的一个过滤器，也是组合多个命令的一个工具。它擅长将标准输入数据转换成命令行参数。xargs能够处理管道或者标准输入，并将其转换成特定命令的命令参数。xargs也可以将单行或多行文本输入转换为其他格式，例如多行变单行，单行变多行。xargs的默认命令是echo，空格是默认分隔符。这意味着通过管道传递给xargs的输入将会包含换行和空白，不过通过xargs的处理，换行和空白将被空格取代。xargs是构建单行命令的重要组件之一。


## 命令参数


- -0：表示以\0作为分隔符，一般与find结合使用。
- -a或--arg-file=<文件>：从文件中读入。
- -d或--delimiter=<分隔符>：自定义一个分隔符。
- -E：结束符，遇到-e指定的命令行参数，则只会将-e指定的命令行参数之前的参数传递给xargs后面的命令。
- -i或--replace=<替换的字符串>：将xargs接收到的每个名称赋给{}，用{}代替。
- -I：与-i选项相同，可以用其他字符代替{}，例如[]。
- -n或--max-args=<最大的参数数>：每次传递几个参数给后面的命令执行。
- -p：并不马上执行命令，而是先输出将要执行的完整的命令（包括命令以及传递给命令的命令行参数），询问是否执行。
- -r或--no-run-if-empty：当xargs的输入为空的时候则停止xargs，不再去执行。
- -s或--max-chars=<最大的字符数>：xargs后面那个命令的最大命令行字符数。
- -t或--verbose：表示先打印命令，然后再执行。
- -x或--exit：配合-s使用，退出。
- --help：显示帮助信息。
- --version：显示版本。


## 实用命令


**实例：1. 多行变单行**
描述：将alpha.txt内多行数据处理成单行。
命令：`cat alpha.txt | xargs`
输出：
alpha.txt内容：
![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-multiple-file.png)
经过xargs处理之后：
![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-multiple-to-single.png)

**实例：2. 传递字符串给xargs**
描述：执行cat命令。echo命令将"--help"字符串作为输出重定向给xargs作为输入，并将"--help"做成一个命令参数来运行cat命令。
命令：`echo '--help' | xargs cat`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-echo.png)


**实例：3. 显示执行的命令**
描述：-t选项在执行前先打印即将执行的命令。
命令：`echo '--help' | xargs -t cat`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-t.png)


**实例：4. 指定分隔符**
描述：将echo的输出重定向给xargs命令作为输入，xargs将以#为分隔符分隔输入的内容，最后将分隔好的参数全部一次性传给echo命令将其打印出来。-d选项可以自定义一个分隔符。
命令：`echo '12#34#56#78' | xargs -d '#' echo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-d.png)

下面多出的一行空白，是因为xargs默认是以空白作为分隔符，换行符也是默认空白符的一种，所以每一条字符串后面实际上是加了换行符。

**实例：5. 指定命令行参数个数**
描述：在上面例子的基础上，-n2表示xargs每次只传递2个参数给后面的echo命令。
命令：`echo '12#34#56#78' | xargs -n2 -d '#' echo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-n.png)

**实例：6. 执行命令前先提示**
描述：-p选项使xargs在执行其后面的命令之前先输出即将要执行的完整的命令（包括命令的命令行参数），询问是否执行，输入y才继续执行，否则不执行。
命令：`echo '12#34#56#78' | xargs -n2 -d '#' -p echo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-p.png)

**实例：7. 指定终止字符串**
描述：将字符串"56"作为终止字符串。注意-E只有在xargs不指定-d的时候有效。
命令：`echo '12 34 56 78' | xargs -E '56' echo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-E.png)

**实例：8. 结合find使用**
描述：find的结果是使用'\0'来分隔的。-0选项使用'\0'来分隔。当尝试用rm删除太多的文件的时候，可能会得到/bin/rm Argument list too long的错误，将下面命令中的echo替换为rm -f即可避免这个问题。
命令：`find . -name '*.txt' -print0 | xargs -d '\0' echo`
或者：`find . -name '*.txt' -print0 | xargs -0 echo`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-d-0.png)

**实例：9. 结合wc使用**
描述：统计当前目录下所有txt文件的行数。
命令：`find . -type f -name "*.txt" -print0 | xargs -0 wc -l`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-wc.png)


**实例：10. 测试属于哪类文件**
描述：查找当前目录下的每一个普通文件，并测试它们分别属于哪类文件。
命令：`find . -type f -print | xargs file`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-file.png)


**实例：11. 结合IO重定向使用**
描述：查找当前目录下以.txt结尾的文件，将名字重定向给xargs处理，并传给echo，echo将其作为输出流，写入到/tmp/txt.log文件中。
命令：`find . -name "*.txt" -print | xargs echo "" > /tmp/txt.log`


**实例：12. 结合chmod使用**
描述：在当前目录下找到所有用户具有读、写和执行权限的文件，并收回相应的写权限。
命令：`find . -perm -7 -print | xargs chmod o-w`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-chmod.png)


**实例：13. 结合grep使用**
描述：在当前目录的所有文件中搜索hello这个词。
命令：`find . -type f -print | xargs grep "hello"`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-grep.png)

**实例：14. 结合wget使用**
描述：一次性下载文件中的所有URL链接资源，每行一个URL链接。
命令：`cat url-list.txt | xargs wget -c`


**实例：15. 结合tar使用**
描述：查找所有的jpg文件，并且压缩它们。
命令：`find . -name "*.jpg" | xargs tar -czvf images.tar.gz`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-tar.png)


**实例：16. 结合cp使用**
描述：在当前目录中拷贝所有的图片文件至move目录中。
命令：`ls *.jpg | xargs -n1 -i cp {} move/`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-cp.png)



**实例：17. 指定命令最多的字符数**
描述：将xyz.txt文件的内容重定向给xargs，xargs限制echo命令的字符数最多为25个（s），如果超过则退出（x），-i选项表示将{}替换成xargs处理得到后的每一项参数，在这里是xyz.txt文件的中的每一行。
命令：`cat xyz.txt | xargs -i -x -s 25 echo "{}"`
输出：

xyz.txt文件内容：
![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-s-file.png)

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-s.png)


**实例：18. 替换{}指定其他代替字符**
描述：将当前目录下以.jpg结尾的文件移动到move目录中。-i选项默认的前面输出用{}代替，-I选项可以指定其他代替字符，如例子中的[]。
命令：`find . -name "*.jpg" | xargs -I [] mv [] move/`
输出：

![](http://pabfn7ecx.bkt.clouddn.com/xargs/xargs-I.png)





