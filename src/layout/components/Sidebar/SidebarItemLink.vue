<script lang="ts" setup>
import { useRouter } from "vue-router"
import { isExternal } from "@/utils/validate"

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const router = useRouter()

const push = () => {
  router.push(props.to).catch((err) => {
    console.warn(err)
  })
}
</script>

<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>
