import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: any) => {
  if (time == null || time === "") {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

/** 快捷日期 */
export const getDateShortcuts = () => {
  const now = new Date()
  const dMin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const dMax = new Date(dMin.getTime() + 24 * 60 * 60 * 1000 - 1)
  const getTime = (days: number, max?: boolean) => {
    const sec = max ? 1 : 0
    const date = new Date(dMin.getTime() + days * 24 * 60 * 60 * 1000 - sec)
    return formatDateTime(date)
  }
  const tMin = formatDateTime(dMin)
  const tMax = formatDateTime(dMax)
  const list = [
    { text: "今天", value: () => [tMin, tMax] },
    { text: "昨天", value: () => [getTime(-1), getTime(0, true)] },
    { text: "最近3天", value: () => [getTime(-2), tMax] },
    { text: "最近7天", value: () => [getTime(-6), tMax] },
    { text: "最近15天", value: () => [getTime(-14), tMax] },
    { text: "最近30天", value: () => [getTime(-29), tMax] }
  ]
  return list
}

/** 将全局 CSS 变量导入 JS 中使用 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}
