<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="">
          <el-input v-model="search" placeholder="输入关键字" />
        </el-form-item>
        <el-form-item>
          <div>
            <el-form-item>
              <el-button v-permission="'sys:branch:save'" type="primary" @click="addInspectForm()">新增</el-button>
              <el-button type="primary" @click="queryList()">查询</el-button>

              <el-button v-permission="'sys:branch:import_demo'" type="primary" @click="download_excel()">模板</el-button>
              <el-button v-permission="'sys:branch:export'" type="primary" @click="export_excel()">导出</el-button>
              <el-upload
                style="display: inline-block;"
                :action="uploadUrl"
                :headers="{
                  token: token
                }"
                accept="file"
              >
                <el-button v-permission="'sys:branch:excel_mport'" size="small" type="primary">导入</el-button>
              </el-upload>
              <el-button type="primary" @click="resetData()">重置</el-button>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        size="small"
        border
        height="500"
        row-key="id"
      >
        <el-table-column
          label="序号"
          type="index"
        />
        <el-table-column
          width="250"
          prop="name"
          label="机构名称"
        />
        <el-table-column
          prop="branchNo"
          label="机构编号"
        />
        <el-table-column
          prop="type"
          label="类型"
        ><template slot-scope="scope">{{ typeStatus(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status===0?'禁用':'启用' }}</template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
        />
        <!-- <el-table-column
          prop="province"
          label="省份"
        /> -->
        <!-- <el-table-column
          prop="city"
          label="城市"
        /> -->
        <!-- <el-table-column
          prop="county"
          label="区县"
        />
        <el-table-column
          prop="street"
          label="街道"
        /> -->
        <el-table-column
          prop="address"
          label="地址"
        />
        <el-table-column
          prop="branchPayNo"
          label="人行支付行号"
        />
        <el-table-column
          prop="branchAddressCode"
          label="地区代码"
        />
        <!-- <el-table-column
          prop="orderNum"
          label="排序"
        /> -->
        <el-table-column
          fixed="right"
          width="150"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:branch:update'"
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:branch:delete'"
              size="mini"
              type="danger"
              @click="handleDelete( [scope.row.id])"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-form-item label="机构名称">
          <el-input v-model="inspectManifestForm.name" />
        </el-form-item>
        <el-form-item label="上级机构">
          <el-input v-model="inspectManifestForm.parentName" @click.native="showTree=true" />
        </el-form-item>
        <el-form-item label="机构编号">
          <el-input v-model="inspectManifestForm.branchNo" />
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="inspectManifestForm.type" placeholder="请选择">
            <el-option :value="''" label="请选择" />
            <el-option :value="11" label="一级分行" />
            <el-option :value="12" label="二级分行" />
            <el-option :value="21" label="一级支行" />
            <el-option :value="22" label="二级支行" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="inspectManifestForm.phone" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="inspectManifestForm.address" />
        </el-form-item>
        <!-- <el-form-item label="省份">
          <el-input v-model="inspectManifestForm.province" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="inspectManifestForm.city" />
        </el-form-item>
        <el-form-item label="区县">
          <el-input v-model="inspectManifestForm.county" />
        </el-form-item>
        <el-form-item label="街道">
          <el-input v-model="inspectManifestForm.street" />
        </el-form-item> -->
        <el-form-item label="人行支付行号">
          <el-input v-model="inspectManifestForm.branchPayNo" />
        </el-form-item>
        <el-form-item label="地区代码">
          <el-input v-model="inspectManifestForm.branchAddressCode" />
        </el-form-item>
        <el-form-item label="机构状态">
          <el-select v-model="inspectManifestForm.status" placeholder="请选择">
            <el-option :value="''" label="请选择" />
            <el-option :value="1" label="启用" />
            <el-option :value="0" label="禁用" />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="排序">
          <el-input v-model="inspectManifestForm.orderNum" />
        </el-form-item> -->
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
import { downloadExcel, exportExcel, excelImport, getBranchTree } from '@/api/inspect/inspect-list'
import { getNetworkList, addNetworkList, getNetworkInfo,deleteInfo } from '@/api/system/network-system'
import { getTreeJson } from '@/utils/index'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      loading: true,
      showTree: false,
      form: {
        page: 1
      },
      search: '',
      tableData: [],
      contentTitle: '',
      uploadUrl: '',
      dialogTableVisible: false,
      queryArray: [],
      inspectManifestForm: {
        parentId: '',
        name: '',
        parentName: '',
        branchNo: '',
        type: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        street: '',
        address: '',
        status: '',
        orderNum: '',
        branchPayNo: '',
        branchAddressCode: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('sys/branch/excel_import')
    this.getList()
  },
  methods: {
    getList(obj) {
      getNetworkList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = getTreeJson(res.data, 'id', 'parentId')
          this.queryArray = res.data
          this.loading = false
        }
      })
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    queryList() {
      if (this.search === '') {
        this.$message({
          message: '请输入关键字',
          type: 'warning'
        })
        return false
      }
      this.newQueryArry = this.queryArray.filter(data => Object.values(data).includes(this.search))
      this.tableData = getTreeJson(this.newQueryArry, 'id', 'parentId')
    },
    handleEdit(ids) {
      getNetworkInfo(ids).then(res => {
        this.contentTitle = '编辑'
        this.inspectManifestForm = res.result
        this.inspectManifestForm.parentName = res.result.name
        this.dialogTableVisible = true
      })
    },
    handleDelete(ids) {
          this.$confirm('确定删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteInfo(ids).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.getList(this.form)
              } else {
                this.$message({
                  type: 'danger',
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
    handleTree(obj) {
      this.showTree = false
      this.inspectManifestForm.parentId = obj.id
      this.inspectManifestForm.parentName = obj.name
    },
    addInspectForm() {
      Object.assign(this.$data.inspectManifestForm, this.$options.data().inspectManifestForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    download_excel() {
      downloadExcel('sys/branch/download_excel')
    },
    export_excel() {
      exportExcel('sys/branch/export_excel?', this.form)
    },
    typeStatus(type) {
      if (type === 11) {
        return '一级分行'
      } else if (type === 12) {
        return '二级分行'
      } else if (type === 21) {
        return '一级支行'
      } else {
        return '二级支行'
      }
    },
    // 查询
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'sys/branch/update' : null
      addNetworkList(this.inspectManifestForm, method).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          getBranchTree().then(res => {
            if (res.code === 0) {
              this.$store.dispatch('app/getBrachTree', res.result)
            }
          }).catch(error => {
            console.log(111, error)
          })
          this.getList()
        } else {
          this.$alert(res.msg)
        }
        this.dialogTableVisible = false
      })
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
