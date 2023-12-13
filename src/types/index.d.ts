/**
 * 队列/栈 元素类型
 */
export type IItems<T> = {
  [key: number]: T;
}

/**
 * 集合
 */
export type ISetItems<T> = {
  [key: string]: T
}

export type IHotPotato<T> = {
  eliminated: Array<T>;
  winner: T | undefined;
}

export type IEqualsFunction<T> = {
  (a: T, b: T): boolean;
}
