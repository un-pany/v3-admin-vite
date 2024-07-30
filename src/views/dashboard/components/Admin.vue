<script lang="ts" setup>
import { computed } from "vue"

const curVersion = computed(() => __V3_ADMIN_VITE_VERSION__ ?? "")
</script>

<template>
  <div class="app-container">
    <el-empty description="欢迎来到 admin 角色专属首页" />
    <p v-if="curVersion">
      <span>当前版本：</span>
      <span>{{ curVersion }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-secondary);
}
</style>
