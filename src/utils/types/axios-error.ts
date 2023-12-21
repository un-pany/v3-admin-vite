export interface AxiosError {
  response?: {
    status: number
    data: any
  }
  request?: any
  message: string
}
