<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="账号：">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="员工姓名：">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="员工工号：">
          <el-input v-model="form.workNo" />
        </el-form-item>
        <el-form-item label="角色：">
          <el-select v-model="form.roleName" placeholder="请选择">
            <el-option label="请选择" value="" />
            <el-option v-for="(item,index) in roleLists" :key="index+item" :label="item.roleName" :value="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态：">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="1" label="有效" />
            <el-option value="0" label="失效" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属区县：">
          <el-input v-model="form.county" />
        </el-form-item>
        <el-form-item label="所属地市：">
          <el-input v-model="form.city" />
        </el-form-item> -->

        <el-form-item label="所属网点：">
          <el-input v-model="form.deptName" @click.native="showTree=true;currentName='form'" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'sys:user:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'sys:user:delete'" type="danger" @click="handleDeleteAll()">刪除</el-button>
            <el-button v-permission="'sys:user:import_demo'" type="primary" @click="downloadExcel()">模板</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token:token
              }"
              accept="file"
            >
              <el-button v-permission="'sys:user:excel_mport'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'sys:user:export'" type="primary" @click="export_excel()">导出</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button type="primary" @click="resetData()">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        fit
        size="small"
        border
        height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
        />
        <el-table-column
          v-if="false"
          label="ID"
          prop="id"
        />
        <el-table-column
          prop="username"
          label="账号"
        />
        <el-table-column
          v-if="false"
          prop="password"
          label="密码"
        />
        <el-table-column
          prop="roleName"
          label="账号角色"
        />
        <el-table-column
          prop="status"
          label="账号状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status==='0'? '失效':'有效' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="所属员工"
        />
        <el-table-column
          prop="workNo"
          label="员工工号"
        />
        <el-table-column
          prop="mobile"
          label="手机号码"
        />
        <el-table-column
          prop="email"
          label="邮箱"
        />
        <el-table-column
          prop="deptName"
          label="所属网点"
        />
        <!-- <el-table-column
          prop="county"
          label="所属区县"
        />
        <el-table-column
          prop="city"
          label="所属地市"
        /> -->
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:user:update'"
              size="mini"
              @click="handleEdit(scope.row.userId)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:user:delete'"
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.userId])"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 100, 200, 300]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="contentTitle" :visible.sync="dialogUserVisible">
      <el-form :inline="true" size="small">
        <el-form-item label="用户名：">
          <el-input v-model="addDataForm.username" />
        </el-form-item>
        <el-form-item label="员工姓名：">
          <el-input v-model="addDataForm.realName" />
        </el-form-item>
        <el-form-item label="员工工号：">
          <el-input v-model="addDataForm.workNo" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="addDataForm.email" />
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="addDataForm.mobile" />
        </el-form-item>
        <el-form-item v-if="contentTitle==='编辑'" label="密码：">
          <el-input v-model="addDataForm.password " type="password" :show-password="true" />
        </el-form-item>
        <el-form-item label="所属网点：">
          <el-input v-model="addDataForm.deptName" @click.native="showTree=true;currentName='addDataForm'" />
        </el-form-item>
        <el-form-item label="二级操作员账号：">
          <el-input v-model="addDataForm.secLevelBankAccount" />
        </el-form-item>
        <el-form-item label="二级操作员密码：">
          <el-input v-model="addDataForm.secLevelBankPassword" type="password" :show-password="true" />
        </el-form-item>
        <el-form-item label="四级操作员账号：">
          <el-input v-model="addDataForm.fourLevelBankAccount" />
        </el-form-item>
        <el-form-item label="四级操作员密码：">
          <el-input v-model="addDataForm.fourLevelBankPassword" type="password" :show-password="true" />
        </el-form-item>
        <el-form-item label="征信操作员账号：">
          <el-input v-model="addDataForm.creditReportUsername" />
        </el-form-item>
        <el-form-item label="征信操作员密码：">
          <el-input v-model="addDataForm.creditReportPassword" type="password" :show-password="true" />
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model=" addDataForm.status">
            <el-radio :label="1" border>有效</el-radio>
            <el-radio :label="0" border>无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <el-form-item label="角色：">
            <el-checkbox-group v-model="addDataForm.roleIdList" @change=" addDataForm.role= $event">
              <el-checkbox-button label="">{{ '请选择' }}</el-checkbox-button>
              <el-checkbox-button v-for="(item,index) in roleLists" :key="index" :label="item.roleId">{{ item.roleName }}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrachTree from '@/views/components/BrachTree'
import { downloadExcel, exportExcel, excelImport } from '@/api/inspect/inspect-list'
import { getUserList, addUserData, roleList, userDataDetails, userDataDelete } from '@/api/system/user-manage'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      showTree: false,
      contentTitle: '',
      form: {
        page: 1,
        username: '',
        realName: '',
        workNo: '',
        roleName: '',
        deptName: '',
        status: '',
        city: '',
        county: '',
        parentId: ''
      },
      totalCount: 0,
      addDataForm: {
        branchId: 0,
        deptName: '',
        email: '',
        mobile: '',
        realName: '',
        role: [],
        roleIdList: [],
        status: 1,
        userId: '',
        username: '',
        workNo: '',
        secLevelBankAccount: '',
        secLevelBankPassword: '',
        fourLevelBankAccount: '',
        fourLevelBankPassword: '',
        creditReportUsername: '',
        creditReportPassword: ''
      },
      currentName: '',
      uploadUrl: '',
      roleLists: [],
      tableData: [],
      onRole: [],
      paramsObj: {
        page: 1
      },
      selectArrayId: [],
      dialogUserVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.getList(this.paramsObj)
    this.uploadUrl = excelImport('sys/user/excel_import')
    roleList().then(res => {
      this.roleLists = res.result.list
    })
  },
  methods: {
    handleSelectionChange(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.userId)
      })
      console.log(this.selectArrayId)
    },
    getList(obj) {
      getUserList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleSizeChange(size) {
      this.getList({ page: 1, limit: size })
    },
    addInspectForm() {
      Object.assign(this.$data.addDataForm, this.$options.data().addDataForm)
      this.contentTitle = '新增'
      this.dialogUserVisible = true
    },
    handleEdit(ids) {
      userDataDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.addDataForm = res.result
        this.dialogUserVisible = true
      })
    },
    handleTree(obj) {
      this.showTree = false
      this[this.currentName].deptName = obj.name
      this[this.currentName].branchId = obj.id
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addUserData(this.addDataForm, method).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.paramsObj.page = 1
          this.getList(this.paramsObj)
        } else {
          this.$alert(res.msg)
        }
        this.dialogUserVisible = false
      })
    },
    handleDeleteAll(ids) {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        this.handleDelete(this.selectArrayId)
      }
    },
    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDataDelete(ids).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    },
    downloadExcel() {
      downloadExcel('sys/user/download_demo')
    },
    export_excel() {
      exportExcel('sys/user/export_excel?', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
