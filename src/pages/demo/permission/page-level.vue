<script lang="ts" setup>
import SwitchUser from "./components/SwitchUser.vue"
</script>

<template>
  <div class="app-container">
    <SwitchUser />
    <el-card shadow="never" class="content">
      当前页面只有「admin」角色或「permission:page-level」权限可见，切换用户后将不能进入该页面
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
