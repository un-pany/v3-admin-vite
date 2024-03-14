<script lang="ts" setup>
import { type ThemeName, useTheme } from "@/hooks/useTheme"
import { MagicStick } from "@element-plus/icons-vue"

const { themeList, activeThemeName, setTheme } = useTheme()

const onChangeTheme = (event: MouseEvent, themeName: ThemeName) => {
  document.documentElement.style.setProperty("--x", event.clientX + "px")
  document.documentElement.style.setProperty("--y", event.clientY + "px")
  const handler = () => setTheme(themeName)
  // @ts-ignore
  if (document.startViewTransition) {
    // @ts-ignore
    document.startViewTransition(handler)
  } else {
    handler()
  }
}
</script>

<template>
  <el-dropdown trigger="click">
    <div>
      <el-tooltip effect="dark" content="主题模式" placement="bottom">
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
          :command="theme.name"
          @click="(e) => onChangeTheme(e, theme.name)"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
