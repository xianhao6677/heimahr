<template>
  <div class="container">
    <div class="app-container">
      <el-button
        type="primary"
        size="mini"
        style="margin: 20px 10px"
        @click="addPermission(1, 0)"
      >添加权限</el-button>
      <el-table :data="list" row-key="id" default-expand-all>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button
              v-if="row.type === 1"
              type="text"
              size="mini"
              @click="addPermission(2, row.id)"
            >添加</el-button>
            <el-button
              type="text"
              size="mini"
              @click="editPermission(row.id)"
            >编辑</el-button>
            <el-popconfirm
              title="确认要删除吗？"
              style="margin-left: 10px;"
              @onConfirm="delPermission(row.id)"
            >
              <el-button slot="reference" type="text" size="mini">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-permission
      :show-dialog.sync="showDialog"
      :permission-data="permissionData"
      @updateData="getPermissionList()"
    />
  </div>
</template>
<script>
import { delPermission, getPermissionDetail, getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
import AddPermission from './components/add-Permission.vue'

export default {
  name: 'Permission',
  components: { AddPermission },
  data() {
    return {
      list: [], // 权限数据
      showDialog: false, // 添加权限弹层显示/隐藏
      // 传入弹层组件的数据
      permissionData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: 0 // 默认关闭
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限数据
    async getPermissionList() {
      const res = await getPermissionList()
      // console.log(res)
      // 将数组数据转换成 树形结构 数据
      this.list = transListToTreeData(res, 0)
    },
    // 新增页面路由权限点
    addPermission(type, pid) {
      this.showDialog = true
      // console.log(type, pid)
      this.permissionData.type = type
      this.permissionData.pid = pid
    },
    // 修改权限
    async editPermission(id) {
      const res = await getPermissionDetail(id)
      // console.log(res)
      this.permissionData = res
      this.showDialog = true
      // this.permissionData = row
    },
    // 删除权限点
    async delPermission(id) {
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    }
  }
}
</script>
