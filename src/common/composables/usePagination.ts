import type { WatchOptions } from "vue"

interface PaginationData {
  total?: number
  currentPage?: number
  pageSizes?: number[]
  pageSize?: number
  layout?: string
}

interface UsePaginationOptions extends PaginationData {
  callback?: () => void
}

/** 默认的分页参数 */
const DEFAULT_PAGINATION_DATA = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}

/** 分页 Composable */
export function usePagination(options: UsePaginationOptions = {}) {
  const { callback, ...initPaginationData } = options

  // 合并分页参数
  const paginationData = reactive({ ...DEFAULT_PAGINATION_DATA, ...initPaginationData })

  // 改变当前页码
  const handleCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }

  // 改变每页显示条数
  const handleSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  // 重置当前页码，已在第一页时直接执行回调
  const resetCurrentPage = () => {
    paginationData.currentPage === 1 ? callback?.() : (paginationData.currentPage = 1)
  }

  // 监听分页参数变化，并执行回调
  const watchPagination = (options: WatchOptions = { immediate: true }) => {
    watch(
      [() => paginationData.currentPage, () => paginationData.pageSize],
      () => callback?.(),
      options
    )
  }

  return {
    paginationData,
    handleCurrentChange,
    handleSizeChange,
    resetCurrentPage,
    watchPagination
  }
}
