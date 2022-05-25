<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"
import SidebarItem from "./SidebarItem.vue"
import SidebarLogo from "./SidebarLogo.vue"
import { getCssVariableValue } from "@/utils"

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

const route = useRoute()

const sidebar = computed(() => {
  return useAppStore().sidebar
})
const routes = computed(() => {
  return usePermissionStore().routes
})
const showLogo = computed(() => {
  return useSettingsStore().showSidebarLogo
})
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu
    }
  }
  return path
})
const isCollapse = computed(() => {
  return !sidebar.value.opened
})
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        :default-active="activeMenu"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        mode="vertical"
      >
        <SidebarItem
          v-for="routeItem in routes"
          :key="routeItem.path"
          :item="routeItem"
          :base-path="routeItem.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss">
.sidebar-container {
  // 重置当前页面的 element-plus css, ，注意，虽然没有加 scoped 标识，但是被该页面的 sidebar-container 类名包裹，所以不会影响其他页面
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }
    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

::v-deep(.el-menu-item),
::v-deep(.el-sub-menu__title),
::v-deep(.el-sub-menu .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

::v-deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  ::v-deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--v3-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>
