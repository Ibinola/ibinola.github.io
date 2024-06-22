<!-- ---
title: 'Linked Lists In Python'
description: 'linked lists data structure in python'
pubDate: 'June 19, 2024'
draft: true
---

Linked lists are collections of nodes that form a linear sequence. Unlike arrays, which are stored in a contiguous block of memory, linked lists allow data to be scattered across different memory locations.

An advantage of linked lists over arrays is their efficiency in insertions and deletions. In linked lists, these operations take constant time, `O(1)` whereas in arrays, inserting or deleting particularly not at the end, can be costly in terms of time complexity due to the need to shift elements.

Let's walk through what makes up a linked list: `Nodes`. Each node contains two attributes; the data it stores and a reference to a next node in the sequence. Can be visualized as seen below

![linked-list-with-head-and-tail](/public/linked-list.png)

The first and last nodes are called `head` and `tail` of the list. These are members of a linked list. In order to get to the tail, we traverse through the list from the `head` node to the next using each node's next or pointer which is a reference to another node.

We can implement a Node by using a class

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
```

When we create an instance of our class like this:

```python
first_node = Node(1)
```

It creates an object with properties `value` and `next`. The `value` is whatever was passed(a number, a string, any data type essentially) and a `next` which initially points to nothing.  

```python
{
    value: 1, 
    next: None
}
```
Let's create another instance of the `Node` class and use the first node's `next` property to point to the new node we will create to see how this works:

```python
first_node.next = Node(2) 
```

This creates another `Node` object, and we update our first node's `next` property to reference the newly created object:

![alt text](/public/two-nodes.png)

While we could keep doing this to create separate `Nodes`, it becomes inefficient in the long run. So instead, we create another class, a Linked List class which streamlines how we work with nodes and provides methods to simplify node operations:

```python
class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.length = 0
```

We save references to point to the head and tail and also keep track of the length of the list.

### Operations

Some operations that we will implement on our list are:
- `addFirst(e):`  Add item to the front of the list
- `addLast(e):` Add item to the back of the list
- `addAtPosition(n, e):` Add item at specific position n in the list
- `removeFirst():` Remove item from front of the list
- `removeLast():` Remove item at the end of the list
- `removeAtPosition(n):` Remove item at specific position n in the list
- `getSize():` Return the size of the list

<b>`addFirst(e)`</b>

```python
    def addFirst(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        
        self.length+=1
```
In `addFirst`, we create a new node and set it as the head of the list. If the list was empty, we also set it as the tail. The Time Complexity for this is `O(1)`. Since the time to create new node + time to change head reference are both `O1`.

<b>`addLast(e)`</b>

```python
    def addLast(self, data):
        new_node = Node(data)
        self.tail.next = new_node
        self.tail = new_node
        self.length += 1
```
In `addLast`, we create a new node and point the `tail` next's pointer to the new node and the tail to the node The Time Complexity for this is `O(1)`. Since the time to create new node + time to change tail references are both `O1`.

<b>`addAtPosition(n, e):`</b>

```python
    def addAtPosition(self, index, data):
        new_node = Node(data)
        current_node = self.head
        current_index = 0
        
        if current_index == index:
            new_node.next = self.head
            self.head = new_node
            return 

        while current_index < index - 1:
            current_node = current_node.next
            current_index += 1

        new_node.next = current_node.next
        current_node.next = new_node
```
In `addAtPosition`, we create a new node and initialize a current_index variable to keep track of our index position during iteration since linked list don't have built-in indexes, also a current_node to know the position of our current node. the `tail` next's pointer to the new node and the tail to the node The Time Complexity for this is `O(1)`. Since the time to create new node + time to change tail references are both `O1`. -->