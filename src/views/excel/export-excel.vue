<template>
  <div class="app-container">
    <div>
      <filename-option v-model="filename" />
      <auto-width-option v-model="autoWidth" />
      <book-type-option v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        {{ $t('excel.export') }} Excel
      </el-button>
      <a
        href="https://armour.github.io/vue-typescript-admin-docs/features/components/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column
        width="95"
        align="center"
        label="Id"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="Author"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        width="115"
        align="center"
        label="Readings"
      >
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        align="center"
        label="Date"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        align="center"
        label="Image"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.imageurl"
            width="50"
            alt=""
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IArticleData } from '@/api/types'
import { formatJson } from '@/utils'
import { exportJson2Excel } from '@/utils/excel'
import FilenameOption from './components/FilenameOption.vue'
import AutoWidthOption from './components/AutoWidthOption.vue'
import BookTypeOption from './components/BookTypeOption.vue'

@Component({
  name: 'ExportExcel',
  components: {
    AutoWidthOption,
    BookTypeOption,
    FilenameOption
  }
})
export default class extends Vue {
  private list: IArticleData[] = []
  private listLoading = true
  private downloadLoading = false
  private filename = ''
  private autoWidth = true
  private bookType = 'xlsx'

  created() {
    this.fetchData()
  }

  private async fetchData() {
    this.listLoading = true
    // const { data } = await getArticles({ /* Your params here */ })
    // this.list = data.items
    // data.items.map((item: any) => {
    //   item.imageurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585214871984&di=222a2ce3ff45d038a6f738a6371ef6e5&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F78%2F52%2F01200000123847134434529793168.jpg'
    // })
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
  }

  private handleDownload() {
    this.downloadLoading = true
    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date', 'Image']
    const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp', 'imageurl']
    const list = this.list
    const data = formatJson(filterVal, list)
    exportJson2Excel(tHeader, data, this.filename !== '' ? this.filename : undefined, undefined, undefined, this.autoWidth, this.bookType)
    this.downloadLoading = false
  }
}
</script>

<style lang="scss">
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
