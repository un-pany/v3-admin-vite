<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"
import SidebarItem from "./SidebarItem.vue"
import SidebarLogo from "./SidebarLogo.vue"

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
        background-color="#152d3d"
        text-color="#C0C4CC"
        active-text-color="#fff"
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
    background-color: #66b1ff;
  }
}

.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    // 84px 是 logo 区域的 height
    height: calc(100% - 84px);
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
  height: 60px;
  line-height: 60px;
  &:hover {
    background-color: #ffffff10;
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
        color: #fff !important;
        @include tip-line;
      }
    }
  }
}
</style>
