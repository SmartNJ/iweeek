---
title: 单例模式——双重检查
date: 2018-04-19 22:52:43
tags: [Java, 设计模式]
---

双重检查设计模式的一个推荐版本，Initialization_on_demand_holder。

<!-- more -->


``` java
public class Singleton {

    private Singleton(){}

    private static class LazyHolder {
        static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return LazyHolder.INSTANCE;
    }
}
```

Java语言规范（JLS）规定，在 Java虚拟机（JVM）内执行的初始化阶段，当 JVM 加载类 Singleton 时，类将进行初始化。在JVM没有确认 LazyHolder 必须要执行之前，静态类 LazyHolder不会被初始化。

静态类 LazyHolder 直到 Singleton#getInstance 静态方法被执行才会初始化，第一次的情况下，JVM 会加载并初始化LazyHolder类，所以它的内部静态字段 INSTANCE 会通过调用外部类的私有构造函数进行初始化。

在类的初始化阶段，JLS会保证顺序执行，也就是不会发生并发，因此这里不需要 synchronized。LazyHolder一旦顺序初始化完成一次之后，随后的所有并发调用都会返回相同的正确初始化后的 INSTANCE，不会有任何同步的开销。

这个模式，只有在能成功执行Singleton构造函数的前提下才能使用，一旦执行构造函数失败了，那么随后尝试初始化它的同一个类加载器就会抛出一个 NoClassDefFoundError 异常。

---------

References

- [IODH - wikipedia](https://en.wikipedia.org/wiki/Initialization_on_demand_holder_idiom)