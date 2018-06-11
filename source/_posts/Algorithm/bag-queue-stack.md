---
title: 背包，队列和栈问题
date: 2018-05-10 13:53:21
tags: 算法
---

### 问：早期的 Java 版本是不支持泛型的，也不是所有编程语言都支持泛型，有什么代替方案吗？

一种方案是构造一个 Object 的数组，每次使用 pop 的时候将得到的对象转换为所需的数据类型，但这种方式的问题在于类型不匹配错误只能在运行时发现。另一种方案就是泛型，能够在编译时发现错误。

<!-- more -->

### 问：为什么 Java 不允许泛型数组？

-------------
### 问：什么是公变数组（convariant array）和类型擦除（type erasure）？

   **数组的协变性**，如果类 Base 是类 Sub 的基类，那么 Base[] 就是 Sub[] 的基类，也就是在要求 Base[] 的地方安全可以传递或者赋予 Sub[]。
   泛型是不可变的（invariant），List<Base> 不会是 List<Sub> 的基类，更不会是它的子类。

``` java
   Object[] array = new String[10]; 
   array[0] = 10;  // 编译通过，运行时报 ArrayStoreException，在这步就不让赋值，免得后续取出值的时候再出错
   
   List<Object> list = new ArrayList<String>();   
   list.add(10);   // 编译不通过
```
​	**数组是具体化**（reified）的，而泛型在运行时是被擦除的（erasure）。

​	数组是在运行时才去判断数组元素的类型约束。

​	而泛型刚好相反，在运行时泛型的类型信息是会被擦除的，只有编译的时候才会对类型进行强化。

​	**泛型不是协变的**。

```Java
List<Integer> li = new ArrayList<Integer>();  
List<Number> ln = li; // illegal  
ln.add(new Float(3.1415));  // 如果上面这步允许通过，那么给 List<Number> 赋值 float 类型是理所应当的
```

如果 Ln 是 List<Number>类型，向其中添加 Float 类型安全合法，但是如果 List<Integer>能赋值给 List<Number> 的话，那么就破坏了定义在 li 中的类型安全承诺，因为它是一个整形列表。

-------------

### 问：List<?> 和 List<T> 的区别？

<T> 声明泛型类的类型参数。

``` java
class Fruit<T> {
    private List<T> item;
    public List<T> get() {return item;}
    public void set(List<T> t) {item = t;}
}
```

Fruit 类里有三个地方出现了List<T>：

1. 成员字段item的类型
2. get( )方法的返回值
3. set( )方法的参数

<T> 声明泛型方法。

``` java
public <T> List<T> reduce(List<T> items) {
    ... ...
}
```



<?> 使用泛型类或泛型方法。

``` java
public List<?> set(List<?> items) {
    List<?> list = items;
    return list;
}
```



List<?> 的各种坑

``` java
List<?> list = new ArrayList<String>();

list.add("hello");
list.add(123);

// argument mismatch; String cannot be converted to CAP#1
// argument mismatch; int cannot be converted to CAP#1
```

-------------

### 问：<? extends T> 和 <? super T> 的区别？

<? extends T> 是指“上界通配符（Upper Bounds Wildcards）”

<? super T> 是指“下界通配符（Lower Bounds Wildcards）”


**上界<? extends T>不能往里存，只能往外取**，因为不知道具体的子类类型是什么，所以不能往里存，但可以往外指定基类类型进行取。

``` java
Plate<Fruit> p=new Plate<Apple>(new Apple()); // ”装苹果的盘子“无法转换成”装水果的盘子“。
Plate<? extends Fruit> p = new Plate<Apple>(new Apple()); // 看到Plate<Apple>，标上了一个占位符： CAP#1，来表示捕获一个 Fruit 或 Fruit 的子类，具体是什么不知道，代号 CAP#1。编译器不知道往里面插入的 Apple 或者 Fruit 能不能和这个 CAP#1 匹配，所以都不允许。

// 不能存入任何元素
p.set(new Fruit());
p.set(new Apple());

Fruit newFruit1 = p.get();
Object newFruit2 = p.get();
Apple newFruit3 = p.get(); // Error
```



**下界<? super T>不影响往里存，但往外取只能放在 Object 对象里**，因为类型是向上的基类，所以不影响具体子类往里存，但会因具体的子类的信息在存为基类类型的时候被擦除，所以取出来的时候只能是 Object 类型。

``` Java
Plate<? super Fruit> p = new Plate<Fruit>(new Fruit()); // 下界实际上是放松了类型控制，既然元素是 Fruit 的基类，那么往里存粒度比 Fruit 小的都可以。

// 正常存入元素
p.set(new Fruit());
p.set(new Apple());

Fruit newFruit1 = p.get(); // Error
Apple newFruit3 = p.get(); // Error
Object newFruit2 = p.get(); // 只能放在 Object 里
```

-------------

### 问：**PECS（Producer Extends Consumer Super）**原则

1. **频繁往外读取内容的，适合用上界Extends。**
2. **经常往里插入的，适合用下界Super。**



### 问：为什么将 Node 设置为嵌套类？为什么使用private？

  私有嵌套类的是只有包含它的类能够直接访问它的实例变量。另外，非静态的嵌套类也被称为内部类，因此从技术上来说 Node 类也是内部类。

### 问：当我输入 javac Stack.java 编译 java 文件的时候，会生成 Stack.class 和 Stack$Node.class ，第二个文件是做什么用的？

  第二个文件是内部类 Node 创建的，Java 的命名规则会使用 $ 分隔外部类和内部类。


### 问：Java 标准库有栈和队列吗？

  有，但是不推荐使用，因为内置的库 java.util.Stack 新增了几个一般不属于栈的方法，是典型的**宽接口**例子。

### 问：那么什么是宽接口呢？对应的是不是窄接口？

  **宽接口**通常能够让一个类功能强大，但有时容易失去真正的关注点从而破坏了”单一职责原则“。**窄接口**则比较容易确保对某一特定点的关注。

### 问：是否允许用例向栈或队列中添加空（null）元素？

  是允许的。

### 问：如果用例在迭代中调用 push() 或者 pop() ，Stack 的迭代器应该怎么办？

  作为一个快速出错的迭代器，它应该立即抛出一个 java.util.ConcurrentModificationException 异常。

### 问：我们能够用 foreach 循环访问数组吗？

  可以，尽管数组没有实现 Iterable 接口。

### 问：我们能够用 foreach 循环访问字符串吗？

  不行，String 没有实现 Iterable 接口。

  ​

  ​