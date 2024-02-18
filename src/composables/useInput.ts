import { ref } from "vue"

export function useInput() {
  const isFocus = ref<boolean>(false)
  /**
   * @desc:失去焦点
   * @return {*}
   */
  const listenBlur = () => {
    isFocus.value = false
  }
  /**
   * @desc: 获取焦点
   * @return {*}
   */
  const listenFocus = () => {
    isFocus.value = true
  }
  return {
    isFocus,
    listenBlur,
    listenFocus
  }
}
