---
title: android 进程和线程记录
date: 2018-05-04 16:43:56
tags: Android
---

### 进程 (Processes)
1. manifest文件中有四大组件activity、service、receiver、provider, application 的范围是所有组件。
2. Android:process可以指定当前组件运行在哪个处理器核心上。
3. Android系统会在内存低或者继续大量内存提供给其他应用的时候关闭一个进程。在决定哪个进程需要被关闭的时候，系统会权衡应用对于用户来说的相对重要性，比如前台和可见进程一般是不会被关闭的，只有不可见的服务和缓存进程可能被关闭。

<!-- more -->

### 线程 (Threads)
1. 一般而言，一个应用启动，系统会创建一个线程来执行这个程序，叫做main线程，也叫做UI线程（与android.widget和android.view包下的组件）。但这不是绝对的，主线程可能不是UI线程。
2. 系统所有的组件都运行在同一个进程中。比如，当用户触摸一个按钮的时候，UI线程为这个按钮轮流地（因为onTouch事件会持续进行）dispatch触摸事件，当手指离开按钮的时候为按钮设置pressed状态，并且发送一个invalidate的请求到事件队列中，然后UI线程出列这个请求并且通知这个widget，需要它进行重绘。

3. 如果UI线程因阻塞而超过5秒，就会出现“application not responding”（ANR）对话框。
Android单线程模型有两个简单的规则：
	1. 不要阻塞UI线程
	2. 不要在UI线程以外访问UI toolkit。

### 工作线程 (Work threads)
因为上述两个规则，Android也提供了几个帮助方法，这几个实现是线程安全的。同时也提供了两个帮助类。
1. Activity.runOnUiThread(Runnable)
2. View.post(Runnable)
3. View.postDelayed(Runnable, long)
帮助类
4. Handler （处理来自UI线程的message）
5. AsyncTask （继承它）


### 线程安全的方法
方法可能会被多于一个的线程调用。所以必须是线程安全的方法。
1. 例如，一个绑定服务，它可能在主线程中运行，方法将在调用者所在的线程执行。也有可能从其他线程运行（这些线程来自线程池），这些RPC方法就可能在其他线程中被调用。
2. 尽管ContentProvider和ContentResolver隐藏了进程间通信是如何管理的细节，但是ContentProvider的那些query(), insert(), delete(), update(), and getType()方法将会在ContentProvider的进程中执行，不是在UI线程。


### 进程间通信
Android提供了两种通信机制，分别是interprocesses communication(IPC)和remote procedure calls(RPCs)。

具体来说，一个方法在activity或者android的其他组件中被调用，但是却在另一个进程中被执行，然后将结果返回给调用者所在的进程。这需要分解这个方法调用，并且数据是在操作系统能理解的等级，把这些信息从本地进程和地址空间传输到远程的进程和地址空间，然后在远程重新组装和调用，返回的结果按相反的方向传输回去。

### AsyncTask
1. 它是一个介于Thread和Handler之间的帮助类，它不是通用的线程框架。

2. 一个异步任务中定义了computation任务，它跑在一个后台线程，并且将允许结果公布在UI线程上。它
它有3个generic类型，Params、Progress、Result，并且有4个步骤，onPreExecute、doInBackground、onProgressUpdate、onPostExecute。

3. AsyncTask最好是用来处理一些短时间的操作（几秒钟），如果是要长时间操作，强烈建议使用java.util.concurrent包下的 Executor, ThreadPoolExecutor 和 FutureTask。

``` java
 private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
     protected Long doInBackground(URL... urls) {
         int count = urls.length;
         long totalSize = 0;
         for (int i = 0; i < count; i++) {
             totalSize += Downloader.downloadFile(urls[i]);
             publishProgress((int) ((i / (float) count) * 100));
             // Escape early if cancel() is called
             if (isCancelled()) break;
         }
         return totalSize;
     }

     protected void onProgressUpdate(Integer... progress) {
         setProgressPercent(progress[0]);
     }

     protected void onPostExecute(Long result) {
         showDialog("Downloaded " + result + " bytes");
     }
 }
 
 ```
调用执行

``` java
 new DownloadFilesTask().execute(url1, url2, url3);
```

3个泛型参数的意义：
1. params，在执行前发送到 doInBackground 的参数，对应上面的url1, url2和url3。
2. Progress，任务执行的进度，对应上面的指定为Interger。
3. Result，doInBackground执行的结果。

大部分情况下，执行没有任何类型的异步任务，如下
``` java
 private class MyTask extends AsyncTask<Void, Void, Void> { ... }
```

### 4个步骤的意义：
1. onPreExecute，执行在UI线程，一般是前置设置，比如显示一个进度条。
2. doInBackground，在 onPreExecute 执行完立即被调用在后台线程，参数将传到这个方法，这一步必须返回执行结果，它将被传递到最后一步。在这一步中可以调用publishProgress(Progress)，每一次调用都会回调onProgressUpdate(Progress...)，除非它被取消执行了。
3. onProgressUpdate，当在 doInBackground 中调用 publishProgress 的时候被回调，但是回调的时刻是未知的，
4. onPostExecute，安全的访问UI线程，它将收到来自 doInBackground 递送(deliver)的结果。

### 取消异步任务
cancel，直接调用后会导致 isCancelled 返回 true，onCancelled 将会代替onPostExecute 的调用。为了确保异步任务是否被取消，应该在 doInBackground中周期性地检查 isCancelled，如果可以，使用循环。


### 线程规则
1. AsyncTask 必须在UI线程中加载(load)，这由JELLY_BEAN自动完成。
2. task 的实例必须在UI线程中创建。
3. execute(Params...) 必须在UI线程中调用。
4. 不要手动调用上述4个步骤的方法。
5. 这个 task 只能被执行一次，第二次执行会抛出异常。


### 内存可观测
AsyncTask 担保所有的回调都是同步的，以下2种情况在没有明确同步的情况下，是安全的。
1. 在 onPreExecute 或者构造器中设置成员，然后在 doInBackground 中使用它们。
2. 在 doInBackground 中设置成员，在 onProgressUpdate 和 onPostExecute 中使用它们。

