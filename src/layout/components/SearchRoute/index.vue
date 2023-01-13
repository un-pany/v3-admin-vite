<template>
  <div>
    <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <el-icon @click="searchClick"><Search /></el-icon>
    </el-tooltip>
    <SearchModal v-model:value="value" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { SearchModal } from "./components/index"
const value = ref(false)
const searchClick = () => {
  value.value = true
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 10px;
}
</style>
