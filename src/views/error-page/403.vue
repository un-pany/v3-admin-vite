<script lang="ts" setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue"
import Svg403 from "@/assets/error-page/403.svg?component" // vite-svg-loader 插件的功能
</script>

<template>
  <ErrorPageLayout>
    <Svg403 />
  </ErrorPageLayout>
</template>
