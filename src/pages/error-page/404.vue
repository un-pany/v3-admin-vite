<script lang="ts" setup>
import Svg404 from "@@/assets/images/error-page/404.svg?component" // vite-svg-loader 插件的功能
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
</script>

<template>
  <ErrorPageLayout>
    <Svg404 />
  </ErrorPageLayout>
</template>
