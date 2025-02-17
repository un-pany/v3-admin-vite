/** 判断是否为数组 */
export function isArray<T>(arg: T) {
  return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === "[object Array]"
}

/** 判断是否为字符串 */
export function isString(str: unknown) {
  return typeof str === "string" || str instanceof String
}

/** 判断是否为外链 */
export function isExternal(path: string) {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}
