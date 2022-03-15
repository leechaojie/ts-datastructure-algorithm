/**
 * 双端队列 deque double-ended queue
 */
export default class Deque<T> {
  private count: number
  private lowestCount: number
  private items: IItems<T>
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * 队列前端添加元素
   * @param element
   */
  public addFront(element: T): void {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  /**
   * 队列后端添加元素
   * @param element
   */
  public addBack(element: T): void {
    this.items[this.count] = element
    this.count++
  }

  /**
   * 从队列前端删除元素
   * @returns
   */
  public removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  /**
   * 从队列后端删除元素
   * @returns
   */
  public removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  /**
   * 查找队列前端的第一个元素
   * @returns
   */
  public peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  /**
   * 查找队列后端的第一个元素
   * @returns
   */
  public peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

  public toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }

  /**
   * 检查队列是否为空
   * @returns
   */
  public isEmpty(): boolean {
    return this.count - this.lowestCount === 0
  }

  /**
   * 清空队列
   */
  public clear(): void {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * 获取队列元素个数
   * @returns
   */
  public size(): number {
    return this.count - this.lowestCount
  }
}

const deque = new Deque()

deque.addFront('one')
deque.addFront('two')
console.log('peekFront', deque.peekFront())
console.log('peekBack', deque.peekBack())
console.log('toString', deque.toString())


// console.log('removeFront', deque.removeFront())
console.log('removeBack', deque.removeBack())
console.log('size', deque.size())

