<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { useSettingsStoreHook } from "@/store/modules/settings"

const settingsStore = useSettingsStoreHook()

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCn
</script>

<template>
  <ElConfigProvider :locale="locale" :size="settingsStore.controlSize">
    <router-view />
  </ElConfigProvider>
</template>
