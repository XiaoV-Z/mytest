<template>
  <el-select v-model="value" placeholder="漏洞名" @change="$emit('input',$event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>

export default {
  name: 'VulsName',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [{
        value: 'SQL注入',
        label: 'SQL注入'
      }, {
        value: '垂直越权',
        label: '垂直越权'
      },
      {
        value: '平行越权',
        label: '平行越权'
      }, {
        value: '敏感信息泄露',
        label: '敏感信息泄露'
      }, {
        value: '任意用户登录/注册',
        label: '任意用户登录/注册'
      },
      {
        value: '弱口令',
        label: '弱口令'
      }, {
        value: '未授权访问',
        label: '未授权访问'
      }, {
        value: '任意文件上传',
        label: '任意文件上传'
      }, {
        value: '其它漏洞',
        label: '其它漏洞'
      }]
    }
  },
  methods: {}
}
</script>
      <style lang="less" scoped>
</style>
