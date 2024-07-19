<template>
  <el-select :value="value" placeholder="请选择" @change="handleSelectChange, $emit('input',$event)">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    <!-- <el-option label="其他" value="other">其他</el-option> -->
  <!-- <el-input v-if="isOtherselected" v-model="othervalue" type="textarea" placeholder="请输入" /> -->
  </el-select>
</template>

<script>

export default {
  name: 'Feedback',
  isOtherSelected: false,

  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: [{
        value: '未反馈',
        label: '未反馈'
      }, {
        value: '已反馈',
        label: '已反馈'
      }, {
        value: '已反馈，超一个月未整改',
        label: '已反馈，超一个月未整改'
      }, {
        value: '空白',
        label: '空白'
      }]
    }
  },
  methods: {
    handleSelectChange() {
      this.isOtherselected = this.value === 'other'
      if (this.isOtherselected) {
        this.value = ''
      }
    }
  }
}
</script>
      <style lang="less" scoped>
</style>
