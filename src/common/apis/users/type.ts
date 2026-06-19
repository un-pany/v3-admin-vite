export type CurrentUserResponseData = ApiResponseData<{
  username: string
  roles: string[]
  permissions?: string[]
}>
