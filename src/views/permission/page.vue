<script lang="ts" setup>
import { useRouter } from "vue-router"
import SwitchRoles from "./components/SwitchRoles.vue"

const router = useRouter()
const handleRolesChange = () => {
  router.push({ path: "/403" })
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <el-tag type="warning" size="large">当前页面只有 admin 权限可见，切换权限后将不能进入该页面</el-tag>
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-top: 15px;
}
</style>
