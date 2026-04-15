---
title: insExchangeQueue
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: insExchangeQueue.ts
---

# insExchangeQueue

```ts
/** INS 交换串行队列，防止并发冲突 */

type QueueTask<T> = () => Promise<T>;

class SerialQueue {
  private queue: Array<{ task: QueueTask<unknown>; resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];
  private running = false;

  async add<T>(task: QueueTask<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task: task as QueueTask<unknown>, resolve: resolve as (v: unknown) => void, reject });
      this.process();
    });
  }

  private async process() {
    if (this.running) return;
    this.running = true;
    while (this.queue.length > 0) {
      const item = this.queue.shift()!;
      try {
        item.resolve(await item.task());
      } catch (e) {
        item.reject(e);
      }
    }
    this.running = false;
  }
}

export const insExchangeQueue = new SerialQueue();

```
