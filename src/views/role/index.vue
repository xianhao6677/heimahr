<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="small">添加角色</el-button>
      </div>
      <el-table border="true">
        <!-- <el-table-column label="序号" align="center" /> -->
        <el-table-column
          label="角色"
          align="center"
          width="200"
        />
        <el-table-column
          label="启用"
          align="center"
          width="200"
        />
        <el-table-column
          label="描述"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        />
      </el-table>
      <el-row type="flex" justify="end" style="height: 60px;" align="middle">
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
