<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, watch } from "vue"
import { type RouteRecordRaw, RouterLink, useRoute } from "vue-router"
import { type ITagView, useTagsViewStore } from "@/store/modules/tags-view"
import { usePermissionStore } from "@/store/modules/permission"
import ScrollPane from "./ScrollPane.vue"
import path from "path-browserify"
import { Close } from "@element-plus/icons-vue"
import { useTags } from "@/hooks/useTags"

const instance = getCurrentInstance()
const route = useRoute()
const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()

const { close, closeAll, closeOther, refresh } = useTags()

const tagRefs = ref<InstanceType<typeof RouterLink>[]>([])

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref<ITagView>({})

const isAffix = (tag: ITagView) => {
  return tag.meta?.affix
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
  tagsViewStore.setAffixTags(filterAffixTags(permissionStore.routes))
  for (const tag of tagsViewStore.affixTags) {
    // 必须含有 name 属性
    if (tag.name) {
      tagsViewStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  if (route.name) {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
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
    <ScrollPane class="tags-view-wrapper" :tagRefs="tagRefs">
      <router-link
        ref="tagRefs"
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :class="tagsViewStore.isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? close(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <el-icon v-if="!isAffix(tag)" :size="12" @click.prevent.stop="close(tag)">
          <Close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refresh(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="close(selectedTag)">关闭</li>
      <li @click="closeOther(selectedTag)">关闭其它</li>
      <li @click="closeAll(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--v3-tagsview-height);
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
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
