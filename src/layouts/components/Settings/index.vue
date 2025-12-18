<script lang="ts" setup>
import { useLayoutMode } from "@@/composables/useLayoutMode"
import { removeLayoutsConfig } from "@@/utils/cache/local-storage"
import { Refresh } from "@element-plus/icons-vue"
import { useSettingsStore } from "@/pinia/stores/settings"
import SelectLayoutMode from "./SelectLayoutMode.vue"

const { isLeft } = useLayoutMode()

const settingsStore = useSettingsStore()

// 使用 storeToRefs 将提取的属性保持其响应性
const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showLanguageSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness
} = storeToRefs(settingsStore)

/** 定义 switch 设置项 */
const switchSettings = {
  "settings.showTagsView": showTagsView,
  "settings.showLogo": showLogo,
  "settings.fixedHeader": fixedHeader,
  "settings.showFooter": showFooter,
  "settings.showNotify": showNotify,
  "settings.showThemeSwitch": showThemeSwitch,
  "settings.showLanguageSwitch": showLanguageSwitch,
  "settings.showScreenfull": showScreenfull,
  "settings.showSearchMenu": showSearchMenu,
  "settings.cacheTagsView": cacheTagsView,
  "settings.showWatermark": showWatermark,
  "settings.showGreyMode": showGreyMode,
  "settings.showColorWeakness": showColorWeakness
}

// 非左侧模式时，Header 都是 fixed 布局
watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true)
})

/** 重置项目配置 */
function resetLayoutsConfig() {
  removeLayoutsConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>{{ $t("settings.layoutSetting") }}</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>{{ $t("settings.functionalSetting") }}</h4>
    <div v-for="(settingValue, settingName, index) in switchSettings" :key="index" class="setting-item">
      <span class="setting-name">{{ $t(settingName) }}</span>
      <el-switch v-model="settingValue.value" :disabled="!isLeft && settingName === 'settings.fixedHeader'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      {{ $t("settings.resetSetting") }}
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";

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
