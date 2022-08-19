<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app"
import zhCn from "element-plus/lib/locale/lang/zh-cn"

/** 初始化主题 */
useAppStore().initTheme()
/** 将 Element-Plus 的语言设置为中文 */
const locale = zhCn
</script>

<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>
