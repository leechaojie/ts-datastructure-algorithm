import Queue from "./02-队列/queue"
import Deque from "./02-队列/deque"

/**
 * 击鼓传花
 * @param elementsList
 * @param num
 * @returns
 */
function hotPotato<T>(elementsList: Array<T>, num: number): IHotPotato<T> {
  // 创建一个队列
  const queue: Queue<T | undefined> = new Queue()
  const elimitatedList: Array<T | undefined> = []
  // 将所有元素依次加入队列
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }
  while (queue.size() > 1) {
    // 依次将 num 之前的元素添加到队列尾部
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    // 此时队列头部就是数到 num 的元素，将数到 num 的元素移除
    elimitatedList.push(queue.dequeue())
  }
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue()
  }
}

const names: string[] = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const result = hotPotato(names, 7)
console.log('击鼓传花结果', result)

/**
 * 回文检查器
 * @param aString
 * @returns
 */
function palindromeChecker(aString: string): boolean {
  // 检查参数是否合法
  // 使用了 ts，以下代码忽略，只需判断参数是否为空
  if (aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false
  }
  // 创建一个双端队列
  const deque: Deque<string> = new Deque()
  // 去掉字符串的空格
  const lowerString: string = aString.toLocaleLowerCase().split(' ').join('')

  let isEqual = true

  // 队列第一个元素
  let firstChar: string | undefined
  // 队列队后一个元素
  let lastChar: string | undefined

  // 依次将 aString 内的元素添加到双端队列内
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i)) // charAt 返回指定索引处的字符
  }

  // 循环获取第一个与最后一个，比较是否相等
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      isEqual = false
    }
  }
  return isEqual
}

console.log('a', palindromeChecker('a'))
console.log('aa', palindromeChecker('aa'))
console.log('kayak', palindromeChecker('kayak'))
console.log('level', palindromeChecker('level'))
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'))
console.log('Step on no pets', palindromeChecker('Step on no pets'))
console.log('hello world', palindromeChecker('hello world'))