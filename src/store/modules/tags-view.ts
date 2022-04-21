import { defineStore } from 'pinia'
import { _RouteLocationBase, RouteLocationNormalized } from 'vue-router'

export interface ITagView extends Partial<RouteLocationNormalized> {
  title?: string
  to?: _RouteLocationBase
}

interface ITagsViewState {
  visitedViews: ITagView[]
}

export const useTagsViewStore = defineStore({
  id: 'tags-view',
  state: (): ITagsViewState => {
    return {
      visitedViews: []
    }
  },
  actions: {
    addVisitedView(view: ITagView) {
      if (this.visitedViews.some((v) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },
    delVisitedView(view: ITagView) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },
    delOthersVisitedViews(view: ITagView) {
      this.visitedViews = this.visitedViews.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    delAllVisitedViews() {
      // keep affix tags
      const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix)
      this.visitedViews = affixTags
    },
    updateVisitedView(view: ITagView) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
