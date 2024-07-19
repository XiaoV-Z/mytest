<template>
  <el-select v-model="value" placeholder="请选择" :value="value" @change="$emit('input',$event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>

export default {
  name: 'SerScope',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [{
        value: '内、外网',
        label: '内、外网'
      }, {
        value: '内网',
        label: '内网'
      }, {
        value: '外网',
        label: '外网'
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
