<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import {
  VxeGridInstance,
  VxeGridProps,
  VxeModalInstance,
  VxeModalProps,
  VxeFormInstance,
  VxeFormProps,
  VxeGridPropTypes,
  VxeFormDefines
} from "vxe-table"
import { deleteTableDataApi, getTableDataApi } from "@/api/table"
import { getDateShortcuts } from "@/utils/index"
import useRoleColumnSolts from "./hooks/useRoleColumnSolts"
import useStatusColumnSolts from "./hooks/useStatusColumnSolts"

/** 快捷日期 */
const shortcuts = getDateShortcuts()

//#region vxe-grid
interface iRowMeta {
  id: string
  username: string
  roles: string
  phone: string
  email: string
  status: boolean
  creatTime: string
  operate?: string
  _XID?: string
}
const xGridDom = ref({} as VxeGridInstance)
const xGridOpt = reactive<VxeGridProps>({
  loading: true,
  height: "auto",
  autoResize: true,
  headerRowClassName: "xgrid-header-row",
  /** 分页配置项 */
  pagerConfig: { align: "center" },
  /** 表单配置项 */
  formConfig: {
    items: [
      // 可自定义按钮
      // {
      //   itemRender: {
      //     name: "$button",
      //     props: { content: "新增用户", status: "primary", icon: "vxe-icon-add" },
      //     events: { click: () => crudStore.onShowModal() }
      //   }
      // },
      {
        field: "time",
        itemRender: {
          name: "ElDatePicker",
          // defaultValue: shortcuts[0].value(),
          props: {
            type: "datetimerange",
            shortcuts: shortcuts,
            valueFormat: "YYYY-MM-DD HH:mm:ss",
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间"
          }
        }
      },
      {
        field: "role",
        itemRender: {
          name: "$select",
          props: { placeholder: "角色", clearable: true, filterable: true },
          options: [
            { value: "admin", label: "admin" },
            { value: "editor", label: "editor" }
          ]
        }
      },
      {
        field: "username",
        itemRender: { name: "$input", props: { placeholder: "用户名", clearable: true } }
      },
      {
        field: "phone",
        itemRender: { name: "$input", props: { placeholder: "手机号", clearable: true } }
      },
      {
        itemRender: {
          name: "$buttons",
          children: [
            { props: { type: "submit", content: "查询", status: "primary" } },
            { props: { type: "reset", content: "重置" } }
          ]
        }
      }
    ]
  },
  /** 工具栏配置 */
  toolbarConfig: {
    refresh: true,
    custom: true,
    slots: { buttons: "toolbar-btns" }
  },
  /** 自定义列配置项 */
  customConfig: {
    /** 是否允许列选中  */
    checkMethod: ({ column }) => !["username", "operate"].includes(column.field)
  },
  /** 列配置 */
  columns: [
    { type: "checkbox", align: "center", width: "50px" },
    { field: "username", title: "用户名" },
    {
      field: "roles",
      title: "角色",
      slots: useRoleColumnSolts
      /** 自定义列与type=html的列一起使用，会产生错误，所以改用JSX */
      // type: "html",
      // formatter: ({ cellValue }) => {
      //   const type = cellValue === "admin" ? "" : "warning"
      //   return `<span class="el-tag el-tag--${type}">${cellValue}</span>`
      // }
    },
    { field: "phone", title: "手机号" },
    { field: "email", title: "邮箱" },
    {
      field: "status",
      title: "状态",
      slots: useStatusColumnSolts
    },
    { field: "creatTime", title: "创建时间" },
    {
      field: "operate",
      title: "操作",
      width: "150px",
      align: "center",
      fixed: "right",
      showOverflow: false,
      className: "operate-cell",
      slots: { default: "row-operate" }
    }
  ],
  /** 数据代理配置项（基于 Promise API） */
  proxyConfig: {
    /** 启用动态序号代理 */
    seq: true,
    /** 是否代理表单 */
    form: true,
    /** 默认true, 是否自动加载 */
    // autoLoad: false,
    props: { total: "total" },
    ajax: {
      query: ({ page, form }: VxeGridPropTypes.ProxyAjaxQueryParams) => {
        xGridOpt.loading = true
        crudStore.clearTable()
        return new Promise<any>((resolve: Function) => {
          let total = 0
          let result: iRowMeta[] = []

          // 加载数据
          const callback = (res?: any) => {
            if (res && res.data) {
              const resData = res.data
              // 总数
              if (Number.isInteger(resData.total)) {
                total = resData.total
              }
              // 分页数据
              if (Array.isArray(resData.list)) {
                result = resData.list
              }
            }
            xGridOpt.loading = false
            resolve({ total, result })
          }

          // 调用接口
          const time = form.time || []
          const params = {
            startTime: time[0],
            endTime: time[1],
            role: form.role || undefined,
            username: form.username || undefined,
            phone: form.phone || undefined,
            size: page.pageSize,
            currentPage: page.currentPage
          }
          getTableDataApi(params).then(callback).catch(callback)
        })
      }
    }
  }
})
//#endregion

//#region vxe-modal
const xModalDom = ref({} as VxeModalInstance)
const xModalOpt = reactive<VxeModalProps>({
  title: "",
  className: "xmodal-crud",
  showClose: false,
  escClosable: false,
  maskClosable: false,
  beforeHideMethod: () => {
    xFormDom.value.clearValidate()
    return Promise.resolve()
  }
})
//#endregion

//#region vxe-form
const xFormDom = ref({} as VxeFormInstance)
const xFormOpt = reactive<VxeFormProps>({
  span: 24,
  titleWidth: "100px",
  loading: false,
  /** 是否显示标题冒号 */
  titleColon: true,
  /** 表单数据 */
  data: {
    username: "",
    roles: "",
    phone: "",
    age: undefined,
    hobbies: [],
    career: "",
    status: false
  },
  /** 项列表 */
  items: [
    {
      field: "username",
      title: "用户名",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "roles",
      title: "角色",
      itemRender: {
        name: "$select",
        options: [
          { value: "admin", label: "admin" },
          { value: "editor", label: "editor" }
        ],
        props: { placeholder: "请选择" }
      }
    },
    {
      field: "phone",
      title: "手机号",
      itemRender: { name: "$input", props: { placeholder: "请输入" } }
    },
    {
      field: "age",
      title: "年龄",
      itemRender: { name: "$input", props: { type: "number", placeholder: "请输入" } }
    },
    {
      field: "hobbies",
      title: "爱好",
      itemRender: {
        name: "$checkbox",
        options: [
          { label: "爬山", value: "爬山" },
          { label: "健身", value: "健身" }
        ]
      }
    },
    {
      field: "career",
      title: "职业",
      itemRender: {
        name: "$radio",
        options: [
          { label: "演员", value: "演员" },
          { label: "警察", value: "警察" },
          { label: "司机", value: "司机" }
        ]
      }
    },
    {
      field: "status",
      title: "状态",
      itemRender: { name: "$switch", props: { openLabel: "启用", closeLabel: "禁用" } }
    },
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          { props: { content: "取消" }, events: { click: () => xModalDom.value.close() } },
          {
            props: { type: "submit", content: "确定", status: "primary" },
            events: { click: () => crudStore.onSubmitForm() }
          }
        ]
      }
    }
  ],
  /** 校验规则 */
  rules: {
    username: [
      {
        required: true,
        validator: ({ itemValue }) => {
          if (!itemValue) {
            return new Error("请输入")
          }
          if (!itemValue.trim()) {
            return new Error("空格无效")
          }
        }
      }
    ],
    roles: [
      {
        required: true,
        validator: ({ itemValue }) => {
          if (!itemValue) {
            return new Error("请选择")
          }
        }
      }
    ],
    age: [
      {
        type: "number",
        validator: ({ itemValue }) => {
          if (itemValue && !/^[1-9]\d*$/.test(itemValue)) {
            return new Error("必须是非零正整数")
          }
        }
      }
    ]
  }
})
//#endregion

//#region CRUD
const crudStore = reactive({
  /** 表单类型：修改-true 新增-false */
  isUpdate: true,
  /** 加载表格数据 */
  commitQuery: () => xGridDom.value.commitProxy("query"),
  /** 清空表格数据 */
  clearTable: () => xGridDom.value.reloadData([]),
  /** 点击显示弹窗 */
  onShowModal: (row?: iRowMeta) => {
    if (row) {
      crudStore.isUpdate = true
      xModalOpt.title = "修改用户"
      // 赋值
      xFormOpt.data.username = row.username
      xFormOpt.data.roles = row.roles
      xFormOpt.data.phone = row.phone
      xFormOpt.data.age = 20
      xFormOpt.data.hobbies = []
      xFormOpt.data.career = ""
      xFormOpt.data.status = row.status
    } else {
      crudStore.isUpdate = false
      xModalOpt.title = "新增用户"
    }
    /** 禁用 */
    if (xFormOpt.items) {
      if (xFormOpt.items[0] && xFormOpt.items[0].itemRender && xFormOpt.items[0].itemRender.props) {
        xFormOpt.items[0].itemRender.props.disabled = crudStore.isUpdate
      }
    }
    xModalDom.value.open()
    nextTick(() => {
      !crudStore.isUpdate && xFormDom.value.reset()
      xFormDom.value.clearValidate()
    })
  },
  /** 确定并保存 */
  onSubmitForm: () => {
    if (xFormOpt.loading) return
    xFormDom.value.validate((errMap?: VxeFormDefines.ValidateErrorMapParams) => {
      // console.log("validate", errMap)
      if (errMap) return
      xFormOpt.loading = true
      const callback = (err?: any) => {
        xFormOpt.loading = false
        if (err) return
        xModalDom.value.close()
        ElMessage.success("保存成功")
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
      window.setTimeout(() => callback(), 1000)
      //@todo
      // const params = {}
      // if (crudStore.isUpdate) {
      //   updateApi(params)
      //     .then(() => callback())
      //     .catch(callback)
      // } else {
      //   insertApi(params)
      //     .then(() => callback())
      //     .catch(callback)
      // }
    })
  },
  /** 新增后是否跳入最后一页 */
  afterInsert: () => {
    const pager: VxeGridPropTypes.ProxyAjaxQueryPageParams = xGridDom.value.getProxyInfo()?.pager
    if (pager) {
      const currTotal: number = pager.currentPage * pager.pageSize
      if (currTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** 删除 */
  onDelete: (row: iRowMeta) => {
    const tip = `确定 <strong style='color:red;'>删除</strong> 用户 <strong style='color:#409eff;'>${row.username}</strong> ？`
    const config: any = {
      type: "warning",
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true
    }
    ElMessageBox.confirm(tip, "提示", config)
      .then(() => {
        deleteTableDataApi(Number(row.id))
          .then(() => {
            ElMessage.success("删除成功")
            crudStore.afterDelete()
            crudStore.commitQuery()
          })
          .catch(() => 1)
      })
      .catch(() => 1)
  },
  /** 删除后是否返回上一页 */
  afterDelete: () => {
    const tableData: Array<iRowMeta> = xGridDom.value.getData()
    const pager: VxeGridPropTypes.ProxyAjaxQueryPageParams = xGridDom.value.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** 更多自定义方法 */
  moreFunc: () => {}
})
//#endregion

/** end */
</script>

<template>
  <div class="app-container only-xgrid is-overflow">
    <!-- 表格 -->
    <vxe-grid ref="xGridDom" v-bind="xGridOpt">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <vxe-button status="primary" icon="vxe-icon-add" @click="crudStore.onShowModal()">新增用户</vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete">批量删除</vxe-button>
      </template>

      <!-- 操作 -->
      <template #row-operate="{ row }">
        <el-button link type="primary" @click="crudStore.onShowModal(row)">编辑</el-button>
        <el-button link type="danger" @click="crudStore.onDelete(row)">删除</el-button>
      </template>
    </vxe-grid>

    <!-- 弹窗 -->
    <vxe-modal ref="xModalDom" v-bind="xModalOpt">
      <!-- 表单 -->
      <vxe-form ref="xFormDom" v-bind="xFormOpt" />
    </vxe-modal>
  </div>
</template>

<style lang="scss"></style>

<style lang="scss" scoped></style>
