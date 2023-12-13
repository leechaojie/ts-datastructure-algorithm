// 自平衡树 Adelson-Velskii-Landi AVL

// import { Compare, ICompareFunction, defaultCompare } from '../utils/util';
import { Node } from '../models/tree-models';
import BinarySearchTree from './binary-search-tree';

// 平衡因子
enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5,
}

/**
 * 自平衡树
 */
export default class AVLTree<T> extends BinarySearchTree<T> {
  /**
   * 获取节点高度
   * @param node Node<T>
   * @returns
   */
  private getNodeHeight(node: Node<T> | null): number {
    if (node === null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  /**
   * 向右单旋转
   * 这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点也是平衡或者左侧较重
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   * @returns
   */
  public rotationLL(node: Node<T>): Node<T> | null {
    const tmp = node.left;
    if (tmp) {
      node.left = tmp.right;
      tmp.right = node;
    }
    return tmp;
  }

  /**
   * 向左单旋转
   * 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或者右侧较重
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   * @returns
   */
  public rotationRR(node: Node<T>): Node<T> | null {
    const tmp = node.right;
    if (tmp) {
      node.right = tmp.left;
      tmp.left = node;
    }
    return tmp;
  }

  /**
   * 向右双旋转
   * 这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
   * @param node Node<T>
   * @returns
   */
  public rotationLR(node: Node<T>): Node<T> | null {
    node.left = this.rotationRR(node.left as Node<T>);
    return this.rotationLL(node);
  }

  /**
   * 向左双旋转
   * 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
   * @param node Node<T>
   * @returns
   */
  public rotationRL(node: Node<T>): Node<T> | null {
    node.right = this.rotationLL(node.right as Node<T>);
    return this.rotationRR(node);
  }

  /**
   * 计算一个节点的平衡因子
   * @param node Node<T>
   * @returns
   */
  public getBalanceFactor(node: Node<T>) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }
}
