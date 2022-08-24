import { request } from "@/utils/service"

interface ILoginData {
  username: string
  password: string
}

/** 登录并返回 Token */
export function loginApi(data: ILoginData) {
  return request({
    url: "users/login",
    method: "post",
    data
  })
}
/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: "users/info",
    method: "post"
  })
}
