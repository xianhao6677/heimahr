<template>
  <el-dialog
    :visible="showDialog"
    :title="formData.id? '编辑权限点' : '添加权限点'"
    @close="closeDialog"
  >
    <el-form ref="perForm" :model="formData" :rules="rules">
      <el-form-item prop="name" label="权限名称" label-width="120px" style="width:650px">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item prop="code" label="权限标识" label-width="120px" style="width:650px">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item prop="description" label="权限描述" label-width="120px" style="width:650px">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="开启" label-width="100px">
        <el-switch v-model="formData.enVisible" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
            <el-button size="mini" @click="closeDialog">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission } from '@/api/permission'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    permissionData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  updated() {
    this.formData = this.permissionData
  },
  methods: {
    // 关闭弹层
    closeDialog() {
      // this.formData.id = ''
      this.$refs.perForm.resetFields() // 清空表单
      this.$emit('update:showDialog', false)
      // this.$emit('closeDialog')
    },
    btnOK() {
      this.$refs.perForm.validate(async(isOK) => {
        if (isOK) {
          // console.log(this.formData)
          if (this.formData.id) {
            await updatePermission(this.formData)
            this.$message.success('修改成功')
          } else {
            await addPermission(this.formData)
            this.$message.success('添加成功')
          }
          // 通知父组件重新获取页面权限数据
          this.$emit('updateData')
          // 关闭弹层
          this.closeDialog()
        }
      })
    }
  }
}
</script>

<style>

</style>
