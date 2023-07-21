<template>
  <div class="app-container">
    <el-card header="多级菜单缓存 - menu1-3">
      <el-input v-model="text" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

defineOptions({
  name: "Menu1-3"
})

const text = ref("")
</script>
