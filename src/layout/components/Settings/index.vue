<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"

const settingsStore = useSettingsStore()

/** 使用 storeToRefs 将提取的属性保持其响应性 */
const {
  showTagsView,
  showSidebarLogo,
  fixedHeader,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** 定义 switch 设置项 */
const switchSettings = {
  显示标签栏: showTagsView,
  "显示侧边栏 Logo": showSidebarLogo,
  "固定 Header": fixedHeader,
  显示消息通知: showNotify,
  显示切换主题按钮: showThemeSwitch,
  显示全屏按钮: showScreenfull,
  显示灰色模式: showGreyMode,
  显示色弱模式: showColorWeakness
}
</script>

<template>
  <div class="setting-container">
    <h4>系统布局配置</h4>
    <div class="setting-item" v-for="(settingValue, settingName, index) in switchSettings" :key="index">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.setting-container {
  padding: 20px;
  .setting-item {
    font-size: 14px;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .setting-name {
      @include ellipsis;
    }
  }
}
</style>
