// 字典
// 集合表示一组互不相同的元素(不重复的元素)。
// 在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。
// 字典和集合很相似，集合以[值，值]的形式存储元素，字 典则是以[键，值]的形式来存储元素。
// 字典也称作映射、符号表或关联数组。

import { defaultToString } from '../utils/util';
import { ValuePair } from '../models/value-pair';

/**
 * 字典
 */
export default class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> };
  constructor(private toStrFm = defaultToString) {
    this.table = {};
  }

  /**
   * 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
   * @param key
   * @param value
   */
  public set(key: K, value: V): boolean {
    if (key !== undefined && value !== undefined) {
      const tableKey = this.toStrFm(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  /**
   * 从字典中移除一个值
   * @param key
   */
  public remove(key: K) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFm(key)];
      return true;
    }
    return false;
  }

  /**
   * 从字典中检索一个值
   * @param key
   */
  public get(key: K): string | undefined {
    const valuePair = this.table[this.toStrFm(key)];
    return valuePair === undefined ? undefined : valuePair.toString();
  }

  /**
   * 以数组形式返回字典中的所有 valuePair 对象
   * @returns
   */
  public keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table);
  }

  /**
   * 返回字典中用于识别值的所有(原始)键名
   * @returns
   */
  public keys(): K[] {
    return this.keyValues().map((valuePair) => valuePair.key);
  }

  /**
   * 返回字典中用于识别值的所有(原始)值名
   * @returns
   */
  public values(): V[] {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  /**
   * 迭代字典中的每个键值对
   * @param callbackFn 回到函数
   */
  public forEach(callbackFn: (key: K, value: V) => void): void {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const { key, value } = valuePairs[i];
      callbackFn(key, value);
    }
  }

  /**
   * 返回字典中的值的个数
   * @returns
   */
  public size(): number {
    return Object.keys(this.table).length;
  }

  /**
   * 检查字典是否为空
   * @returns
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * 清空字典
   */
  public clear() {
    this.table = {};
  }

  /**
   * 转化为字符串
   * @returns
   */
  public toString(): string {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`;
    }
    return objString;
  }

  /**
   * 检查 key 是否存在
   * @param key
   * @returns
   */
  public hasKey(key: K): boolean {
    return this.table[this.toStrFm(key)] !== undefined;
  }
}
