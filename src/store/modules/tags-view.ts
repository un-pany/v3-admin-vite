import { ref } from "vue"
import { defineStore } from "pinia"
import { type RouteLocationNormalized } from "vue-router"

export type ITagView = Partial<RouteLocationNormalized>

export const useTagsViewStore = defineStore("tags-view", () => {
  const visitedViews = ref<ITagView[]>([])

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
  const delVisitedView = (view: ITagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }
  const delOthersVisitedViews = (view: ITagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }
  const delAllVisitedViews = () => {
    // keep affix tags
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }

  return { visitedViews, addVisitedView, delVisitedView, delOthersVisitedViews, delAllVisitedViews }
})
