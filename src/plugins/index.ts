import type { App } from "vue"
import { installElementPlusIcons } from "./element-plus-icons"
import { installPermissionDirective } from "./permission-directive"
import { installSvgIcons } from "./svg-icons"
import { installVxeTable } from "./vxe-table"

export function installPlugins(app: App) {
  installElementPlusIcons(app)
  installPermissionDirective(app)
  installSvgIcons(app)
  installVxeTable(app)
}
