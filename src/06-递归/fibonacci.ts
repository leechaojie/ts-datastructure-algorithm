// 斐波那契数列
// 0 1 1 2 3 5 8 13 21 34 ...


/**
 * 迭代求斐波那契数
 * @param n 斐波那契第 n 项下标
 * @returns 返回第 n 项下标对应的斐波那契数
 */
export function fibonacciIterative(n: number): number {
  if (n < 1) return 0
  if (n <= 2) return 1
  let fibNMinus2 = 0 // n - 2
  let fibNMinus1 = 1 // n - 1
  let fibN = n
  for (let i = 2; i <= n; i++) {
    fibN = fibNMinus1 + fibNMinus2 // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1
    fibNMinus1 = fibN
  }
  return fibN
}

/**
 * 递归求斐波那契数
 * @param n 斐波那契第 n 项下标
 * @returns 返回第 n 项下标对应的斐波那契数
 */
export function fibonacci(n: number): number {
  if (n < 1) return 0 // 基线条件
  if (n <= 2) return 1 // 基线条件
  return fibonacci(n - 1) + fibonacci(n - 2)
}

/**
 * 记忆化斐波那契数
 * 记忆化是一种保存前一个结果的值的优化技术，类似于缓存。
 * 如果我们分析在计算 fibonacci(5) 时的调用，会发现 fibonacci(3) 被计算了两次，
 * 因此可以将它的结果存储下来，这样当需要再次计算它的时候，我们就已经有它的结果了
 * @param n 斐波那契第 n 项下标
 * @returns 返回第 n 项下标对应的斐波那契数
 */
export function fibonacciMemoization(n: number): number {
  if (n < 1) return 0
  const memo = [0, 1]
  const fibonacci = (n: number): number => {
    if (memo[n] !== undefined) return memo[n]
    return memo[n] = fibonacci(n - 1) + fibonacci(n - 2)
  }
  return fibonacci(n)
}


/**
 * 迭代的版本比递归的版本快很多，所以这表示递归更慢。
 * 但是，递归版本更容易理解，需要的代码通常也更少。
 * 另外，对一些算法来说，迭代的解法可能不可用，
 * 而且有了尾调用优化，递归的多余消耗甚至可能被消除。
 * 所以，我们经常使用递归，因为用它来解决问题会更简单。
 */