<script lang="ts" setup>
import { type ThemeName, useTheme } from "@/hooks/useTheme"
import { MagicStick } from "@element-plus/icons-vue"

const { themeList, activeThemeName, setTheme } = useTheme()

const handleChangeTheme = ({ clientX, clientY }: MouseEvent, themeName: ThemeName) => {
  const maxRadius = Math.hypot(
    Math.max(clientX, window.innerWidth - clientX),
    Math.max(clientY, window.innerHeight - clientY)
  )
  const style = document.documentElement.style
  style.setProperty("--v3-theme-x", clientX + "px")
  style.setProperty("--v3-theme-y", clientY + "px")
  style.setProperty("--v3-theme-r", maxRadius + "px")
  const handler = () => {
    setTheme(themeName)
  }
  // @ts-expect-error
  document.startViewTransition ? document.startViewTransition(handler) : handler()
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
          @click="
            (e) => {
              handleChangeTheme(e, theme.name)
            }
          "
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
