---
title: 从尾到头打印链表
date: 2018-05-05 17:18:02
tags: java
---

## 从尾到头打印链表

输入一个链表，从尾到头打印链表每个节点的值。

<!-- more -->

```java
/**
 * 运行时间：26ms
 * 占用内存：9320k
 * @param listNode
 * @return
 */
public ArrayList<Integer> printListFromTailToHead(ListNode listNode) {

    ArrayList<Integer> list = new ArrayList<Integer>();
    ListNode pNode = listNode;

    if (pNode != null) {
        if (listNode.next != null) {
            list.addAll(printListFromTailToHead(listNode.next));
        }
        list.add(listNode.val);
    }

    return list;
}

/**
 * 运行时间：20ms
 * 占用内存：8708k
 * @param listNode
 * @return
 */
public ArrayList<Integer> printListFromTailToHead2(ListNode listNode) {
    ArrayList<Integer> revLists = new ArrayList<Integer>();
    Stack<Integer> stack = new Stack<Integer>();

    while (listNode != null) {
        stack.push(listNode.val);
        listNode = listNode.next;
    }

    while (!stack.empty()) {
        revLists.add(stack.pop());
    }

    return revLists;
}

/**
 * 运行时间：30ms
 * 占用内存：9296k
 * @param listNode
 * @return
 */
public ArrayList<Integer> printListFromTailToHead1(ListNode listNode) {
    ArrayList<Integer> lists = new ArrayList<Integer>();
    ArrayList<Integer> revLists = new ArrayList<Integer>();

    while (listNode != null) {
        lists.add(listNode.val);
        listNode = listNode.next;
    }

    for (int i = lists.size() - 1; i >= 0; i--) {
        System.out.println(lists.get(i));
        revLists.add(lists.get(i));
    }

    return revLists;
}

```

``` java
class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}

```