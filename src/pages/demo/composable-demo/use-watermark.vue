<script lang="ts" setup>
import { useWatermark } from "@@/composables/useWatermark"

const localRef = ref<HTMLElement | null>(null)
const { setWatermark, clearWatermark } = useWatermark(localRef)
const { setWatermark: setGlobalWatermark, clearWatermark: clearGlobalWatermark } = useWatermark()
</script>

<template>
  <div class="app-container">
    <el-card shadow="never">
      该示例是演示：通过调用 composable 开启或关闭水印，
      支持局部、全局、自定义样式（颜色、透明度、字体大小、字体、倾斜角度等），并自带防御（防删、防隐藏）和自适应功能
    </el-card>
    <el-card header="示例" shadow="never">
      <div ref="localRef" class="local" />
      <template #footer>
        <el-button-group>
          <el-button type="primary" @click="setWatermark('局部水印', { color: '#409eff' })">
            创建局部水印
          </el-button>
          <el-button type="warning" @click="setWatermark('没有防御功能的局部水印', { color: '#e6a23c', defense: false })">
            创建无防御局部水印
          </el-button>
          <el-button type="danger" @click="clearWatermark">
            清除局部水印
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" @click="setGlobalWatermark('全局水印', { color: '#409eff' })">
            创建全局水印
          </el-button>
          <el-button type="warning" @click="setGlobalWatermark('没有防御功能的全局水印', { color: '#e6a23c', defense: false })">
            创建无防御全局水印
          </el-button>
          <el-button type="danger" @click="clearGlobalWatermark">
            清除全局水印
          </el-button>
        </el-button-group>
      </template>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

.local {
  height: 35vh;
  border: 2px dashed var(--el-color-primary);
}

.el-button-group {
  margin-right: 12px;
  margin-bottom: 5px;
}
</style>
