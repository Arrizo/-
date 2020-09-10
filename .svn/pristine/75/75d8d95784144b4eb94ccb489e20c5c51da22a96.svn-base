<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="账户：">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="统一信用代码：">
          <el-input v-model="form.creditCode" />
        </el-form-item>
        <el-form-item label="存款人名称：">
          <el-input v-model="form.depositorName" />
        </el-form-item>

        <el-form-item label="法定代表人：">
          <el-input v-model="form.operName" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'data:people_bank_data:synchrodata'" type="primary" @click="synchrodata()">同步人行数据</el-button>
            <el-button v-permission="'data:people_bank_data:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'data:people_bank_data:delete'" type="danger" @click="handleDeleteAll()">刪除</el-button>
            <el-button v-permission="'data:people_bank_data:import'" type="primary" @click="downloadExcel()">模板</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token:token
              }"
              accept="file"
            >
              <el-button v-permission="'data:people_bank_data:import'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'data:people_bank_data:export'" type="primary" @click="export_excel()">导出</el-button>

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
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="creditCode"
          label="统一信用代码"
        />
        <el-table-column
          prop="depositorName"
          label="存款人名称"
        />
        <el-table-column
          prop="operName"
          label="法定代表人"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit( scope.row.id,false)"
            >详情</el-button>
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
    <el-dialog width="85%" :title="contentTitle" :visible.sync="dialogTableVisible" @close="isDetail=false">
      <el-form label-width="130px">
        <el-row>
          <el-col>
            <h3>存款人基本信息</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="存款人名称">
              <el-input v-model="bocDataForm.depositorName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="地址">
              <el-input v-model="bocDataForm.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人">
              <el-input v-model="bocDataForm.operName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证明文件编号">
              <el-input v-model="bocDataForm.certNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件到期日">
              <el-date-picker v-model="bocDataForm.certExpireDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资金币种">
              <el-input v-model="bocDataForm.regCapCurrency" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资金">
              <el-input v-model="bocDataForm.regCap" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="经营范围">
              <el-input v-model="bocDataForm.scope" type="textarea" :row="2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <h3>账户信息</h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="账号">
              <el-input v-model="bocDataForm.account" />
            </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align:right">
          <el-button style="display:block;margin:0 auto" v-show="!isDetail" type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bocDataInfo, addBocDataInfo, synchrodata, bocDataInfoById, bocDelete } from '@/api/inspect/inspect-boc-data'
import { downloadExcel, exportExcel, excelImport } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      totalCount: 0,
      showTree: false,
      showPrise: false,
      form: {
        account: '',
        creditCode: '',
        depositorName: '',
        operName: '',
        page: 1,
        limit: ''
      },
      uploadUrl: '',
      contentTitle: '',
      bocDataForm: {
        certNo: '',
        depositorName: '',
        operName: '',
        regCapCurrency: '',
        certExpireDate: '',
        regCap: '',
        address: '',
        scope: '',
        account: ''
      },
      isDetail: false,
      paramsObj: {
        page: 1,
        type: 'bocData'
      },
      tableData: [],
      dialogTableVisible: false,
      selectArrayId: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('data/people_bank_data/download_excel')
    this.getList(this.paramsObj)
  },
  methods: {
    handleSelectionChange(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    handleDeleteAll(ids) {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        this.handleDelete(this.selectArrayId)
      }
    },
    getList(obj) {
      bocDataInfo(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
    },
    // 重置
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.time = ''
      this.getList(this.form)
    },
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
      this[this.currentName].branchNo = obj.branchNo
    },
    dataDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bocDelete(ids).then(res => {
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
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addBocDataInfo(this.bocDataForm, method).then(res => {
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
    addInspectForm() {
      Object.assign(this.$data.bocDataForm, this.$options.data().bocDataForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    export_excel() {
      exportExcel('data/people_bank_data/export_excel?', this.form)
    },
    downloadExcel() {
      downloadExcel('data/people_bank_data/download_demo')
    },
    handleEdit(ids) {
      bocDataInfoById(ids).then(res => {
        this.contentTitle = '详情'
        this.bocDataForm = res.result
        this.dialogTableVisible = true
        this.isDetail = true
      })
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bocDelete(ids).then(res => {
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
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    synchrodata() {
      synchrodata()
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
