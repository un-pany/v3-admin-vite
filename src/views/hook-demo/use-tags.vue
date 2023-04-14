<script lang="ts" setup>
import { useTags } from "@/hooks/useTags"
const { closeCurrent, refresh } = useTags()
</script>

<template>
  <div class="app-container">
    <el-card>
      <el-button @click="closeCurrent">关闭当前Tag</el-button>
      <el-button @click="refresh($route)">刷新当前Tag</el-button>
    </el-card>
  </div>
</template>

<style scoped></style>
