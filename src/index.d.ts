/**
 * 队列/栈 元素类型
 */
interface IItems<T> {
  [key: number]: T
}

/**
 * 集合
 */
// interface ISetItems<T> {
//   [key: T]: T
// }

interface IHotPotato<T> {
  eliminated: Array<T>,
  winner: T | undefined
}

interface IEqualsFunction<T> {
  (a: T, b: T): boolean
}