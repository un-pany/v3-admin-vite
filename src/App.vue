<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
