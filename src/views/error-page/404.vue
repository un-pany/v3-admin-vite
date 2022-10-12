<script lang="ts" setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
import Svg404 from "@/assets/error-page/404.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <ErrorPageLayout>
    <Svg404 />
  </ErrorPageLayout>
</template>
