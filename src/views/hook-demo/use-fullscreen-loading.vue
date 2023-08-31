<script lang="ts" setup>
import { useFullscreenLoading } from "@/hooks/useFullscreenLoading"
import { getSuccessApi, getErrorApi } from "@/api/hook-demo/use-fullscreen-loading"
import { ElMessage } from "element-plus"

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

const querySuccess = async () => {
  // 注意：
  // 1. getSuccessApi 是一个函数而非函数调用
  // 2. 如需给 getSuccessApi 函数传递参数，请在后面的括号中进行（真正的 getSuccessApi 调用）
  const res = await useFullscreenLoading(getSuccessApi)([2, 3, 3])
  ElMessage.success(`${res.message}，传参为 ${res.data.list.toString()}`)
}

const queryError = async () => {
  try {
    await useFullscreenLoading(getErrorApi, options)()
  } catch (err: any) {
    ElMessage.error(err.message)
  }
}
</script>

<template>
  <div class="app-container">
    <h4>该示例是演示：通过将要执行的函数传递给 hook，让 hook 自动开启全屏 loading，函数执行结束后自动关闭 loading</h4>
    <el-button type="primary" @click="querySuccess">查询成功</el-button>
    <el-button type="danger" @click="queryError">查询失败</el-button>
  </div>
</template>
