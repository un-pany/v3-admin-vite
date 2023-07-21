<script lang="ts" setup>
import { h } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { resetConfigLayout } from "@/utils"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

/** 作者小心思 */
ElNotification({
  title: "Hello",
  type: "success",
  message: h(
    "a",
    { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" },
    "小项目获取 star 不易，如果你喜欢这个项目的话，欢迎点击这里支持一个 star ！这是作者持续维护的唯一动力（小声：毕竟是免费的）"
  ),
  duration: 0,
  position: "bottom-right"
})
ElNotification({
  title: "破坏性更新",
  type: "warning",
  message: h(
    "span",
    {
      style: "color: teal; cursor: pointer;",
      onClick: resetConfigLayout
    },
    "由于平台 4.1.0 版本新增了多种布局模式，如果第一次出现白屏情况，点击这里或手动前往控制台清理 LocalStorage 缓存数据后刷新页面即可！"
  ),
  duration: 0,
  position: "bottom-right",
  offset: 150
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
