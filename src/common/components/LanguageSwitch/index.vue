<script setup lang="ts">
import { useLanguage } from "@/common/composables/useLanguage"

const { languageList, setLanguage, activeLanguageName } = useLanguage()
</script>

<template>
  <el-dropdown trigger="click">
    <div>
      <el-tooltip effect="dark" :content="$t('languageSwitch.tooltip')" placement="bottom">
        <SvgIcon name="language" class="svg-icon" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.name"
          :disabled="activeLanguageName === item.name"
          @click="() => setLanguage(item.name)"
        >
          {{ item.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
