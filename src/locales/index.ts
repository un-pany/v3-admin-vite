/** 引入语言包 */
const locales: any = {
  en: import.meta.glob("./en/**/*.ts", { eager: true, import: "default" }),
  zh: import.meta.glob("./zh/**/*.ts", { eager: true, import: "default" })
}

const message: any = {}
for (const key in locales) {
  const locale = locales[key]
  for (const path in locale) {
    message[key] = { ...message[key], ...locale[path] }
  }
}

export default message
