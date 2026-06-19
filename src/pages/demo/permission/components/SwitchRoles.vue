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
    <div class="switch-roles">
      <span>切换用户：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
    <div class="roles">
      <span>你的角色：</span>
      <el-tag v-for="(role, index) in userStore.roles" :key="index" effect="plain" size="large">
        {{ role }}
      </el-tag>
    </div>
    <div class="permissions">
      <span>你的权限：</span>
      <el-tag v-for="(permission, index) in userStore.permissions" :key="index" effect="plain" size="large">
        {{ permission }}
      </el-tag>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.switch-roles {
  display: flex;
  align-items: center;
}

.roles {
  margin-top: 15px;
}

.permissions {
  margin-top: 15px;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
