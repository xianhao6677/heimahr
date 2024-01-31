<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
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
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column label="头像" prop="staffPhoto" align="center" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" prop="mobile" sortable />
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable />
          <el-table-column label="操作" width="280px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" style="height: 60px;" align="middle">
          <el-pagination layout="total,prev, pager, next" :total="1000" />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 部门数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: { // 请求获取员工列表的查询参数
        departmentId: null,
        page: 1,
        pagesize: 10
      },
      list: [] // 员工列表数据
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
    // 获取点击选中的节点数据
    selsctNode(node) {
      // console.log(e)
      // 重新记录当前选中的节点id，用户后续接口获取数据
      this.queryParams.departmentId = node.id
      this.getEmployeeList()
    },
    // 获取员工列表接口
    async getEmployeeList() {
      const { rows } = await getEmployeeList(this.queryParams)
      // console.log(res)
      this.list = rows
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
