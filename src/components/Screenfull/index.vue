<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { FullScreen } from "@element-plus/icons-vue"
import screenfull from "screenfull"

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器无法工作")
    return
  }
  screenfull.toggle()
}
</script>

<template>
  <div @click="click">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon :size="20">
        <FullScreen />
      </el-icon>
    </el-tooltip>
  </div>
</template>
