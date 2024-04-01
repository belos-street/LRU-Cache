// 链表节点类
export class DoublyLinkedListNode<K, V> {
  key: K;
  value: V;
  prev: DoublyLinkedListNode<K, V> | null;
  next: DoublyLinkedListNode<K, V> | null;

  constructor(
    key: K,
    value: V,
    prev: DoublyLinkedListNode<K, V> | null = null,
    next: DoublyLinkedListNode<K, V> | null = null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
    this.key = key;
  }
}

// 双向链表类
export class DoublyLinkedList<K, V> {
  head: DoublyLinkedListNode<K, V> | null;
  tail: DoublyLinkedListNode<K, V> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 插入节点到头部
  insertAtHead(key: K, value: V) {
    const newNode = new DoublyLinkedListNode<K, V>(key, value);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    }
  }

  // 插入节点到尾部
  insertAtTail(key: K, value: V) {
    const newNode = new DoublyLinkedListNode<K, V>(key, value);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  // 删除节点
  deleteNode(nodeToRemove: DoublyLinkedListNode<K, V>) {
    if (!nodeToRemove.prev && !nodeToRemove.next) {
      // 处理只有一个节点的情况
      this.head = null;
      this.tail = null;
    } else if (!nodeToRemove.prev) {
      // 处理删除头节点的情况
      this.head = nodeToRemove.next;
      this.head!.prev = null;
    } else if (!nodeToRemove.next) {
      // 处理删除尾节点的情况
      this.tail = nodeToRemove.prev;
      this.tail.next = null;
    } else {
      // 处理中间节点的情况
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
  }

  // 根据key查找节点
  findToKey(key: K): DoublyLinkedListNode<K, V> | null {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  // 根据value查找节点
  findToValue(value: V): DoublyLinkedListNode<K, V> | null {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }
}
