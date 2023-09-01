<script lang="ts" setup>
import { ref } from "vue"
import { useWatermark } from "@/hooks/useWatermark"

const localRef = ref<HTMLElement | null>(null)
const { setWatermark, clearWatermark } = useWatermark(localRef)
const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <h4>
      该示例是演示：通过调用 hook，开启或关闭水印，
      支持局部、全局、自定义样式（颜色、透明度、字体大小、字体、倾斜角度等），并自带防御（防删、防隐藏）和自适应功能
    </h4>
    <div ref="localRef" class="local" />
    <el-button-group>
      <el-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })">创建局部水印</el-button>
      <el-button type="warning" @click="setWatermark('没有防御功能的局部水印', { color: '#e6a23c', defense: false })">
        关闭防御功能
      </el-button>
      <el-button type="danger" @click="clearWatermark">清除局部水印</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" @click="setGlobalWatermark('全局水印', { color: '#409eff' })">创建全局水印</el-button>
      <el-button
        type="warning"
        @click="setGlobalWatermark('没有防御功能的全局水印', { color: '#e6a23c', defense: false })"
      >
        关闭防御功能
      </el-button>
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
  margin-right: 12px;
}
</style>
