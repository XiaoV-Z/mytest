<template>
  <div class="sysvulms-form">
    <el-page-header content="添加 # 系统测评漏洞" @back="$router.back()" />
    <!-- 添加表单  ref用于获取表单数据 -->
    <el-form ref="sysaddform" :model="sysaddform" label-width="120px" :rules="rules" style="margin-top: 20px; width: 600px;">
      <el-form-item label="OA流程编号" prop="OApocID">
        <el-input v-model="sysaddform.OApocID" />
        <!-- <el-tooltip content="这是OA流程编号的提示信息" placement="right">
            <i class="el-icon-question" />
          </el-tooltip> -->
      </el-form-item>
      <el-form-item label="系统名称" prop="sysname">
        <el-input v-model="sysaddform.sysname" />
      </el-form-item>
      <el-form-item label="系统类型" prop="systype">
        <!-- <el-input v-model="sysaddform.systype" /> -->
        <SysType v-model="sysaddform.systype" />
      </el-form-item>
      <el-form-item label="URL" prop="URL">
        <el-input v-model="sysaddform.URL" />
      </el-form-item>
      <el-form-item label="服务范围" prop="serScope">
        <!-- <el-input v-model="sysaddform.serScope" /> -->
        <SerScope v-model="sysaddform.serScope" />
      </el-form-item>
      <el-form-item label="系统负责单位" prop="sysresunit">
        <el-input v-model="sysaddform.sysresunit" />
      </el-form-item>
      <el-form-item label="系统责任人" prop="responsible">
        <el-input v-model="sysaddform.responsible" />
      </el-form-item>
      <el-form-item label="漏洞名称" prop="vulname">
        <el-input v-model="sysaddform.vulname" />
      </el-form-item>
      <el-form-item label="风险等级" prop="vulrisk">
        <!-- <el-input v-model="sysaddform.vulrisk" /> -->
        <VulSelect v-model="sysaddform.vulrisk" />
      </el-form-item>
      <el-form-item label="测试人员" prop="testpople">
        <el-input v-model="sysaddform.testpople" />
      </el-form-item>
      <el-form-item label="测试时间" prop="testdate">
        <!-- <el-input v-model="sysaddform.testdate" /> -->
        <el-date-picker v-model="sysaddform.testdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="通知单发送时间" prop="vulfirsttime">
        <el-date-picker v-model="sysaddform.vulfirsttime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="风险通知单编号" prop="riskrepID">
        <el-input v-model="sysaddform.riskrepID" />
      </el-form-item>
      <el-form-item label="反馈情况" prop="feedback">
        <!-- <el-input v-model="sysaddform.feedback" /> -->
        <Feedback v-model="sysaddform.feedback" />
      </el-form-item>
      <el-form-item label="复测人员" prop="retestpople">
        <el-input v-model="sysaddform.retestpople" />
      </el-form-item>
      <el-form-item label="复测时间" prop="retestdate">
        <el-date-picker v-model="sysaddform.retestdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="复测结果" prop="retestresult">
        <!-- <el-input v-model="sysaddform.retestresult" /> -->
        <Testresult v-model="sysaddform.retestresult" />
      </el-form-item>
      <el-form-item label="二次测试时间" prop="rretestdate">
        <el-date-picker v-model="sysaddform.rretestdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="二次测试结果" prop="rretestresult">
        <!-- <el-input v-model="sysaddform.rretestsult" /> -->
        <Testresult />
      </el-form-item>
      <el-form-item label="复测报告编号" prop="retestrepID">
        <el-input v-model="sysaddform.retestrepID" />
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input v-model="sysaddform.notes" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('sysaddform')">添加</el-button>
        <el-button @click="resetForm('sysaddform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VulSelect from './components/VulSelect.vue'
import SysType from './components/SysType.vue'
import SerScope from './components/SerScope.vue'
import Feedback from './components/Feedback.vue'
import Testresult from './components/Testresult.vue'
import { submitsysvuls, getsysvulsInfo } from '@/api/sysvulms'

export default {
  name: 'VulmsForm',
  components: { VulSelect, SysType, SerScope, Feedback, Testresult },
  props: [],
  data() {
    return {
      sysaddform: {
        OApocID: '',
        sysname: '',
        systype: '',
        URL: '',
        serScope: '',
        sysresunit: '',
        responsible: '',
        vulname: '',
        vulrisk: '',
        testpople: '',
        testdate: '',
        vulfirsttime: '',
        riskrepID: '',
        feedback: '',
        retestpople: '',
        retestdate: '',
        retestresult: '',
        rretestdate: '',
        rretestresult: '',
        retestrepID: '',
        notes: ''
      },
      rules: {
        OApocID: [{ required: true, message: '请输入OA流程编号, 如CSRE202401xxxx, RSK202401xxxx', trigger: 'blur' },
          { min: 12, max: 15, message: '长度在12到 14个字符', trigger: 'blur' }],
        sysname: '',
        systype: '',
        URL: [{ required: true, message: '请输入URL', trigger: 'blur' }],
        serScope: [{ required: true, message: '请输入服务范围', trigger: 'blur' }],
        sysresunit: [{ required: true, message: '请输入系统负责单位', trigger: 'blur' }],
        responsible: [{ required: true, message: '请输入系统责任人', trigger: 'blur' }],
        vulname: [{ required: true, message: '请输入漏洞名称', trigger: 'blur' }
          // 必填required  bigger 失去焦点trigger message提示信息 blur 失去焦点触发
          // { pattern: /^[\u4e00-\u9fa5]{4,50}/, message: '必须是4-50位汉字', trigger: 'blur' }
        ], // 验证规则
        vulrisk: '',
        testpople: [{ required: true, message: '请输入测试人员', trigger: 'blur' }],
        testdate: [{ required: true, message: '请输入测试时间', trigger: 'blur' }],
        vulfirsttime: '',
        riskrepID: [{ min: 21, max: 24, message: '请输入长度为23的风险通知单编号', trigger: 'blur' }],
        feedback: '',
        retestpople: '',
        retestdate: '',
        retestresult: '',
        rretestdate: '',
        rretestresult: '',
        retestrepID: [{ min: 21, max: 24, message: '请输入长度为23的复测报告编号', trigger: 'blur' }],
        notes: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit success!')
          alert(this.sysaddform.serScope)
          submitsysvuls(this.sysaddform).then((res) => {
            console.log('res', res)
            if (res.data && res.data.code === 200) {
              this.$message.success('添加成功')
              this.$router.push('/sysvulms')
            } else {
              this.$message.error('添加失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getsysvulsInfo(id) {
      getsysvulsInfo(id).then((res) => {
        console.log('res', res)
        if (res.data && res.data.info) {
          const info = res.data.info
          this.sysaddform = {
            id: info.id,
            OApocID: info.OApocID,
            sysname: info.sysname,
            systype: info.systype,
            URL: info.URL,
            serScope: info.serScope,
            sysresunit: info.sysresunit,
            responsible: info.responsible,
            vulname: info.vulname,
            vulrisk: info.vulrisk,
            testpople: info.testpople,
            testdate: info.testdate,
            vulfirsttime: info.vulfirsttime,
            riskrepID: info.riskrepID,
            feedback: info.feedback,
            retestpople: info.retestpople,
            retestdate: info.retestdate,
            retestresult: info.retestresult,
            rretestdate: info.rretestdate,
            rretestresult: info.rretestresult,
            retestrepID: info.retestrepID,
            notes: info.notes
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .sysvulms-form {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
