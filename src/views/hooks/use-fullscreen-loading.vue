<template>
  <div class="app-container">
    <el-button @click="querySuccess">查询成功</el-button>
    <el-button @click="queryFailed">查询失败</el-button>
  </div>
</template>

<script lang="ts" setup>
import { getBirds, getCars, type IBirdsItem } from "@/api/mock"
import { useFullscreenLoading } from "@/hooks/useFullscreenLoading"
import { ElMessage } from "element-plus"

const querySuccess = async () => {
  const birds = await useFullscreenLoading(getBirds)()
  ElMessage.success(birds.map((t: IBirdsItem) => t.name).join())
}

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

const queryFailed = async () => {
  try {
    await useFullscreenLoading(getCars, {
      text: "自定义加载文字",
      background: "rgba(255, 214, 210, 0.7)",
      svg,
      svgViewBox: "-10, -10, 50, 50"
    })(233)
  } catch (err: any) {
    ElMessage.error(err.message)
  }
}
</script>
