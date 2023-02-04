<script setup lang="ts">
import { RouteRecordRaw, useRouter } from "vue-router"
import SearchResult from "./SearchResult.vue"
import { ref, watch, computed, nextTick, shallowRef, onMounted } from "vue"
import { useDebounceFn, onKeyStroke } from "@vueuse/core"
import { Search } from "@element-plus/icons-vue"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { useAppStoreHook, DeviceType } from "@/store/modules/app"
import { OptionsItem } from "."

interface Props {
  /** 弹窗显隐 */
  value: boolean
}

interface Emits {
  (e: "update:value", val: boolean): void
}

const { device } = useAppStoreHook()

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})

const router = useRouter()

const keyword = ref("")

const activePath = ref("")

const inputRef = ref<HTMLInputElement | null>(null)

const resultOptions = shallowRef<OptionsItem[]>([])

const flatMenusData = ref<OptionsItem[]>([])

const show = computed({
  get() {
    return props.value
  },
  set(val: boolean) {
    emit("update:value", val)
  }
})

watch(show, async (val) => {
  if (val) {
    /** 自动聚焦 */
    await nextTick()
    inputRef.value?.focus()
  }
})

/** 查询 */
const search = () => {
  resultOptions.value = flatMenusData.value.filter(
    (menu) => keyword.value && menu.meta.title.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim())
  )
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path
  } else {
    activePath.value = ""
  }
}

const handleClose = () => {
  show.value = false
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = []
    keyword.value = ""
  }, 200)
}

/** key up */
const handleUp = () => {
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex((item) => item.path === activePath.value)
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path
  } else {
    activePath.value = resultOptions.value[index - 1].path
  }
}

/** key down */
const handleDown = () => {
  const { length } = resultOptions.value
  if (length === 0) return
  const index = resultOptions.value.findIndex((item) => item.path === activePath.value)
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path
  } else {
    activePath.value = resultOptions.value[index + 1].path
  }
}

/* 校验正常的 http url */
const testHttpUrl = (value: string) => {
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\*\\+,;=.]+$/
  return reg.test(value)
}

/** key enter */
const handleEnter = () => {
  const { length } = resultOptions.value
  if (length === 0 || activePath.value === "") return
  if (testHttpUrl(activePath.value)) {
    window.open(activePath.value)
  } else {
    router.push({ path: activePath.value })
  }
  handleClose()
}

const handleSearch = useDebounceFn(search, 300)

onKeyStroke("Enter", handleEnter)

onKeyStroke("ArrowUp", handleUp)

onKeyStroke("ArrowDown", handleDown)

/** 将菜单树形结构扁平化为一维数组，用于菜单查询 */
const flatTree = (arr: RouteRecordRaw[]) => {
  const res: OptionsItem[] = []
  const deep = (arr: any[], prefix: string | null) => {
    arr.forEach((item: any) => {
      if (item.meta && item.meta.title) {
        const temp: OptionsItem = {
          path: item.path,
          meta: item.meta
        }
        if (prefix && !testHttpUrl(temp.path)) {
          if (prefix === "/") {
            prefix = ""
          }
          temp.path = temp.path.startsWith("/") ? prefix + temp.path : `${prefix}/${temp.path}`
        }
        item.path = temp.path
        res.push(temp)
      }
      item.children && deep(item.children, item.path)
    })
  }
  deep(arr, null)
  return res
}

onMounted(() => {
  // 获取所有的 vue-router 的路由
  const { getRoutes } = usePermissionStoreHook()
  // 将路由转换为数组
  flatMenusData.value = flatTree(getRoutes())
})
</script>

<template>
  <el-dialog
    top="5vh"
    :width="device === DeviceType.Mobile ? '80vw' : '50vw'"
    v-model="show"
    :before-close="handleClose"
  >
    <el-input
      ref="inputRef"
      v-model="keyword"
      clearable
      placeholder="请输入关键词搜索"
      :prefix-icon="Search"
      @input="handleSearch"
    />
    <div class="search-result-container">
      <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
      <SearchResult v-else v-model:value="activePath" :options="resultOptions" @click="handleEnter" />
    </div>
    <template #footer>
      <div class="search-footer text-[#333] dark:text-white">
        <span class="search-footer-item">
          <svg-icon name="enter_outlined" class="icon" />
          确认
        </span>
        <span class="search-footer-item">
          <el-icon class="icon"><Top /></el-icon>
          <el-icon class="icon"><Bottom /></el-icon>
          切换
        </span>
        <span class="search-footer-item">
          <svg-icon name="keyboard_esc" class="icon" />
          关闭
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search-result-container {
  margin-top: 20px;
}
.search-footer {
  display: flex;

  .search-footer-item {
    display: flex;
    align-items: center;
    margin-right: 14px;
  }

  .icon {
    padding: 2px;
    margin-right: 3px;
    font-size: 20px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
  }
}
</style>
