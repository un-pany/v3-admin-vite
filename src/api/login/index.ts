import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 实现 ILoginService接口 */
export class LoginService implements Login.ILoginService {
  /** 获取登录验证码 */
  async getLoginCodeApi(): Promise<Login.LoginCodeResponseData> {
    return request({
      url: "login/code",
      method: "get"
    })
  }

  /** 登陆并返回 token */
  async loginApi(data: Login.LoginRequestData): Promise<Login.LoginResponseData> {
    return request({
      url: "users/login",
      method: "post",
      data
    })
  }

  /** 获取用户详情 */
  async getUserInfoApi(): Promise<Login.UserInfoResponseData> {
    return request({
      url: "users/info",
      method: "get"
    })
  }
}

// /** 获取登录验证码 */
// export function getLoginCodeApi() {
//   return request<Login.LoginCodeResponseData>({
//     url: "login/code",
//     method: "get"
//   })
// }

// /** 登录并返回 Token */
// export function loginApi(data: Login.LoginRequestData) {
//   return request<Login.LoginResponseData>({
//     url: "users/login",
//     method: "post",
//     data
//   })
// }

// /** 获取用户详情 */
// export function getUserInfoApi() {
//   return request<Login.UserInfoResponseData>({
//     url: "users/info",
//     method: "get"
//   })
// }
