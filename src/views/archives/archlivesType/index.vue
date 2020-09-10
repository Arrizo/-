<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="操作员">
          <el-input v-model="form.operator" />
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
          prop="name"
          label="分类名称"
        />
        <el-table-column
          prop="path"
          label="路径名"
        />
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column
          prop="operator"
          label="操作员"
        />
        <el-table-column
          prop="createTime"
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
        <el-form-item label="分类名称">
          <el-input v-model="archivesTypeForm.name" />
        </el-form-item>
        <el-form-item label="路径名">
          <el-input v-model="archivesTypeForm.path" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="archivesTypeForm.remark" />
        </el-form-item>
        <el-select v-model="archivesTypeForm.type" placeholder="类型">
          <el-option v-for="(item,index) in types" :key="index" :label="item.lable" :value="item.value" />
        </el-select>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTypeList, addArchivesType, editArchivesType, getArchivesTypeInfo, delArchivesType } from '@/api/archives/archives-type'
export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 0,
      contentTitle: '',
      dialogTableVisible: false,
      form: {
        name: '',
        operator: ''
      },
      archivesTypeForm: {
        name: '',
        path: '',
        remark: '',
        type: ''
      },
      paramsObj: {
        page: 1
      },
      types: [
        {
          lable: '开户',
          value: 1
        },
        {
          lable: '变更',
          value: 2
        },
        {
          lable: '销户',
          value: 3
        }
      ],
      tableData: []
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
      getTypeList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.page.list
          this.totalCount = res.page.totalCount
        }
      })
    },
    handleSelectionChange() {

    },
    addInfo() {
      Object.assign(this.$data.archivesTypeForm, this.$options.data().archivesTypeForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    handleEdit(ids) {
      getArchivesTypeInfo(ids).then(res => {
        this.contentTitle = '编辑'
        this.archivesTypeForm = res.electronicRecordCategory
        this.dialogTableVisible = true
      })
    },
    saveForm() {
      if (this.contentTitle === '新增') {
        addArchivesType(this.archivesTypeForm).then(res => {
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
        editArchivesType(this.archivesTypeForm).then(res => {
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
        delArchivesType(ids).then(res => {
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
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
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
