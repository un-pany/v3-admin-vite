<script lang="ts" setup>
import type { NotifyItem } from "./type"

interface Props {
  data: NotifyItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <el-empty v-if="props.data.length === 0" />
  <el-card v-else v-for="(item, index) in props.data" :key="index" shadow="never" class="card-container">
    <template #header>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <el-tag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</el-tag>
          </span>
          <div class="card-time">
            {{ item.datetime }}
          </div>
        </div>
        <div v-if="item.avatar" class="card-avatar">
          <img :src="item.avatar" width="34">
        </div>
      </div>
    </template>
    <div class="card-body">
      {{ item.description ?? "No Data" }}
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
