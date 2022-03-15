// 散列表
// 散列算法的作用是尽可能快地在数据结构中找到一个值
// 要在数据结构中获得一个值(使用 get 方法)，需要迭代整个数据结构来找到它。
// 如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。
// 散列函数的作用是给定一个键值，然后返回值在表中的地址。

import { defaultToString } from "../utils/util"
import { ValuePair } from "../models/value-pair"

/**
 * 散列表
 */
export default class HashTable<K, V> {
  private table: {[key: string]: ValuePair<K, V>}
  constructor(private toStrFn = defaultToString) {
    this.table = {}
  }

  /**
   * 散列函数
   * 根据组成 key 的每个字符的 ASCII 码值的和得到一个数
   * @param key
   * @returns 返回 hash 值
   */
  public loseloseHashCode(key: K): number {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i) // charCodeAt https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    }

    // 为了得到比较小的数值，这里使用 hash 值和一个任意数做除法的余数(%) —— 这可以规避操作数超过数值变量最大表示范围的风险。
    return hash % 37

  }


  /**
   * 最受社区推崇的散列函数
   * 在将键转化为字符串之后(行{1})，
   * djb2HashCode 方法包括初始化一个 hash 变量并赋值 为一个质数(行{2}——大多数实现都使用 5381)，
   * 然后迭代参数 key(行{3})，将 hash 与 33 相乘(用作一个幻数)，并和当前迭代到的字符的 ASCII 码值相加(行{4})。
   * 最后，我们将使用相加的和与另一个随机质数相除的余数(行{5})，比我们认为的散列表大小要大。
   * 在本例中，我们认为散列表的大小为 1000。
   */
  public djb2HashCode(key: K): number {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key) // {1}
    let hash = 5381 // {2}
    for (let i = 0; i < tableKey.length; i++) { // {3}
      hash = (hash * 33) + tableKey.charCodeAt(i) // {4}
    }
    return hash % 1013 // {5}
  }


  /**
   * 获取 key 的 hashCode
   */
  public hashCode(key: K): number {
    return this.djb2HashCode(key)
  }

  /**
   * 将键和值加入散列表
   */
  public put(key: K, value: V): boolean {
    if (key !== undefined && value !== undefined) {
      const position = this.hashCode(key)
      // 传入的 position 相同的话，会被覆盖
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  /**
   * 从散列表中获取一个值
   */
  public get(key: K): V | undefined {
    const valuePair = this.table[this.hashCode(key)]
    return valuePair === undefined ? undefined : valuePair.value
  }

  /**
   * 从散列表中移除一个值
   */
  public remove(key: K): boolean {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair !== undefined) {
      delete this.table[hash]
      return true
    }
    return false
  }

  /**
   * 检查散列表是否为空
   */
  public isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * 返回散列表元素个数
   */
  public size(): number {
    return Object.keys(this.table).length
  }

  /**
   * 清空散列表
   */
  public clear() {
    this.table = {}
  }

  /**
   * 将散列表转化为字符串
   */
  public toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }

}
