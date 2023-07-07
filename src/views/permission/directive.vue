<script lang="ts" setup>
import { ref } from "vue"
import { checkPermission } from "@/utils/permission" // checkPermission 权限判断函数
import SwitchRoles from "./components/SwitchRoles.vue"

/** key 是为了能每次切换权限的时候重新初始化指令 */
const key = ref(1)
const handleRolesChange = () => {
  key.value++
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <!-- v-permission 示例 -->
    <div :key="key" class="margin-top-30">
      <div>
        <el-tag v-permission="['admin']" type="success" size="large" effect="plain">
          这里采用了 v-permission="['admin']" 所以只有 admin 可以看见这句话
        </el-tag>
      </div>
      <div>
        <el-tag v-permission="['editor']" type="success" size="large" effect="plain">
          这里采用了 v-permission="['editor']" 所以只有 editor 可以看见这句话
        </el-tag>
      </div>
      <div class="margin-top-15">
        <el-tag v-permission="['admin', 'editor']" type="success" size="large" effect="plain">
          这里采用了 v-permission="['admin', 'editor']" 所以 admin 和 editor 都可以看见这句话
        </el-tag>
      </div>
    </div>
    <!-- checkPermission 示例 -->
    <div :key="`checkPermission${key}`" class="margin-top-30">
      <el-tag type="warning" size="large">
        例如 Element Plus 的 el-tab-pane 或 el-table-column 以及其它动态渲染 Dom 的场景不适合使用
        v-permission，这种情况下你可以通过 v-if 和 checkPermission 来实现：
      </el-tag>
      <el-tabs type="border-card" class="margin-top-15">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          这里采用了 <el-tag>v-if="checkPermission(['admin'])"</el-tag> 所以只有 admin 可以看见这句话
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="editor">
          这里采用了 <el-tag>v-if="checkPermission(['editor'])"</el-tag> 所以只有 editor 可以看见这句话
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin 和 editor">
          这里采用了 <el-tag>v-if="checkPermission(['admin', 'editor'])"</el-tag> 所以 admin 和 editor 都可以看见这句话
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.margin-top-15 {
  margin-top: 15px;
}
.margin-top-30 {
  margin-top: 30px;
}
</style>
