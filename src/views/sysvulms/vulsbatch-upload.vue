<template>
  <div class="app-container">
    <el-page-header content="导入 # 系统测评漏洞" @back="$router.back()" />
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-button type="primary" icon="el-icon-upload" @click="handleAllUpload">确认导入</el-button>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'VulsbatchUpload',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 3 // 3MB

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请上传不超过 3MB 的文件！',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
