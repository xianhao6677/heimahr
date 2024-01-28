<template>
  <el-dialog :title="title" :visible="showDialog" @close="close">
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%;" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-input style="width: 80%;" size="mini" placeholder="请选择负责人" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input type="textarea" :rows="4" style="width: 80%;" size="mini" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col span="12">
            <el-button type="primary" size="small">确认</el-button>
            <el-button size="small">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.$emit('update:show-dialog', false)
    }
  }
}
</script>

<style>

</style>
