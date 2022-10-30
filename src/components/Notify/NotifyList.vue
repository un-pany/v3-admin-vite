<script lang="ts" setup>
const props = defineProps({
  list: Object
})
</script>

<template>
  <el-card v-for="(item, index) in props.list" :key="index" class="box-card">
    <template #header v-if="item.avatar">
      <div class="card-header">
        <span><el-avatar :src="item.avatar" /></span>
        <div>
          <span class="card-title">{{ item.title }}</span>
          <div class="date-time">{{ item.datetime }}</div>
        </div>
      </div>
    </template>
    <template #header v-else>
      <div class="card-header">
        <span class="card-title">{{ item.title }}</span>
        <el-button text :type="item.status" size="small">{{ item.extra }}</el-button>
      </div>
    </template>
    <div class="text item">
      {{ item.description }}
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}

.text {
  font-size: 12px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  margin: 8px auto;
}

.date-time {
  font-size: 12px;
  color: grey;
  text-align: right;
}

.card-title {
  font-weight: 600;
}
</style>
