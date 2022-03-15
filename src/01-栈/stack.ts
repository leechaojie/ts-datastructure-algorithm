/**
 * 栈
 */
export default class Stack<T> {
  private count: number
  private items: IItems<T>
  constructor() {
    this.count = 0
    this.items = {}
  }

  /**
   * 栈顶添加元素
   * @param element 添加的元素
   */
  public push(element: T): void {
    this.items[this.count] = element
    this.count++
  }

  /**
   * 删除栈顶元素
   * @returns 删除的栈顶元素
   */
  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result: T = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  /**
   * 栈顶元素
   * @returns 栈顶元素
   */
  public peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

  /**
   * 栈的长度
   * @returns 栈的长度
   */
  public size(): number {
    return this.count
  }

  /**
   * 清空栈
   */
  public clear(): void {
    this.count = 0
    this.items = {}
  }

  /**
   * 以字符串形式返回栈的元素
   * @returns 字符串
   */
  public toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    let objString: string = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }

  /**
   * 查看栈是否为空
   * @returns boolean
   */
  public isEmpty(): boolean {
    return this.count === 0
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.toString())
console.log(stack.peek())
