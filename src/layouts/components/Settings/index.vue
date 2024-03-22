<script lang="ts" setup>
import { watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { useLayoutMode } from "@/hooks/useLayoutMode"
import { resetConfigLayout } from "@/utils"
import SelectLayoutMode from "./SelectLayoutMode.vue"
import { Refresh } from "@element-plus/icons-vue"

const { isLeft } = useLayoutMode()
const settingsStore = useSettingsStore()

/** 使用 storeToRefs 将提取的属性保持其响应性 */
const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** 定义 switch 设置项 */
const switchSettings = {
  显示标签栏: showTagsView,
  "显示 Logo": showLogo,
  "固定 Header": fixedHeader,
  "显示页脚 Footer": showFooter,
  显示消息通知: showNotify,
  显示切换主题按钮: showThemeSwitch,
  显示全屏按钮: showScreenfull,
  显示搜索按钮: showSearchMenu,
  是否缓存标签栏: cacheTagsView,
  开启系统水印: showWatermark,
  显示灰色模式: showGreyMode,
  显示色弱模式: showColorWeakness
}

/** 非左侧模式时，Header 都是 fixed 布局 */
watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true)
})
</script>

<template>
  <div class="setting-container">
    <h4>布局配置</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>功能配置</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchSettings" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" :disabled="!isLeft && settingName === '固定 Header'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetConfigLayout">重 置</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @extend %ellipsis;
    }
  }
  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
