type OptionValue = string | number

/** Select 需要的数据格式 */
interface SelectOption {
  value: OptionValue
  label: string
  disabled?: boolean
}

/** 接口响应格式 */
type ApiData = ApiResponseData<SelectOption[]>

/** 入参格式，暂时只需要传递 api 函数即可 */
interface FetchSelectProps {
  api: () => Promise<ApiData>
}

/** 下拉选择器 Composable */
export function useFetchSelect(props: FetchSelectProps) {
  const { api } = props

  const loading = ref<boolean>(false)
  const options = ref<SelectOption[]>([])
  const value = ref<OptionValue>("")

  // 调用接口获取数据
  const loadData = () => {
    loading.value = true
    options.value = []
    api().then((res) => {
      options.value = res.data
    }).finally(() => {
      loading.value = false
    })
  }

  onMounted(() => {
    loadData()
  })

  return { loading, options, value }
}
