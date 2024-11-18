/** 判断是否为数组 */
export function isArray<T>(arg: T) {
  return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === "[object Array]"
}

/** 判断是否为字符串 */
export function isString<T>(str: T) {
  return typeof str === "string" || str instanceof String
}

/** 判断是否为外链 */
export function isExternal(path: string) {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

/** 判断是否为网址（带协议） */
export function isUrl(url: string) {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{1,64})?\.)+[a-z]{2,6}\/?/
  return reg.test(url)
}

/** 判断是否为网址或 IP（带端口） */
export function isUrlPort(url: string) {
  const reg = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/
  return reg.test(url)
}

/** 判断是否为域名（不带协议） */
export function isDomain(domain: string) {
  const reg = /^([0-9a-z-]+\.)+([a-z]{2,})$/i
  return reg.test(domain)
}

/** 判断版本号格式是否为 X.Y.Z */
export function isVersion(version: string) {
  const reg = /^\d+(?:\.\d+){2}$/
  return reg.test(version)
}

/** 判断时间格式是否为 24 小时制（HH:mm:ss） */
export function is24H(time: string) {
  const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
  return reg.test(time)
}

/** 判断是否为手机号（1 开头） */
export function isPhoneNumber(str: string) {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  return reg.test(str)
}

/** 判断是否为第二代身份证（18 位） */
export function isChineseIdCard(str: string) {
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[12]\d|30|31)\d{3}[\dX]$/i
  return reg.test(str)
}

/** 判断是否为 Email（支持中文邮箱） */
export function isEmail(email: string) {
  const reg = /^[A-Z0-9\u4E00-\u9FA5]+@[\w-]+(\.[\w-]+)+$/i
  return reg.test(email)
}

/** 判断是否为 MAC 地址 */
export function isMAC(mac: string) {
  const reg
    = /^(([a-f0-9][0,2468ace]:([a-f0-9]{2}:){4})|([a-f0-9][0,2468ace]-([a-f0-9]{2}-){4}))[a-f0-9]{2}$/i
  return reg.test(mac)
}

/** 判断是否为 IPv4 地址 */
export function isIPv4(ip: string) {
  const reg
    = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/
  return reg.test(ip)
}

/** 判断是否为车牌（兼容新能源车牌） */
export function isLicensePlate(str: string) {
  const reg
    = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
  return reg.test(str)
}
