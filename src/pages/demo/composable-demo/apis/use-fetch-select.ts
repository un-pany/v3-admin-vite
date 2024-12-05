/** 模拟接口响应数据 */
const SELECT_RESPONSE_DATA = {
  code: 0,
  data: [
    {
      label: "苹果",
      value: 1
    },
    {
      label: "香蕉",
      value: 2
    },
    {
      label: "橘子",
      value: 3,
      disabled: true
    }
  ],
  message: "获取 Select 数据成功"
}

const ERROR_MESSAGE = "接口发生错误"

/** 模拟接口 */
export function getSelectDataApi() {
  return new Promise<typeof SELECT_RESPONSE_DATA>((resolve, reject) => {
    // 模拟接口响应时间 2s
    setTimeout(() => {
      if (Math.random() < 0.8) {
        // 模拟接口调用成功
        resolve(SELECT_RESPONSE_DATA)
      } else {
        // 模拟接口调用出错
        reject(new Error(ERROR_MESSAGE))
        ElMessage.error(ERROR_MESSAGE)
      }
    }, 2000)
  })
}
