import { type LoadingOptions, ElLoading } from "element-plus"

const defaultOptions = {
  lock: true,
  text: "加载中..."
}

interface ILoadingInstance {
  close: () => void
}

interface IUseFullscreenLoading {
  <T extends (...args: any[]) => ReturnType<T>>(fn: T, options?: LoadingOptions): (
    ...args: Parameters<T>
  ) => Promise<ReturnType<T>> | ReturnType<T>
}

/**
 * 传入一个函数 fn，在它执行周期内，加上「全屏」loading，
 * 如果：
 * 1. fn 如果是同步函数，执行结束后隐藏 loading
 * 2. fn 如果是 Promise，resolve 或 reject 后隐藏 loading
 * 3. 报错后隐藏 loading 并抛出错误
 * @param {*} fn 要执行的函数
 * @param options LoadingOptions
 * @returns Function 一个新的函数，去执行它吧
 */
export const useFullscreenLoading: IUseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: ILoadingInstance
  const showLoading = (options: LoadingOptions) => {
    loadingInstance = ElLoading.service(options)
  }
  const hideLoading = () => {
    loadingInstance && loadingInstance.close()
  }
  const _options = { ...defaultOptions, ...options }
  return (...args) => {
    try {
      showLoading(_options)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      // 同步函数
      if (!isPromise) {
        hideLoading()
        return Promise.resolve(result)
      }
      // Promise
      return result
        .then((res) => {
          return res
        })
        .catch((err) => {
          throw err
        })
        .finally(() => {
          hideLoading()
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
}
