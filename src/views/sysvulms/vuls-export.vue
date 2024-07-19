<template>
  <div class="app-container">
    <el-page-header content="导出 # 系统测评漏洞" @back="$router.back()" />
    <div style="margin-top: 10px;">
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload"> 导出excel </el-button>
      <!-- <a href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html" target="_blank" style="margin-left:15px;">
        <el-tag type="info">Documentation</el-tag>
      </a> -->
    </div>

    <el-table v-loading="listLoading" :data="selectedData" element-loading-text="加载中..." border fit highlight-current-row>
      <!-- <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template> -->
      <el-table-column fixed="left" prop="id" label="序号" width="60" align="center">
        <template slot-scope="{ $index }">
          <div>{{ $index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="OApocID" label="OA流程编号" width="160" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.OApocID }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sysname" label="系统名称" width="180" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.sysname }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="systype" label="系统类型" width="100" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.systype }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="URL" label="URL" width="180" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.URL }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="serScope" label="服务范围" width="100" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.serScope }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="sysresunit" label="系统负责单位" width="180" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.sysresunit }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="responsible" label="系统负责人" width="100" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.responsible }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="vulname" label="漏洞名称" width="160" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.vulname }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="vulrisk" label="风险等级" width="80" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.vulrisk }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="testpople" label="测试人员" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.testpople }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="testdate" label="测试时间" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.testdate }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="vulfirsttime" label="通知单发送时间" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.vulfirsttime }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="riskrepID" label="风险通知单编号" width="200" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.riskrepID }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="feedback" label="反馈情况" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.feedback }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="retestpople" label="复测人员" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.retestpople }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="retestdate" label="复测时间" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.retestdate }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="retestresult" label="复测结果" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.retestresult }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="rretestdate" label="二次复测时间" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.rretestdate }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="rretestresult" label="二次复测结果" width="120" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.rretestresult }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="retestrepID" label="复测报告编号" width="210" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.retestrepID }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="notes" label="备注" width="180" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.notes }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
// options components
import FilenameOption from '../excel/components/FilenameOption.vue'
import AutoWidthOption from '../excel/components/AutoWidthOption'
import BookTypeOption from '../excel/components/BookTypeOption'

export default {
  name: 'SysvulsExport',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      // list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      selectedData: []
    }
  },
  created() {
    if (this.$route.query.data) {
      this.selectedData = JSON.parse(this.$route.query.data)
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const tHeader = ['序号', 'OA流程编号', '系统名称', '系统类型', 'URL', '服务范围', '系统负责单位', '系统负责人', '漏洞名称', '风险等级', '测试人员', '测试时间', '通知单发送时间', '风险通知单编号', '反馈情况', '复测人员', '复测时间', '复测结果', '二次复测时间', '二次复测结果', '复测报告编号', '备注']
        const filterVal = ['id', 'OApocID', 'sysname', 'systype', 'URL', 'serScope', 'sysresunit', 'responsible', 'vulname', 'vulrisk', 'testpople', 'testdate', 'vulfirsttime', 'riskrepID', 'feedback', 'retestpople', 'retestdate', 'retestresult', 'rretestdate', 'rretestresult', 'retestrepID', 'notes']
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.selectedData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.app-container {
    padding: 20px;
    box-sizing: border-box;
    /* margin-top: 20px; */
  }
    .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
    }
</style>
