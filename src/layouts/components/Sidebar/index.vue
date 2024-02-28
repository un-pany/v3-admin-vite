<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"
import SidebarItem from "./SidebarItem.vue"
import Logo from "../Logo/index.vue"
import { useDevice } from "@/hooks/useDevice"
import { useLayoutMode } from "@/hooks/useLayoutMode"
import { getCssVariableValue } from "@/utils"

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

const { isMobile } = useDevice()
const { isLeft, isTop } = useLayoutMode()
const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})
const noHiddenRoutes = computed(() => permissionStore.routes.filter((item) => !item.meta?.hidden))
const isCollapse = computed(() => !appStore.sidebar.opened)
const isLogo = computed(() => isLeft.value && settingsStore.showLogo)
const backgroundColor = computed(() => (isLeft.value ? v3SidebarMenuBgColor : undefined))
const textColor = computed(() => (isLeft.value ? v3SidebarMenuTextColor : undefined))
const activeTextColor = computed(() => (isLeft.value ? v3SidebarMenuActiveTextColor : undefined))
const sidebarMenuItemHeight = computed(() => {
  return !isTop.value ? "var(--v3-sidebar-menu-item-height)" : "var(--v3-navigationbar-height)"
})
const sidebarMenuHoverBgColor = computed(() => {
  return !isTop.value ? "var(--v3-sidebar-menu-hover-bg-color)" : "transparent"
})
const tipLineWidth = computed(() => {
  return !isTop.value ? "2px" : "0px"
})
// 当为顶部模式时隐藏垂直滚动条
const hiddenScrollbarVerticalBar = computed(() => {
  return isTop.value ? "none" : "block"
})
</script>

<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse && !isTop"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="isTop && !isMobile ? 'horizontal' : 'vertical'"
      >
        <SidebarItem v-for="route in noHiddenRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
%tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
    height: calc(101% - var(--v3-header-height));
  }
}

.el-scrollbar {
  // 多 1% 是为了在顶部模式时防止垂直滚动
  height: 101%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
    &.is-vertical {
      // 当为顶部模式时隐藏垂直滚动条
      display: v-bind(hiddenScrollbarVerticalBar);
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item.is-active) {
  @extend %tip-line;
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      @extend %tip-line;
    }
  }
}
</style>
