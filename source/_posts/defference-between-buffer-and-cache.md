---
title: 缓冲区和缓存的区别
date: 2018-06-11 09:07:41
tags: [Linux, OS]
---

http://www.answers.com/Q/Difference_between_buffer_and_cache

Buffer


```
A data area, shared by hardware devices or program a process is called buffer. They are operated at different speeds or with different sets of priorities. The buffer allows each device or process to operate without holding up by the other. In order to a buffer to be effective, the size of the buffer needs to be considered by the buffer designer. Like a cache, a buffer is a "midpoint holding place" but does not exist so much to accelerate the speed of an activity as for supporting the coordination of separate activities. 
This term is used not only in programming but in hardware as well. In programming, buffering sometimes needs to screen data from its final intended place so that it can be edited or processed before moving to a regular file or database. 
```

Cache Memory

```
Cache memory is type of random access memory (RAM). Cache Memory can be accessed more quickly by the computer microprocessor than it can be accessed by regular RAM. Like microprocessor processes data, it looks first in the cache memory and if there, it finds the data from a previous reading of data, it does not need to do the more time consuming reading of data from larger memory. 

Sometimes Cache memory is described in levels of closeness and convenience to the microprocessor. An L1 cache is on the same chip like the microprocessors. 

In addition to cache memory, RAM itself is a cache memory for hard disk storage since all of RAM's contents come up to the hard disk initially when you turn on your computer and load the operating system that you are loading it into RAM and later when you start new applications and access new data. RAM also contains a special area called a disk cache that consists of the data most recently read in from the hard disk.
```