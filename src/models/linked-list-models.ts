// 链表助手类


/**
 * 添加到链表中的元素
 * @param element 加入链表的元素
 * @param next 链表下一个元素的指针
 */
export class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}

/**
 * 添加到双向链表中的元素
 * @param element 加入链表的元素
 * @param prev 链表上一个元素的指针
 * @param next 链表下一个元素的指针
 */
export class DoublyNode<T> extends Node<T> {
  constructor(
      public element: T,
      public next?: DoublyNode<T>,
      public prev?: DoublyNode<T>
  ) {
    super(element, next)
  }
}