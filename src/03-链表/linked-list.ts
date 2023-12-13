import { defaultEquals } from '../utils/util'
import { Node } from '../models/linked-list-models'
import { IEqualsFunction } from '../types'

/**
 * 链表
 * @param equalsFn
 */
export default class LinkedList<T> {
  protected count: number = 0 // 存储链表中的 元素数量。
  protected head: Node<T> | undefined
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {}

  /**
   * 向链表尾部添加一个新元素
   * @param element 新元素
   */
  public push(element: T): void {
    const node: Node<T> = new Node(element)
    let current: Node<T> | undefined
    if (this.head === undefined) {
      this.head = node
    } else {
      current = this.head
      // 获得最后一项
      while (current?.next !== undefined) {
        current = current?.next
      }
      // 将其 next 赋为新元素，建立链接
      current.next = node
    }

    // 链表长度自增
    this.count++

  }

  /**
   * 从链表中特定的位置移除元素
   * @param index 元素的索引
   */
  public removeAt(index: number): T | undefined {
    // 检查临界值
    if (index >= 0 && index < this.count) {
      let current = this.head

      // 移除第一项
      if (index === 0) {
        this.head = current?.next
      } else {
        // 对当前元素的前一个元素的引用
        const previous = this.getElementAt(index - 1)
        current = previous?.next;

        // 将 previous 与 current 的下一项链接起来: 跳过 current，从而移除它
        (previous as Node<T>).next = current?.next
      }

      this.count--
      return (current as Node<T>).element
    }
    return undefined
  }

  /**
   * 任意位置插入元素
   * @param element 插入的元素
   * @param index 插入的索引位置
   */
  public insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)

      // 第一个位置添加
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous?.next
        node.next = current;
        (previous as Node<T>).next = node
      }
      this.count++
      return true
    }
    return false
  }

  /**
   * 从链表中移除元素
   * @param element 需要删除的元素
   * @returns 删除的元素
   */
  public remove(element: T) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  /**
   * 查找元素的位置
   * @param element 查找的元素
   * @returns 元素所在的索引
   */
  public indexOf(element: T): number {
    let current = this.head
    for (let i = 0; i < this.count && current !== undefined; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  /**
   * 通过索引找到目标元素
   * @param index 元素索引
   */
  public getElementAt(index: number): Node<T> | undefined {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node !== undefined; i++) {
        node = node?.next
      }
      return node
    }
    return undefined
  }

  /**
   * 返回链表中元素的个数
   * @returns 链表元素的个数
   */
  public size(): number {
    return this.count
  }

  /**
   * 检查链表是否为空
   */
  public isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * 获取链表头部元素
   * @returns
   */
  public getHead() {
    return this.head
  }

  /**
   * 清空链表
   */
  public clear() {
    this.head = undefined
    this.count = 0
  }

  /**
   * 将链表对象转换成字符串
   */
  public toString(): string {
    if (this.head === undefined) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 0; i < this.size() && current !== undefined; i++) {
      objString = `${objString}, ${current.element}`
      current = current.next
    }
    return objString
  }

}
