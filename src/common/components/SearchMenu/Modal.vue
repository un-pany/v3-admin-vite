<script lang="ts" setup>
import type { ElScrollbar } from "element-plus"
import type { RouteRecordNameGeneric, RouteRecordRaw } from "vue-router"
import { usePermissionStore } from "@/pinia/stores/permission"
import { useDevice } from "@@/composables/useDevice"
import { isExternal } from "@@/utils/validate"
import { cloneDeep, debounce } from "lodash-es"
import Footer from "./Footer.vue"
import Result from "./Result.vue"

/** 控制 modal 显隐 */
const modelValue = defineModel<boolean>({ required: true })

const router = useRouter()
const { isMobile } = useDevice()

const inputRef = ref<HTMLInputElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const resultRef = ref<InstanceType<typeof Result> | null>(null)

const keyword = ref<string>("")
const result = shallowRef<RouteRecordRaw[]>([])
const activeRouteName = ref<RouteRecordNameGeneric | undefined>(undefined)
/** 是否按下了上键或下键（用于解决和 mouseenter 事件的冲突） */
const isPressUpOrDown = ref<boolean>(false)

/** 控制搜索对话框宽度 */
const modalWidth = computed(() => (isMobile.value ? "80vw" : "40vw"))
/** 树形菜单 */
const menus = computed(() => cloneDeep(usePermissionStore().routes))

/** 搜索（防抖） */
const handleSearch = debounce(() => {
  const flatMenus = flatTree(menus.value)
  const _keywords = keyword.value.toLocaleLowerCase().trim()
  result.value = flatMenus.filter(menu => keyword.value ? menu.meta?.title?.toLocaleLowerCase().includes(_keywords) : false)
  // 默认选中搜索结果的第一项
  const length = result.value?.length
  activeRouteName.value = length > 0 ? result.value[0].name : undefined
}, 500)

/** 将树形菜单扁平化为一维数组，用于菜单搜索 */
function flatTree(arr: RouteRecordRaw[], result: RouteRecordRaw[] = []) {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
}

/** 关闭搜索对话框 */
function handleClose() {
  modelValue.value = false
  // 延时处理防止用户看到重置数据的操作
  setTimeout(() => {
    keyword.value = ""
    result.value = []
  }, 200)
}

/** 根据下标位置进行滚动 */
function scrollTo(index: number) {
  if (!resultRef.value) return
  const scrollTop = resultRef.value.getScrollTop(index)
  // 手动控制 el-scrollbar 滚动条滚动，设置滚动条到顶部的距离
  scrollbarRef.value?.setScrollTop(scrollTop)
}

/** 键盘上键 */
function handleUp() {
  isPressUpOrDown.value = true
  const { length } = result.value
  if (length === 0) return
  // 获取该 name 在菜单中第一次出现的位置
  const index = result.value.findIndex(item => item.name === activeRouteName.value)
  // 如果已处在顶部
  if (index === 0) {
    const bottomName = result.value[length - 1].name
    // 如果顶部和底部的 bottomName 相同，且长度大于 1，就再跳一个位置（可解决遇到首尾两个相同 name 导致的上键不能生效的问题）
    if (activeRouteName.value === bottomName && length > 1) {
      activeRouteName.value = result.value[length - 2].name
      scrollTo(length - 2)
    } else {
      // 跳转到底部
      activeRouteName.value = bottomName
      scrollTo(length - 1)
    }
  } else {
    activeRouteName.value = result.value[index - 1].name
    scrollTo(index - 1)
  }
}

/** 键盘下键 */
function handleDown() {
  isPressUpOrDown.value = true
  const { length } = result.value
  if (length === 0) return
  // 获取该 name 在菜单中最后一次出现的位置（可解决遇到连续两个相同 name 导致的下键不能生效的问题）
  const index = result.value.map(item => item.name).lastIndexOf(activeRouteName.value)
  // 如果已处在底部
  if (index === length - 1) {
    const topName = result.value[0].name
    // 如果底部和顶部的 topName 相同，且长度大于 1，就再跳一个位置（可解决遇到首尾两个相同 name 导致的下键不能生效的问题）
    if (activeRouteName.value === topName && length > 1) {
      activeRouteName.value = result.value[1].name
      scrollTo(1)
    } else {
      // 跳转到顶部
      activeRouteName.value = topName
      scrollTo(0)
    }
  } else {
    activeRouteName.value = result.value[index + 1].name
    scrollTo(index + 1)
  }
}

/** 键盘回车键 */
function handleEnter() {
  const { length } = result.value
  if (length === 0) return
  const name = activeRouteName.value
  const path = result.value.find(item => item.name === name)?.path
  if (path && isExternal(path)) return window.open(path, "_blank", "noopener, noreferrer")
  if (!name) return ElMessage.warning("无法通过搜索进入该菜单，请为对应的路由设置唯一的 Name")
  try {
    router.push({ name })
  } catch {
    return ElMessage.warning("该菜单有必填的动态参数，无法通过搜索进入")
  }
  handleClose()
}

/** 释放上键或下键 */
function handleReleaseUpOrDown() {
  isPressUpOrDown.value = false
}
</script>

<template>
  <el-dialog
    v-model="modelValue"
    :before-close="handleClose"
    :width="modalWidth"
    top="5vh"
    class="search-modal__private"
    append-to-body
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
    @keydown.enter="handleEnter"
    @keyup.up.down="handleReleaseUpOrDown"
  >
    <el-input ref="inputRef" v-model="keyword" placeholder="搜索菜单" size="large" clearable @input="handleSearch">
      <template #prefix>
        <SvgIcon name="search" class="svg-icon" />
      </template>
    </el-input>
    <el-empty v-if="result.length === 0" description="暂无搜索结果" :image-size="100" />
    <template v-else>
      <p>搜索结果</p>
      <el-scrollbar ref="scrollbarRef" max-height="40vh" always>
        <Result
          ref="resultRef"
          v-model="activeRouteName"
          :data="result"
          :is-press-up-or-down="isPressUpOrDown"
          @click="handleEnter"
        />
      </el-scrollbar>
    </template>
    <template #footer>
      <Footer :total="result.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.search-modal__private {
  .svg-icon {
    font-size: 18px;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__footer {
    border-top: 1px solid var(--el-border-color);
    padding-top: var(--el-dialog-padding-primary);
  }
}
</style>
