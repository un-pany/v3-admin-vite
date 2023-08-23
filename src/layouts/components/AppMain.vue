<script lang="ts" setup>
import useTabBarStore from "@/store/modules/tab-bar"
import { computed } from "vue"

const tabBarStore = useTabBarStore()
const cacheList = computed(() => tabBarStore.getCacheList)
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
          <keep-alive v-else :include="cacheList">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
    <!-- 返回顶部 -->
    <el-backtop />
    <!-- 返回顶部（固定 Header 情况下） -->
    <el-backtop target=".app-scrollbar" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.app-main {
  width: 100%;
  background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
}
</style>
