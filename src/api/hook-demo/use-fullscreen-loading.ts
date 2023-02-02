/** 模拟接口响应数据 */
const SUCCESS_RESPONSE_DATA = {
  code: 0,
  data: {},
  message: "获取成功"
}

/** 模拟请求接口成功 */
export function getSuccessApi() {
  return new Promise<typeof SUCCESS_RESPONSE_DATA>((resolve) => {
    setTimeout(() => {
      resolve(SUCCESS_RESPONSE_DATA)
    }, 1000)
  })
}

/** 模拟请求接口失败 */
export function getErrorApi() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("发生错误"))
    }, 1000)
  })
}
