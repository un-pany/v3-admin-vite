<script lang="ts" setup>
import type { FormRules } from "element-plus"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search, Grid, List } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

// 定义本地用户数据类型
interface UserData {
  id: number
  username: string
  phone: string
  email: string
  roles: string
  status: boolean
  createTime: string
}

// 本地用户数据常量
const USER_DATA_LIST: UserData[] = [
  { id: 1, username: '张三', phone: '13800138001', email: 'zhangsan@example.com', roles: 'admin', status: true, createTime: '2023-01-01 10:00:00' },
  { id: 2, username: '李四', phone: '13800138002', email: 'lisi@example.com', roles: 'user', status: true, createTime: '2023-01-02 11:00:00' },
  { id: 3, username: '王五', phone: '13800138003', email: 'wangwu@example.com', roles: 'user', status: false, createTime: '2023-01-03 12:00:00' },
  { id: 4, username: '赵六', phone: '13800138004', email: 'zhaoliu@example.com', roles: 'admin', status: true, createTime: '2023-01-04 13:00:00' },
  { id: 5, username: '孙七', phone: '13800138005', email: 'sunqi@example.com', roles: 'user', status: true, createTime: '2023-01-05 14:00:00' },
  { id: 6, username: '周八', phone: '13800138006', email: 'zhouba@example.com', roles: 'user', status: false, createTime: '2023-01-06 15:00:00' },
  { id: 7, username: '吴九', phone: '13800138007', email: 'wujiu@example.com', roles: 'admin', status: true, createTime: '2023-01-07 16:00:00' },
  { id: 8, username: '郑十', phone: '13800138008', email: 'zhengshi@example.com', roles: 'user', status: true, createTime: '2023-01-08 17:00:00' },
  { id: 9, username: '陈一', phone: '13800138009', email: 'chenyi@example.com', roles: 'user', status: true, createTime: '2023-01-09 18:00:00' },
  { id: 10, username: '刘二', phone: '13800138010', email: 'liuer@example.com', roles: 'admin', status: false, createTime: '2023-01-10 19:00:00' }
]

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)

// 视图切换状态
const viewMode = ref<'list' | 'card'>('list')

// 选中的卡片ID
const selectedCardId = ref<number | null>(null)

// 处理视图切换
const handleViewModeChange = () => {
  viewMode.value = viewMode.value === 'list' ? 'card' : 'list'
}

// 处理卡片点击
const handleCardClick = (id: number) => {
  selectedCardId.value = selectedCardId.value === id ? null : id
}

// 过滤后的用户数据
const filteredUserData = ref<UserData[]>(USER_DATA_LIST)

// #region 增
const DEFAULT_FORM_DATA: Partial<UserData> = {
  id: undefined,
  username: "",
  password: ""
}

const dialogVisible = ref<boolean>(false)

const formRef = useTemplateRef("formRef")

const formData = ref<Partial<UserData>>(cloneDeep(DEFAULT_FORM_DATA))

const formRules: FormRules<Partial<UserData>> = {
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }]
}

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    
    if (formData.value.id === undefined) {
      // 新增用户
      const newUser: UserData = {
        id: USER_DATA_LIST.length + 1,
        username: formData.value.username || "",
        phone: "",
        email: "",
        roles: "user",
        status: true,
        createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
      USER_DATA_LIST.push(newUser)
    } else {
      // 更新用户
      const index = USER_DATA_LIST.findIndex(user => user.id === formData.value.id)
      if (index !== -1) {
        USER_DATA_LIST[index] = { ...USER_DATA_LIST[index], ...formData.value }
      }
    }
    
    ElMessage.success("操作成功")
    dialogVisible.value = false
    handleSearch()
    
    loading.value = false
  })
}

function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion

// #region 删
function handleDelete(row: UserData) {
  ElMessageBox.confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    const index = USER_DATA_LIST.findIndex(user => user.id === row.id)
    if (index !== -1) {
      USER_DATA_LIST.splice(index, 1)
      ElMessage.success("删除成功")
      handleSearch()
    }
  })
}
// #endregion

// #region 改
function handleUpdate(row: UserData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
// #endregion

// #region 查
const searchFormRef = useTemplateRef("searchFormRef")

const searchData = reactive({
  username: "",
  phone: ""
})

// 处理搜索
function handleSearch() {
  filteredUserData.value = USER_DATA_LIST.filter(user => {
    const matchesUsername = user.username.includes(searchData.username)
    const matchesPhone = user.phone.includes(searchData.phone)
    return matchesUsername && matchesPhone
  })
}

// 重置搜索
function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
// #endregion

// 初始化数据
handleSearch()
</script>

<template>
  <div class="app-container">
    <el-alert
      title="数据来源"
      type="success"
      description="由 Apifox 提供在线 Mock，数据不具备真实性，仅供简单的 CRUD 操作演示"
      show-icon
    />
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">
            重置
          </el-button>
          <!-- 视图切换按钮 -->
          <el-button :icon="viewMode === 'list' ? Grid : List" @click="handleViewModeChange">
            {{ viewMode === 'list' ? '卡片视图' : '列表视图' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">
            新增用户
          </el-button>
          <el-button type="danger" :icon="Delete">
            批量删除
          </el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <!-- 列表视图 -->
      <div v-if="viewMode === 'list'" class="table-wrapper">
        <el-table :data="filteredUserData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" type="primary" effect="plain" disable-transitions>
                admin
              </el-tag>
              <el-tag v-else type="warning" effect="plain" disable-transitions>
                {{ scope.row.roles }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain" disable-transitions>
                启用
              </el-tag>
              <el-tag v-else type="danger" effect="plain" disable-transitions>
                禁用
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 卡片视图 -->
      <div v-else class="card-grid-wrapper">
        <div v-for="user in filteredUserData" :key="user.id" 
             class="user-card" 
             :class="{ 'selected': selectedCardId === user.id }"
             @click="handleCardClick(user.id)">
          <!-- 状态标签 -->
          <div class="card-status">
            <el-tag v-if="user.status" type="success" effect="plain" disable-transitions>
              启用
            </el-tag>
            <el-tag v-else type="danger" effect="plain" disable-transitions>
              禁用
            </el-tag>
          </div>

          <!-- 用户名 -->
          <div class="card-username">{{ user.username }}</div>

          <!-- 信息区 -->
          <div class="card-info">
            <div class="info-item">
              <span class="label">手机号：</span>
              <span class="value">{{ user.phone }}</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱：</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">角色：</span>
              <span class="value">
                <el-tag v-if="user.roles === 'admin'" type="primary" effect="plain" disable-transitions size="small">
                  admin
                </el-tag>
                <el-tag v-else type="warning" effect="plain" disable-transitions size="small">
                  {{ user.roles }}
                </el-tag>
              </span>
            </div>
            <div class="info-item">
              <span class="label">创建时间：</span>
              <span class="value">{{ user.createTime }}</span>
            </div>
          </div>

          <!-- 底部操作栏 -->
          <div class="card-actions">
            <el-button type="primary" text size="small" @click.stop="handleUpdate(user)">
              编辑
            </el-button>
            <el-button type="danger" text size="small" @click.stop="handleDelete(user)">
              删除
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.id === undefined ? '新增用户' : '修改用户'"
      width="30%"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item v-if="formData.id === undefined" prop="password" label="密码">
          <el-input v-model="formData.password" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

/* 卡片网格布局样式 */
.card-grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.user-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border-color: #67c23a;
  }
}

.card-status {
  position: absolute;
  top: 10px;
  right: 10px;
}

.card-username {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.card-info {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.info-item .label {
  font-weight: 500;
  margin-right: 8px;
  width: 80px;
}

.info-item .value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
