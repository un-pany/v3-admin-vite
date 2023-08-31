import { type Ref, onBeforeUnmount, ref } from "vue"
import { debounce } from "lodash-es"

type TargetNode<T> = T & { _mutationObserver?: MutationObserver; _resizeObserver?: ResizeObserver }

type DefaultConfig = typeof defaultConfig

/** 默认配置 */
const defaultConfig = {
  /** 文本颜色 */
  color: "#c0c4cc",
  /** 文本透明度 */
  opacity: 0.5,
  /** 文本字体大小 */
  size: 16,
  /** 文本字体 */
  family: "serif",
  /** 文本倾斜角度 */
  angle: -20,
  /** 一处水印所占宽度（数值越大水印密度越低） */
  width: 300,
  /** 一处水印所占高度（数值越大水印密度越低） */
  height: 200
}

/** body 元素 */
const bodyEl = ref<HTMLElement>(document.body)

/**
 * 创建水印
 * 1. 可以选择传入挂载水印的容器元素，默认时 body
 * 2. 做了水印防御，能有效防御别人打开控制台删除或隐藏水印
 */
export function useWatermark(parentEl: Ref<HTMLElement | null> = bodyEl) {
  /** 备份文本 */
  let backupText: string
  /** 最终配置 */
  let mergeConfig: DefaultConfig
  /** 水印元素 */
  let watermarkEl: HTMLElement | null = null

  /** 设置水印 */
  const setWatermark = (text: string, config: Partial<DefaultConfig> = {}) => {
    if (!parentEl.value) {
      console.warn("请在 DOM 挂载完成后再调用 setWatermark 方法设置水印")
      return
    }
    // 备份文本
    backupText = text
    // 合并配置
    mergeConfig = { ...defaultConfig, ...config }
    // 创建水印元素
    createWatermarkEl()
    // 监听水印容器变化
    addParentElListener(parentEl.value)
  }

  /** 刷新水印（防御时调用） */
  const updateWatermark = debounce(() => {
    clearWatermark()
    createWatermarkEl()
    addParentElListener(parentEl.value!)
  }, 500)

  /** 创建水印元素 */
  const createWatermarkEl = () => {
    if (watermarkEl) {
      updateWatermarkEl()
      return
    }
    const div = document.createElement("div")
    div.style.pointerEvents = "none"
    div.style.top = "0"
    div.style.left = "0"
    div.style.position = "absolute"
    div.style.zIndex = "99999"
    watermarkEl = div
    const { clientWidth, clientHeight } = parentEl.value!
    updateWatermarkEl({ width: clientWidth, height: clientHeight })
    // 设置水印容器为相对定位
    parentEl.value!.style.position = "relative"
    // 将水印元素添加到水印容器中
    parentEl.value!.appendChild(div)
  }

  /** 更新水印元素 */
  const updateWatermarkEl = (
    options: Partial<{
      width: number
      height: number
    }> = {}
  ) => {
    if (!watermarkEl) return
    backupText && (watermarkEl.style.background = `url(${createBase64()}) left top repeat`)
    options.width && (watermarkEl.style.width = `${options.width}px`)
    options.height && (watermarkEl.style.height = `${options.height}px`)
  }

  /** 创建 base64 图片 */
  const createBase64 = () => {
    const { color, opacity, size, family, angle, width, height } = mergeConfig
    const canvasEl = document.createElement("canvas")
    canvasEl.width = width
    canvasEl.height = height
    const ctx = canvasEl.getContext("2d")
    if (ctx) {
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.font = `${size}px ${family}`
      ctx.rotate((Math.PI / 180) * angle)
      ctx.fillText(backupText, 0, height / 2)
    }
    return canvasEl.toDataURL()
  }

  /** 清除水印 */
  const clearWatermark = () => {
    if (!parentEl.value || !watermarkEl) return
    // 移除水印元素
    parentEl.value.removeChild(watermarkEl)
    watermarkEl = null
    // 移除对水印容器的监听
    removeParentElListener(parentEl.value)
  }

  /** 监听水印容器的变化（DOM 变化 & DOM 大小变化） */
  const addParentElListener = (targetNode: TargetNode<HTMLElement>) => {
    // 防止重复添加监听
    if (targetNode._mutationObserver || targetNode._resizeObserver) return
    // 监听 DOM 变化
    addMutationListener(targetNode)
    // 监听 DOM 大小变化
    addResizeListener(targetNode)
  }

  /** 移除对水印容器的监听 */
  const removeParentElListener = (targetNode: TargetNode<HTMLElement>) => {
    // 移除 mutation 监听
    targetNode._mutationObserver?.disconnect()
    targetNode._mutationObserver = undefined
    // 移除 resize 监听
    targetNode._resizeObserver?.unobserve(targetNode)
    targetNode._resizeObserver = undefined
  }

  /** 监听 DOM 变化 */
  const addMutationListener = (targetNode: TargetNode<HTMLElement>) => {
    // 观察器的配置（需要观察哪些变动）
    const mutationObserverOptions: MutationObserverInit = {
      // 观察目标节点属性变动
      attributes: true,
      // 观察目标子节点是否有添加或者删除
      childList: true,
      // 拓展到观察所有后代节点，默认为 false
      subtree: true
    }
    // 当观察到变动时执行的回调
    const mutationCallback = debounce((mutationList: MutationRecord[]) => {
      // 水印的防御（防止用户手动删除水印元素或通过 CSS 隐藏水印）
      mutationList.forEach((mutation) => {
        switch (mutation.type) {
          case "childList":
            mutation.removedNodes.forEach((item) => {
              item === watermarkEl && targetNode.appendChild(watermarkEl)
            })
            break
          case "attributes":
            if (mutation.target === watermarkEl) {
              updateWatermark()
            }
            break
        }
      })
    }, 500)
    // 创建一个观察器实例并传入回调
    const mutationObserver = new MutationObserver(mutationCallback)
    // 以上述配置开始观察目标节点
    mutationObserver.observe(targetNode, mutationObserverOptions)
    targetNode._mutationObserver = mutationObserver
  }

  /** 监听 DOM 大小变化 */
  const addResizeListener = (targetNode: TargetNode<HTMLElement>) => {
    // 当 targetNode 元素大小变化时去更新整个水印的大小
    const resizeCallback = debounce(() => {
      const { clientWidth, clientHeight } = targetNode
      updateWatermarkEl({ width: clientWidth, height: clientHeight })
    }, 500)
    // 创建一个观察器实例并传入回调
    const resizeObserver = new ResizeObserver(resizeCallback)
    // 开始观察目标节点
    resizeObserver.observe(targetNode)
    targetNode._resizeObserver = resizeObserver
  }

  /** 在组件卸载前移除水印以及各种监听 */
  onBeforeUnmount(() => {
    clearWatermark()
  })

  return { setWatermark, clearWatermark }
}
