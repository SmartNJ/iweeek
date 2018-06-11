---
title: java 二维数组
date: 2018-05-04 22:47:40
tags: java
---

## 一维数组

Java 的数组是通过方括号[]来定义和使用的，以下两者都可以使用：
```java
int[] a1;
int a1[]； // 符合 C/C++
```
<!-- more -->

编译器不允许指定数组的大小，现在拥有的只是对数组的一个引用（已经分配的空间），而且没给数组对象本身分配任何空间。
为了给数组创建相应的存储空间，必须写初始化一维数组，即初始化表达式。
```java
int[] a1 = {1, 2, 3, 4, 5};
int[] a2;
a2 = a1;
```

### 生成随机数量的数组元素(基本类型)
```java
Random rand = new Random(47);
int a[] = new int[rand.nextInt(20)];
```

### 生成随机数量的数组元素(非基本类型)
```java
Integer[] a = new Integer[rand.nextInt(20)]; // 这时执行 a[i] 是 null
```
因为是非基本类型，所以 a 只是一个引用数组，直到通过创建新的 Integer 对象（自动包装机制），并把对象赋值给引用，初始化进程才算结束。
```java
a[i] = rand.nextInt(500); 
```

## 二维数组
**二维数组，即数组的数组，二维数组的每一个元素都是一个一维数组。**

### 方式一：
数据类型[][] 数组名 = new 数据类型[二维数组的长度/包含以为数组的个数][每个一维数组的长度];
数据类型 数组名[][] = new 数据类型[n][m];
数据类型[] 数组名[] = new 数据类型[n][m];

int[][] arr = new int[3][5]; // 定义了一个基本类型整体的二维数组，包含 3 个一维数组，每个一维数组可以存储 5 个整数。
arr[0] // 第一个一维数组，下标为0
arr[1][3] // 获取第二行第四列上的元素


### 方式二：
数据类型[][] 数组名 = { {元素},{元素1， 元素2},…… };
``` java
int[][] a = {
	{1, 2, 3, },
	{4, 5, 6, },
};
Arrays.deepToString(); // 将多维数组转换为多个String
```

### 粗糙数组：
```java
int[][][] a = new int[rand.nextInt(10)][][];
for (int i = 0; i < a.length; i++) {
    a[i] = new int[rand.nextInt(8)][];
    for (int j = 0; j < a[i].length; j++) {
        a[i][j] = new int[rand.nextInt(5)];
    }
}
System.out.println(Arrays.deepToString(a)); // 对基本类型数组和对象数组都起作用

// Output: [[[0, 0, 0], [], [0]], [[0, 0], [0, 0, 0], [0], 
[0, 0, 0, 0], [0, 0, 0]], [[0], [0, 0, 0], [], [], [0]]]
```


## 二维数组的应用
二维数组的长度：数组名.length  
每个一维数组的长度：数组名[下标].length
二维数组的遍历——双重 for 循环
``` java
for(int i = 0; i < arr.length; i++){ //遍历二维数组，遍历出来的每一个元素是一个一维数组
	for(int j = 0; j < arr[i].length; j++){ //遍历对应位置上的一维数组
		System.out.println(arr[i][j]);
	}
}
```

### 二维数组的反转——头尾交换

### 杨辉三角
```java
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[][] arr = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    arr[i][j] = 1;
                } else {
                    arr[i][j] = arr[i - 1][j] + arr[i - 1][j - 1];
                }
                System.out.print(arr[i][j] + "\t");
            }
            System.out.println();
        }
```

### 二维数组中的查找

``` java
public static void main(String[] args) {
    int[][] a = {
            {1,2,8,9},
            {2,4,9,12},
            {4,7,10,13},
            {6,8,11,15},
    };
    System.out.println(Find(7, a));
}

public static boolean Find ( int target, int[][] array){

    boolean found = false;
    int rows = 0;
    int columns = 0;

    if (array.length != 0) {
        columns = array[0].length;
        rows = array.length;

        if (rows > 0 && columns > 0) {
            int row = rows - 1;
            int column = 0;

            while (row >= 0 && column < columns) {
                if (array[row][column] == target) {
                    found = true;
                    break;
                } else if (array[row][column] < target) {
                    column++;
                } else if (array[row][column] > target) {
                    row--;
                }
            }
        }
    }
    return found;
}

```