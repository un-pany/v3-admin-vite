<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"

const { params, query } = useRoute()
const { path } = params

useRouter().replace({ path: "/" + path, query })
</script>

<template>
  <div />
</template>
