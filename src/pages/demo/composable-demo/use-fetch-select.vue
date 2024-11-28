<script lang="ts" setup>
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { getSelectDataApi } from "./apis/use-fetch-select"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi
})
</script>

<template>
  <div class="app-container">
    <el-card shadow="never">
      该示例是演示：通过 composable 自动调用 api 后拿到 Select 组件需要的数据并传递给 Select 组件
    </el-card>
    <el-card header="Select 示例" shadow="never" v-loading="loading">
      <el-select v-model="value" filterable>
        <el-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="请选择" />
      </el-select>
    </el-card>
    <el-card header="Select V2 示例（如果数据量过多，可以选择该组件）" shadow="never" v-loading="loading">
      <el-select-v2 v-model="value" :options="options" filterable placeholder="请选择" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
