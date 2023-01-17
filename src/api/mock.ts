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

export interface IComicsItem {
  id: number
  name: string
}

export const getComics = () => {
  return new Promise<IComicsItem[]>((resolve) => {
    setTimeout(() => {
      resolve([...Array(5)].map((_t, index) => ({ id: index, name: `c${index}` })))
    }, 1000)
  })
}

export const getAnimations = (id: number) => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Sorry, there is an error here. The error id is ${id}`))
    }, 1000)
  })
}
