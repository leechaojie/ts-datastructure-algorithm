/**
 * 集合
 * 集合是由一组无序且唯一(即不能重复)的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。
 */
export default class Set<T> {
  // private items: ISetItems<T>
  private items: any;
  constructor() {
    this.items = {};
  }

  /**
   * 向集合添加一个新元素
   * @param element
   */
  public add(element: T): boolean {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  /**
   * 删除集合中的元素
   * @param element 需要删除的元素
   * @returns
   */
  public delete(element: T): boolean {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  /**
   * 移除集合中的所有元素
   */
  public clear(): void {
    this.items = {};
  }

  /**
   * 返回集合所包含元素的数量
   */
  public size(): number {
    return Object.keys(this.items).length;
  }

  /**
   * 返回一个包含集合中所有值(元素)的数组
   * @returns
   */
  public values(): Array<T> {
    return Object.values(this.items);
  }

  /**
   * 检查元素是否在集合中
   * @param element 需要检查的元素
   * @returns
   */
  public has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, element as PropertyKey)
  }

  /**
   * 并集 A ∪ B
   * @param otherSet 需要合并的集合
   * @returns
   */
  public union(otherSet: Set<T>): Set<T> {
    const unionSet: Set<T> = new Set();
    this.values().forEach((value) => unionSet.add(value));
    otherSet.values().forEach((value) => unionSet.add(value));
    return unionSet;
  }

  /**
   * 交集 A ∩ B
   * @param otherSet
   * @returns
   */
  public intersection(otherSet: Set<T>): Set<T> {
    const intersectionSet: Set<T> = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach((value) => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  /**
   * 差集 A - B
   * @param otherSet
   * @returns
   */
  public difference(otherSet: Set<T>): Set<T> {
    const differenceSet: Set<T> = new Set();
    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  /**
   * 子集 A ⊂ B
   * @param otherSet
   * @returns
   */
  public isSubsetOf(otherSet: Set<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every((value) => {
      if (!otherSet.has(value)) {
        isSubset = false; // 跳出循环
        return false;
      }
    });
    return isSubset;
  }
}
