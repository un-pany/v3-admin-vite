import { LanguageName, useLanguage } from "@@/composables/useLanguage"
import { createI18n } from "vue-i18n"
import enUS from "vxe-table/lib/locale/lang/en-US"
import zhCN from "vxe-table/lib/locale/lang/zh-CN"
import enLocale from "./locale/en.json"
import zhCnLocale from "./locale/zh-cn.json"

const { activeLanguageName } = useLanguage()

const messages = {
  [LanguageName.ZH_CN]: {
    ...zhCN,
    ...zhCnLocale
  },
  [LanguageName.EN]: {
    ...enUS,
    ...enLocale
  }
}

export const i18n = createI18n({
  legacy: false, // 必须设置false才能使用Composition API
  globalInjection: true, // 为每个组件注入$为前缀的全局属性和函数
  locale: activeLanguageName.value,
  messages
})
