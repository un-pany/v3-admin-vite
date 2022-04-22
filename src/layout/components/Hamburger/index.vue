<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["toggle-click"])

const toggleClick = () => {
  emit("toggle-click")
}
</script>

<template>
  <div @click="toggleClick">
    <el-icon :size="20" class="icon">
      <fold v-if="isActive" />
      <expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
