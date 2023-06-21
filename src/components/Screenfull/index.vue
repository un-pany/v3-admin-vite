<script lang="ts" setup>
import { ref, watchEffect } from "vue"
import { ElMessage } from "element-plus"
import screenfull from "screenfull"

interface Props {
  element?: string
  openTips?: string
  exitTips?: string
}

const props = withDefaults(defineProps<Props>(), {
  /** 全屏的元素，默认是 html */
  element: "html",
  /** 打开全屏提示语 */
  openTips: "全屏",
  /** 关闭全屏提示语 */
  exitTips: "退出全屏"
})

const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)

const handleClick = () => {
  const dom = document.querySelector(props.element) || undefined
  screenfull.isEnabled ? screenfull.toggle(dom) : ElMessage.warning("您的浏览器无法工作")
}

const handleChange = () => {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

watchEffect((onCleanup) => {
  // 挂载组件时自动执行
  screenfull.on("change", handleChange)
  // 卸载组件时自动执行
  onCleanup(() => {
    screenfull.isEnabled && screenfull.off("change", handleChange)
  })
})
</script>

<template>
  <div @click="handleClick">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
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
