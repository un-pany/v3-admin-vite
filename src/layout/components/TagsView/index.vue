<script lang="ts" setup>
import { getCurrentInstance, ref, onMounted, watch } from "vue"
import { RouteRecordRaw, useRoute, useRouter } from "vue-router"
import { useTagsViewStore, ITagView } from "@/store/modules/tags-view"
import { usePermissionStore } from "@/store/modules/permission"
import path from "path-browserify"

const instance = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<ITagView>({})
let affixTags: ITagView[] = []

const isActive = (tag: ITagView) => {
  return tag.path === route.path
}

const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
}

// click tab
const clickTab = (pane: any) => {
  // actively jump route if not currently active
  if (!pane.active) {
    for (const v of tagsViewStore.visitedViews) {
      if (v.fullPath && v.path === pane.paneName) {
        router.push(v.fullPath)
        break
      }
    }
  }
}

// remove tab
const removeTab = (pane: any) => {
  closeSelectedTag({
    path: pane
  })
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = "/") => {
  let tags: ITagView[] = []
  routes.forEach((route) => {
    if (route.meta?.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}

const initTags = () => {
  affixTags = filterAffixTags(permissionStore.routes)
  for (const tag of affixTags) {
    // 必须含有 name 属性
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
  }
}

const refreshSelectedTag = (view: ITagView) => {
  router.replace({ path: "/redirect" + view.path, query: view.query })
}

const closeSelectedTag = (view: ITagView) => {
  tagsViewStore.delVisitedView(view)
  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}

const closeOthersTags = () => {
  if (selectedTag.value.fullPath !== route.path && selectedTag.value.fullPath !== undefined) {
    router.push(selectedTag.value.fullPath)
  }
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
}

const closeAllTags = (view: ITagView) => {
  tagsViewStore.delAllVisitedViews()
  if (affixTags.some((tag) => tag.path === route.path)) {
    return
  }
  toLastView(tagsViewStore.visitedViews, view)
}

const toLastView = (visitedViews: ITagView[], view: ITagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath)
  } else {
    // 如果 TagsView 全部被关闭了，则默认重定向到主页
    if (view.name === "Dashboard") {
      // 重新加载主页
      router.push({ path: "/redirect" + view.path, query: view.query })
    } else {
      router.push("/")
    }
  }
}

const openMenu = (tag: ITagView, e: MouseEvent) => {
  const menuMinWidth = 105
  // container margin left
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // container width
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // left boundary
  const maxLeft = offsetWidth - menuMinWidth
  // 15: margin right
  const left15 = e.clientX - offsetLeft + 15
  if (left15 > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = left15
  }
  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

watch(
  route,
  () => {
    addTags()
  },
  {
    deep: true
  }
)

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeMenu)
  } else {
    document.body.removeEventListener("click", closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})
</script>

<template>
  <div class="tags-view-container">
    <el-tabs
      class="tags-view-tabs"
      :model-value="route.path"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="clickTab"
    >
      <el-tab-pane
        v-for="tag in tagsViewStore.visitedViews"
        :name="tag.path"
      >
        <template #label>
          <div class="tags-view-item-link" @contextmenu.prevent="openMenu(tag, $event)">
            {{ tag?.meta?.title }}
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  .tags-view-tabs {
    height: var(--v3-tagsview-height);
    margin: var(--v3-tagsview-margin);
    user-select: none;
    :deep(.el-tabs__header) {
      margin-bottom: 0;
      border: none;
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        height: 30px;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-radius: var(--v3-tagsview-border-radius);
        color: #000000;
      }
      .el-tabs__nav {
        border: none;
        .el-tabs__item {
          display: inline-flex;
          align-items: center;
          border: none;
          border-radius: var(--v3-tagsview-border-radius);
          height: 30px;
          line-height: 30px;
          padding: 0 var(--v3-tagsview-gap);
          background-color: #fff;
          font-size: 12px;
          margin-right: var(--v3-tagsview-gap);
          &:first-of-type {
            .is-icon-close {
              display: none;
            }
          }
          &:last-of-type {
            margin-right: 0;
          }

          &:hover .is-icon-close,
          &.is-active .is-icon-close,
          .is-icon-close:hover {
            width: 12px;
            height: 12px;
          }
          .is-icon-close {
            top: 0;
            &:hover {
              background-color: var(--v3-tagsview-tag-active-bg-color);
            }
            svg {
              margin-top: 0;
            }
          }
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
