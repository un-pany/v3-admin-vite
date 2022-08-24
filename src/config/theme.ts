/** 注册的主题, 其中 normal 是必须的, dark 是内置的, 如需更多主题，可自行注册 */
export type ThemeName = "normal" | "dark"

interface IThemeList {
  title: string
  name: ThemeName
}

const themeList: IThemeList[] = [
  {
    title: "默认",
    name: "normal"
  },
  {
    title: "黑暗",
    name: "dark"
  }
]

export default themeList
