<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="" label="序号" width="150" />
    <el-table-column prop="storeName" label="门店名称" width="120" />
    <el-table-column prop="areaName" label="所属辖区" width="120" />
    <el-table-column prop="businessType" label="经营类型" width="120" />
    <el-table-column prop="storeName" label="门店名称" width="120" />
    <el-table-column prop="companyName" label="单位名称" width="120" />
    <el-table-column prop="licenceNum" label="许可证号" width="120" />
    <el-table-column prop="" label="许可证有效期" width="120" />
    <el-table-column prop="" label="许可证状态" width="120" />
    <el-table-column prop="" label="门店地址" width="120" />
    <el-table-column prop="" label="营业状态" width="120" />
    <el-table-column prop="" label="法人" width="120" />
    <el-table-column prop="" label="联系电话" width="120" />
    <el-table-column prop="" label="门头照片" width="120" />
    <el-table-column prop="" label="量化等级" width="120" />
    <el-table-column prop="" label="网络餐饮" width="120" />
    <el-table-column prop="" label="阳光厨房" width="120" />
    <el-table-column prop="" label="统一社会信用代码" width="120" />
    <el-table-column prop="" label="查看二维码" width="120" />
    <el-table-column prop="" label="创建时间" width="120" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
        <el-button link type="primary" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { companyList } from "@/api/company"
import { ref, watch } from "vue"
import { usePagination } from "@/hooks/usePagination"

const { paginationData } = usePagination()

const handleClick = () => {
  console.log("click")
  companyList()
}

const tableData = ref<any[]>([])

async function getTableData() {
  const array = await companyList()
  console.log(array)
  tableData.value = array
}
/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>
