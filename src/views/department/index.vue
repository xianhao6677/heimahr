<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :expand-on-click-node="false" :data="depts" :props="defaultProps" default-expand-all>
        <!-- 节点结构，树形结构会重复渲染节点结构里面的内容  -->
        <!-- 通过作用域插槽，传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
        <template v-slot="{ data }">
          <el-row style="width: 100%;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- 下拉菜单 -->
              <el-dropdown @command="operate($event, data.id)">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- .sync事件修饰符：自动绑定 @update: showDialog事件 -->
    <!-- 子组件提交同名触发函数(update: showDialog),传递过来值自动赋予父组件绑定的变量 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :current-node-id="currentNodeId" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'

export default {
  name: 'Department',
  components: {
    addDept
  },
  data() {
    return {
      showDialog: false,
      currentNodeId: null, // 存储当前点击(添加子部门)项的id，作为子部门的pid
      depts: [], //  数据属性
      defaultProps: {
        label: 'name', // 显示的字段名称
        children: 'children' // 读取子节点的字段名称
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表数据
    async getDepartment() {
      const res = await getDepartment()
      // console.log(res)
      // 调用封装好的递归函数，将列表型数据转换成树形结构的数据
      this.depts = transListToTreeData(res, 0)
    },
    operate(type, id) {
      // console.log(type)
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true
        // console.log(type, id)
        this.currentNodeId = id // 记录当前点击项的数据 id
      } else if (type === 'edit') {
        // 编辑子部门
        this.showDialog = true
        // console.log(this.depts, id)
        this.currentNodeId = id // 记录当前点击项的数据 id
        // 获取当前部门详情
        // vue是异步更新DOM，nextTick()函数可以在DOM更新完成后再调用里面的回调函数
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else if (type === 'del') {
        // 删除子部门
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  display: inline-block;
  width: 50px;
  margin: 30px;
}
</style>
