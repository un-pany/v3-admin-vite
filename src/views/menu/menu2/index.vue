<script setup lang="ts">
import { useTagsViewStore } from "@/store/modules/tags-view"
const tagsViewStore = useTagsViewStore()

const handleCloseTag = () => {
  tagsViewStore.closeCurrentTag()
}
</script>
<template>
  <div class="app-container">
    <el-card>
      menu 2
      <el-button @click="handleCloseTag">关闭当前Tag</el-button>
    </el-card>
  </div>
</template>
