import { type Ref, ref } from "vue"
import { defineStore } from "pinia"
import layoutSettings from "@/config/layout"

type SettingsStore = {
  // 使用映射类型来遍历 layoutSettings 对象的键
  [Key in keyof typeof layoutSettings]: Ref<(typeof layoutSettings)[Key]>
}

export const useSettingsStore = defineStore("settings", () => {
  /** 状态对象 */
  const state = {} as SettingsStore
  // 遍历 layoutSettings 对象的键值对
  for (const [key, value] of Object.entries(layoutSettings)) {
    // 使用类型断言来指定 key 的类型，将 value 包装在 ref 函数中，创建一个响应式变量
    state[key as keyof SettingsStore] = ref(value)
  }

  return state
})
