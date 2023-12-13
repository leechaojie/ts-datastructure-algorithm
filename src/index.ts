import Log from './utils/Log';

const console = Log;
console.log = (content) => {
  window.console.log(content);
  const oTextareaInfo = document.getElementById('log');

  // 判断是否为 Number 类型
  if (typeof content === 'number') {
    content = `<span style="color: blue">${content}</span>`;
  }
  (oTextareaInfo as HTMLElement).innerHTML =
    (oTextareaInfo as HTMLElement).innerHTML + content + '<br/>';

  // 将滚动条滚动到最底部
  (oTextareaInfo as HTMLElement).scrollTop = (
    oTextareaInfo as HTMLElement
  ).scrollHeight;
};

// import './06_数据结与算法/01-栈/stack.ts'
// import './06_数据结与算法/02-队列/queue.ts'
// import './06_数据结与算法/02-队列/deque.ts'
// import './06_数据结与算法/05-字典和散列表/hash-table'
// import './06_数据结与算法/example.ts'

// 二叉搜索树
import BinarySearchTree from './07-树/binary-search-tree';
const tree = new BinarySearchTree<number>();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

const printNode = (value: number) => console.log(value);
console.info('二叉搜索树');
console.log('-----中序遍历');
tree.inOrderTraverse(printNode);
console.log('-----先序遍历');
tree.preOrderTraverse(printNode);
console.log('-----后序遍历');
tree.postOrderTraverse(printNode);

console.log('min', tree.min());
console.log('max', tree.max());

console.log('remove', tree.remove(11));
console.log('tree', tree);
