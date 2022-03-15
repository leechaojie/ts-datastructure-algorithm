// 二叉搜索树 BinarySearchTree BST

import { Compare, ICompareFunction, defaultCompare } from "../utils/util"
import { Node } from "../models/tree-models"

/**
 * 二叉搜索树
 */
export default class BinarySearchTree<T> {
  protected root: Node<T> | null
  constructor() {
    this.root = null
  }

  /**
   * 比较树的两个节点大小
   * @param a
   * @param b
   * @return LESS_THAN a < b
   * @return BIGGER_THAN a > b
   * @return EQUALS a = b
   */
  protected compareFn: ICompareFunction<T> = defaultCompare

  /**
   * 向二叉搜索树中插入一个键
   * @param key 键
   */
  public insert(key: T) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  /**
   * 将节点添加到根节点以外的其他位置
   * @param node
   * @param key
   */
  private insertNode(node: Node<T>, key: T) {
    // 新节点是否小于跟节点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) { // 基线条件
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key) // 递归
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  /**
   * 中序遍历
   * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，
   * 也就是以从最小到最大的顺序访问所有节点
   * 中序遍历的一种应用就是对树进行排序操作
   * @param callback
   */
  public inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback)
  }

  private inOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  /**
   * 先序遍历
   * 先序遍历是以优先于后代节点的顺序访问每个节点的。
   * 先序遍历的一种应用是打印一个结构化的文档。
   * @param callback
   */
  public preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback)
  }

  private preOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }


  /**
   * 后序遍历
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。
   * 后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
   * @param callback
   */
  public postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback)
  }

  private postOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  /**
   * 获取最小值
   * @returns
   */
  public min() {
    return this.minNode(this.root)
  }

  /**
   * 迭代找出最小值
   * @param node
   * @returns
   */
  protected minNode(node: Node<T> | null): Node<T> | null {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current
  }

  /**
   * 获取最大值
   * @returns
   */
  public max() {
    return this.maxNode(this.root)
  }

  /**
     * 迭代找出最大值
     * @param node
     * @returns
     */
  protected maxNode(node: Node<T> | null): Node<T> | null {
    let current = node
    while (current !== null && current.right !== null) {
      current = current.right
    }
    return current
  }

  /**
   * 搜索一个特定的值
   * @param key 需要搜索的值
   * @returns true 存在 false 不存在
   */
  public search(key: T) {
    return this.searchNode(this.root, key)
  }

  /**
   * 寻找一棵树或其任意子树中的一个特定的值
   * @param node 树/子树的根节点
   * @param key 需要搜索的值
   * @returns
   */
  private searchNode(node: Node<T> | null, key: T): boolean {
    if (node === null) {
      return false
    }
    // 比较节点大小
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  /**
   * 移除节点
   * @param key 需要一处的值
   */
  public remove(key: T) {
    this.root = this.removeNode(this.root, key)
  }

  protected removeNode(node: Node<T> | null, key: T): null | Node<T> {
    if (node === null) {
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 1 第一种情况: 该节点是一个没有左侧或右侧子节点的叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      // 2 移除有一个左侧或右侧子节点的节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // 3 移除有两个子节点的节点
      // aux 右边子树中最小的节点
      const aux = this.minNode(node.right);
      (node as Node<T>).key = (aux?.key as T)
      node.right = this.removeNode(node.right, aux?.key as T)
      return node
    }
  }
}