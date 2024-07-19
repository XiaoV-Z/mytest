<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="vulms-list">
    <el-row>
      <el-col :span="24">
        <el-input v-model.trim="vulname" placeholder="查询漏洞名称" style="width: 135px;" />
        <VulSelect v-model="vulrisk" clearable placeholder="风险等级" />
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="$router.push('/sysvulms/SysVulSearchForm')">高级搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="$router.push('/sysvulms/addsysvlms')">添加</el-button>
        <el-button type="primary" icon="el-icon-download" @click="handleExport">导出</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="$router.push('/sysvulms/VulsbatchUpload')">批量导入</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
        <!-- <el-checkbox v-model="checked" style="margin-left: 20px;">全选</el-checkbox> -->
      </el-col>
    </el-row>
    <!-- 高级搜索弹窗 -->
    <!-- <el-dialog title="高级搜索" :visible.sync="dialogVisible" width="50%">
      <el-form :model="advancedSearchForm" label-width="120px">
        <el-form-item label="系统名称">
          <el-input v-model="advancedSearchForm.sysname" placeholder="请输入系统名称" />
        </el-form-item>
        <el-form-item label="系统类型">
          <el-select v-model="advancedSearchForm.systype" placeholder="请选择系统类型">
            <el-option label="类型1" value="类型1" />
            <el-option label="类型2" value="类型2" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务范围">
          <el-select v-model="advancedSearchForm.serScope" placeholder="请选择服务范围">
            <el-option label="范围1" value="范围1" />
            <el-option label="范围2" value="范围2" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="advancedSearchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdvancedSearch">搜 索</el-button>
      </span>
    </el-dialog> -->
    <!-- 表格 -->
    <el-table :data="list" border style="width: 100%; margin-top: 20px;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
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
      <!-- <el-table-column prop="create_time" label="添加时间" width="180" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.create_time | time }}</div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column fixed="right" label="操作" width="230" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="info" size="mini" @click="handleView(row, $index)">查看</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(row, $index)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="middle" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="middle" @click="handleEdit(scope.row.id)">查看/编辑</el-button>
          <el-button type="text" size="middle" @click="handleDelete(scope.row.id)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px;"
      :current-page="page"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import VulSelect from './components/VulSelect.vue'
import { getSysvulmsList, sysvulsDel } from '@/api/sysvulms'
// import moment from 'moment'

export default {
  name: 'VulmsList',
  components: { VulSelect },
  // filters: {
  //   time(value) {
  //     return moment(value).format('YYYY-MM-DD  HH:mm:ss')
  //   }
  // },
  props: [],
  data() {
    return {
      showBatchDeleteButton: false, // 批量删除按钮
      list: [{
        id: 1,
        OApocID: 'CSRE2024010201',
        sysname: '项目管理系统',
        systype: 'web系统',
        URL: 'http://www.zoomlion.com',
        serScope: '内网',
        sysresunit: '技术中心',
        responsible: '责任人',
        vulname: 'SQL注入',
        vulrisk: '高危',
        testpople: '测试人员',
        testdate: '2016-05-02',
        vulfirsttime: '2016-05-02',
        riskrepID: 'ZKAG-FW-2023-FXTZ-010',
        feedback: '已反馈',
        retestpople: '复测人员',
        retestdate: '2016-05-02',
        retestresult: '已修复',
        rretestdate: '2016-05-02',
        rretestresult: '已修复',
        retestrepID: 'XKAG-FW-2023-FXTZ-010-A',
        notes: '已沟通年后处理'
      }, {
        id: 2,
        OApocID: 'CSRE2024010201',
        sysname: '项目管理系统',
        systype: 'web系统',
        URL: 'http://www.zoomlion.com',
        serScope: '外网',
        sysresunit: '系统负责单位',
        responsible: '责任人',
        vulname: 'SQL注入',
        vulrisk: '高危',
        testpople: '测试人员',
        testdate: '2016-05-02',
        vulfirsttime: '2016-05-02',
        riskrepID: 'ZKAG-FW-2023-FXTZ-010',
        feedback: '已修复',
        retestpople: '复测人员',
        retestdate: '2016-05-02',
        rretestdate: '2016-05-02',
        rretestresult: '已修复',
        retestresult: '已修复',
        retestrepID: 'XKAG-FW-2023-FXTZ-010-A',
        notes: '已沟通年后处理'
      }, {
        id: 3,
        OApocID: 'CSRE2024010201',
        sysname: '项目管理系统',
        systype: 'web系统',
        URL: 'http://www.zoomlion.com',
        serScope: '内网',
        sysresunit: '系统负责单位',
        responsible: '责任人',
        vulname: 'SQL注入',
        vulrisk: '高危',
        testpople: '测试人员',
        testdate: '2016-05-02',
        vulfirsttime: '2016-05-02',
        riskrepID: 'ZKAG-FW-2023-FXTZ-010',
        feedback: '已修复',
        retestpople: '复测人员',
        retestdate: '2016-05-02',
        rretestdate: '2016-05-02',
        rretestresult: '已修复',
        retestresult: '已修复',
        retestrepID: 'XKAG-FW-2023-FXTZ-010-A',
        notes: '已沟通年后处理'
      }, {
        id: 4,
        OApocID: 'CSRE2024010201',
        sysname: '项目管理系统',
        systype: 'web系统',
        URL: 'http://www.zoomlion.com',
        serScope: '内网',
        sysresunit: '制造数字化部',
        responsible: '责任人',
        vulname: 'SQL注入',
        vulrisk: '高危',
        testpople: '测试人员',
        testdate: '2016-05-02',
        vulfirsttime: '2016-05-02',
        riskrepID: 'ZKAG-FW-2023-FXTZ-010',
        feedback: '已修复',
        retestpople: '复测人员',
        retestdate: '2016-05-02',
        rretestdate: '2016-05-02',
        rretestresult: '已修复',
        retestresult: '已修复',
        retestrepID: 'XKAG-FW-2023-FXTZ-010-A',
        notes: '已沟通年后处理'
      }], // 表格数据源
      page: 1, // 当前页
      size: 15, // 每页显示条数
      total: 1000, // 总条数
      vulname: '', // 漏洞名称
      vulrisk: '', // 风险等级
      dateRange: '', // 日期范围
      count: 0 // 统计数量
    }
  },
  watch: {
    count() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        size: this.size,
        vulname: this.vulname,
        vulrisk: this.vulrisk,
        dateRange: this.dateRange
      }
      getSysvulmsList(params).then(res => {
        if (res.data && res.data.list) {
          this.list = res.data.list
          this.total = res.data.total // 总条数
        }
      })
    },
    handleSearch() {
      this.page = 1
      this.getList()
    },
    handleEdit(id) {
      alert('编辑' + id)
      this.$router.push('/sysvulms/addsysvlms/:' + id)
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' })
        .then(() => {
          sysvulsDel(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              console.log('删除成功')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          console.log('已取消删除')
        })
    },
    handleSizeChange(size) {
      this.size = size
      // this.getList()
      if (this.page === 1) {
        this.count++
      }
    },
    handleCurrentChange(page) {
      this.page = page
      // this.getList()
      this.count++
    },
    handleSelectionChange(selection) {
      this.selectedItems = selection
      this.showBatchDeleteButton = selection.length > 0
    },
    handleExport() {
      // alert(this.selectedItems)
      if (!this.selectedItems) {
        // alert('请先选择要导出的数据')
        this.$message.warning('请先选择要导出的数据')
        return
      }
      const selectedData = this.selectedItems.map(item => {
        // 根据需要选择要传递的数据字段
        return {
          id: item.id,
          OApocID: item.OApocID,
          sysname: item.sysname,
          systype: item.systype,
          URL: item.URL,
          serScope: item.serScope,
          sysresunit: item.sysresunit,
          responsible: item.responsible,
          vulname: item.vulname,
          vulrisk: item.vulrisk,
          testpople: item.testpople,
          testdate: item.testdate,
          vulfirsttime: item.vulfirsttime,
          riskrepID: item.riskrepID,
          feedback: item.feedback,
          retestpople: item.retestpople,
          retestdate: item.retestdate,
          rretestdate: item.rretestdate,
          rretestresult: item.rretestresult,
          retestresult: item.retestresult,
          retestrepID: item.retestrepID,
          notes: item.notes
        }
      })

      this.$router.push({
        path: '/sysvulms/SysvulsExport',
        query: { data: JSON.stringify(selectedData) }
      })
      // this.$router.push('/sysvulms/SysvulsExport')
    },
    handleBatchDelete() {
      if (!this.selectedItems) {
        // alert('请先选择要删除的数据')
        this.$message.warning('请先选择要删除的数据')
        return
      }
      this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' })
        .then(() => {
          const ids = this.selectedItems.map(item => item.id)
          // alert(ids[0])
          sysvulsDel(ids).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.selectedItems = []
              this.showBatchDeleteButton = false
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
 .vulms-list {
  padding: 20px;
  box-sizing: border-box ;
  }
</style>
