<script lang="ts" setup>
import { computed, ref, shallowRef } from "vue"
import { type RouteRecordName, type RouteRecordRaw, useRouter } from "vue-router"
import { usePermissionStore } from "@/store/modules/permission"
import SearchResult from "./SearchResult.vue"
import SearchFooter from "./SearchFooter.vue"
import { ElMessage, ElScrollbar } from "element-plus"
import { cloneDeep, debounce } from "lodash-es"
import { useDevice } from "@/hooks/useDevice"
import { isExternal } from "@/utils/validate"

/** 控制 modal 显隐 */
const modelValue = defineModel<boolean>({ required: true })

const router = useRouter()
const { isMobile } = useDevice()

const inputRef = ref<HTMLInputElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar> | null>(null)
const searchResultRef = ref<InstanceType<typeof SearchResult> | null>(null)

const keyword = ref<string>("")
const resultList = shallowRef<RouteRecordRaw[]>([])
const activeRouteName = ref<RouteRecordName | undefined>(undefined)
/** 是否按下了上键或下键（用于解决和 mouseenter 事件的冲突） */
const isPressUpOrDown = ref<boolean>(false)

/** 控制搜索对话框宽度 */
const modalWidth = computed(() => (isMobile.value ? "80vw" : "40vw"))
/** 树形菜单 */
const menusData = computed(() => cloneDeep(usePermissionStore().routes))

/** 搜索（防抖） */
const handleSearch = debounce(() => {
  const flatMenusData = flatTree(menusData.value)
  resultList.value = flatMenusData.filter((menu) =>
    keyword.value ? menu.meta?.title?.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim()) : false
  )
  // 默认选中搜索结果的第一项
  const length = resultList.value?.length
  activeRouteName.value = length > 0 ? resultList.value[0].name : undefined
}, 500)

/** 将树形菜单扁平化为一维数组，用于菜单搜索 */
const flatTree = (arr: RouteRecordRaw[], result: RouteRecordRaw[] = []) => {
  arr.forEach((item) => {
    result.push(item)
    item.children && flatTree(item.children, result)
  })
  return result
}

/** 关闭搜索对话框 */
const handleClose = () => {
  modelValue.value = false
  // 延时处理防止用户看到重置数据的操作
  setTimeout(() => {
    keyword.value = ""
    resultList.value = []
  }, 200)
}

/** 根据下标位置进行滚动 */
const scrollTo = (index: number) => {
  if (!searchResultRef.value) return
  const scrollTop = searchResultRef.value.getScrollTop(index)
  // 手动控制 el-scrollbar 滚动条滚动，设置滚动条到顶部的距离
  scrollbarRef.value?.setScrollTop(scrollTop)
}

/** 键盘上键 */
const handleUp = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 获取该 name 在菜单中第一次出现的位置
  const index = resultList.value.findIndex((item) => item.name === activeRouteName.value)
  // 如果已处在顶部
  if (index === 0) {
    const bottomName = resultList.value[length - 1].name
    // 如果顶部和底部的 bottomName 相同，且长度大于 1，就再跳一个位置（可解决遇到首尾两个相同 name 导致的上键不能生效的问题）
    if (activeRouteName.value === bottomName && length > 1) {
      activeRouteName.value = resultList.value[length - 2].name
      scrollTo(length - 2)
    } else {
      // 跳转到底部
      activeRouteName.value = bottomName
      scrollTo(length - 1)
    }
  } else {
    activeRouteName.value = resultList.value[index - 1].name
    scrollTo(index - 1)
  }
}

/** 键盘下键 */
const handleDown = () => {
  isPressUpOrDown.value = true
  const { length } = resultList.value
  if (length === 0) return
  // 获取该 name 在菜单中最后一次出现的位置（可解决遇到连续两个相同 name 导致的下键不能生效的问题）
  const index = resultList.value.map((item) => item.name).lastIndexOf(activeRouteName.value)
  // 如果已处在底部
  if (index === length - 1) {
    const topName = resultList.value[0].name
    // 如果底部和顶部的 topName 相同，且长度大于 1，就再跳一个位置（可解决遇到首尾两个相同 name 导致的下键不能生效的问题）
    if (activeRouteName.value === topName && length > 1) {
      activeRouteName.value = resultList.value[1].name
      scrollTo(1)
    } else {
      // 跳转到顶部
      activeRouteName.value = topName
      scrollTo(0)
    }
  } else {
    activeRouteName.value = resultList.value[index + 1].name
    scrollTo(index + 1)
  }
}

/** 键盘回车键 */
const handleEnter = () => {
  const { length } = resultList.value
  if (length === 0) return
  const name = activeRouteName.value
  const path = resultList.value.find((item) => item.name === name)?.path
  if (path && isExternal(path)) {
    window.open(path, "_blank", "noopener, noreferrer")
    return
  }
  if (!name) {
    ElMessage.warning("无法通过搜索进入该菜单，请为对应的路由设置唯一的 Name")
    return
  }
  try {
    router.push({ name })
  } catch {
    ElMessage.error("该菜单有必填的动态参数，无法通过搜索进入")
    return
  }
  handleClose()
}

/** 释放上键或下键 */
const handleReleaseUpOrDown = () => {
  isPressUpOrDown.value = false
}
</script>

<template>
  <el-dialog
    v-model="modelValue"
    @opened="inputRef?.focus()"
    @closed="inputRef?.blur()"
    @keydown.up="handleUp"
    @keydown.down="handleDown"
    @keydown.enter="handleEnter"
    @keyup.up.down="handleReleaseUpOrDown"
    :before-close="handleClose"
    :width="modalWidth"
    top="5vh"
    class="search-modal__private"
    append-to-body
  >
    <el-input ref="inputRef" v-model="keyword" @input="handleSearch" placeholder="搜索菜单" size="large" clearable>
      <template #prefix>
        <SvgIcon name="search" />
      </template>
    </el-input>
    <el-empty v-if="resultList.length === 0" description="暂无搜索结果" :image-size="100" />
    <template v-else>
      <p>搜索结果</p>
      <el-scrollbar ref="scrollbarRef" max-height="40vh" always>
        <SearchResult
          ref="searchResultRef"
          v-model="activeRouteName"
          :list="resultList"
          :isPressUpOrDown="isPressUpOrDown"
          @click="handleEnter"
        />
      </el-scrollbar>
    </template>
    <template #footer>
      <SearchFooter :total="resultList.length" />
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
    padding: var(--el-dialog-padding-primary);
  }
}
</style>
