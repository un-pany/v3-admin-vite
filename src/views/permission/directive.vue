<script lang="ts" setup>
import { checkPermission } from "@/utils/permission"
import SwitchRoles from "./components/SwitchRoles.vue"
</script>

<template>
  <div class="app-container">
    <SwitchRoles />
    <!-- v-permission 示例 -->
    <div class="margin-top-30">
      <div>
        权限指令说明：权限指令内容由页面名与下级资源名组成<br />如：DirectivePermission:ButtonPermission 指令中的
        DirectivePermission 为菜单配置中页面的 name 属性， ButtonPermission 为页面 children 中的下级资源 name 属性值<br />
        详情请参考 src/api/hook-demo/use-dynamic-route.ts 文件中的菜单配置
      </div>
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
      <div class="margin-top-15">
        <el-tag v-permission="['DirectivePermission:ButtonPermission']" type="success" size="large" effect="plain">
          这里采用了 v-permission="['DirectivePermission:ButtonPermission']" 所以只有
          DirectivePermission:ButtonPermission 权限才可以看见这句话
        </el-tag>
      </div>
    </div>
    <!-- checkPermission 示例 -->
    <div class="margin-top-30">
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
        <el-tab-pane
          v-if="checkPermission(['DirectivePermission:ButtonPermission'])"
          label="DirectivePermission:ButtonPermission 按钮权限测试"
        >
          这里采用了 <el-tag>v-if="checkPermission(['DirectivePermission:ButtonPermission'])"</el-tag> 所以只有
          DirectivePermission:ButtonPermission 权限才可以看见这句话
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
