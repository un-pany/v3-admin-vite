<template>
  <div @click="click">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon :size="20">
        <full-screen />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('您的浏览器无法工作')
    return
  }
  screenfull.toggle()
}
</script>
