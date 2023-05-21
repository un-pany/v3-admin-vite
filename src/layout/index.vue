<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore, DeviceEnum } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { AppMain, NavigationBar, Settings, Sidebar, TagsView, RightPanel } from "./components"
import useResize from "./hooks/useResize"

const appStore = useAppStore()
const settingsStore = useSettingsStore()

/** Layout 布局响应式 */
useResize()

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceEnum.Mobile,
    showGreyMode: showGreyMode.value,
    showColorWeakness: showColorWeakness.value
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
const showGreyMode = computed(() => {
  return settingsStore.showGreyMode
})
const showColorWeakness = computed(() => {
  return settingsStore.showColorWeakness
})
const handleClickOutside = () => {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

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
  transition: margin-left 0.28s;
  margin-left: var(--v3-sidebar-width);
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
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
  transition: width 0.28s;
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

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }
  .sidebar-container {
    transition: transform 0.28s;
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
