<script lang="ts" setup>
import { useFetchSelect } from "@/hooks/useFetchSelect"
import { getSelectDataApi } from "@/api/hook-demo/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <h4>该示例是演示：通过 hook 自动调用 api 后拿到 Select 组件需要的数据并传递给 Select 组件</h4>
    <h5>Select 示例</h5>
    <el-select :loading="loading" v-model="value" filterable>
      <el-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="请选择" />
    </el-select>
    <h5>Select V2 示例（如果数据量过多，可以选择该组件）</h5>
    <el-select-v2 :loading="loading" v-model="value" :options="options" filterable placeholder="请选择" />
  </div>
</template>
