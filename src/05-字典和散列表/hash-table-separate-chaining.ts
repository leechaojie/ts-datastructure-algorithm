// 分离链接
// 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，
// 但是在 HashTable 实例之外还需要额外的存储空间。
// ASCII https://www.asciitable.com

import { defaultToString } from '../utils/util';
import { ValuePair } from '../models/value-pair';
import LinkedList from '../03-链表/linked-list';

/**
 * 散列表 分离链接
 */
export default class HashTableSeparateChaining<K, V> {
  private table: { [key: number]: LinkedList<ValuePair<K, V>> };
  constructor(private toStrFn = defaultToString) {
    this.table = {};
  }

  /**
   * 将键和值加入分离链接
   * @param key
   * @param value
   * @returns
   */
  public put(key: K, value: V): boolean {
    if (key !== undefined && value !== undefined) {
      const position = this.hashCode(key);
      if (this.table[position] === undefined) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  /**
   * 从分离链接中获取一个值
   * @param key
   * @returns
   */
  public get(key: K): V | undefined {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== undefined && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current !== undefined) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  /**
   * 从分离链接中移除元素
   * @param key
   * @returns
   */
  public remove(key: K): boolean {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList !== undefined && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current !== undefined) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  /**
   * 获取 key 的 hashCode
   * @param key
   * @returns ASCII
   */
  public hashCode(key: K): number {
    return this.loseloseHashCode(key);
  }

  /**
   * 散列函数
   * 根据组成 key 的每个字符的 ASCII 码值的和得到一个数
   * @param key
   * @returns 返回 hash 值 ASCII
   */
  public loseloseHashCode(key: K): number {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash;
  }
}
