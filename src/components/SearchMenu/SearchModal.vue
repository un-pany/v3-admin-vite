<script setup lang="ts">
import { computed, ref, shallowRef } from "vue"
import { type RouteRecordName, type RouteRecordRaw, useRouter } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import SearchResult from "./SearchResult.vue"
import SearchFooter from "./SearchFooter.vue"
import { ElScrollbar } from "element-plus"
import { cloneDeep, debounce } from "lodash-es"
import { DeviceEnum } from "@/constants/app-key"
import { onKeyStroke } from "@vueuse/core"

interface Props {
  /** 控制显隐 */
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  "update:modelValue": [boolean]
}>()

const appStore = useAppStore()
const router = useRouter()

const inputRef = ref<HTMLInputElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const searchResultRef = ref<InstanceType<typeof SearchResult> | null>(null)

const keyword = ref("")
const activeRouteName = ref<RouteRecordName>("")
const resultOptions = shallowRef<RouteRecordRaw[]>([])

/** 搜索（防抖） */
const handleSearch = debounce(() => {
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
}, 500)

const visible = computed({
  get() {
    return props.modelValue
  },
  set(val: boolean) {
    emit("update:modelValue", val)
  }
})

/** 树形菜单 */
const menusData = computed(() => cloneDeep(usePermissionStore().routes))

/** 将树形菜单扁平化为一维数组，用于菜单查询 */
function flatTree(arr: RouteRecordRaw[], result: RouteRecordRaw[] = []) {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
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
  const scrollTop = searchResultRef.value?.handleScroll(index)
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
    v-model="visible"
    :before-close="handleClose"
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    append-to-body
    class="search-modal"
    :width="appStore.device === DeviceEnum.Mobile ? '80vw' : '40vw'"
    top="5vh"
  >
    <el-input ref="inputRef" size="large" v-model="keyword" clearable placeholder="搜索菜单" @input="handleSearch">
      <template #prefix>
        <SvgIcon name="search" text-18px />
      </template>
    </el-input>
    <div>
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" :image-size="100" />
      <template v-else>
        <p>搜索结果</p>
        <el-scrollbar ref="scrollbarRef" max-height="40vh">
          <SearchResult
            ref="searchResultRef"
            v-model:value="activeRouteName"
            :options="resultOptions"
            @sure="handleEnter"
          />
        </el-scrollbar>
      </template>
    </div>
    <template #footer>
      <SearchFooter :total="resultOptions.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-modal {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
