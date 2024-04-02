// 导入必要的数据结构库，例如这里假设我们有一个实现了双向链表的库
import { DoublyLinkedList, DoublyLinkedListNode } from "./DoublyLinkedList";

export class LRUCache {
  private capacity: number; // 缓存容量
  private map: Map<number, DoublyLinkedListNode<number>>; // 存储键值对的哈希表
  private list: DoublyLinkedList<number>; // 双向链表实现LRU队列
  public hits: number; //命中数

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.list = new DoublyLinkedList();
    this.hits = 0;
  }

  // 页面访问方法，模拟访问某虚页
  public access(pageNumber: number): void {
    if (this.map.has(pageNumber)) {
      // 如果页面已经在缓存中,说明命中了
      const node = this.map.get(pageNumber)!; // 获取对应节点
      this.list.remove(node); // 从链表中移除
      this.list.addToHead(node); // 将节点移到链表头部
      this.hits++; //命中数+1
    } else {
      // 如果页面不在缓存中
      if (this.list.size() >= this.capacity) {
        // 如果缓存已满
        const leastRecentlyUsedNode = this.list.tail!; // 获取最近最少使用的节点
        this.list.remove(leastRecentlyUsedNode); // 从链表中移除
        this.map.delete(leastRecentlyUsedNode.value); // 从哈希表中移除
      }

      const newNode = new DoublyLinkedListNode(pageNumber); // 创建新的节点
      this.map.set(pageNumber, newNode); // 添加到哈希表
      this.list.addToHead(newNode); // 添加到链表头部
    }
  }

  // 根据给定的虚页访问序列运行
  public simulatePageAccess(sequence: number[]): void {
    sequence.forEach((pageNumber) => {
      this.access(pageNumber);
      //console.log(this.list); // 输出每次访问后的内存页帧状态
    });
  }

  // 计算并返回页面未命中的次数和缺页率
  public getMissCountAndRate(sequence: number[]): {
    misses: number;
    pageFaultRate: string;
  } {
    const totalAccesses = sequence.length;
    const misses = totalAccesses - this.hits; //计算页面未命中次数
    const pageFaultRate = ((misses / totalAccesses) * 100).toFixed(2) + "%"; //计算缺页率
    return { misses, pageFaultRate };
  }

  // 根据提供的虚页访问序列运行并输出结果
  public run(sequence: number[]) {
    this.simulatePageAccess(sequence);
    return this.getMissCountAndRate(sequence);
  }
}
