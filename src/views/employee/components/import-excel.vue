<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="uploadChange"
        >
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="getTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="handleUpload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { getExportTemplate, uploadExcel } from '@/api/employee'
import FileSaver from 'file-saver'

export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 批量-下载导入员工模板
    async getTemplate() {
      const res = await getExportTemplate()
      FileSaver.saveAs(res, '员工导入模板.xlsx')
    },
    // 点击上传打开文件选择框
    handleUpload() {
      // 获取input实例，调用其内置方法
      this.$refs['excel-upload-input'].click()
    },
    // 监听input文件选择事件
    async uploadChange(event) {
      // console.log(event.target.files) // 调用上传接口需要的文件，数组形式
      const files = event.target.files
      // 判断是否存在选择的文件，若取消则没有选择文件
      if (files.length > 0) {
        const data = new FormData() // 接口要求参数为 form-data 格式
        data.append('file', files[0]) // 将选择的文件添加到form-data中
        try {
          await uploadExcel(data)
          // 上传成功
          this.$emit('uploadSuccess') // 上传成功，通知父组件重新加载员工数据
          this.$emit('update:showExcelDialog', false) // 关闭弹层
          this.$message.success('上传成功')
        } catch (error) {
          // 上传失败
        } finally {
          // 无论上传成功还是失败，都会执行finally
          this.$refs['excel-upload-input'].value = '' // 清空文件选择器
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>
