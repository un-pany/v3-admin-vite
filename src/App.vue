<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@@/composables/useGreyAndColorWeakness"
import { usePany } from "@@/composables/usePany"
import { useTheme } from "@@/composables/useTheme"
import zhCn from "element-plus/es/locale/lang/zh-cn" // Element Plus 中文包

const { initTheme } = useTheme()
const { initGreyAndColorWeakness } = useGreyAndColorWeakness()
const { initStarNotification, initStoreNotification } = usePany()

// 初始化主题
initTheme()
// 初始化灰色模式和色弱模式
initGreyAndColorWeakness()
// 初始化通知
initStarNotification()
initStoreNotification()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
