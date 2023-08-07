<script lang="ts" setup>
import { ref } from "vue"
import SearchModal from "./SearchModal.vue"

const visible = ref(false)
const toggle = () => {
  visible.value = !visible.value
}
</script>

<template>
  <div>
    <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <SvgIcon name="search" @click="toggle" />
    </el-tooltip>
    <SearchModal v-model="visible" />
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
