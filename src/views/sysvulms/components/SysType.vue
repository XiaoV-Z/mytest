<template>
  <el-select v-model="value" placeholder="请选择" :value="value" @change="$emit('input',$event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>

export default {
  name: 'SysType',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [{
        value: 'APP',
        label: 'APP'
      }, {
        value: 'WEB',
        label: 'WEB'
      }, {
        value: '小程序',
        label: '小程序'
      }, {
        value: '其他',
        label: '其他'
      }]
    }
  },
  methods: {}
}
</script>
  <style lang="less" scoped>

</style>
