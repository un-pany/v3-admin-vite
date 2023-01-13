<script setup lang="ts">
import { computed } from "vue"
import { OptionsItem } from "."

interface Props {
  value: string
  options: Array<OptionsItem>
}

interface Emits {
  (e: "update:value", val: string): void
  (e: "enter"): void
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<Emits>()

const itemStyle = computed(() => {
  return (item: OptionsItem) => {
    return {
      background: item.path === active.value ? "#00ccff" : "",
      color: item.path === active.value ? "#fff" : "",
      fontSize: item.path === active.value ? "16px" : "14px"
    }
  }
})

const active = computed({
  get() {
    return props.value
  },
  set(val: string) {
    emit("update:value", val)
  }
})

/** 鼠标移入 */
async function handleMouse(item: OptionsItem) {
  active.value = item.path
}

function handleTo() {
  emit("enter")
}
</script>

<template>
  <div class="result">
    <template v-for="item in options" :key="item.path">
      <div
        class="result-item dark:bg-[#1d1d1d]"
        :style="itemStyle(item)"
        @click="handleTo"
        @mouseenter="handleMouse(item)"
      >
        <svg-icon v-if="item.meta?.svgIcon" :name="item.meta?.svgIcon" />
        <span class="result-item-title">{{ item.meta?.title }}</span>
        <svg-icon name="enter_outlined" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.result {
  padding-bottom: 12px;

  &-item {
    display: flex;
    align-items: center;
    height: 56px;
    margin-top: 8px;
    padding: 14px;
    border-radius: 4px;
    cursor: pointer;
    border: 0.1px solid #ccc;
    transition: all 0.3s;

    &-title {
      display: flex;
      flex: 1;
      margin-left: 5px;
    }
  }
}
</style>
