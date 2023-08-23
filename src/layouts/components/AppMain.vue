<script lang="ts" setup>
import { useTagsViewStore } from "@/store/modules/tags-view"

const tagsViewStore = useTagsViewStore()
</script>

<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <RouterView>
        <template #default="{ Component, route }">
          <transition name="fade" mode="out-in" appear>
            <keep-alive v-if="route.meta.keepAlive" :include="tagsViewStore.cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath" />
          </transition>
        </template>
      </RouterView>
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
