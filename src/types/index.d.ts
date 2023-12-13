/**
 * 队列/栈 元素类型
 */
export interface IItems<T> {
  [key: number]: T;
}

/**
 * 集合
 */
// interface ISetItems<T> {
//   [key: T]: T
// }

export interface IHotPotato<T> {
  eliminated: Array<T>;
  winner: T | undefined;
}

export interface IEqualsFunction<T> {
  (a: T, b: T): boolean;
}
