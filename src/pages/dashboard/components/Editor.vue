<script lang="ts" setup>
import SvgDashboard from "../images/dashboard.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <div class="app-container center">
    <SvgDashboard class="svg" />
    <p>欢迎来到「Editor」角色专属首页</p>
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .svg {
    width: 600px;
    max-width: 100%;
  }
}
</style>
