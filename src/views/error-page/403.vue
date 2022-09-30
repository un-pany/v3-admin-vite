<script lang="ts" setup>
import Svg403 from "@/assets/error-page/403.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <div class="error-page">
    <Svg403 class="error-page-svg" />
    <router-link to="/">
      <el-button type="primary">回到首页</el-button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
