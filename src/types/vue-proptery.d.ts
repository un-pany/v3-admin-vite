import { ElMessage } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: ElMessage
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]
    activeMenu?: string
  }
}
