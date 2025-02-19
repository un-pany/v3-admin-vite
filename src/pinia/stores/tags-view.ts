import type { RouteLocationNormalizedGeneric } from "vue-router"
import { pinia } from "@/pinia"
import { getCachedViews, getVisitedViews, setCachedViews, setVisitedViews } from "@@/utils/cache/local-storage"
import { useSettingsStore } from "./settings"

export type TagView = Partial<RouteLocationNormalizedGeneric>

export const useTagsViewStore = defineStore("tags-view", () => {
  const { cacheTagsView } = useSettingsStore()
  const visitedViews = ref<TagView[]>(cacheTagsView ? getVisitedViews() : [])
  const cachedViews = ref<string[]>(cacheTagsView ? getCachedViews() : [])

  // 缓存标签栏数据
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
  })

  // #region add
  const addVisitedView = (view: TagView) => {
    // 检查是否已经存在相同的 visitedView
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      // 防止 query 参数丢失
      visitedViews.value[index].fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else {
      // 添加新的 visitedView
      visitedViews.value.push({ ...view })
    }
  }

  const addCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
    }
  }
  // #endregion

  // #region del
  const delVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      visitedViews.value.splice(index, 1)
    }
  }

  const delCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value.splice(index, 1)
    }
  }
  // #endregion

  // #region delOthers
  const delOthersVisitedViews = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }

  const delOthersCachedViews = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
  }
  // #endregion

  // #region delAll
  const delAllVisitedViews = () => {
    // 保留固定的 tags
    visitedViews.value = visitedViews.value.filter(tag => tag.meta?.affix)
  }

  const delAllCachedViews = () => {
    cachedViews.value = []
  }
  // #endregion

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews
  }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useTagsViewStoreOutside() {
  return useTagsViewStore(pinia)
}
