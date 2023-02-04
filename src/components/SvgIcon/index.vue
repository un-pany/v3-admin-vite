<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <i class="el-icon el-tooltip__trigger">
    <svg class="svg-icon" aria-hidden="true" :font-size="size">
      <use :href="symbolId" />
    </svg>
  </i>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
