<template>
  <div class="app-container">
    <h4>
      <span>
        三级及其以上路由缓存功能默认关闭，需要请前往此配置文件中打开：
      </span>
      <el-link
        type="primary"
        href="https://github.com/un-pany/v3-admin-vite/blob/main/src/router/config.ts"
        target="_blank"
      >
        src/router/config.ts
      </el-link>
    </h4>
    <el-card header="二级路由">
      <router-view />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
h4 {
  display: flex;
  align-items: center;
}

.el-link {
  font-size: 18px;
}
</style>
