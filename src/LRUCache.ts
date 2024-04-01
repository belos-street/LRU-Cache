// 导入必要的数据结构库，例如这里假设我们有一个实现了双向链表的库
import { DoublyLinkedList, DoublyLinkedListNode } from "./DoublyLinkedList";

class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, DoublyLinkedListNode<K, V>>;
  private lruList: DoublyLinkedList<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.lruList = new DoublyLinkedList<K, V>();
  }

  private touch(node: DoublyLinkedListNode<K, V>) {
    // 将访问过的节点移动到链表头部
    this.lruList.moveToHead(node);
  }

  public get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (node) {
      this.touch(node);
      return node.value;
    }
    return undefined;
  }

  public set(key: K, value: V): void {
    let node = this.cache.get(key);

    if (node) {
      node.value = value;
      this.touch(node);
    } else {
      if (this.cache.size === this.capacity) {
        // 删除链表尾部（最近最少使用的）节点
        const leastUsedNode = this.lruList.removeTail();
        if (leastUsedNode) {
          this.cache.delete(leastUsedNode.key);
        }
      }

      // 创建新节点并添加到链表头部和缓存中
      node = new DoublyLinkedListNode(key, value);
      this.lruList.addToHead(node);
      this.cache.set(key, node);
    }
  }

  // 输入给定的虚页访问序列，模拟LRU页面调度
  public simulatePageAccess(pages: K[]): void {
    pages.forEach((page) => {
      const value = this.get(page);
      if (value === undefined) {
        console.log(`访问页面 ${page} 产生缺页，调入内存`);
        this.set(page, page); // 假设值就是页面编号本身
        // 显示内存页帧状态的变化
        this.displayMemoryStatus();
      } else {
        console.log(`访问页面 ${page} 已在内存中`);
        this.touch(this.cache.get(page)!);
        // 显示内存页帧状态的变化
        this.displayMemoryStatus();
      }
    });
  }

  // 仅用于演示目的，实现显示内存页帧状态的方法
  private displayMemoryStatus(): void {
    // 在此处打印或更新内存页帧的实际状态
    // 这里仅做示意，具体内容根据你的实现自行填充
    console.log("内存页帧状态更新...");
  }

  // 计算并输出页面未命中次数和缺页率
  public calculateMissRate(pages: K[]): void {
    let misses = 0;
    pages.forEach((page) => {
      if (!this.cache.has(page)) {
        misses++;
      }
    });

    const hitRate = (pages.length - misses) / pages.length;
    const missRate = 1 - hitRate;

    console.log(`页面未命中次数: ${misses}`);
    console.log(`缺页率: ${missRate * 100}%`);
  }
}

// 示例用法
const pageSequence: number[] = [
  0, 3, 5, 2, 4, 9, 10, 15, 8, 7, 6, 6, 6, 5, 1, 2, 2, 4, 4, 6, 7, 8, 9, 11, 13,
  11, 14, 12, 1, 15, 7, 8, 12, 11, 9,
];

const lruCache = new LRUCache<number, number>(5);
lruCache.simulatePageAccess(pageSequence);
lruCache.calculateMissRate(pageSequence);
