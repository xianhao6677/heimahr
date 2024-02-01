<template>
  <el-cascader
    :options="treeData"
    :props="props"
    :value="value"
    separator="-"
    size="mini"
    @change="changeValue"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [], // 赋值给级联结构的options
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartment() // 获取组织架构数据
      this.treeData = transListToTreeData(res, 0) // 转换成树形结构的数据
    },
    // 监听级联选中项的id变化
    changeValue(list) {
      // console.log(list[list.length - 1])
      if (list.length) {
        const id = list[list.length - 1] // 取出级联选中项的最后一项(最后一级的id)
        this.$emit('input', id) // 将id传给父组件
      } else {
        this.$emit('input', null) // 如果数组长度为0，表示值为空
      }
    }
  }
}
</script>

<style>

</style>
