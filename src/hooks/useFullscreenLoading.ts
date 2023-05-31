import { type LoadingOptions, ElLoading } from "element-plus"

const defaultOptions = {
  lock: true,
  text: "加载中..."
}

interface LoadingInstance {
  close: () => void
}

interface UseFullscreenLoading {
  <T extends (...args: any[]) => ReturnType<T>>(fn: T, options?: LoadingOptions): (
    ...args: Parameters<T>
  ) => Promise<ReturnType<T>>
}

/**
 * 传入一个函数 fn，在它执行周期内，加上「全屏」loading
 * @param fn 要执行的函数
 * @param options LoadingOptions
 * @returns 返回一个新的函数，该函数返回一个 Promise
 */
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: LoadingInstance
  return async (...args) => {
    try {
      loadingInstance = ElLoading.service({ ...defaultOptions, ...options })
      return await fn(...args)
    } finally {
      loadingInstance?.close()
    }
  }
}
