---
title: Linux sed总结
date: 2018-06-10 16:54:10
tags: Linux
---

sed是stream editor（流式编辑器）的缩写，它可以对文本流、指定文件集或标准输入进行文本编辑。

## 命令格式

sed [参数] '命令' 文本

## 命令功能

sed是一个强大的文本过滤工具。使用sed可以从文件或字符串中抽取所需信息。
sed命令总是以单个字母开头。
sed多数命令允许在前面加个地址。该地址用于指定输入流的哪一行被编辑，如果省略，默认是对所有行都进行编辑。


## 实用命令















sed '1d' fairy
sed '$d' fairy
sed '/say/d' fairy
 sed 's/say/SAY/' fairy
sed 's/\?//' fairy
sed 's/\ba\b/A/g' fairy
sed 's/\ba\b/A/gw sed.out' fairy
sed '/answered./r sedex.txt' fairy
sed '/.a.*/q' fairy