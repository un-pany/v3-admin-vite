<template>
  <el-dropdown trigger="click" @command="handleCommand" size="large">
    <div>
      <el-tooltip effect="dark" content="控件尺寸" placement="bottom">
        <svg-icon name="size" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in options"
          :key="index"
          :command="item.value"
          :disabled="item.value === settingsStore.controlSize"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useSettingsStoreHook } from "@/store/modules/settings"
const settingsStore = useSettingsStoreHook()
const options = [
  {
    value: "large",
    label: "大号"
  },
  {
    value: "default",
    label: "默认"
  },
  {
    value: "small",
    label: "小号"
  }
]
const handleCommand = (command: string) => {
  settingsStore.updateControlSize(command)
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 10px;
}
</style>
