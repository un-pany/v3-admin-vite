<script lang="ts" setup>
import SvgSpritesIcon, { type SvgName } from "~virtual/svg-component"
import { computed } from "vue"

type RemoveIconPrefix<T extends SvgName> = T extends `icon-${infer R}` ? R : T;

export type TSvgIconName = RemoveIconPrefix<SvgName>

interface Props {
  name: TSvgIconName
}

const props = defineProps<Props>()

const iconName = computed(() => `icon-${props.name}` as SvgName)
</script>

<template>
  <SvgSpritesIcon :name="iconName" class="svg-icon" />
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
