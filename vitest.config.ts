import { defineConfig } from "vitest/config"

/** Vitest 单元测试配置：https://cn.vitest.dev/config */
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"]
  }
})
