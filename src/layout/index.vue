<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { AppMain, NavigationBar, Settings, Sidebar, TagsView, RightPanel } from "./components"
import useResize from "./hooks/useResize"
import { DeviceEnum } from "@/constants/app-key"

const appStore = useAppStore()
const settingsStore = useSettingsStore()

/** Layout 布局响应式 */
useResize()

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceEnum.Mobile,
    showGreyMode: settingsStore.showGreyMode,
    showColorWeakness: settingsStore.showColorWeakness
  }
})

const showSettings = computed(() => {
  return settingsStore.showSettings
})
const showTagsView = computed(() => {
  return settingsStore.showTagsView
})
const fixedHeader = computed(() => {
  return settingsStore.fixedHeader
})

/** 用于处理点击 mobile 端侧边栏遮罩层的事件 */
const handleClickOutside = () => {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="layoutClasses.mobile && layoutClasses.openSidebar" class="drawer-bg" @click="handleClickOutside" />
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain />
      <!-- 右侧设置面板 -->
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.hideSidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// 适配 mobile 端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform $transition-time;
    width: var(--v3-sidebar-width) !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
