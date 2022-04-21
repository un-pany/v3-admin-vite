<!-- 导航栏 -->
<template>
  <div class="navbar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="state.toggleSideBar" />
    <BreadCrumb class="breadcrumb" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <el-avatar :icon="UserFilled" :size="34" />
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://juejin.cn/post/6963876125428678693">
              <el-dropdown-item>中文文档</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin/blob/master/README.en.md">
              <el-dropdown-item>English Docs</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="state.logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { useUserStore } from '@/store/modules/user'
import BreadCrumb from '../bread-crumb/index.vue'
import Hamburger from '../hamburger/index.vue'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const sidebar = computed(() => {
  return appStore.sidebar
})
const showThemeSwitch = computed(() => {
  return settingsStore.showThemeSwitch
})
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})
const state = reactive({
  toggleSideBar: () => {
    appStore.toggleSidebar(false)
  },
  logout: () => {
    userStore.logout()
    router.push('/login').catch((err) => {
      console.warn(err)
    })
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #5a5e66;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
