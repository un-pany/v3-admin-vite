import { removeConfigLayout } from "@/utils/cache/local-storage"

/** 重置项目配置 */
export const resetConfigLayout = () => {
  removeConfigLayout()
  location.reload()
}
