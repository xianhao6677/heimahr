<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="small">添加角色</el-button>
      </div>
      <el-table :data="list" :border="true">
        <!-- <el-table-column label="序号" align="center" /> -->
        <el-table-column prop="name" label="角色" align="center" width="200" />
        <el-table-column prop="state" label="启用" align="center" width="200">
          <template v-slot="{row}">
            <span>{{ row.state === 1? '已启用': row.state === 0? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center" />
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="height: 60px;" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          @prev-click="prevClick"
          @next-click="nextClick"
          @current-change="changePage"
        />
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
      list: [],
      // 分页信息
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList(this.pageParams)
      // console.log(res)
      this.pageParams.total = res.total
      this.list = res.rows
    },
    // 点击上一页
    prevClick() {
      // 判断是否为第一页
      if (this.pageParams.page > 1) {
        this.pageParams.page--
        this.getRoleList()
      }
    },
    // 点击下一页
    nextClick() {
      // 判断是否为最后一页
      if (this.pageParams.page < this.pageParams.total / this.pageParams.pagesize) {
        this.pageParams.page++
        this.getRoleList()
      }
    },
    // 点击页数切换页码
    changePage(newPage) {
      // console.log(e)
      this.pageParams.page = newPage
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
