<script lang="ts" setup>
import { useFullscreenLoading } from "@@/composables/useFullscreenLoading"
import { getErrorApi, getSuccessApi } from "./apis/use-fullscreen-loading"

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

const options = {
  text: "即将发生错误...",
  background: "#F56C6C20",
  svg,
  svgViewBox: "-10, -10, 50, 50"
}

async function querySuccess() {
  // 注意：
  // 1. getSuccessApi 是一个函数而非函数调用
  // 2. 如需给 getSuccessApi 函数传递参数，请在后面的括号中进行（真正的 getSuccessApi 调用）
  const res = await useFullscreenLoading(getSuccessApi)([1, 2, 3])
  ElMessage.success(`${res.message}，传参为 ${res.data.list.toString()}`)
}

async function queryError() {
  try {
    await useFullscreenLoading(getErrorApi, options)()
  } catch (error) {
    ElMessage.error((error as Error).message)
  }
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never">
      该示例是演示：通过将要执行的函数传递给 composable，让 composable 自动开启全屏 loading，函数执行结束后自动关闭 loading
    </el-card>
    <el-card header="示例" shadow="never">
      <el-button type="primary" @click="querySuccess">
        查询成功
      </el-button>
      <el-button type="danger" @click="queryError">
        查询失败
      </el-button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
