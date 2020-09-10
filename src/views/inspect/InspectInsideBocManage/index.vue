<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="机构编码：">
          <el-input v-model="form.branchName" @click.native="showTree=true;currentName='form'" />
        </el-form-item>
        <el-form-item label="客户号：">
          <el-input v-model="form.customerNo" />
        </el-form-item>
        <el-form-item label="账户：">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="企业类型：">
          <el-select v-model="form.entType" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="企业" />
            <el-option value="20" label="非企业" />
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item v-if="false" label="开户网点编号：">
          <el-input v-model="form.branchNo" />
        </el-form-item>

        <div>
          <el-form-item>
            <el-button v-permission="'data:boc:save'" type="primary" >同步核心数据</el-button>
            <el-button v-permission="'data:boc:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'data:boc:delete'" type="danger" @click="handleDeleteAll()">删除</el-button>
            <el-button v-permission="'data:boc:import_demo'" type="primary" @click="download_excel()">模板</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token:token
              }"
              accept="file"
            >
              <el-button v-permission="'data:boc:excel_mport'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'data:boc:export'" type="primary" @click="export_excel()">导出</el-button>
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
          prop="branchNo"
          label="机构编码"
        />
        <el-table-column
          prop="customerNo"
          label="客户号"
        />
        <el-table-column
          prop="account"
          label="账户"
        />
        <el-table-column
          label="企业类型"
        >
          <template slot-scope="scope">
            {{ entTypeZhi(scope.row.entType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="企业名称"
        />

        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit( scope.row.id,false)"
            >详情
            </el-button>
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
      <el-form label-width="160px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户名称">
              <el-input v-model="inspectManifestForm.accountName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input v-model="inspectManifestForm.account" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户号码">
              <el-input v-model="inspectManifestForm.customerNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-if="false">
              <el-input v-model="inspectManifestForm.branchNo" />
            </el-form-item>
            <el-form-item label="开户机构号：">
              <el-input v-model="inspectManifestForm.branchName" @click.native="showTree=true;currentName='inspectManifestForm'" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户日期">
              <el-date-picker
                v-model="inspectManifestForm.openDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业分类">
              <template>
                <el-select v-model="inspectManifestForm.entType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业登记状态">
              <el-input v-model="inspectManifestForm.status" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法人/单位负责人名称">
              <el-input v-model="inspectManifestForm.operName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法人身份证件有效日期">
              <el-date-picker
                v-model="inspectManifestForm.legalPersonCardTermDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业证件类型">
              <el-input v-model="inspectManifestForm.certType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业证件号">
              <el-input v-model="inspectManifestForm.certNo" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业到期日">
              <el-date-picker
                v-model="inspectManifestForm.certExpireDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="组织机构代码证编号">
              <el-input v-model="inspectManifestForm.orgNo" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="组织机构类别">
              <el-input v-model="inspectManifestForm.orgType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织机构代码证有效期">
              <el-date-picker
                v-model="inspectManifestForm.orgTermDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="注册日期">
              <el-date-picker
                v-model="inspectManifestForm.regDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资金">
              <el-input v-model="inspectManifestForm.regCap" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资金币种">
              <el-input v-model="inspectManifestForm.regCapCurrency" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="inspectManifestForm.address" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码">
              <el-input v-model="inspectManifestForm.companyTel" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="经营范围">
              <el-input v-model="inspectManifestForm.scope" type="textarea" :row="3" />
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
import {
  inspectInsideDataList,
  addInspectInsideDataList,
  inspectInsideDelete,
  getInspectInsideDetails
} from '@/api/inspect/inspect-inside-bocmanage'
import { downloadExcel, exportExcel, excelImport } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'

export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      showTree: false,
      showPrise: false,
      form: {
        branchName: '',
        branchNo: '',
        customerNo: '',
        account: '',
        entType: '',
        name: '',
        page: 1,
        limit: ''
      },
      contentTitle: '',
      inspectManifestForm: {
        branchName: '',
        accountName: '',
        account: '',
        customerNo: '',
        branchNo: '',
        openDate: '',
        entType: '',
        status: '',
        operName: '',
        legalPersonCardTermDate: '',
        certType: '',
        certNo: '',
        certExpireDate: '',
        orgNo: '',
        orgType: '',
        orgTermDate: '',
        regDate: '',
        regCap: '',
        regCapCurrency: '',
        address: '',
        companyTel: '',
        scope: ''
      },
      options: [{
        value: 10,
        label: '企业'
      }, {
        value: 20,
        label: '非企业'
      }],
      paramsObj: {
        page: 1
      },
      totalCount: 1,
      selectArrayId: [],
      tableData: [],
      dialogTableVisible: false,
      isDetail: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('data/boc/excel_import')
    this.getList(this.paramsObj)
  },
  methods: {
    // 获取id
    handleSelectionChangeId(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    getList(obj) {
      inspectInsideDataList(obj).then(res => {
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
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
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
      addInspectInsideDataList(this.inspectManifestForm, method).then(res => {
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
    handleEdit(ids) {
      this.isDetail = true
      getInspectInsideDetails(ids).then(res => {
        this.contentTitle = '详情'
        this.inspectManifestForm = res.result
        this.dialogTableVisible = true
      })
    },
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
      this[this.currentName].branchNo = obj.branchNo
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        inspectInsideDelete(ids).then(res => {
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
    // 企业类型
    entTypeZhi(flg) {
      if (flg === 10) {
        return '企业'
      } else if (flg === 20) {
        return '非企业'
      }
    },
    download_excel() {
      downloadExcel('data/boc/download_demo')
    },
    export_excel() {
      exportExcel('data/boc/export_excel?', this.form)
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
