import { type Ref, getCurrentInstance, onBeforeUnmount, ref, shallowRef } from "vue"
import { throttle } from "lodash-es"

type TargetNode<T> = T & { _observer?: MutationObserver }

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
    // 移除对水印容器的监听
    removeResizeListener(parentEl.value)
  }

  function updateWatermark(
    options: {
      width?: number
      height?: number
      text?: string
    } = {}
  ) {
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
    div.style.zIndex = "100000"
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
    // 监听水印容器变化
    addResizeListener(parentEl.value)
    // 当前组件实例卸载前删除水印
    getCurrentInstance() && onBeforeUnmount(clear)
  }

  const defendRemoveWatermark = (mutationList: MutationRecord[], targetNode: HTMLElement) => {
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
          }
          break
      }
    })
  }

  const addResizeListener = (targetNode: TargetNode<HTMLElement>) => {
    if (targetNode._observer || !watermarkEl.value) return
    // 观察器的配置（需要观察什么变动）
    const observerOptions: MutationObserverInit = {
      // 观察目标子节点的变化，是否有添加或者删除
      attributes: true,
      // 观察属性变动
      childList: true
    }
    // 当观察到变动时执行的回调
    const callback = throttle((mutationList: MutationRecord[]) => {
      const { clientWidth, clientHeight } = targetNode
      updateWatermark({ width: clientWidth, height: clientHeight })
      // 明水印的防御
      defendRemoveWatermark(mutationList, targetNode)
    }, 500)
    // 创建一个观察器实例并传入回调
    const observer = new MutationObserver(callback)
    // 以上述配置开始观察目标节点
    observer.observe(targetNode, observerOptions)
    targetNode._observer = observer
  }

  const removeResizeListener = (targetNode: TargetNode<HTMLElement>) => {
    targetNode._observer?.disconnect()
    targetNode._observer = undefined
  }

  return { setWatermark, clear }
}
