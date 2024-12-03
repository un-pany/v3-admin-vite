import { type VxeColumnPropTypes } from "vxe-table/types/column"

const slots: VxeColumnPropTypes.Slots = {
  default: ({ row, column }) => {
    const cellValue = row[column.field]
    const type = cellValue === "admin" ? "primary" : "warning"
    return [<span class={`el-tag el-tag--${type} el-tag--plain`}>{cellValue}</span>]
  }
}

export default slots
