export interface LoginRequestData {
  /** admin 或 editor */
  username: "admin" | "editor"
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

/** 抽象的登录服务接口 */
export interface ILoginService {
  getLoginCodeApi(): Promise<any>
  loginApi(data: any): Promise<any>
  getUserInfoApi(): Promise<any>
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
