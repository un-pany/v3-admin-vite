<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useAppStore } from '@/store/modules/app'

const locale = zhCn // element-plus 设置为中文

useAppStore().initTheme() // 初始化 Theme
</script>
