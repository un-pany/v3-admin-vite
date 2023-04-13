import { ref } from "vue"
import { defineStore } from "pinia"
import { type RouteLocationNormalized } from "vue-router"
import router from "@/router/index"
export type ITagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore("tags-view", () => {
  const route = router.currentRoute
  const visitedViews = ref<ITagView[]>([])
  const cachedViews = ref<string[]>([])

  const isActive = (tag: ITagView) => {
    return tag.path === route.value.path
  }

  //#region add
  const addVisitedView = (view: ITagView) => {
    if (
      visitedViews.value.some((v, index) => {
        if (v.path === view.path) {
          if (v.fullPath !== view.fullPath) {
            // 防止 query 参数丢失
            visitedViews.value[index] = Object.assign({}, view)
          }
          return true
        }
      })
    ) {
      return
    }
    visitedViews.value.push(Object.assign({}, view))
  }
  const addCachedView = (view: ITagView) => {
    if (typeof view.name !== "string") return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
    }
  }
  //#endregion

  //#region del
  const delVisitedView = (view: ITagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  const closeSelectedTag = (view: ITagView) => {
    delVisitedView(view)
    delCachedView(view)
    if (isActive(view)) {
      toLastView(visitedViews.value, view)
    }
  }

  const closeCurrentTag = () => {
    closeSelectedTag(route.value)
  }

  const closeAllTags = (view: ITagView, affixTags: ITagView[]) => {
    delAllVisitedViews()
    delAllCachedViews()
    if (affixTags.some((tag) => tag.path === route.value.path)) {
      return
    }
    toLastView(visitedViews.value, view)
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

  const delCachedView = (view: ITagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
  }
  //#endregion

  //#region delOthers
  const delOthersVisitedViews = (view: ITagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }
  const delOthersCachedViews = (view: ITagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // 如果 index = -1, 没有缓存的 tags
      cachedViews.value = []
    }
  }
  //#endregion

  //#region delAll
  const delAllVisitedViews = () => {
    // keep affix tags
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }
  const delAllCachedViews = () => {
    cachedViews.value = []
  }
  //#endregion

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
    delAllCachedViews,
    isActive,
    closeSelectedTag,
    closeCurrentTag,
    closeAllTags
  }
})
