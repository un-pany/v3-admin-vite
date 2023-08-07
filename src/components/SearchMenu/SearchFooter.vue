<script setup lang="ts">
import { DeviceEnum } from "@/constants/app-key"
import { useAppStore } from "@/store/modules/app"

const props = withDefaults(defineProps<{ total: number }>(), {
  total: 0
})

const appStore = useAppStore()
</script>

<template>
  <div class="search-footer text-#333 dark:text-white">
    <span class="search-footer-item">
      <SvgIcon name="keyboard_enter" />
      确认
    </span>
    <span class="search-footer-item">
      <SvgIcon name="keyboard_up" />
      <SvgIcon name="keyboard_down" />
      切换
    </span>
    <span class="search-footer-item">
      <SvgIcon name="keyboard_esc" />
      关闭
    </span>
    <p v-if="appStore.device !== DeviceEnum.Mobile && props.total > 0" class="search-footer-total">
      共 {{ props.total }} 项
    </p>
  </div>
</template>

<style lang="scss" scoped>
.search-footer {
  display: flex;
  margin: 5px 0;

  &-item {
    display: flex;
    align-items: center;
    margin-right: 14px;
  }

  .svg-icon {
    padding: 2px;
    margin-right: 3px;
    font-size: 20px;
    box-shadow:
      inset 0 -2px #cdcde6,
      inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
  }

  &-total {
    padding: 0;
    margin: 0 0 0 auto;
  }
}
</style>
