import { reactive } from "vue"

interface PaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

/** 默认的分页参数 */
const DEFAULT_PAGINATION_DATA = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}

export function usePagination(initPaginationData: PaginationData = {}) {
  /** 合并分页参数 */
  const paginationData = reactive({ ...DEFAULT_PAGINATION_DATA, ...initPaginationData })
  /** 改变当前页码 */
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }
  /** 改变页面大小 */
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  return { paginationData, handleCurrentChange, handleSizeChange }
}
