<script lang="ts" setup>
import { reactive } from "vue"
import { checkPermission } from "@/utils/permission" // 权限判断函数
import SwitchRoles from "./components/SwitchRoles.vue"

const state = reactive({
  key: 1,
  handleRolesChange: () => {
    state.key++
  }
})
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="state.handleRolesChange" />
    <div :key="state.key" style="margin-top: 30px">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          只有
          <el-tag>admin</el-tag>可以看见这个
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info" size="large">
          v-permission="['admin']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['editor']" class="permission-alert">
          只有
          <el-tag>editor</el-tag>可以看见这个
        </span>
        <el-tag v-permission="['editor']" class="permission-sourceCode" type="info" size="large">
          v-permission="['editor']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['admin', 'editor']" class="permission-alert">
          两者
          <el-tag>admin</el-tag>和 <el-tag>editor</el-tag>都可以看见这个
        </span>
        <el-tag v-permission="['admin', 'editor']" class="permission-sourceCode" type="info" size="large">
          v-permission="['admin', 'editor']"
        </el-tag>
      </div>
    </div>
    <div :key="'checkPermission' + state.key" style="margin-top: 60px">
      <el-tag type="info" size="large">
        在某些情况下，不适合使用 v-permission。例如：element-plus 的 el-tab 或 el-table-column 以及其它动态渲染 dom
        的场景。你只能通过手动设置 v-if 来实现。
      </el-tag>
      <el-tabs type="border-card" style="width: 550px; margin-top: 60px">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          admin 可以看见这个
          <el-tag class="permission-sourceCode" type="info"> v-if="checkPermission(['admin'])" </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="editor">
          editor 可以看见这个
          <el-tag class="permission-sourceCode" type="info"> v-if="checkPermission(['editor'])" </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin 和 editor">
          两者 admin 和 editor 都可以看见这个
          <el-tag class="permission-sourceCode" type="info"> v-if="checkPermission(['admin', 'editor'])" </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}
</style>
