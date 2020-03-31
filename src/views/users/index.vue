<template>
  <div class="app-container">
    <div style="text-align: right;margin-bottom: 20px">
      <el-button
        type="primary"
        @click="editorUser"
      >
        新增用户
      </el-button>
    </div>
    <el-table
      :data="list"
      border
    >
      <el-table-column
        width="95"
        align="center"
        label="Id"
        prop="user_id"
      />
      <el-table-column
        width="95"
        align="center"
        label="账号"
        prop="user_name"
      />
      <el-table-column
        width="95"
        align="center"
        label="手机号"
        prop="user_phone"
      />
      <el-table-column
        width="220"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="editorUser(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteUser(scope.row.user_id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialongTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      :show-close="false"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="账号"
          prop="userName"
        >
          <el-input v-model="ruleForm.userName" />
        </el-form-item>
        <el-form-item
          label="密码"
          type="password"
          prop="password"
          autocomplete="off"
        >
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
        >
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="submitFrom"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userList, usersEditor, usersAdd, usersDelete } from '@/api/users'

@Component({
  name: 'ExportExcel',
  components: {
  }
})
export default class extends Vue {
  private list: any[] = []
  private dialongTitle: string = '新增'
  private dialogVisible: boolean = false
  private rules: any = {
    userName: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入账号密码', trigger: 'blur' },
      { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' }
    ]
  }
  private ruleForm: any = {
    userName: '',
    password: '',
    phone: ''
  }

  created() {
    this.fetchData()
  }

  private async fetchData() {
    const { data } = await userList()
    this.list = data
  }

  private async editorUser(userInfo: any) {
    if (userInfo.user_id) {
      this.dialongTitle = '编辑'
      this.ruleForm = {
        userName: userInfo.user_name,
        password: userInfo.user_password,
        phone: userInfo.user_phone,
        user_id: userInfo.user_id
      }
    } else {
      this.dialongTitle = '新增'
    }
    this.dialogVisible = true
  }

  private async deleteUser(userId: any) {
    this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const res = await usersDelete({
        id: userId
      })
      this.fetchData()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  private async handleClose() {
    (this.$refs.ruleForm as any).resetFields()
    this.ruleForm = {
      userName: '',
      password: '',
      phone: ''
    }
  }

  private async submitFrom() {
    if (this.dialongTitle === '新增') {
      const res: any = await usersAdd({
        user_name: this.ruleForm.userName,
        user_password: this.ruleForm.password,
        user_phone: this.ruleForm.phone
      })
    } else {
      const res: any = await usersEditor({
        user_name: this.ruleForm.userName,
        user_password: this.ruleForm.password,
        user_phone: this.ruleForm.phone,
        user_id: this.ruleForm.user_id
      })
    }
    this.handleClose()
    this.dialogVisible = false
    this.fetchData()
    this.$message({
      message: '提交成功！',
      type: 'success'
    })
  }
}
</script>

<style lang="scss">
</style>
