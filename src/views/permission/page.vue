<script lang="ts" setup>
import { useRouter } from "vue-router"
import SwitchRoles from "./components/SwitchRoles.vue"

const router = useRouter()

const handleRolesChange = () => {
  router.push({ path: "/401" }).catch((err) => {
    console.warn(err)
  })
}
</script>

<template>
  <div class="app-container">
    <el-tag type="success" size="large" style="margin-bottom: 15px"> 当前页面只有 admin 权限可见 </el-tag>
    <SwitchRoles @change="handleRolesChange" />
  </div>
</template>
