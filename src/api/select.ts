// import { request } from "@/utils/service"

/** 查 */
export function getRemoteSelectData() {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      // 模拟接口调用有概率出错
      if (Math.random() > 0.5) {
        resolve({
          code: 0,
          data: [
            {
              key: 1,
              label: "苹果",
              value: 1
            },
            {
              key: 2,
              label: "香蕉",
              value: 2
            },
            {
              key: 3,
              label: "橘子",
              value: 3
            }
          ],
          message: "成功"
        })
      } else {
        reject(new Error("不小心出错了！"))
      }
    }, 3000)
  })
}
