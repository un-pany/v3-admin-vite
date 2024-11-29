<script lang="ts" setup>
import type { RouteLocationMatched } from "vue-router"
import { useRouteListener } from "@@/composables/useRouteListener"
import { compile } from "path-to-regexp"

const route = useRoute()

const router = useRouter()

const { listenerRouteChange } = useRouteListener()

/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbs = ref<RouteLocationMatched[]>([])

/** 获取面包屑导航信息 */
function getBreadcrumb() {
  breadcrumbs.value = route.matched.filter(item => item.meta?.title && item.meta?.breadcrumb !== false)
}

/** 编译路由路径 */
function pathCompile(path: string) {
  const toPath = compile(path)
  return toPath(route.params)
}

/** 处理面包屑导航点击事件 */
function handleLink(item: RouteLocationMatched) {
  const { redirect, path } = item
  if (redirect) return router.push(redirect as string)
  router.push(pathCompile(path))
}

// 监听路由变化，更新面包屑导航信息
listenerRouteChange((route) => {
  if (route.path.startsWith("/redirect/")) return
  getBreadcrumb()
}, true)
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  line-height: var(--v3-navigationbar-height);
  .no-redirect {
    color: var(--el-text-color-placeholder);
  }
  a {
    font-weight: normal;
  }
}
</style>
