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
        <!-- 分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
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
        departmentId: null
      }
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
      this.$nextTick(() => this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId))
    },
    // 获取点击选中的节点数据
    selsctNode(node) {
      // console.log(e)
      // 记录当前选中的节点id，用户后续接口获取数据
      this.queryParams.departmentId = node.id
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
