---
title: 荷兰国旗问题
date: 2018-05-15 21:47:54
tags: Algorithm
---

问题描述：现有n个红白蓝三种不同颜色的小球，乱序排列在一起，请通过两两交换任意两个球，使得从左至右，依次是一些红球、一些白球、一些蓝球。

分析：根据[三向切分快速排序](http://www.iweeek.com/2018/05/15/quick-sort/#%E4%B8%89%E5%90%91%E5%88%87%E5%88%86%E6%B3%95)中的 partition 的思路，将整个数组分成三个部分，对应三种颜色。维护三个指针，一个指针 lt ，使得 **a[lo..lt-1]** 都小于 v，维护一个指针 gt，使得 **a[gt+1..hi]** 都大于 v，**a[i..gt]** 中的元素都还未确定。

但是这个问题比较简单，数组的元素只有三种情况，只需要分别列出来。

代码如下：

``` java
public static void sort(int[] a) {
    sort(a, 0, a.length - 1);
}

public static void sort(int[] a, int lo, int hi) {
    int lt = lo, i = lo, gt = hi + 1;

    while (i < gt) { // 注意
        if (a[i] == 0) {
            exch(a, lt++, i++);
        } else if (a[i] == 1) {
            i++;
        } else if (a[i] == 2) {
            exch(a, --gt, i);
        }
    }
}
```