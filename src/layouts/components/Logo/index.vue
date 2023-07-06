<script lang="ts" setup>
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/store/modules/settings"
import { getCssVariableValue } from "@/utils"
import logo from "@/assets/layouts/logo.png?url"
import logoText1 from "@/assets/layouts/logo-text-1.png?url"
import logoText2 from "@/assets/layouts/logo-text-2.png?url"

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
})

const settingsStore = useSettingsStore()
const { layoutMode } = storeToRefs(settingsStore)

const bgCloor = computed(() => {
  return layoutMode.value !== "left"
    ? getCssVariableValue("--v3-header-bg-color")
    : getCssVariableValue("--v3-sidebar-menu-bg-color")
})
</script>

<template>
  <div class="layout-logo-container" :class="{ collapse: props.collapse }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img :src="layoutMode !== 'left' ? logoText2 : logoText1" class="layout-logo-text" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: v-bind(bgCloor);
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
