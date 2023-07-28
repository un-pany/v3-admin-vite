<script setup lang="ts">
import { RouteRecordName, useRouter } from "vue-router"
import SearchResult from "./SearchResult.vue"
import SearchFooter from "./SearchFooter.vue"
import { ref, computed, shallowRef } from "vue"
import { cloneDeep } from "lodash-es"
import { useDebounceFn, onKeyStroke } from "@vueuse/core"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { useAppStore } from "@/store/modules/app"
import { DeviceEnum } from "@/constants/app-key"
import { RouteRecordRaw } from "vue-router"
import { ElScrollbar } from "element-plus"

interface Props {
  /** 弹窗显隐 */
  value: boolean
}

interface Emits {
  (e: "update:value", val: boolean): void
}

const appStore = useAppStore()
const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {})
const router = useRouter()
const keyword = ref("")
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const resultRef = ref<InstanceType<typeof SearchResult>>()
const activeRouteName = ref<RouteRecordName>("")
const inputRef = ref<HTMLInputElement | null>(null)
const resultOptions = shallowRef<RouteRecordRaw[]>([])
const handleSearch = useDebounceFn(search, 300)

const visible = computed({
  get() {
    return props.value
  },
  set(val: boolean) {
    emit("update:value", val)
  }
})

/** 树形菜单 */
const menusData = computed(() => cloneDeep(usePermissionStoreHook().routes))

/** 将树形菜单扁平化为一维数组，用于菜单查询 */
function flatTree<T extends RouteRecordRaw>(arr: T[], result: T[] = []) {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
}

/** 查询 */
function search() {
  const flatMenusData = flatTree(menusData.value)
  resultOptions.value = flatMenusData.filter((menu) =>
    keyword.value ? menu.meta?.title?.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim()) : false
  )
  // 默认选中查询结果的第一项
  if (resultOptions.value?.length > 0) {
    activeRouteName.value = resultOptions.value[0].name!
  } else {
    activeRouteName.value = ""
  }
}

function handleClose() {
  visible.value = false
  /** 延时处理防止用户看到重置数据的操作 */
  setTimeout(() => {
    resultOptions.value = []
    keyword.value = ""
  }, 200)
}

function scrollTo(index: number) {
  const scrollTop = resultRef.value?.handleScroll(index)
  // 手动控制 el-scrollbar 滚动条滚动，设置滚动条到顶部的距离
  scrollTop && scrollbarRef.value?.setScrollTop(scrollTop)
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex((item) => item.name === activeRouteName.value)
  if (index === 0) {
    // 如果已处在顶部，按下 keyup 跳转到底部
    activeRouteName.value = resultOptions.value[length - 1].name!
    scrollTo(resultOptions.value.length - 1)
  } else {
    activeRouteName.value = resultOptions.value[index - 1].name!
    scrollTo(index - 1)
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex((item) => item.name === activeRouteName.value)
  if (index + 1 === length) {
    // 如果已处在底部，按下 keydown 跳转到顶部
    activeRouteName.value = resultOptions.value[0].name!
    scrollTo(0)
  } else {
    activeRouteName.value = resultOptions.value[index + 1].name!
    scrollTo(index + 1)
  }
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value
  if (length === 0 || !activeRouteName.value) return
  router.push({ name: activeRouteName.value })
  handleClose()
}

onKeyStroke("Enter", handleEnter)
onKeyStroke("ArrowUp", handleUp)
onKeyStroke("ArrowDown", handleDown)
</script>

<template>
  <el-dialog
    top="5vh"
    class="search-dialog"
    v-model="visible"
    :show-close="false"
    :width="appStore.device === DeviceEnum.Mobile ? '80vw' : '36vw'"
    :before-close="handleClose"
    :style="{ borderRadius: '6px' }"
    append-to-body
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
  >
    <el-input ref="inputRef" size="large" v-model="keyword" clearable placeholder="搜索菜单" @input="handleSearch">
      <template #prefix>
        <SvgIcon name="search" class="text-24px" />
      </template>
    </el-input>
    <div class="search-result-container">
      <el-scrollbar ref="scrollbarRef" max-height="calc(90vh - 140px)">
        <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
        <SearchResult
          v-else
          ref="resultRef"
          v-model:value="activeRouteName"
          :options="resultOptions"
          @sure="handleEnter"
        />
      </el-scrollbar>
    </div>
    <template #footer>
      <SearchFooter :total="resultOptions.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-result-container {
  margin: 12px 0;
}

.search-dialog {
  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding-top: 12px;
    padding-bottom: 0;
  }

  .el-input__inner {
    font-size: 1.2em;
  }

  .el-dialog__footer {
    padding-bottom: 10px;
    box-shadow:
      0 -1px 0 0 #e0e3e8,
      0 -3px 6px 0 rgb(69 98 155 / 12%);
  }
}
</style>
