import type { App } from "vue"
import VXETable from "vxe-table" // https://vxetable.cn/#/start/install

// 全局默认参数
VXETable.setConfig({
  // 全局尺寸
  size: "medium",
  // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  zIndex: 9999,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  version: 0,
  // 全局 loading 提示内容，如果为 null 则不显示文本
  loadingText: null,
  table: {
    showHeader: true,
    showOverflow: "tooltip",
    showHeaderOverflow: "tooltip",
    autoResize: true,
    // stripe: false,
    border: "inner",
    // round: false,
    emptyText: "暂无数据",
    rowConfig: {
      isHover: true,
      isCurrent: true,
      // 行数据的唯一主键字段名
      keyField: "_VXE_ID"
    },
    columnConfig: {
      resizable: false
    },
    align: "center",
    headerAlign: "center"
  },
  pager: {
    // size: "medium",
    // 配套的样式
    perfect: false,
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 20, 50],
    layouts: ["Total", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "Sizes", "FullJump"]
  },
  modal: {
    minWidth: 500,
    minHeight: 400,
    lockView: true,
    mask: true,
    // duration: 3000,
    // marginSize: 20,
    dblclickZoom: false,
    showTitleOverflow: true,
    transfer: true,
    draggable: false
  }
})

export function installVxeTable(app: App) {
  // Vxe Table 组件完整引入
  app.use(VXETable)
}
