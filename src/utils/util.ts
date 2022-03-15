// 工具函数

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

export type ICompareFunction<T> = (a: T, b: T) => number;

/**
 * 比较两个 JavaScript 对象或值是否相等
 * @param a
 * @param b
 * @returns
 */
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

/**
 * 将传入的元素转化为字符串
 * @param item 传入的元素
 * @returns
 */
export function defaultToString(item: any): string {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

/**
 * 比较树的两个节点大小
 * @param a
 * @param b
 * @return LESS_THAN a < b
 * @return BIGGER_THAN a > b
 * @return EQUALS a = b
 */
export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}