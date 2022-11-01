import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import elementEn from "element-plus/es/locale/lang/en"
import elementZh from "element-plus/lib/locale/lang/zh-cn"
import { useI18n } from "vue-i18n"

type ILocale = "zh" | "en"

export const useLocales = defineStore("locales", () => {
  const i18n = useI18n()
  /** 当前语言 */
  const locale = ref<ILocale>((localStorage.getItem("locale") as ILocale) || "zh")
  /** Element UI的语言包 */
  const elementLocale = computed(() => {
    return locale.value === "en" ? elementEn : elementZh
  })
  watch(locale, (n) => {
    i18n.locale.value = n
    localStorage.setItem("locale", n)
  })
  return { locale, elementLocale }
})
