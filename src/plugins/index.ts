import { type App } from "vue"
import { loadElementPlus } from "./element-pus"
import { loadElementPlusIcon } from "./element-pus-icon"

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
}
