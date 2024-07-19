<template>
  <el-select placeholder="请选择" :value="value" :clearable="true" @change="$emit('input',$event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>

export default {
  name: 'VulSelect',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [{
        value: '高危',
        label: '高危'
      }, {
        value: '中危',
        label: '中危'
      }, {
        value: '低危',
        label: '低危'
      }, {
        value: '空白',
        label: '空白'
      }]
    }
  },
  methods: {}
}
</script>
    <style lang="less" scoped>

</style>
