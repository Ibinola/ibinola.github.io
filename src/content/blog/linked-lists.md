---
title: "Linked Lists in Python"
description: "Understanding binary search in Python"
pubDate: "March, 15, 2024"
published: false
---

![[Pasted image 20240308185927.png]]
**Quick overview of how LISTS compares to a LINKED LIST**

This is a simple list that can be turned into a linked list.

- First thing is linked list does not have indexes
- A list is contiguous in memory, but linked list, all nodes are spread in memory

![[Pasted image 20240308190048.png]]

- With a linked list, we have a variable called HEAD which points to the first node and a variable called TAIL, which points to the last item/node and a pointer that connects each node and the last pointer points to none

  ![[Pasted image 20240308190222.png]]

**LinkedLISTS BIG O**

- We are going to walkthrough every method that we're going to create for a linked list and the Big(O) for that method

- append() - to append a new node to end of the list O(1) 'why?'
- pop from the end - O(n)
- add an item to the front - O(1)
- remove from the front - O(1)
- adding somewhere in the middle of the list - O(n)
- removing from the middle of the list - O(n)
- lookup in a linked list - O(n)

![[Pasted image 20240308191407.png]]

Better for LISTS

- Popping at the end
- Lookup by Index

Better for Linked LISTS

- Popping from the first item
- Adding to the first item

Linked LISTS under the hood

- What is a node?
  [VALUE, NEXT] - make up a node, it's essentially a dictionary
  ![[Pasted image 20240308191728.png]]
  ![[Pasted image 20240308191742.png]]

![[Pasted image 20240308191900.png]]

![[Pasted image 20240308191913.png]]

![[Pasted image 20240309165330.png]]

- Create a class to create Nodes

```python
class Node:
	def __init__(self, value):
		self.value = value
		self.next = None
```

- Create a class to start creating a LL with methods(print, append)

```python

class LL:
	def __init__(self, value):
		node = Node(value)
		self.head = node
		self.tail = node
		self.length = 1

	def print():
		temp = self.head
		while temp is not None:
			print(temp.value)
			temp = temp.next

	def append(self, value):
		node = Node(value)
		# what if there are no nodes i.e self.head is None
		if self.head is None:
			self.head = node
			self.tail = node
		else:
			self.tail = node
			self.tail.next = node
		self.length+=1
		return True
```
