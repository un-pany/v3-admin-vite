<script setup lang="ts">
import { ref } from "vue"
import { useWatermark } from "@/hooks/useWatermark"

const localRef = ref<HTMLElement | null>(null)
const { setWatermark, clear } = useWatermark(localRef)
const { setWatermark: setGlobalWatermark, clear: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <h4>该示例是演示：通过调用 hook，开启或关闭水印（支持局部、全局、自定义样式）</h4>
    <div ref="localRef" class="local" />
    <el-button-group>
      <el-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })">创建局部水印</el-button>
      <el-button type="danger" @click="clear">清除局部水印</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" @click="setGlobalWatermark('全局水印')">创建全局水印</el-button>
      <el-button type="danger" @click="clearGlobalWatermark">清除全局水印</el-button>
    </el-button-group>
  </div>
</template>

<style lang="scss" scoped>
.local {
  height: 30vh;
  border: 2px dashed var(--el-color-primary);
  margin-bottom: 20px;
}

.el-button-group {
  margin-right: 10px;
}
</style>
