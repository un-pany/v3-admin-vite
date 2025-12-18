<script lang="ts" setup>
import { useTheme } from "@@/composables/useTheme"
import { MagicStick } from "@element-plus/icons-vue"

const { themeList, activeThemeName, setTheme } = useTheme()
</script>

<template>
  <el-dropdown trigger="click">
    <div>
      <el-tooltip effect="dark" :content="$t('themeSwitch.tooltip')" placement="bottom">
        <el-icon :size="20">
          <MagicStick />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          @click="(e: MouseEvent) => setTheme(e, theme.name)"
        >
          <span>{{ $t(`themeSwitch.${theme.title}`) }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
