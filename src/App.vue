<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
import { useLocales } from "./store/modules/locales"

const { initTheme } = useTheme()
const locales = useLocales()

/** 初始化主题 */
initTheme()
</script>

<template>
  <ElConfigProvider :locale="locales.elementLocale">
    <router-view />
  </ElConfigProvider>
</template>
