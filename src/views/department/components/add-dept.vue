<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <el-form>
      <el-form-item>
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-input />
      </el-form-item>
      <el-form-item>
        <el-input />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
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
