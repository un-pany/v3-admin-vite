<script lang="ts" setup>
import SwitchRoles from "./components/SwitchRoles.vue"
</script>

<template>
  <div class="app-container">
    <SwitchRoles />
    <el-card shadow="never" class="content">
      当前页面只有「Admin」角色可见，切换角色后将不能进入该页面
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
