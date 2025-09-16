import type ExcelJS from "exceljs"

declare module "vxe-table" {
  // BUG: VxeTable sheetMethod() 方法类型错误
  // 1. 重新声明 VxeTableDefines 命名空间
  export namespace VxeTableDefines {
    // 2. 扩展核心库缺失的属性
    export interface ExtortSheetMethodParams {
      workbook: ExcelJS.Workbook
      worksheet: ExcelJS.Worksheet
    }
  }
}
