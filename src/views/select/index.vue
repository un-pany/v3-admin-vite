<script setup name="Select" lang="ts">
import { getRemoteSelectData } from "@/api/select"
import { useFetchSelect } from "@/hooks/useFetchSelect"

const { loading, options, selectedValue } = useFetchSelect({
  apiFun: getRemoteSelectData
})
</script>

<template>
  <div class="app-container">
    <el-select :loading="loading" v-model="selectedValue">
      <el-option v-for="(item, index) in options" v-bind="item" :key="index" />
    </el-select>
  </div>
</template>
