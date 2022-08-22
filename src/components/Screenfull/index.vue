<script lang="ts" setup>
import { ref, onUnmounted } from "vue"
import { ElMessage } from "element-plus"
import screenfull from "screenfull"

type contentType = "全屏" | "退出全屏"

const content = ref<contentType>("全屏")
const isFullscreen = ref(false)

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器无法工作")
    return
  }
  screenfull.toggle()
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
  content.value = screenfull.isFullscreen ? "退出全屏" : "全屏"
}

screenfull.on("change", change)

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<template>
  <div @click="click">
    <el-tooltip effect="dark" :content="content" placement="bottom">
      <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
