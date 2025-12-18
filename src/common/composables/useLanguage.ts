import en from "element-plus/es/locale/lang/en" // Element Plus 英文包
import zhCn from "element-plus/es/locale/lang/zh-cn" // Element Plus 中文包
import { i18n } from "@/i18n"
import { getActiveLanguageName, setActiveLanguageName } from "../utils/cache/local-storage"

/** 注册的语言名称 */
export enum LanguageName {
  ZH_CN = "zh-cn",
  EN = "en"
}

const DEFAULT_LANGUAGE = LanguageName.ZH_CN

/** 语言列表 */
const languageList = [
  { title: "简体中文", name: LanguageName.ZH_CN },
  { title: "English", name: LanguageName.EN }
]

/** 正在应用的语言 */
const activeLanguageName = ref<LanguageName>(getActiveLanguageName() || DEFAULT_LANGUAGE)

/** 设置语言 */
function setLanguage(value: LanguageName) {
  activeLanguageName.value = value
  setActiveLanguageName(value)
  i18n.global.locale.value = value
}

/** Element Plus 语言包 */
const epLocale = computed(() => {
  switch (activeLanguageName.value) {
    case LanguageName.EN:
      return en
    case LanguageName.ZH_CN:
    default:
      return zhCn
  }
})

export function useLanguage() {
  return { epLocale, languageList, activeLanguageName, setLanguage }
}
