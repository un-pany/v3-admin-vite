import { defineStore } from "pinia"
import { RouteLocationNormalized, RouteMeta } from "vue-router"

const DEFAULT_ROUTE_NAME = "Dashboard"
const REDIRECT_ROUTE_NAME = "Redirect"
const BAN_LIST = [REDIRECT_ROUTE_NAME]
const DEFAULT_ROUTE = {
  title: "首页",
  name: DEFAULT_ROUTE_NAME,
  fullPath: "/dashboard",
  meta: {
    affix: true
  }
}

export interface TagProps {
  title: string
  name: string
  fullPath: string
  query?: any
  keepAlive?: boolean
  meta?: RouteMeta
  path?: string
}

export interface TabBarState {
  tagList: TagProps[]
  cacheTabList: Set<string>
}

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query, path } = route
  return {
    title: meta.title || "",
    name: String(name),
    fullPath,
    query,
    keepAlive: meta.keepAlive,
    meta,
    path
  }
}

const useTabBarStore = defineStore("tabBar", {
  state: (): TabBarState => ({
    cacheTabList: new Set([DEFAULT_ROUTE_NAME]),
    tagList: [DEFAULT_ROUTE]
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },

    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    }
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return
      this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string)
      }
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (name && name !== "") this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.keepAlive)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = []
      this.cacheTabList.clear()
      this.cacheTabList.add(DEFAULT_ROUTE_NAME)
    }
  }
})

export default useTabBarStore
