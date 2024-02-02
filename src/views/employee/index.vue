<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 模糊搜索输入框 -->
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
          highlight-current
          @current-change="selsctNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog=true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto" />
              <span v-else class="username">{{ row.username.charAt(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable />
          <el-table-column label="操作" width="280px">
            <template v-slot="{ row }">
              <el-button
                size="mini"
                type="text"
                @click="$router.push(`/employee/detail/${row.id}`)"
              >查看</el-button>
              <el-button size="mini" type="text" @click="btnRole(row.id)">角色</el-button>
              <el-popconfirm title="是否要删除该角色" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" type="text" style="margin-left: 10px;" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" style="height: 60px;" align="middle">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
            @prev-click="prevClick"
            @next-click="nextClick"
          />
        </el-row>
      </div>
    </div>
    <!-- 放置导入excel组件 -->
    <importExcel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList" />
    <el-dialog :visible.sync="showRoleDialog" title="分配角色">
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnRoleOK">确定</el-button>
          <el-button size="mini" @click="showRoleDialog=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import { assignRole, delEmployee, exportEmployee, getEmployeeDetail, getEmployeeList, getEnableRoleList } from '@/api/employee'
import FileSaver from 'file-saver'
import importExcel from './components/import-excel.vue'

export default {
  name: 'Employee',
  components: {
    importExcel
  },
  data() {
    return {
      depts: [], // 部门数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: { // 请求获取员工列表的查询参数
        departmentId: null,
        page: 1, // 当前页码
        pagesize: 10,
        keyword: '' // 模糊搜索关键字
      },
      list: [], // 员工列表数据
      total: 0, // 员工列表总条数
      showExcelDialog: false, // 控制excel弹层显示/隐藏
      showRoleDialog: false, // 控制角色弹层显示/隐藏
      roleList: [], // 角色列表
      roleIds: [], // 用于双向绑定el-checkbox-group，存储选中项的值
      currentId: null // 记录当前点击项的id，用于分配员工角色接口传参
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    //  获取部门列表数据
    async getDepartment() {
      const res = await getDepartment()
      // 调用封装好的递归函数，将列表转换成树形数据
      this.depts = transListToTreeData(res, 0)
      // 获取根节点 id，加载页面时默认获取选中根节点，并获取对应数据
      // console.log(this.depts[0])
      this.queryParams.departmentId = this.depts[0].id
      // 获取数组件实例，通过内置方法，根据参数(id)设置默认初始选中项
      // el-tree为异步更新，需要在组件渲染完成后再调用内置方法
      this.$nextTick(() => {
        // 当前选中的节点
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      this.getEmployeeList()
    },
    // 切换部门节点 -> 获取点击选中的节点数据
    selsctNode(node) {
      // console.log(e)
      // 重新记录当前选中的节点id，用于后续接口获取数据
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1 // 设置第一页
      this.getEmployeeList()
    },
    // 获取员工列表接口
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    // 切换页数
    changePage(newPage) {
      // console.log(e)
      this.queryParams.page = newPage
      this.getEmployeeList()
    },
    // 上一页
    prevClick() {
      if (this.queryParams.page > 1) {
        this.queryParams.page--
        this.getEmployeeList()
      }
    },
    // 下一页
    nextClick() {
      if (this.queryParams.page < this.total / this.queryParams.pagesize) {
        this.getEmployeeList()
      }
    },
    // 搜索框输入内容发生变化
    changeValue() {
      // console.log(this.queryParams.keyword)
      // 防抖操作，避免频繁发送请求浪费性能
      clearTimeout(this.timer) // 每次输入值改变时先清理定时器
      this.timer = setTimeout(() => {
        this.getEmployeeList()
        this.queryParams.page = 1
      }, 500)
    },
    // 导出所有员工数据(excel文件)
    async exportEmployee() {
      const res = await exportEmployee()
      // console.log(res)
      // 通过file-saver第三方包，下载返回的blob二进制文件流数据
      // FileSaver.saveAs(blob对象，文件名称)
      FileSaver.saveAs(res, '员工信息表.xlsx')
    },
    // 删除员工信息
    async confirmDel(id) {
      await delEmployee(id)
      if (this.list.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.getEmployeeList()
      this.$message.success('删除成功')
    },
    // 点击角色按钮弹层
    async btnRole(id) {
      this.roleList = await getEnableRoleList()
      // 获取员工详细信息，别解构出 角色集合
      const { roleIds } = await getEmployeeDetail(id)
      this.currentId = id
      this.roleIds = roleIds
      this.showRoleDialog = true // 显示弹层
    },
    // 点击角色弹层的确定，分配员工权限
    async btnRoleOK() {
      await assignRole({ roleIds: this.roleIds, id: this.currentId })
      this.$message.success('角色分配成功')
      this.showRoleDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
