import { defaultEquals } from '../utils/util'
import LinkedList from './linked-list'
import { DoublyNode } from '../models/linked-list-models'
import { IEqualsFunction } from '../types'

/**
 * 双向链表
 */
export default class DoublyLinkedList<T> extends LinkedList<T> {
  declare head: DoublyNode<T> | undefined
  protected tail: DoublyNode<T> | undefined // 链表最后一个元素的引用
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn)
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element 新元素
   */
  public push(element: T): void {
    const node = new DoublyNode(element)
    if (this.head === undefined) {
      this.head = node
      this.tail = node
    } else {
      (this.tail as DoublyNode<T>).next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }

  /**
   * 双向链表任意位置插入元素
   * @param element 插入的元素
   * @param index 插入的索引位置
   */
  public insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        if (this.head === undefined) {
          this.head = node
          this.tail = node
        } else {
          node.next = current;
          (current as DoublyNode<T>).prev = node
          this.head = node
        }
      } else if (index === this.count) { // 最后一项
        current = this.tail;
        (current as DoublyNode<T>).prev = node
        node.prev = current
        this.tail = node
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        node.next = current;
        (current as DoublyNode<T>).prev = node
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }

  /**
   * 从双向链表中任意位置移除元素
   * @param index 元素的索引
   */
  public removeAt(index: number): T | undefined {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current?.next
        // 如果只有一项，更新tail
        if (this.count === 1) {
          this.tail = undefined
        } else {
          (this.head as DoublyNode<T>).prev = undefined
        }
      } else if (index === this.count - 1) { // 最后一项
        current = this.tail
        this.tail = current?.prev;
        (this.tail as DoublyNode<T>).next = undefined
      } else {
        current = this.getElementAt(index)
        const previous = current?.prev;
        // 将 previous 与 current 的下一项链接起来——跳过 current
        (previous as DoublyNode<T>).next = current?.next;
        // TODO 断言写法不太美观，有待优化
        ((current as DoublyNode<T>).next as DoublyNode<T>).prev = previous
      }
      this.count--
      return current?.element
    }
    return undefined
  }

  /**
   * 获取链表尾部元素
   * @returns
   */
  public getTail() {
    return this.tail
  }

  /**
   * 清空双向链表
   */
  public clear() {
    super.clear()
    this.tail = undefined
  }

}
