import { type VxeColumnPropTypes } from "vxe-table/types/column"

const solts: VxeColumnPropTypes.Slots = {
  default: ({ row, column }) => {
    const cellValue = row[column.field]
    let type = "danger"
    let value = "禁用"
    if (cellValue) {
      type = "success"
      value = "启用"
    }
    return [<span class={`el-tag el-tag--${type} el-tag--plain`}>{value}</span>]
  }
}

export default solts
