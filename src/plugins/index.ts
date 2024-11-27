import type { App } from "vue"
import { loadElementPlus } from "./element-plus"
import { loadElementPlusIcons } from "./element-plus-icons"
import { loadPermissionDirective } from "./permission-directive"
import { loadSvgIcons } from "./svg-icons"
import { loadVxeTable } from "./vxe-table"

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcons(app)
  loadPermissionDirective(app)
  loadSvgIcons(app)
  loadVxeTable(app)
}
