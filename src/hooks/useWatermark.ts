import { type Ref, getCurrentInstance, onBeforeUnmount, ref, shallowRef } from "vue"
import { throttle } from "lodash-es"

type TargetNode<T> = T & { _mutationObserver?: MutationObserver; _resizeObserver?: ResizeObserver }

type DefaultConfig = typeof defaultConfig

/** 默认配置 */
const defaultConfig = {
  /** 文本颜色 */
  color: "#c0c4cc",
  /** 文本透明度 */
  opacity: 0.5,
  /** 文本字体大小 */
  size: "16px",
  /** 文本字体 */
  family: "serif",
  /** 文本倾斜角度 */
  angle: -20,
  /** canvas 宽度 */
  width: 200,
  /** canvas 高度 */
  height: 150
}

/** body 元素 */
const bodyEl = ref<HTMLElement>(document.body)

export function useWatermark(parentEl: Ref<HTMLElement | null> = bodyEl) {
  /** 最终配置 */
  let mergeConfig: DefaultConfig
  /** 水印元素 */
  const watermarkEl = shallowRef<HTMLElement | null>(null)

  const createBase64 = (text: string) => {
    const { color, opacity, size, family, angle, width, height } = mergeConfig ?? defaultConfig
    const canvasEl = document.createElement("canvas")
    canvasEl.width = width
    canvasEl.height = height
    const ctx = canvasEl.getContext("2d")
    if (ctx) {
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.font = size + " " + family
      ctx.rotate((Math.PI / 180) * angle)
      ctx.clearRect(0, 0, width, height)
      ctx.fillText(text, 0, height / 2)
    }
    return canvasEl.toDataURL()
  }

  /** 清除水印 */
  const clear = () => {
    if (!parentEl.value || !watermarkEl.value) return
    parentEl.value.removeChild(watermarkEl.value)
    watermarkEl.value = null
    // 移除对水印容器的监听（DOM 变化 & DOM 大小变化）
    removeDomListener(parentEl.value)
  }

  const updateWatermark = (
    options: Partial<{
      width: number
      height: number
      text: string
    }> = {}
  ) => {
    if (!watermarkEl.value) return
    options.width && (watermarkEl.value.style.width = `${options.width}px`)
    options.height && (watermarkEl.value.style.height = `${options.height}px`)
    options.text && (watermarkEl.value.style.background = `url(${createBase64(options.text)}) left top repeat`)
  }

  const createWatermark = (text: string) => {
    if (!parentEl.value) return
    if (watermarkEl.value) {
      updateWatermark({ text })
      return
    }
    const div = document.createElement("div")
    watermarkEl.value = div
    div.style.pointerEvents = "none"
    div.style.top = "0"
    div.style.left = "0"
    div.style.position = "absolute"
    div.style.zIndex = "9999"
    const { clientWidth, clientHeight } = parentEl.value
    updateWatermark({ width: clientWidth, height: clientHeight, text })
    parentEl.value.appendChild(div)
  }

  const setWatermark = (text: string, config: Partial<DefaultConfig> = {}) => {
    if (!parentEl.value) return
    // 设置水印容器为相对定位
    parentEl.value.style.position = "relative"
    // 合并配置
    mergeConfig = { ...defaultConfig, ...config }
    // 创建水印
    createWatermark(text)
    // 监听水印容器变化（DOM 变化 & DOM 大小变化）
    addDomListener(parentEl.value)
    // 当前组件实例卸载前删除水印
    getCurrentInstance() && onBeforeUnmount(clear)
  }

  const addDomListener = (targetNode: TargetNode<HTMLElement>) => {
    if (targetNode._mutationObserver || targetNode._resizeObserver || !watermarkEl.value) return
    // 监听 mutation 变化（DOM 变化）
    addMutationListener(targetNode)
    // 监听 resize 变化（DOM 大小变化）
    addResizeListener(targetNode)
  }

  const removeDomListener = (targetNode: TargetNode<HTMLElement>) => {
    // 取消 mutation 监听
    targetNode._mutationObserver?.disconnect()
    targetNode._mutationObserver = undefined
    // 取消 resize 监听
    targetNode._resizeObserver?.unobserve(targetNode)
    targetNode._resizeObserver = undefined
  }

  const addMutationListener = (targetNode: TargetNode<HTMLElement>) => {
    // 观察器的配置（需要观察什么变动）
    const observerOptions: MutationObserverInit = {
      // 观察属性变动
      attributes: true,
      // 观察目标子节点的变化，是否有添加或者删除
      childList: true,
      // 观察后代节点，默认为 false
      subtree: true
    }
    // 当观察到变动时执行的回调
    const mutationCallback = (mutationList: MutationRecord[]) => {
      // 水印的防御（防止用户手动删除水印元素或通过 CSS 隐藏水印）
      mutationList.forEach((mutation) => {
        switch (mutation.type) {
          case "childList":
            mutation.removedNodes.forEach((item) => {
              item === watermarkEl.value && targetNode.appendChild(watermarkEl.value)
            })
            break
          case "attributes":
            if (watermarkEl.value!.style.display === "none") {
              watermarkEl.value!.style.display = "block"
            } else if (watermarkEl.value!.style.visibility === "hidden") {
              watermarkEl.value!.style.visibility = "visible"
            }
            break
        }
      })
    }
    // 创建一个观察器实例并传入回调
    const mutationObserver = new MutationObserver(mutationCallback)
    // 以上述配置开始观察目标节点
    mutationObserver.observe(targetNode, observerOptions)
    targetNode._mutationObserver = mutationObserver
  }

  const addResizeListener = (targetNode: TargetNode<HTMLElement>) => {
    // 当 targetNode 元素大小变化时去更新整个水印的大小
    const resizeCallback = throttle(() => {
      const { clientWidth, clientHeight } = targetNode
      updateWatermark({ width: clientWidth, height: clientHeight })
    }, 500)
    const resizeObserver = new ResizeObserver(resizeCallback)
    resizeObserver.observe(targetNode)
    targetNode._resizeObserver = resizeObserver
  }

  return { setWatermark, clear }
}
