import { type App } from "vue"
// https://vxetable.cn/#/table/start/install
import VXETable from "vxe-table"
// https://github.com/x-extends/vxe-table-plugin-element
import VXETablePluginElement from "vxe-table-plugin-element"

VXETable.use(VXETablePluginElement)
// 全局默认参数
VXETable.setup({
  // size: "medium", // 全局尺寸
  zIndex: 1000, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  loadingText: null, // 全局loading提示内容，如果为 null 则不显示文本
  table: {
    align: "center",
    border: "inner",
    headerAlign: "center",
    showHeader: true,
    showOverflow: "tooltip",
    showHeaderOverflow: "tooltip",
    autoResize: true,
    //   stripe: false,
    //   border: false,
    //   round: false,
    emptyText: "暂无数据",
    rowId: "_XID", // 行数据的唯一主键字段名
    rowConfig: { isHover: true, isCurrent: true },
    columnConfig: { resizable: true }
  },
  pager: {
    // size: 'small',
    perfect: false, // 配套的样式
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [5, 10, 20, 50, 100, 150],
    layouts: ["Total", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "FullJump"]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    mask: true,
    lockView: true,
    transfer: true,
    draggable: false,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true
  }
})

export function loadVxeTable(app: App) {
  /** Vxe-Table 组件完整引入 */
  app.use(VXETable)
}
