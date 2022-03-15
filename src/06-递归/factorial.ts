// 阶乘

/**
 * 迭代阶乘
 * @param number
 */
export function factorialIterative(number: number): number | undefined {
  if (number < 0) return undefined
  let total = 1
  for (let n = number; n > 0; n--) {
    total = total * n
  }
  return total
}

/**
 * 递归阶乘
 * @param number
 */
export function factorial(number: number): number | undefined {
  if (number < 0) return undefined
  if (number === 1 || number === 0) { // 基线条件
    return 1
  }
  return number * <number>factorial(number - 1)
}