import { LRUCache } from "./src/LRUCache";

const sequence: number[] = [
  0, 3, 5, 2, 4, 9, 10, 15, 8, 7, 6, 6, 6, 5, 1, 2, 2, 4, 4, 6, 7, 8, 9, 11, 13,
  11, 14, 12, 1, 15, 7, 8, 12, 11, 9,
];

const cache = new LRUCache(5);
const { misses, pageFaultRate } = cache.run(sequence);
console.log("页面未命中的次数:", misses);
console.log("缺页率:", pageFaultRate);
