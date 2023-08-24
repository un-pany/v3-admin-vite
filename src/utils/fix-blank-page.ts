import { useTagsViewStoreHook } from "@/store/modules/tags-view"

/**
 * 功能：修复 <transition> 和 <keep-alive> 组合使用导致的页面空白
 * 原因：似乎是 Vue 本身的 BUG：https://github.com/vuejs/core/issues/7121
 * 复现：在不使用该函数的情况下，可以通过如下步骤复现：
 * 1. 进入一个页面
 * 2. 修改该页面的 TS 代码并保存
 * 3. 回到浏览器切换一下页面
 * 4. 结果：内容区没有加载出来呈现空白状态
 */
export const fixBlankPage = () => {
  const tagsViewStore = useTagsViewStoreHook()
  tagsViewStore.cachedViews = [...tagsViewStore.cachedViews]
}
