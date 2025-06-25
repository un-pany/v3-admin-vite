<script lang="ts" setup>
import { ref } from "vue"
import Editor from "@/common/components/Editor/index.vue"

const content = ref("<p>Hello V3 Admin Vite!</p>")

function handleChange(value: string) {
  console.log("content changed:", value)
}
</script>

<template>
  <div class="app-container">
    <el-card header="富文本编辑器示例">
      <Editor v-model="content" @change="handleChange" />
      <div class="preview-container">
        <h3>HTML 预览:</h3>
        <div v-html="content" class="preview-content" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.preview-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;

  h3 {
    margin: 0 0 10px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }

  .preview-content {
    padding: 15px;
    background-color: var(--el-bg-color-page);
    border-radius: 4px;

    :deep(img) {
      max-width: 100%;
    }
  }
}
</style>
