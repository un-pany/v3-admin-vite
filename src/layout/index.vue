<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive } from "vue"
import { useAppStore, DeviceType } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { AppMain, NavigationBar, Settings, Sidebar, TagsView, RightPanel } from "./components"
import useResize from "./useResize"

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { sidebar, device, addEventListenerOnResize, resizeMounted, removeEventListenerResize, watchRouter } = useResize()

const state = reactive({
  handleClickOutside: () => {
    appStore.closeSidebar(false)
  }
})
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === DeviceType.Mobile
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

watchRouter()
onBeforeMount(() => {
  addEventListenerOnResize()
})
onMounted(() => {
  resizeMounted()
})
onBeforeUnmount(() => {
  removeEventListenerResize()
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="state.handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar />
        <TagsView v-if="showTagsView" />
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
$sideBarWidth: 220px;

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background: #000;
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
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0;
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
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
  .fixed-header {
    width: calc(100% - 54px);
  }
}

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0;
  }
  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }
  &.openSidebar {
    position: fixed;
    top: 0;
  }
  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
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
