<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import ScrollPane from "./ScrollPane.vue"
import { Close } from "@element-plus/icons-vue"

const instance = getCurrentInstance()
const router = useRouter()
const route = useRoute()
type selectedTagType = {
  tag: TagProps
  index: number
}

/** 标签页组件元素的引用数组 */
const tagRefs = ref<InstanceType<typeof RouterLink>[]>([])

/** 右键菜单的状态 */
const visible = ref(false)
/** 右键菜单的 top 位置 */
const top = ref(0)
/** 右键菜单的 left 位置 */
const left = ref(0)
/** 当前正在右键操作的标签页 */
const selectedTag = ref<selectedTagType>()
/** 判断标签页是否激活 */
const isActive = (tag: TagProps) => {
  return tag.path === route.path
}

/** 刷新当前正在右键操作的标签页 */
const refreshSelectedTag = async (selectedTag: selectedTagType) => {
  tabBarStore.deleteCache(selectedTag.tag)
  await router.push({
    name: "Redirect",
    params: {
      path: route.fullPath
    }
  })
  tabBarStore.addCache(selectedTag.tag.name)
}

/** 关闭当前正在右键操作的标签页 */
const closeSelectedTag = (tag: TagProps, idx: number) => {
  tabBarStore.deleteTag(idx, tag)
  if (tag.fullPath === route.fullPath) {
    const latest = tagList.value[idx - 1]
    router.push({ name: latest.name })
  }
}

/** 关闭其他标签页 */
const closeOthersTags = (selectedTag: selectedTagType) => {
  const filterList = tagList.value.filter((el, idx) => {
    return idx === 0 || idx === selectedTag.index
  })
  tabBarStore.freshTabList(filterList)
  router.push({ name: selectedTag.tag.name })
}

/** 关闭所有标签页 */
const closeAllTags = () => {
  tabBarStore.resetTabList()
  router.push({ name: "Dashboard" })
}

/** 打开右键菜单面板 */
const openMenu = (tag: TagProps, idx: number, e: MouseEvent) => {
  const menuMinWidth = 105
  // 当前组件距离浏览器左端的距离
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // 当前组件宽度
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // 面板的最大左边距
  const maxLeft = offsetWidth - menuMinWidth
  // 面板距离鼠标指针的距离
  const left15 = e.clientX - offsetLeft + 15
  left.value = left15 > maxLeft ? maxLeft : left15
  top.value = e.clientY
  // 显示面板
  visible.value = true
  // 更新当前正在右键操作的标签页
  selectedTag.value = {
    tag,
    index: idx
  }
}

/** 关闭右键菜单面板 */
const closeMenu = () => {
  visible.value = false
}

watch(visible, (value) => {
  value ? document.body.addEventListener("click", closeMenu) : document.body.removeEventListener("click", closeMenu)
})
import useTabBarStore, { TagProps } from "@/store/modules/tab-bar"
import { computed } from "vue"
import { onUnmounted } from "vue"
import { listenerRouteChange, removeRouteListener } from "@/utils/route-listener"
import { RouteLocationNormalized } from "vue-router"

const tabBarStore = useTabBarStore()
const tagList = computed(() => {
  return tabBarStore.getTabList
})
listenerRouteChange((route: RouteLocationNormalized) => {
  if (!route.meta.affix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
    tabBarStore.updateTabList(route)
  }
})
onUnmounted(() => {
  removeRouteListener()
})
console.log(tagList)
</script>

<template>
  <div class="tags-view-container">
    <ScrollPane class="tags-view-wrapper" :tag-refs="tagRefs">
      <router-link
        ref="tagRefs"
        v-for="(tag, index) in tagList"
        :key="tag.fullPath"
        :class="{ active: isActive(tag) }"
        class="tags-view-item"
        :to="{ path: tag.fullPath, query: tag.query }"
        @click.middle="!false && closeSelectedTag(tag, index)"
        @contextmenu.prevent="openMenu(tag, index, $event)"
      >
        {{ tag.title }}
        <el-icon v-if="!tag.meta?.affix" :size="12" @click.prevent.stop="closeSelectedTag(tag, index)">
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectedTag(selectedTag!)">刷新</li>
      <li v-if="!selectedTag?.tag.meta?.affix" @click="closeSelectedTag(selectedTag!.tag, selectedTag!.index)">关闭</li>
      <li @click="closeOthersTags(selectedTag!)">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--v3-tagsview-height);
  width: 100%;
  background-color: var(--v3-header-bg-color);
  box-shadow: 0 0 3px 0 #00000010;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      color: var(--v3-tagsview-tag-text-color);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
        &::before {
          content: "";
          background-color: var(--v3-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
