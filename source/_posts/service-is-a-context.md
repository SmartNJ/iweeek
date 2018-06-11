---
title: android 服务记录
date: 2018-05-04 16:16:18
tags: Android
---

### 启动服务
1、主线程。不能做耗时操作。

2、开启服务两种方式，一种是startService，另一种是bindService。
startService开启服务后，服务会一直在后台运行，即使Activity退出也不会停止。
bindService与Activity绑定后，可以与Activity进行数据交互，如果不在同一进程中，可以使用进程间通信。（IPC）

<!-- more -->

3、 如果一定要做耗时操作，那么就在 Service 里开启一个子线程去做耗时操作。
因为Activity的生命可见性比Service短。Activity被销毁了，Service可以继续存活，所以可以继续保持对子线程的引用。

4、onStartCommand会在每次调用startService时执行一次，而onCreate则只会执行一次。
多次开启服务，只要调用过一次stopService或者stopSelf就可以停止服务。

5、特别的，启动服务一定要是explicit Intent。

6、使用Messenger发送消息最好是在点击事件里，在生命周期方法中调用可能出现没有发送成功的问题。

### 绑定服务

1、多个客户端可以同时绑定同一个服务，但只能绑定一次。系统只会在第一个客户来绑定的时候调用onBind()方法去生成IBinder对象，系统将会分发这个相同的IBinder对象去给其他来绑定这个服务的客户端，只调用onBind()方法。
如果重写了onStartCommand方法，也就是说 Service 被 started 和 bound 之后，当所有客户端被unBind之后，也不会销毁服务，我们要明确地调用StopService()和StopSelf()，一旦调用这两个方法，那么即使还有客户端连接着也会被断开。

因此started和bound可以阻止系统销毁Service。

2、Android中绑定服务有几种方式。

AIDL和Messenger。 Messenger方式，在同一时刻只有一个消息可以得到执行。Messenger其实就是一个Handler，

AIDL用在不同的应用中，而且可以同时执行多个消息。

注意： 只有Activity、Service、 Content Provider 可以绑定服务，Broadcast Receiver是不能绑定服务的。


3、音乐播放器就是一个既使用started又使用bound的例子。

4、如果想要在Activity可见的时候与Service进行交互，一般在onStart里绑定服务，在 onStop 里停止服务。
尽量不要在onResume和onPause里进行绑定和解绑服务。

注意：如果重写了onStartCommand方法，就相当于被 started 和 bound了。

5、在Android 5.0 之后，如果使用implicit Intent来bindService会抛出异常。所以不要为你的service声明Intent filter，不要使用implicit intent。


References：
- http://www.truiton.com/2015/01/android-bind-service-using-messenger/
- https://developer.android.com/guide/components/bound-services.html#Additional_Notes