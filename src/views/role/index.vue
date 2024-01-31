<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="small" @click="showDialog=true">添加角色</el-button>
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
    <!-- 添加角色弹层 -->
    <el-dialog title="新增角色" :visible.sync="showDialog" @close="btnCancel">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" size="mini" style="width: 300px;" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" active-color="#13ce66">/>
          </el-switch></el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" size="mini" style="width: 300px;" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="small" @click="btnOK">确定</el-button>
              <el-button size="small" @click="btnCancel">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoleList, addRole } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      list: [],
      showDialog: true,
      // 分页信息
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      roleForm: { // 新增角色表单数据
        name: '',
        description: '',
        state: 0 // switch开关，1开启，0关闭
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
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
    },
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields() // 重置表单
      this.showDialog = false // 关闭弹层
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
