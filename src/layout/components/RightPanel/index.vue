<!-- 右侧悬浮设置面板 -->
<template>
  <div class="handle-button" :style="{top: buttonTop + 'px'}" @click="show = true">
    <el-icon :size="24">
      <Setting />
    </el-icon>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'

defineProps({
  buttonTop: {
    type: Number,
    default: 250
  }
})

const show = ref(false)
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: #152d3d;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
