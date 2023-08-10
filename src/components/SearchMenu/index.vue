<script lang="ts" setup>
import { ref } from "vue"
import SearchModal from "./SearchModal.vue"

/** 控制 modal 显隐 */
const modalVisible = ref<boolean>(false)
/** 打开 modal */
const handleOpen = () => {
  modalVisible.value = true
}
</script>

<template>
  <div>
    <el-tooltip effect="dark" content="搜索菜单" placement="bottom">
      <SvgIcon name="search" @click="handleOpen" />
    </el-tooltip>
    <SearchModal v-model="modalVisible" />
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
