import type { LoadingOptions } from "element-plus"

interface UseFullscreenLoading {
  <T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    options?: LoadingOptions
  ): (...args: Parameters<T>) => Promise<ReturnType<T>>
}

interface LoadingInstance {
  close: () => void
}

const DEFAULT_OPTIONS = {
  lock: true,
  text: "加载中..."
}

/**
 * @name 全屏加载 Composable
 * @description 传入一个函数 fn，在它执行周期内，加上「全屏」Loading
 * @param fn 要执行的函数
 * @param options LoadingOptions
 * @returns 返回一个新的函数，该函数返回一个 Promise
 */
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: LoadingInstance
  return async (...args) => {
    try {
      loadingInstance = ElLoading.service({ ...DEFAULT_OPTIONS, ...options })
      return await fn(...args)
    } finally {
      loadingInstance.close()
    }
  }
}
