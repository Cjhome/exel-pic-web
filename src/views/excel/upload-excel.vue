<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <div style="text-align: right;">
      <el-button
        type="primary"
        @click="createExcel"
      >
        生成excel文件
      </el-button>
      <el-button
        type="success"
        @click="downloadExcel"
      >
        下载excel文件
      </el-button>
    </div>
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { postExcelData, createExcel } from '@/api/users'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { saveAs } from 'file-saver'

@Component({
  name: 'UploadExcel',
  components: {
    UploadExcelComponent
  }
})
export default class extends Vue {
  private tableData: any = []
  private tableHeader: string[] = []
  private downloadUrl: string = ''

  private beforeUpload(file: File) {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (isLt1M) {
      return true
    }
    this.$message({
      message: 'Please do not upload files larger than 1m in size.',
      type: 'warning'
    })
    return false
  }

  private async handleSuccess({ results, header }: { results: any, header: string[]}) {
    this.tableData = results
    this.tableHeader = header
    const { data } = await postExcelData({
      head: header,
      data: results
    })
    this.$message({
      message: '上传成功',
      type: 'success'
    })
  }

  private async createExcel() {
    const loading = this.$loading({
      lock: true,
      text: '文件生成中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const res: any = await createExcel()
    if (!res.data.url) {
      this.$message.error(res.msg)
    } else {
      this.$message(res.msg)
      this.downloadUrl = res.data.url
    }
    loading.close()
  }

  private async downloadExcel() {
    window.open(`${process.env.VUE_APP_BASE_API}update/download/excel?url=${this.downloadUrl}`, '_blank')
  }
}
</script>
