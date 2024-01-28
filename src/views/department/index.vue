<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <!-- 节点结构，树形结构会重复渲染节点结构里面的内容  -->
        <!-- 通过作用域插槽，传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
        <template v-slot="{ data }">
          <el-row style="width: 100%;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- 下拉菜单 -->
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加权限</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
// import { getDepartment } from '@/api/department'

export default {
  name: 'Department',
  data() {
    return { //  数据属性
      depts: [{
        name: '传智教育', managerName: '管理员', children: [{
          name: '总裁办', managerName: '张三'
        }, {
          name: '人事部', managerName: '李四'
        }, {
          name: '行政部', managerName: '王五'
        }]
      }],
      defaultProps: {
        label: 'name', // 显示的字段名称
        children: 'children' // 读取子节点的字段名称
      }
    }
  },
  // created() {
  //   this.getDepartment()
  // },
  methods: {
    // 获取部门列表
    // async getDepartment() {
    //   const res = await getDepartment()
    //   // console.log(res)
    //   this.depts = res
    // }
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
  margin: 10px;
}
</style>
