import { ElLoading, LoadingOptions } from "element-plus"

const defaultOption = {
  lock: true,
  text: "加载中...",
  background: "rgba(0, 0, 0, 0.7)"
}

interface ILoading {
  close: () => void
}

/**
 * 传入一个方法 fn，在它执行周期内，加上「全屏」loading
 * 如果：
 * 1. fn 是同步方法，结束后隐藏 loading
 * 2. 如果是异步方法，resolve 后隐藏 loading
 * 3. 报错后隐藏 loading 并抛出错误
 * @param {*} fn 函数
 * @param options
 * @returns Function 一个新的函数，去执行它吧
 */
export const useFullscreenLoading = <T>(
  fn: (...args: any[]) => T,
  options: LoadingOptions = {}
): ((...args: any[]) => Promise<T>) => {
  let loading: ILoading | undefined
  const showLoading = (options: LoadingOptions) => {
    loading = ElLoading.service(options)
  }

  const hideLoading = () => {
    loading && loading.close()
  }
  const _options = { ...defaultOption, ...options }
  const newFn = (...args: any[]) => {
    try {
      showLoading(_options)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      if (!isPromise) {
        hideLoading()
        return Promise.resolve(result)
      }
      return result
        .then((res: any) => {
          hideLoading()
          return res
        })
        .catch((err: Error) => {
          hideLoading()
          throw err
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
  return newFn
}
