<template>
  <el-dialog :title="title" :visible="showDialog" @close="close">
    <el-form ref="addDept" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" style="width: 80%;" size="mini" placeholder="请选择负责人">
          <!-- 下拉选项 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="4" style="width: 80%;" size="mini" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="small">确认</el-button>
            <el-button size="small">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList } from '@/api/department'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default: true
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: [], // 部门负责人列表
      formData: { // 表单数据
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      },
      rules: { // 表单校验规则
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          {
            validator: async(rule, value, callback) => {
              const res = await getDepartment()
              if (res.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          {
            validator: async(rule, value, callback) => {
              const res = await getDepartment()
              if (res.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
        ],
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ]
        // pid: []
      }
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    // 关闭弹层
    close() {
      this.$emit('update:show-dialog', false)
    },
    // 获取部门负责人列表
    async getManagerList() {
      this.managerList = await getManagerList()
    }
  }
}
</script>

<style>

</style>
