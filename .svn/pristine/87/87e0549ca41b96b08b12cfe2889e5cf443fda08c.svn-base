<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="网点名称：">
          <el-input v-model="form.branchName" @click.native="showTree=true;currentName='form'" />
        </el-form-item>
        <el-form-item v-if="false" label="开户网点编号：">
          <el-input v-model="form.branchNo" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'inspect:branch_account:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'inspect:branch_account:delete'" type="danger" @click="handleDeleteAll()">删除</el-button>
            <el-button v-permission="'inspect:branch_account:import_demo'" type="primary" @click="download_excel()">模板</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token:token
              }"
              accept="file"
            >
              <el-button v-permission="'inspect:branch_account:excel_mport'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'inspect:branch_account:export'" type="primary" @click="export_excel()">导出</el-button>
            <el-button v-permission="'inspect:branch_account:check'" type="primary" @click="showInspectAll=true">账户校验</el-button>
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
        @selection-change="handleSelectionChangeId"
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
          :show-overflow-tooltip="true"
          prop="branchName"
          label="机构名称"
        />
        <el-table-column
          prop="branchNo"
          label="机构号（核心）"
        />
        <el-table-column
          prop="parentBranchNo"
          label="上级机构号（核心）"
        />
        <el-table-column
          prop="peopleBankNo"
          label="人行机构号（12位）"
        />
        <el-table-column
          prop="peopleBankUsername"
          label="人行账管系统用户名"
        />
        <el-table-column
          prop="peopleBankPassword"
          label="人行账管系统用户密码"
        />
        <!-- <el-table-column
          prop="creditSystemUsername"
          label="机构信用代码系统用户名"
        />
        <el-table-column
          prop="creditSystemPassword"
          label="机构信用代码系统密码"
        /> -->
        <el-table-column
          prop="status"
          label="账号状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status===0 ? '无效':'有效' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'inspect:branch_account:update'"
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              v-permission="'inspect:branch_account:delete'"
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.id])"
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
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-form-item label="机构名称">
          <el-input v-model="inspectManifestForm.branchName" />
        </el-form-item>
        <el-form-item label="机构号（核心）">
          <el-input v-model="inspectManifestForm.branchNo" />
        </el-form-item>
        <el-form-item label="上级机构号（核心）">
          <el-input v-model="inspectManifestForm.parentBranchNo" />
        </el-form-item>
        <el-form-item label="人行机构号（12位）">
          <el-input v-model="inspectManifestForm.peopleBankNo" />
        </el-form-item>
        <el-form-item label="人行账管系统用户名(2级操作员)">
          <el-input v-model="inspectManifestForm.peopleBankUsername" />
        </el-form-item>
        <el-form-item label="人行账管系统用户密码">
          <el-input v-model="inspectManifestForm.peopleBankPassword" />
        </el-form-item>
        <el-form-item label="机构信用代码系统用户名">
          <el-input v-model="inspectManifestForm.creditSystemUsername" />
        </el-form-item>
        <el-form-item label="机构信用代码系统密码">
          <el-input v-model="inspectManifestForm.creditSystemPassword" />
        </el-form-item>
        <el-form-item label="账户状态">
          <el-select v-model="inspectManifestForm.status" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="0" label="无效" />
            <el-option value="1" label="有效" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="inspectManifestForm.remark" />
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      width="400px"
      title="账户检验"
      :visible.sync="showInspectAll"
      center
    >
      <span>是否进行账户检验?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inspectSomeData">检验以勾选账户</el-button>
        <el-button type="primary" @click="inspectAllData">检验全部账户</el-button>
      </span>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { inspectNetDataList, addInspectNetDataList, inspectNetDelete, getInspectNetDetails, batchAccout, batchAllAccout } from '@/api/inspect/inspect-network-manage'
import { downloadExcel, exportExcel, excelImport } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      totalCount: 1,
      showTree: false,
      form: {
        branchName: '',
        branchNo: '',
        page: 1,
        limit: ''
      },
      showInspectAll: false,
      uploadUrl: '',
      inspectManifestForm: {
        branchName: '',
        branchNo: '',
        parentBranchNo: '',
        peopleBankNo: '',
        peopleBankUsername: '',
        peopleBankPassword: '',
        creditSystemUsername: '',
        creditSystemPassword: '',
        status: '',
        remark: ''
      },
      paramsObj: {
        page: 1
      },
      contentTitle: '',
      tableData: [],
      selectArrayId: [],
      dialogTableVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('inspect/branch_account/excel_import')
    this.getList(this.paramsObj)
  },
  methods: {
    getList(obj) {
      inspectNetDataList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    addInspectForm() {
      Object.assign(this.$data.inspectManifestForm, this.$options.data().inspectManifestForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addInspectNetDataList(this.inspectManifestForm, method).then(res => {
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
        this.dialogTableVisible = false
      })
    },
    handleDeleteAll(ids) {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        this.handleDelete(this.selectArrayId)
      }
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        inspectNetDelete(ids).then(res => {
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
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
    },
    handleEdit(ids) {
      getInspectNetDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.inspectManifestForm = res.result
        this.inspectManifestForm.status = JSON.stringify(this.inspectManifestForm.status)
        this.dialogTableVisible = true
      })
    },
    // 获取id
    handleSelectionChangeId(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
    },
    inspectSomeData() {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        batchAccout(this.selectArrayId).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg)
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
          } else {
            this.$alert(res.msg)
          }
        })
      }
      this.showInspectAll = false
    },
    // 全部年检
    inspectAllData() {
      batchAllAccout(this.form).then(res => {
        if (res.code === 0) {
          this.paramsObj.page = 1
          this.showInspectAll = false
          this.getList(this.paramsObj)
        } else {
          this.$alert(res.msg)
        }
      })
    },

    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    download_excel() {
      downloadExcel('inspect/branch_account/download_demo')
    },
    export_excel() {
      exportExcel('inspect/branch_account/export_excel?', this.form)
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
