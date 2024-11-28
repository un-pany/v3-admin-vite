<script lang="ts" setup>
import SvgAdmin from "../images/admin.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <div class="app-container center">
    <SvgAdmin class="svg" />
    <p>欢迎来到「Admin」角色专属首页</p>
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
