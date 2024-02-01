<template>
  <el-cascader :options="treeData" :props="props" separator="-" size="mini" />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
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
    }
  }
}
</script>

<style>

</style>
