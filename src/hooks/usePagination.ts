import { reactive } from "vue"

interface PaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

/** 默认的分页参数 */
const defaultPaginationData = reactive({
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
})

export const usePagination = (_paginationData: PaginationData = {}) => {
  /** 合并参数 */
  const paginationData = Object.assign(defaultPaginationData, _paginationData)

  /** 改变当前页 */
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }

  /** 改变当页面大小 */
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  return { paginationData, handleCurrentChange, handleSizeChange }
}
