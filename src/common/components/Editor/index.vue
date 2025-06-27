<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue"
import { ref } from "vue"

interface Props {
  /** 编辑器内容 */
  modelValue?: string
  /** 编辑器高度 */
  height?: number | string
  /** 是否只读 */
  readonly?: boolean
  /** 占位文本 */
  placeholder?: string
}

interface Emits {
  (e: "update:modelValue", value: string): void
  (e: "change", value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  height: 400,
  readonly: false,
  placeholder: "请输入内容"
})

const emit = defineEmits<Emits>()

const editorRef = ref()

// TinyMCE 配置
const init = {
  language: "zh_CN",
  menubar: "file edit view insert format tools table help",
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount"
  ],
  toolbar: "undo redo | blocks | "
    + "bold italic forecolor | alignleft aligncenter "
    + "alignright alignjustify | bullist numlist outdent indent | "
    + "removeformat | help",
  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  readonly: props.readonly,
  placeholder: props.placeholder,
  branding: false, // 去除 TinyMCE 品牌标识
  promotion: false // 去除推广信息
}

// 内容变化时触发
function handleChange(value: string) {
  emit("update:modelValue", value)
  emit("change", value)
}

// 获取编辑器实例
function getEditor() {
  return editorRef.value?.editor
}

defineExpose({
  getEditor
})
</script>

<template>
  <div class="v3-editor">
    <Editor
      ref="editorRef"
      api-key="qakh29dtwy4honhyvvcu3xi4l1zw3l0w7f55z8fcru52nidw"
      :init="init"
      :model-value="modelValue"
      :disabled="readonly"
      :height="height"
      @update:model-value="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.v3-editor {
  :deep(.tox-tinymce) {
    border-radius: 4px;
    border-color: var(--el-border-color);
  }
}
</style>
