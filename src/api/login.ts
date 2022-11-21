import { request } from "@/utils/service"

export interface ILoginData {
  /** admin 或 editor */
  username: "admin" | "editor"
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request({
    url: "/api/v1/login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: ILoginData) {
  return request({
    url: "/api/v1/users/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: "/api/v1/users/info",
    method: "get"
  })
}

export function login() {
  return request({
    url: "/v1/api/admin/base/open/areas",
    method: "post"
  })
}
