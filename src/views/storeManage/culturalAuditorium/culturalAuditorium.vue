<template>
  <div>家宴中心</div>
  <el-button @click="handleClick">接口测试</el-button>
</template>
<script>
import { companyList } from "@/api/company"

export default {
  methods: {
    handleClick() {
      console.log("调接口")
      companyList()
    }
  }
}
</script>
