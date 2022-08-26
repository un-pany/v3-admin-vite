import { ref } from "vue"
import { defineStore } from "pinia"
import type { _RouteLocationBase, RouteLocationNormalized } from "vue-router"

export interface ITagView extends Partial<RouteLocationNormalized> {
  title?: string
  to?: _RouteLocationBase
}

export const useTagsViewStore = defineStore("tags-view", () => {
  const visitedViews = ref<ITagView[]>([])

  const addVisitedView = (view: ITagView) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || "no-name"
      })
    )
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
  const updateVisitedView = (view: ITagView) => {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return { visitedViews, addVisitedView, delVisitedView, delOthersVisitedViews, delAllVisitedViews, updateVisitedView }
})
