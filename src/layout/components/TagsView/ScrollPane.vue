<script lang="ts" setup>
import { ref } from "vue"
import { ElScrollbar } from "element-plus"
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue"
const scrollContainerRef = ref<HTMLDivElement>()
const scrollbarBoxRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

// current scrolled distance
let currentScrollLeft = 0
// the distance of each manual trigger scroll
const translatePerDistance = 200
const toleranceDistance = 40

// scroll trigger
const scrollChange = ({ scrollLeft = 0 }) => {
  currentScrollLeft = scrollLeft
}

// click to scroll
const scrollTo = (type: string) => {
  // container width
  const scrollContainerWidth = scrollContainerRef.value!.clientWidth
  // content width
  const scrollbarBoxWidth = scrollbarBoxRef.value!.clientWidth
  // If no scroll bar appears, return directly
  if (scrollContainerWidth > scrollbarBoxWidth) return
  let translateDistance = 0
  if (type === "prev") {
    translateDistance =
      currentScrollLeft > translatePerDistance + toleranceDistance ? currentScrollLeft - translatePerDistance : 0
  } else if (type === "next") {
    // remaining unscrolled width on the right
    const lastDistance = scrollbarBoxWidth - currentScrollLeft - scrollContainerWidth
    translateDistance =
      lastDistance > translatePerDistance + toleranceDistance
        ? currentScrollLeft + translatePerDistance
        : currentScrollLeft + lastDistance
  }
  scrollbarRef.value!.setScrollLeft(translateDistance)
}
</script>

<template>
  <div ref="scrollContainerRef" class="scroll-container">
    <el-button type="info" class="scroll-indicator prev" :icon="ArrowLeftBold" @click="scrollTo('prev')" plain />
    <el-scrollbar ref="scrollbarRef" :vertical="false" class="scroll-bar" @scroll="scrollChange">
      <div ref="scrollbarBoxRef" class="scroll-bar_box">
        <slot />
      </div>
    </el-scrollbar>
    <el-button type="info" class="scroll-indicator next" :icon="ArrowRightBold" @click="scrollTo('next')" plain />
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  position: relative;
  width: 100%;
  .scroll-indicator {
    position: absolute;
    top: 0;
    z-index: 1;
    padding: 0;
    &.prev {
      left: 2px;
    }
    &.next {
      right: 2px;
    }
  }
  .scroll-bar {
    // 超出窗口长度时，显示滚动条
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__wrap) {
      scroll-behavior: smooth;
    }
    .scroll-bar_box {
      display: inline-block;
    }
  }
}
</style>
