/**
 * 基于localStorage，带超时时间的本地存储
 * @export
 * @class CacheStore
 */
export default class CacheStore {
  /**
   * Creates an instance of CacheStore.
   * @param {string} localStorage的项目名称，缺省值为__localstore__
   * @memberof CacheStore
   */
  constructor (storeKey) {
    this.storeKey = storeKey || '__localstore__'
  }
  /**
   * 获取所有缓存内容map
   * map格式为：
   * {
   *  'key1': [expires_time, data1],
   *  'key2': [expires_time, data2]
   * }
   * @returns 所有缓存内容map
   * @memberof CacheStore
   */
  getAll () {
    let oldMap = {}
    try {
      oldMap = JSON.parse(window.localStorage.getItem(this.storeKey)) || {}
    } catch (e) {}
    return oldMap
  }

  /**
   * 根据key获取缓存内容
   * @param {string} key 缓存key
   * @returns 未超时的缓存内容，若超时，则返回null
   * @memberof CacheStore
   */
  getItem (key) {
    const map = this.getAll()
    if (!map || Object.keys(map).indexOf(key) === -1 || (parseInt(map[key][0]) < +new Date())) {
      this.clearItem(key)
      return null
    } else {
      return map[key][1]
    }
  }

  /**
   * 设置缓存内容
   * @param {string} key 缓存key
   * @param {any} val 需要缓存的内容
   * @param {number} expires 超时时间（13位时间戳），缺省值为当前时间后30s
   * @memberof CacheStore
   */
  setItem (key, val, expires) {
    const oldMap = this.getAll()
    oldMap[key] = [ expires || (+new Date() + 1000 * 30), val ] // 默认30秒超时
    window.localStorage.setItem(this.storeKey, JSON.stringify(oldMap))
  }

  /**
   * 清空指定缓存内容
   * @param {string} key 缓存key
   * @memberof CacheStore
   */
  clearItem (key) {
    const oldMap = this.getAll()
    delete oldMap[key]
    window.localStorage.setItem(this.storeKey, JSON.stringify(oldMap))
  }

  /**
   * 清空所有缓存内容
   * @memberof CacheStore
   */
  clear () {
    window.localStorage.removeItem(this.storeKey)
  }
}
