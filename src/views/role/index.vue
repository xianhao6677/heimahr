<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="small">添加角色</el-button>
      </div>
      <el-table :data="list" :border="true">
        <!-- <el-table-column label="序号" align="center" /> -->
        <el-table-column prop="name" label="角色" align="center" width="200" />
        <el-table-column prop="state" label="启用" align="center" width="200" />
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center" />
      </el-table>
      <el-row type="flex" justify="end" style="height: 60px;" align="middle">
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      page: 1,
      pagesize: 5,
      list: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList()
      // console.log(res)
      this.list = res.rows
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
