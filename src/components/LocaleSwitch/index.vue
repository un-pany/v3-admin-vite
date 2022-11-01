<script lang="ts" setup>
import { ref } from "vue"
import { useLocales } from "../../store/modules/locales"

type contentType = "切换中文" | "Swich To English"
const content = ref<contentType>("Swich To English")
const locales = useLocales()

const click = () => {
  locales.locale = locales.locale === "en" ? "zh" : "en"
  content.value = locales.locale === "en" ? "切换中文" : "Swich To English"
}
</script>

<template>
  <div @click="click">
    <el-tooltip effect="dark" :content="content" placement="bottom">
      <svg-icon :name="locales.locale === 'en' ? 'locales-en' : 'locales-zh'" />
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
