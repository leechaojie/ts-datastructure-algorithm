/**
 * 二叉搜索树节点
 */
export class Node<K> {
  public key: K // 节点值
  public left: Node<K> | null // 左侧子节点引用
  public right: Node<K> | null // 右侧子节点引用
  constructor(key: K) {
    this.key = key
    this.left = null
    this.right = null
  }

}
