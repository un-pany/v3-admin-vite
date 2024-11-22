<template>
  <div class="app-container">
    <h4>
      三级及其以上路由缓存功能默认关闭，需要请前往此配置文件中打开：
      <el-link
        type="primary"
        href="https://github.com/un-pany/v3-admin-vite/blob/main/src/config/route.ts"
        target="_blank"
      >
        src/config/route.ts
      </el-link>
    </h4>
    <el-card header="二级路由 - menu1">
      <router-view />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-link {
  font-size: 18px;
}
</style>
