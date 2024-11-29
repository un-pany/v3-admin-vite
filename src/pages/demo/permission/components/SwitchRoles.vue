<script lang="ts" setup>
import { useUserStore } from "@/pinia/stores/user"

const userStore = useUserStore()

const switchRoles = ref(userStore.roles[0])

watch(switchRoles, (value) => {
  userStore.changeRoles(value)
})
</script>

<template>
  <el-card shadow="never">
    <div>
      <span>你的角色：</span>
      <el-tag v-for="(role, index) in userStore.roles" :key="index" effect="plain" size="large">
        {{ role }}
      </el-tag>
    </div>
    <div class="switch-roles">
      <span>切换用户：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
