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
    <el-tag type="success" size="large"> 当前页面只有 admin 权限可见 </el-tag>
    <SwitchRoles @change="handleRolesChange" />
  </div>
</template>

<style lang="scss" scoped>
.el-tag {
  margin-bottom: 15px;
}
</style>
