---
title: 深入浅出之快速排序
date: 2018-05-15 17:40:02
tags: Algorithm
---



快速排序是图灵奖得主 **C.R.A. Hoare** 于 1960 年提出的一种划分交换排序。它采用了一种分治的策略，通常称其为**分治法(Divide-and-ConquerMethod)**。

![](http://p748dqat4.bkt.clouddn.com/QuickSort/Tony_Hoare.jpg)


在计算机科学中，分而治之是基于多分支递归的算法设计范式。分治法算法通过递归地将问题分解成相同或相关类型的两个或更多个子问题，直到这些问题变得足够简单以直接解决。然后将子问题的解决方案结合起来，解决原始问题。

# 算法定义

---------

快速排序算法是一种基于交换的高效的排序算法，但它不是一个稳定的算法，意味着相关元素的顺序在排序后不被保留。它是一个原地排序算法，只需要额外很小的的内存空间。它和选择排序非常像，但它不会总选择最坏的分区。它采用了分治法的思想：**将一个数组分成两个子数组，将两部分独立地排序。** 


![](http://p748dqat4.bkt.clouddn.com/QuickSort/QuickSort%20Overview.png)


<!-- more -->
代码如下：

``` java
public static void sort(Comparable[] a) {
    StdRandom.shuffle(a); // 消除对输入的依赖
    sort(a, 0, a.length - 1);
}

public static void sort(Comparable[] a, int lo, int hi) {
    if (hi <= lo) return;
    int j = partition(a, lo, hi); // 处理数组，找到切分位置
    sort(a, lo, j-1); 
    sort(a, j+1, hi);
}
```
排序轨迹图

![](http://p748dqat4.bkt.clouddn.com/QuickSort/QuickSort.png)


# 如何切分

---------

1. 随意取 a[lo] 作为切分元素，即那个会被排定的元素。
2. 然后从数组的左端开始向右扫描直到找到一个大于等于它的元素，再从数组的右端开始向左扫描直到找到一个小于等于它的元素。这两个元素没有被排定，因此交换它们的位置。
3. 如此继续，我们就可以保证左指针 i 的左侧元素都不大于切分元素，右指针 j 的右侧元素都不小于切分元素。
4. 当两个指针相遇时，我们只需要将切分元素 a[lo] 和**左数组最右侧的元素 a[j]** 交换然后返回 j 即可。


``` java
/**
 * 找到切分位置，将 lo 位置的元素放到切分位置
 */
private static int partition(Comparable[] a, int lo, int hi) {
    int i = lo, j = hi + 1;
    Comparable v = a[lo]; // 切分元素
    while (true) {
        while (less(a[++i], v)) if (i == hi) break; // 如果一直没有找到比切分元素大的，那么 i 的自增就会因为等于 hi 而停止，就会退出最外层的循环，不进行交换元素。
        while (less(v, a[--j])) if (j == lo) break; // j == lo 
        if (i >= j) break;
        exch(a, i, j);
    }
    exch(a, lo, j); // 将 lo 位置的元素放到切分位置
    return j;
}
```
标准切分轨迹图

![](http://p748dqat4.bkt.clouddn.com/QuickSort/Partitioning%20trace.png)

需要注意的几个点：
1. 原地切分，如果使用辅助数组，是很容易实现切分的，但将切分后的数组复制回去的开销也许会得不偿失。
2. 如果切分元素是数组中最小或者最大的元素，我们要小心不要让指针跑出数组的边界。
3. 保持随机性
4. 终止循环，正确地检测指针是否越界需要一点技巧，一个常见的错误是没有考虑到数组中可能包含和切分元素的值相同的其他元素。
5. 处理切分元素值有重复的情况。[**荷兰国旗问题**](http://www.cnblogs.com/gnuhpc/archive/2012/12/21/2828166.html)

# 性能特点与改进

---------

标准的快速排序切分方法的内循环会用一个递增的索引将数组元素和一个定值比较，几乎没有比这更短小的内循环了。归并排序和希尔排序都比快速排序慢，其原因就是它们还在内循环中移动数据。另外，快速排序的比较次数很少。

改进快速排序可以基于以下两点：
- 对于小数组，快速排序比插入排序慢。
- 因为递归，快速排序的 sort() 方法在小数组中也会调用自己。

可以将 sort() 中的语句：
if (hi <= lo) return;
替换成下面这条语句来对小数组使用插入排序。
if (hi <= lo + M) { Insertion.sort(a, lo, hi); return; }
参数 M 可以选择 5 ~ 15 之间的任意值。

# 三向切分法

---------

1. 将数组切分为三部分
2. 维护一个指针 lt ，使得 **a[lo..lt-1]** 都小于 v
3. 维护一个指针 gt，使得 **a[gt+1..hi]** 都大于 v
4. **a[lt..i-1]** 等于 v
5. **a[i..gt]** 中的元素都还未确定

图如下：

![](http://p748dqat4.bkt.clouddn.com/QuickSort/3-way%20partitioning%20overview.png)

代码如下：

``` java 
public static void sort(Comparable[] a, int lo, int hi) {
    if (hi <= lo) return;
    int lt = lo, i = lo + 1, gt = hi;
    Comparable v = a[lo];
    while (i <= gt) {
        int cmp = a[i].compareTo(v);
        if (cmp < 0) {
            exch(a, i++, lt++);
        } else if (cmp > 0) {
            exch(a, i, gt--);
        } else {
            i++;
        }
    } // 现在 a[lo..lt-1] < v = a[lt..gt] < a[gt+1..hi]成立
    sort(a, lo, lt - 1);
    sort(a, gt + 1, hi);
}
```

- a[i] 小于 v，将 a[lt] 和 a[i] 交换，将 lt 和 i 加一。
- a[i] 大于 v，将 a[gt] 和 a[i] 交换，将 gt 加一。
- a[i] 等于 v，将 i 加一。

这样会保证数组元素不变且缩小 gt-i 的值，循环才能结束。与切分元素不相等的元素都会被交换。

三项切分的轨迹图

![](http://p748dqat4.bkt.clouddn.com/QuickSort/3-way%20partitioning%20trace.png)


# 情况分析

---------

## 最坏情况
如果每次选择的切分元素正好是最小或最大的元素，或者在所有元素相等时，就会发生这种情况。这样每次递归调用都会处理一个比先前数组小一个的子数组，那么处理大小为 N 的数组就需要进行 **N-1** 次嵌套调用，这意味着需要 ***O(n<sup>2</sup>)***。 这与插入排序和选择排序是相同的关系式。

## 最好情况

把递归调用看做一棵二叉树，如果每次切分，都将数组分成两个几乎相等的部分，那么只需要 *log<sub>x</sub>n* 次递归调用就可以完成排序，这意味着调用树的深度为 *log<sub>2</sub>n*，在同一层次的两个递归调用中，不会处理到原来数列的相同部分，因此程序调用的每一层总共全部仅需要 *O(n)* 的时间。结果是这个算法仅需使用 ***O(nlogn)*** 时间。

## 平均情况

对于输入顺序所有排列情形的平均比较次数，可以借由解出这个递归关系式。

![](http://p748dqat4.bkt.clouddn.com/QuickSort/Average-case%20analysis.png)

也就是说，平均上快速排序所使用的比较次数，比最好情况大约坏 39%，它更接近最好情况，因此比其他算法更快更有优势。



## 对比

快速排序是原地排序，将长度为 N 的数组排序所需的时间和 NlgN 成正比，快速排序的内循环比大多数排序算法都要短小。


快速排序和归并排序是互补的：归并排序将数组分成两个子数组分别排序，并将有序的子数组归并以将整个数组排序；而快速排序将数组排序的方式则是当两个子数组都有序时，整个数组也就自然有序了。归并排序的递归调用发生在处理整个数组之前；快速排序的递归调用发生在处理整个数组之后。在归并排序中，一个数组被等分为两半；在快速排序中，切分（patition）的位置取决于数组的内容。

