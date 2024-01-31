<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="small" @click="showDialog=true">添加角色</el-button>
      </div>
      <el-table :data="list" :border="true">
        <!-- <el-table-column label="序号" align="center" /> -->
        <el-table-column prop="name" label="角色" align="center" width="200">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.eidtRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="启用" align="center" width="200">
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.eidtRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1? '已启用': row.state === 0? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.eidtRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit=false">取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="是否要删除该角色" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" style="margin-left: 10px;" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
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
import { getRoleList, addRole, updateRole, delRole } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      list: [],
      showDialog: false,
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
    // 获取角色列表数据
    async getRoleList() {
      const res = await getRoleList(this.pageParams)
      // console.log(res)
      this.pageParams.total = res.total
      this.list = res.rows
      this.list.forEach(item => {
        // 自定义添加动态响应式属性，用于标记当前行是否处于标记状态
        this.$set(item, 'isEdit', false)
        // 自定义添加动态响应式属性，，用于行内编辑时回显
        // 该缓存属性默认初始值为行内原始数据，编辑修改时不会影响原数据，取消编辑时恢复原数据
        this.$set(item, 'eidtRow', {
          name: item.name,
          description: item.description,
          state: item.state
        })
      })
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

    // 确认添加角色
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
    // 取消添加角色
    btnCancel() {
      this.$refs.roleForm.resetFields() // 重置表单
      this.showDialog = false // 关闭弹层
    },
    // 点击编辑行
    btnEditRow(row) {
      // console.log(row)
      row.isEdit = true
      // 点击编辑 -> 更新用于修改的缓存数据为初始值
      row.eidtRow.name = row.name
      row.eidtRow.state = row.state
      row.eidtRow.description = row.description
    },
    // 编辑行点击确定
    async btnEditOK(row) {
      // console.log(row)
      if (row.eidtRow.name && row.eidtRow.description) {
        // 校验通过,调用修改角色接口
        await updateRole({ ...row.eidtRow, id: row.id })
        this.$message.success('角色更新成功')
        Object.assign(row, {
          ...row.eidtRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色名称和描述不能为空')
      }
    },
    // 删除角色
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      // 判断当前删除的数据是否是最后一页的最后一条数据
      if (this.list.length === 1) this.pageParams.page--
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
