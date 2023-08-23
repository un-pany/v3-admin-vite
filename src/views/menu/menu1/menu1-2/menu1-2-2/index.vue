<script lang="ts" setup>
import { ref } from "vue"

defineOptions({
  name: "Menu1-2-2"
})

const text = ref("")
</script>

<template>
  <div class="app-container">
    <el-card header="四级路由缓存 - menu1-2-2">
      <el-input v-model="text" />
    </el-card>
  </div>
</template>
