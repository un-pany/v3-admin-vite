<!-- 切换角色 -->
<template>
  <div>
    <div style="margin-bottom: 15px">
      你的权限：{{ roles }}
    </div>
    <div style="display: flex; align-items: center">
      <span>切换权限：</span>
      <el-radio-group v-model="currentRole">
        <el-radio-button label="editor" />
        <el-radio-button label="admin" />
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { computed, ref, watch } from 'vue'

const userStore = useUserStore()
const emit = defineEmits(['change'])
const roles = computed(() => userStore.roles)
const currentRole = ref(roles.value[0])
watch(currentRole, async(value) => {
  await userStore.changeRoles(value)
  emit('change')
})
</script>
