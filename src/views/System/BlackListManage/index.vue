<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="企业名称：">
          <el-input v-model="form.enterpriseName" />
        </el-form-item>
        <el-form-item label="企业法人：">
          <el-input v-model="form.operName" />
        </el-form-item>
        <el-form-item label="开户网点：">
          <el-input v-model="form.branchName" @click.native="showTree=true;currentName='form'" />
        </el-form-item>

        <div>
          <el-form-item>
            <el-button v-permission="'sys:black_list:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'sys:black_list:delete'" type="danger" @click="handleDeleteAll()">刪除</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button v-permission="'sys:black_list:export'" type="primary" @click="export_excel()">导出</el-button>
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
          prop="enterpriseName"
          label="企业名称"
        />
        <el-table-column
          prop="account"
          label="账户"
        />
        <el-table-column
          prop="branchName"
          label="开户网点"
        />
        <el-table-column
          prop="operName"
          label="企业法人"
        />
        <el-table-column
          prop="operIdCard"
          label="法人身份证"
        />
        <el-table-column
          prop="businessLicenseNo"
          label="营业执照"
        />
        <el-table-column
          prop="registerCapital"
          label="注册资金"
        />
        <el-table-column
          prop="registerDate"
          label="注册日期"
        />
        <el-table-column
          prop="registerAddress"
          label="注册地址"
        />
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column
          prop="county"
          label="所属区县"
        />
        <el-table-column
          prop="city"
          label="所属地市"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:black_list:update'"
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:black_list:delete'"
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
        <el-form-item label="企业名称">
          <el-input v-model="addDataForm.enterpriseName" />
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="addDataForm.account" />
        </el-form-item>
        <el-form-item label="开户网点">
          <el-input v-model="addDataForm.branchName" @click.native="showTree=true;currentName='addDataForm'" />
        </el-form-item>
        <el-form-item label="企业法人">
          <el-input v-model="addDataForm.operName" />
        </el-form-item>
        <el-form-item label="法人身份证">
          <el-input v-model="addDataForm.operIdCard" />
        </el-form-item>
        <el-form-item label="营业执照">
          <el-input v-model="addDataForm.businessLicenseNo" />
        </el-form-item>
        <el-form-item label="注册资金">
          <el-input v-model="addDataForm.registerCapital" />
        </el-form-item>
        <el-form-item label="注册日期">
          <el-date-picker
            v-model="addDataForm.registerDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="addDataForm.registerAddress" />
        </el-form-item>
        <el-form-item label="所属地市">
          <el-input v-model="addDataForm.city" />
        </el-form-item>
        <el-form-item label="所属区县">
          <el-input v-model="addDataForm.county" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addDataForm.remark" />
        </el-form-item>
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
import { getBlackList, blackDataDelete, blackDataDetails, addBlackData } from '@/api/system/black-list-manage'
import { exportExcel } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      contentTitle: '',
      form: {
        page: 1,
        branchName: '',
        operName: '',
        enterpriseName: ''
      },
      paramsObj: {
        page: 1
      },
      showTree: false,
      totalCount: 0,
      tableData: [],
      selectArrayId: [],
      dialogTableVisible: false,
      currentName: '',
      addDataForm: {
        account: '',
        branchName: '',
        businessLicenseNo: '',
        city: '',
        county: '',
        enterpriseName: '',
        id: '',
        operIdCard: '',
        operName: '',
        registerAddress: '',
        registerCapital: '',
        registerDate: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList(this.paramsObj)
  },
  methods: {
    getList(obj) {
      getBlackList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    addInspectForm() {
      Object.assign(this.$data.addDataForm, this.$options.data().addDataForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    handleDeleteAll(ids) {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        this.handleDelete(this.selectArrayId)
      }
    },
    handleSizeChange(size) {
      this.getList({ page: 1, limit: size })
    },
    handleEdit(ids) {
      blackDataDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.addDataForm = res.result
        this.dialogTableVisible = true
      })
    },
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
    },
    handleSelectionChangeId(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        blackDataDelete(ids).then(res => {
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
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addBlackData(this.addDataForm, method).then(res => {
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
    export_excel() {
      exportExcel('sys/black_list/export_excel?', this.form)
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
