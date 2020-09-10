<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="账号">
          <el-input v-model="form.accountNumber" />
        </el-form-item>

        <el-form-item label="企业名称">
          <el-input v-model="form.enterpriseName" />
        </el-form-item>

        <el-form-item label="账户操作类型">
          <el-input v-model="form.type" />
        </el-form-item>
        <el-form-item label="证明文件编号：">
          <el-input v-model="form.creditCode" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button type="primary" @click="resetData()">重置</el-button>
            <el-button type="primary" @click="addInfo()">新增</el-button>
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
          prop="accountNumber"
          label="账号"
        />
        <el-table-column
          prop="enterpriseName"
          label="企业名称"
        />
        <el-table-column
          prop="creditCode"
          label="证明文件编号"
        />
        <el-table-column
          prop="type"
          label="账户操作类型"
        />
        <el-table-column
          prop="name"
          label="分类名称"
        />
        <el-table-column
          prop="path"
          label="路径"
        />
        <el-table-column
          prop="operator"
          label="操作员"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.id])"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-form-item label="账户">
          <el-input v-model="electronicRecordForm.accountNumber" />
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="electronicRecordForm.enterpriseName" />
        </el-form-item>
        <el-form-item label="证明文件编号">
          <el-input v-model="electronicRecordForm.creditCode" />
        </el-form-item>
        <el-form-item label="账户操作类型">
          <el-input v-model="electronicRecordForm.type" />
        </el-form-item>
        <el-col :span="24">
          <el-form-item
            v-for="(domain, index) in electronicRecordForm.recordDataEntities"
            :key="domain.key"
            :label="'文件' + (index + 1)"
            :prop="'recordDataEntities.' + index + '.value'"
          >
            <el-select v-model="electronicRecordForm.recordDataEntities[index].categoryId" placeholder="请选择文件分类">
              <el-option v-for="(item,index1) in type" :key="index1" :label="item.name" :value="item.id" />
            </el-select>
            <el-upload
              :ref="'upload'+index"
              :disabled="showArry[index]"
              :on-success="handlePreview"
              :action="url"
              :headers="{
                token: token
              }"
              :data="{ 'enterpriseName': electronicRecordForm.enterpriseName,
                       'categoryId': electronicRecordForm.recordDataEntities[index].categoryId}"
            >
              <el-button size="small" type="primary" @click="submitUpload(index)">选取文件</el-button>
            </el-upload>
            <el-button @click.prevent="removeDomain(index)">删除</el-button>
          </el-form-item>
        </el-col>
        <div style="text-align:right">
          <el-button type="primary" @click="addDomain">添加文件</el-button>
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getDataList, addArchivesInfo, getArchivesInfo, delArchivesInfo, getTypeList, editArchivesInfo } from '@/api/archives/archives-list'
import { getDataList, addArchivesInfo, getArchivesInfo, delArchivesInfo, editArchivesInfo, getTypeList } from '@/api/archives/archives-list'
export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 0,
      contentTitle: '',
      dialogTableVisible: false,
      index: 0,
      form: {
        accountNumber: '',
        type: '',
        creditCode: '',
        enterpriseName: ''
      },
      showArry: [false, false, false],
      url: '',
      electronicRecordForm: {
        accountNumber: '',
        enterpriseName: '',
        creditCode: '',
        type: '',
        recordDataEntities: [{
          categoryId: null,
          path: ''
        }]
      },
      type: [],
      paramsObj: {
        page: 1
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.url = document.location.protocol + process.env.VUE_APP_BASE_API + 'archives/electronicRecordData/upload'
    this.getList(this.paramsObj)
    this.getType()
  },
  methods: {
    getList(obj) {
      getDataList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.page.list
          this.totalCount = res.page.totalCount
        }
      })
    },
    handlePreview(response, file, fileList) {
      console.log(response)
      this.electronicRecordForm.recordDataEntities[this.index].path = response
      console.log(this.electronicRecordForm.recordDataEntities[this.index].path)
    },
    submitData() {
      this.$refs.upload0.submit()
      this.$refs.upload1.submit()
    },
    handleSelectionChange() {

    },
    getType() {
      getTypeList().then(res => {
        this.type = res.page.list
      })
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    addInfo() {
      Object.assign(this.$data.electronicRecordForm, this.$options.data().electronicRecordForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    handleEdit(ids) {
      getArchivesInfo(ids).then(res => {
        this.contentTitle = '编辑'
        this.electronicRecordForm.creditCode = res.electronicRecordData.creditCode
        this.electronicRecordForm.id = res.electronicRecordData.id
        this.electronicRecordForm.enterpriseName = res.electronicRecordData.enterpriseName
        this.electronicRecordForm.accountNumber = res.electronicRecordData.accountNumber
        this.electronicRecordForm.type = res.electronicRecordData.type
        this.electronicRecordForm.recordDataEntities[0].path = res.electronicRecordData.path
        this.electronicRecordForm.recordDataEntities[0].categoryId = res.electronicRecordData.categoryId
        this.dialogTableVisible = true
      })
    },
    saveForm() {
      if (this.contentTitle === '新增') {
        addArchivesInfo(this.electronicRecordForm).then(res => {
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
      } else {
        editArchivesInfo(this.electronicRecordForm).then(res => {
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
      }
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArchivesInfo(ids).then(res => {
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
    submitUpload(index) {
      if (this.electronicRecordForm.enterpriseName === null || this.electronicRecordForm.recordDataEntities[index].categoryId === null) {
        alert('请先输入公司名称与文件种类')
        this.$set(this.showArry, index, true)
        this.index = index
      } else {
        this.$set(this.showArry, index, false)
      }
    },
    removeDomain(index) {
      if (index !== -1) {
        this.electronicRecordForm.recordDataEntities.splice(index, 1)
        this.showArry.splice(index, 1)
      }
    },
    addDomain() {
      this.electronicRecordForm.recordDataEntities.push({
        path: '',
        categoryId: null
      })
      this.showArry.push(false)
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
