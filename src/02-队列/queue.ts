/**
 * 队列
 */
export default class Queue<T> {
  private count: number // 队列大小
  private items: IItems<T> // 队列的元素
  private lowestCount: number // 追踪队列第一个元素
  constructor() {
    this.count = 0
    this.items = {}
    this.lowestCount = 0
  }

  /**
   * 队列尾部添加元素
   * @param element
   */
  public enqueue(element: T) {
    this.items[this.count] = element
    this.count++
  }


  /**
   * 移除队列的第一项
   * @returns
   */
  public dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  /**
   * 返回队列中第一个元素
   * @returns
   */
  public peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  /**
   * 检查队列是否为空
   * @returns
   */
  public isEmpty(): boolean {
    return this.count - this.lowestCount === 0
  }

  /**
   * 返回队列包含的元素个数
   * @returns
   */
  public size(): number {
    return this.count - this.lowestCount
  }

  /**
   * 清空队列
   */
  public clear() {
    this.count = 0
    this.items = {}
    this.lowestCount = 0
  }

  public toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}

const queue:Queue<string> = new Queue()
queue.enqueue('one')
queue.enqueue('two')
queue.enqueue('three')
console.log('isEmpty', queue.isEmpty())
console.log('toString', queue.toString())
console.log('peek', queue.peek())
console.log('size', queue.size())
console.log('dequeue', queue.dequeue())
console.log('toString', queue.toString())
