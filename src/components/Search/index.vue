<script lang="ts" setup>
import { useBool } from "@/hooks/useBool"
import SearchModal from "./SearchModal.vue"

const { ref: refVisible, toggle } = useBool()
</script>

<template>
  <div>
    <el-tooltip effect="dark" content="搜索" placement="bottom">
      <SvgIcon name="search" @click="toggle" />
    </el-tooltip>
    <SearchModal v-model:value="refVisible" />
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
