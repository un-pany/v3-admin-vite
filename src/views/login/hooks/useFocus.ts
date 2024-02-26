import { ref } from "vue"

export function useFocus() {
  /** 是否有焦点 */
  const isFocus = ref<boolean>(false)

  /** 失去焦点 */
  const handleBlur = () => {
    isFocus.value = false
  }
  /** 获取焦点 */
  const handleFocus = () => {
    isFocus.value = true
  }

  return { isFocus, handleBlur, handleFocus }
}
