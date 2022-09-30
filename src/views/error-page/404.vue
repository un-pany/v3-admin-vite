<script lang="ts" setup>
import Svg404 from "@/assets/error-page/404.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <div class="error-page">
    <Svg404 class="error-page-svg" />
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
