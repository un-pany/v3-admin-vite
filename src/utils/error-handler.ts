import { AxiosError } from "./types/axios-error"

// API 错误处理
export function handleApiError(error: Error) {
  const axiosError = error as AxiosError

  if (axiosError.response) {
    // 服务器响应了请求，但状态码不在 2xx 范围内
    console.error("API 错误，状态码:", axiosError.response.status)
    console.error("错误详情:", axiosError.response.data)
    // 根据错误码进行分类处理
    switch (axiosError.response.status) {
      case 400:
        console.error("请求参数错误")
        break
      case 401:
        console.error("未授权访问")
        break
      case 403:
        console.error("禁止访问")
        break
      case 404:
        console.error("资源未找到")
        break
      case 500:
        console.error("服务器内部错误")
        break
      default:
        console.error("未知 API 错误")
        break
    }
  } else if (axiosError.request) {
    // 请求已发出，但未收到响应
    console.error("服务器无响应")
  } else {
    // 在设置请求时发生了一些问题
    console.error("请求错误:", axiosError.message)
  }
  return Promise.reject(error)
}

// 通用错误处理
export function handleGeneralError(error: Error) {
  console.error("发生错误:", error)
  return Promise.reject(error)
}
