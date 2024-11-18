<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { ref, watch } from "vue"

const userStore = useUserStore()
const switchRoles = ref(userStore.roles[0])
watch(switchRoles, (value) => {
  userStore.changeRoles(value)
})
</script>

<template>
  <div>
    <div>你的角色：{{ userStore.roles }}</div>
    <div class="switch-roles">
      <span>切换用户（模拟重新登录）：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
