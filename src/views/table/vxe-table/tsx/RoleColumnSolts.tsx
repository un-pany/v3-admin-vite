import { type VxeColumnPropTypes } from "vxe-table/types/column"

const solts: VxeColumnPropTypes.Slots = {
  default: ({ row, column }) => {
    const cellValue = row[column.field]
    const type = cellValue === "admin" ? "" : "warning"
    return [<span class={`el-tag el-tag--${type}`}>{cellValue}</span>]
  }
}

export default solts
