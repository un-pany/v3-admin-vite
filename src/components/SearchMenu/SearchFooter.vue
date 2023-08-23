<script lang="ts" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { DeviceEnum } from "@/constants/app-key"

interface Props {
  total: number
}

const props = defineProps<Props>()

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
</script>

<template>
  <div class="search-footer">
    <template v-if="!isMobile">
      <span class="search-footer-item">
        <SvgIcon name="keyboard-enter" />
        <span>确认</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-up" />
        <SvgIcon name="keyboard-down" />
        <span>切换</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-esc" />
        <span>关闭</span>
      </span>
    </template>
    <span class="search-footer-total">共 {{ props.total }} 项</span>
  </div>
</template>

<style lang="scss" scoped>
.search-footer {
  display: flex;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  &-item {
    display: flex;
    align-items: center;
    margin-right: 12px;
    .svg-icon {
      margin-right: 5px;
      padding: 2px;
      font-size: 20px;
      background-color: var(--el-fill-color);
    }
  }
  &-total {
    margin: 0 0 0 auto;
  }
}
</style>
