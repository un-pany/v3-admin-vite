<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core"
import { ref, computed, getCurrentInstance, onMounted } from "vue"
import { RouteRecordName, RouteRecordRaw } from "vue-router"

interface Props {
  value: RouteRecordName
  options: RouteRecordRaw[]
}

interface Emits {
  (e: "update:value", val: Props["value"]): void
  (e: "sure"): void
}

const resultRef = ref<HTMLDivElement>()
const innerHeight = ref(0)
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<Emits>()
const instance = getCurrentInstance()

const itemStyle = (item: RouteRecordRaw) => ({
  background: item.name === active.value ? "var(--el-color-primary)" : "",
  color: item.name === active.value ? "#fff" : ""
})

const active = computed({
  get() {
    return props.value
  },
  set(val: Props["value"]) {
    emit("update:value", val)
  }
})

/** 鼠标移入 */
function handleMouse(item: Props["options"][number]) {
  active.value = item.name as string
}

function resizeResult() {
  // el-scrollbar max-height="40vh"
  innerHeight.value = Number((window.innerHeight * 0.4).toFixed(1))
}

useResizeObserver(resultRef, resizeResult)

function handleScroll(index: number) {
  const curInstance = instance?.proxy?.$refs[`resultItemRef${index}`] as HTMLElement[]
  if (!curInstance) return 0
  const curRef = curInstance[0]
  const scrollTop = curRef.offsetTop + 128 // 128 = 两个 result-item（56 + 56 = 112）高度加上下 margin（8 + 8 = 16）
  return scrollTop > innerHeight.value ? scrollTop - innerHeight.value : 0
}

onMounted(resizeResult)

defineExpose({ handleScroll })
</script>

<template>
  <div ref="resultRef" class="result">
    <div
      v-for="(item, index) in options"
      :key="item.name"
      :ref="'resultItemRef' + index"
      class="result-item dark:bg-#1d1d1d"
      :style="itemStyle(item)"
      @click="$emit('sure')"
      @mouseenter="handleMouse(item)"
    >
      <component v-if="item.meta?.elIcon" :is="item.meta?.elIcon" class="w-22px" />
      <SvgIcon v-else :name="item.meta?.svgIcon ?? ''" class="text-22px" />
      <span class="result-item-title">
        {{ item.meta?.title }}
      </span>
      <SvgIcon v-if="active === item.name" name="keyboard-enter" class="text-22px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  padding-bottom: 12px;

  &-item {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 14px;
    margin-top: 8px;
    cursor: pointer;
    border: 0.1px solid #ccc;
    border-radius: 4px;
    transition: all 300ms;

    &-title {
      display: flex;
      flex: 1;
      margin-left: 5px;
    }
  }
}
</style>
