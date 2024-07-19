<template>
  <el-autocomplete
    v-model="value"
    class="inline-input"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    @select="handleSelect"
  />
</template>

<script>

export default {
  name: 'Testresult',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      restaurants: []
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [{ value: '已整改', label: '已整改' },
        { value: '未整改', label: '未整改' },
        { value: '无需整改', label: '无需整改' },
        { value: '低风险，持续关注', label: '低风险，持续关注' },
        { value: '风险降为低，已整改', label: '风险降为低，已整改' },
        { value: '空白', label: '空白' }]
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
      <style lang="less" scoped>
</style>
