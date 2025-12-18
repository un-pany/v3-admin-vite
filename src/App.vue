<script lang="ts" setup>
import { useGreyAndColorWeakness } from "@@/composables/useGreyAndColorWeakness"
import { useLanguage } from "@@/composables/useLanguage"
import { usePany } from "@@/composables/usePany"
import { useTheme } from "@@/composables/useTheme"

const { epLocale } = useLanguage()

const { initTheme } = useTheme()

const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

const { initStarNotification, initStoreNotification, initMobileNotification } = usePany()

// 初始化主题
initTheme()

// 初始化灰色模式和色弱模式
initGreyAndColorWeakness()

// #region 初始化通知
initStarNotification()

initStoreNotification()

initMobileNotification()
// #endregion
</script>

<template>
  <el-config-provider :locale="epLocale" :z-index="20000">
    <router-view />
  </el-config-provider>
</template>
