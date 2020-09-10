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
        <el-form-item label="企业名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="法定代表人：">
          <el-input v-model="form.operName" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'data:ic:save'" type="primary" >更新工商数据</el-button>
            <el-button v-permission="'data:ic:save'" type="primary" >同步工商数据</el-button>
            <el-button v-permission="'data:ic:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'data:ic:delete'" type="danger" @click="handleDeleteAll()">删除</el-button>
            <el-button v-permission="'data:ic:import'" type="primary" @click="download_excel()">模板</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token:token
              }"
              accept="file"
            >
              <el-button v-permission="'data:ic:import'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'data:ic:export'" type="primary" @click="export_excel()">导出</el-button>
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
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="creditCode"
          label="统一信用代码"
        />
        <el-table-column
          prop="name"
          label="企业名称"
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
          <el-col :span="20">
            <el-form-item label="公司名称">
              <el-input v-model="inspectManifestForm.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法人">
              <el-input v-model="inspectManifestForm.operName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业状态">
              <el-input v-model="inspectManifestForm.status" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立日期">
              <el-date-picker v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册资本">
              <el-input v-model="inspectManifestForm.regCap" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收注册资本">
              <el-input v-model="inspectManifestForm.actualRegistCapi" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核准日期">
              <el-date-picker v-model="form.checkDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="inspectManifestForm.creditCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织机构代码">
              <el-input v-model="inspectManifestForm.orgNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册号">
              <el-input v-model="inspectManifestForm.regNo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input v-model="inspectManifestForm.taxNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业分类">
              <el-input v-model="inspectManifestForm.industryCategory" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="企业类型">
              <el-input v-model="inspectManifestForm.econKind" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="营业期限">
              <el-col :span="11">
                <el-date-picker v-model="form.termStart" type="date" value-format="yyyy-MM-dd" placeholder="营业开始日期" />
              </el-col>
              <el-col class="line" :span="2">至</el-col>
              <el-col :span="11">
                <el-date-picker v-model="form.termEnd" type="date" value-format="yyyy-MM-dd" placeholder="营业结束日期" />
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记机关">
              <el-input v-model="inspectManifestForm.belongOrg" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="注册地址">
              <el-input v-model="inspectManifestForm.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系地址">
              <el-input v-model="inspectManifestForm.contactAddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="经营范围">
              <el-input v-model="inspectManifestForm.scope" type="textarea" :row="2" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-button style="display:block;margin:0 auto" v-show="!isDetail" type="primary" @click="saveForm">保存</el-button>

      </el-form>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bussinessDataList, bussinessDelete, addBussinessDataList, getBusinessDetails } from '@/api/inspect/inspect-bussiness-manage'
import { downloadExcel, exportExcel, excelImport } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      contentTitle: '',
      showTree: false,
      showPrise: false,
      form: {
        account: '',
        creditCode: '',
        name: '',
        operName: '',
        page: 1,
        limit: ''
      },
      paramsObj: {
        page: 1
      },
      selectArrayId: [],
      uploadUrl: '',
      inspectManifestForm: {
        account: '',
        enterpriseName: '',
        yearReport: '',
        operName: '',
        regNo: '',
        uniCreditNo: '',
        branchNo: '',
        branchName: '',
        name: '',
        status: '',
        startDate: '',
        regCap: '',
        actualRegistCapi: '',
        checkDate: '',
        creditCode: '',
        orgNo: '',
        taxNo: '',
        industryCategory: '',
        econKind: '',
        termStart: '',
        termEnd: '',
        belongOrg: '',
        address: '',
        contactAddress: '',
        scope: ''
      },
      isDetail: false,
      tableData: [],
      totalCount: 1,
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
    this.uploadUrl = excelImport('data/ic/download_excel')
    this.getList(this.paramsObj)
  },
  methods: {
    getList(obj) {
      bussinessDataList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    // 重置
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    addInspectForm() {
      Object.assign(this.$data.inspectManifestForm, this.$options.data().inspectManifestForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true

    },
    // 下载模板
    download_excel() {
      downloadExcel('data/ic/download_demo')
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
        bussinessDelete(ids).then(res => {
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
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    handleEdit(ids) {
      getBusinessDetails(ids).then(res => {
        this.contentTitle = '详情'
        this.inspectManifestForm = res.result
        this.dialogTableVisible = true
        this.isDetail = true
      })
    },
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
      this[this.currentName].branchNo = obj.branchNo
    },
    // 查询
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addBussinessDataList(this.inspectManifestForm, method).then(res => {
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
    handleSelectionChangeId(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    export_excel() {
      exportExcel('data/ic/export_excel?', this.form)
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
