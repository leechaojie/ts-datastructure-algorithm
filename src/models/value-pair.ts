/**
 * 键值，用于字典
 * 为了保存信息的需要，我们同样要保存原始的 key。因此，我们不是只将 value 保存在字典中，而是要保存两个值:原始的 key 和 value。
 */
export class ValuePair<K, V> {
  constructor(
    public key: K,
    public value: V
  ) {}

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
