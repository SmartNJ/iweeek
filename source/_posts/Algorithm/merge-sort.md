---
title: 深入浅出之归并排序
date: 2018-05-11 13:39:41
tags: Algorithm
---

二叉树基础知识：
高度是：对于任意节点 n, n 的高度为从 n 到一片树叶的最长路径长，所有树叶的高度为 0.
深度是：对于任意节点 n, n 的深度从根到 n 的唯一路径长，根的深度为 0.

## 算法定义

归并是指将两个有序的数组归并成一个更大的有序数组，根据这个简单的操作，人们很快就发明了一种简单的递归排序算法，即归并排序。

思路：**要将一个数组排序，可以先（递归地）将它分成两半分别排序，然后再将结果归并起来。**

分治思想：**我们将一个大问题分割成小问题分别解决，然后用所有的小问题的答案来解决整个大问题。**

归并排序最突出的特点就是，**它能够保证将任意长度为 N 的数组排序所需时间和 NlogN 成正比，它的主要缺点则是它所需的额外空间和 N 成正比。**



![](http://p748dqat4.bkt.clouddn.com/Mergesort%20overview.png)

<!-- more -->

## 原地归并的抽象方法 (Abstract in-place merge)

**原地归并**（in-place）是指将数组的前半部分排序，再将后半部分排序，在数组中移动元素而不需要额外的空间。也就是 **merge(a, lo, mid, hi)**，它会将子数组 **a[lo..mid]** 和 **a[mid+1, hi]** 归并成一个有序的数组并将结果存放在 **a[lo..hi]** 中。下面的代码实现了这种归并，它将所有的元素复制到一个辅助数组中，再把归并的结果放回原数组中。


``` java
/**
 * 原地归并的抽象方法
 */
public static void merge(Comparable[] a, int lo, int mid, int hi) {
    int i = lo, j = mid + 1; // 将 a[lo..mid] 和 a[mid+1..hi]归并
    
    for (int k = lo; k <= hi; k++) { // 将 a[lo..hi] 复制到 aux[lo..hi]
        aux[k] = a[k];
    }
    for(int k = lo; k <= hi; k++) { // 归并回 a[lo..hi]
        if      (i > mid)               a[k] = aux[j++];
        else if (j > hi)                a[k] = aux[i++];
        else if (less(aux[j], aux[i]))  a[k] = aux[j++]; // for 循环最多访问 2N + 2N 次数组
        else                            a[k] = aux[i++];
    }
}
```

![](http://p748dqat4.bkt.clouddn.com/Abstract%20in-place%20merge%20trace.png)

## 自顶向下——递归法 (Top-down mergesort)



``` java
        /**
         * 自顶向下的归并排序：分治思想
         * 要对子数组 a[lo..hi] 进行排序，先将它分为 a[lo..mid] 和 a[mid+1..hi] 两部分，
         * 分别通过递归调用将他们单独排序，最后将有序的子数组归并为最终的排序结果
         */
        private static void sort(Comparable[] a, int lo, int hi) {
            // 将数组 a[lo..hi] 排序
            if (hi <= lo) return;
            int mid = lo + (hi - lo) / 2;
            sort(a, lo, mid);
            sort(a, mid + 1, hi);
            merge(a, lo, mid, hi); // 最多 6N 次访问数组
        }
```



![](http://p748dqat4.bkt.clouddn.com/Trace%20of%20merge%20results%20for%20top-down%20mergesort.png)

假设这棵树有 n 层，对于 0 到 n-1 之间的任意 k，自顶向下的第 k 层有 2^k 个子数组，每个数组的长度为 2^(n-k) ，归并最多需要 2^(n-k) 次比较。因此每层的比较次数为 2^k * 2^(n-k) = 2^n，n 层总共 n*2^n = NlgN。

![](http://p748dqat4.bkt.clouddn.com/Mergesort%20sybarray%20dependence%20tree%20for%20N%20=%2016.png)

> 对于长度为 N 的任意数组，自顶向下的归并排序最多需要访问数组 6NlgN 次。
> 
> 每次归并排序最多需要访问数组 6N 次，其中 2N 用来复制，2N 次用来将排好序的元素移动回去，另外最多比较 2N 次。


优化：

- 对小规模子数组使用插入排序。因为插入排序非常简单，在小数组上很可能比归并排序更快。

- 数组有序则跳过 merge() 方法。
  如果 a[mid] 小于等于 a[mid+1]，那么就认为数组已经是有序的并跳过 merge() 方法。
- 不将元素复制到辅助数组。

## 自底向上——迭代法 (Bottom-up mergesort)


与自顶向下的分治（divide-and-conquer）思想不同，自底向上的思想是先归并那些微型数组，然后再成对归并得到的子数组，如此这般，直到我们将整个数组归并在一起。这种方法比标准递归方法所需要的代码量更少。假设数组的大小不是 N = 2^k+n，如果其中 n 为 0 ，那么最后一个子数组的大小就等于 sz，不然就会比 sz 小。

``` java
public static void sort(Comparable[] a) {
    int N = a.length;
    aux = new Comparable[N];
    // 最后一个子数组的大小只有在数组大小是 sz 的偶数倍的时候才会等于 sz，否则会比 sz 小
    for (int sz = 1; sz < N; sz = sz + sz) { // sz 子数组大小
        for (int lo = 0; lo < N - sz; lo += sz + sz) { // lo: 子数组索引
        	merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1));
        }
    }
}
```

![](http://p748dqat4.bkt.clouddn.com/Visual%20trace%20of%20bottom-up%20mergesort.png)

![](http://p748dqat4.bkt.clouddn.com/Trace%20of%20merge%20results%20for%20bottom-up%20mergesort.png)


> 
> 设有两个有序数组 arr1 与 arr2，数组长度分别为 m 与 n， 要合并成一个长度位 m+n 的有序数组 arr3，arr3 的长度即 N。
> 
> 最差情况下：比较次数为 m+n-1
> 将 arr1 和 arr2 中的数组两两比较，最后一次比较是两个数组中的最后一个数进行比较。相当于需要比较 N 次。
> 
> 最好情况下：比较次数为 min{m, n}
> 假设 arr1 中的每个数都比 arr2 中的小，那么比较的次数就是 arr1 的数组长度。相当于 N/2。
> 
> 对于长度为 N 的任意数组，自底向上的归并排序需要 1/2NlgN 至 NlgN 次比较。自多访问数组 6NlgN 次。
> 
> 因为处理一个数组的遍数正好是 ⎡lgN⎤（即 2^n ≤ N < 2^(n+1) 中的 n），每一遍会访问数组 6N 次，比较次数在 N/2 和 N 之间。



