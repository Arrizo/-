<template>
  <div class="dashboard-container">
    <div v-if="flag" class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="bean名称：">
          <el-input v-model="form.beanName" placeholder="bean名称,如：testTask" />
        </el-form-item>

        <div>
          <el-form-item>
            <el-button v-permission="'sys:schedule:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button v-permission="'sys:schedule:pause'" type="primary" @click="handlePause()">停止</el-button>
            <el-button v-permission="'sys:schedule:resume'" type="primary" @click="handleResume()">恢复</el-button>
            <el-button v-permission="'sys:schedule:run'" type="primary" @click="handleRun()">立即执行</el-button>
            <el-button type="danger" @click=" flag=!flag">日志列表</el-button>
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
          label="任务ID"
          prop="jobId"
        />
        <el-table-column
          prop="beanName"
          label="bean名称"
        />
        <el-table-column
          prop="methodName"
          label="方法名称"
        />
        <el-table-column
          prop="params"
          label="参数"
        />
        <el-table-column
          prop="cronExpression"
          label="cron表达式"
        />
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.status===0?'正常':'暂停' }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:schedule:update'"
              size="mini"
              @click="handleEdit(scope.row.jobId)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:schedule:delete'"
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.jobId])"
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
    <div v-else>
      <el-form :inline="true" size="small">
        <el-form-item label="任务ID：">
          <el-input v-model="logForm.jobId" />
        </el-form-item>

        <div>
          <el-form-item>
            <el-button type="primary" @click="getLogList(logForm)">查询</el-button>
            <el-button type="primary" @click="resetLogData()">重置</el-button>
            <el-button type="danger" @click="flag=!flag">返回</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="logTableData"
        tooltip-effect="dark"
        fit
        size="small"
        border
        height="500"
      >
        <el-table-column
          type="selection"
        />
        <el-table-column
          label="日志ID"
          prop="logId"
        />
        <el-table-column
          prop="jobId"
          label="任务ID"
        />
        <el-table-column
          prop="beanName"
          label="bean名称"
        />
        <el-table-column
          prop="methodName"
          label="方法名"
        />
        <el-table-column
          prop="params"
          label="参数"
        />
        <el-table-column
          prop="status"
          label="状态"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="error"
          label="失败信息"
        />
        <el-table-column
          prop="times"
          label="耗时(单位：毫秒)"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.jobId)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.jobId])"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 100, 200, 300]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logTotalCount"
        @size-change="handleSizeLogChange"
        @current-change="handleCurrentLogChange"
      />
    </div>
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-form-item label="bean名称：">
          <el-input v-model="addDataForm.beanName" placeholder="spring bean名称,如：testTask" />
        </el-form-item>
        <el-form-item label="方法名称：">
          <el-input v-model="addDataForm.methodName" placeholder="方法名称" />
        </el-form-item>
        <el-form-item label="参数：">
          <el-input v-model="addDataForm.params" placeholder="参数" />
        </el-form-item>
        <el-form-item label="cron表达式：">
          <el-input v-model="addDataForm.cronExpression" placeholder="如： 0 0 12 * * ?" />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="addDataForm.remark" placeholder="备注" />
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getScheduleList, addScheduleData, scheduleDataDelete, scheduleDataDetails, scheduleDataPause, scheduleDataRun, scheduleDataResume, getScheduleLogList } from '@/api/system/schedule-task'
export default {
  name: 'Dashboard',
  data() {
    return {
      logForm: {
        page: 1,
        jobId: ''
      },
      flag: true,
      form: {
        beanName: ''
      },
      contentTitle: '',
      totalCount: 0,
      tableData: [],
      logTableData: [],
      dialogTableVisible: false,
      paramsObj: {
        page: 1
      },
      logTotalCount: 0,
      logParamsObj: {
        page: 1
      },
      selectArrayId: [],
      addDataForm: {
        beanName: '',
        cronExpression: '',
        methodName: '',
        params: '',
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
    this.getLogList(this.logParamsObj)
  },
  methods: {
    getList(obj) {
      getScheduleList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    getLogList(obj) {
      getScheduleLogList(obj).then(res => {
        if (res.code === 0) {
          this.logTableData = res.page.list
          this.logTotalCount = res.page.totalCount
        }
      })
    },
    handleEdit(ids) {
      scheduleDataDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.addDataForm = res.result
        this.dialogTableVisible = true
      })
    },
    addInspectForm() {
      Object.assign(this.$data.addDataForm, this.$options.data().addDataForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    handleSelectionChange(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.jobId)
      })
      console.log(this.selectArrayId)
    },
    handlePause(ids) {
      this.$confirm('确定要暂停选中的记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        scheduleDataPause(this.selectArrayId).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.$message({
              type: 'success',
              message: '暂停成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '暂停失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消暂停'
        })
      })
    },
    handleResume(ids) {
      this.$confirm('确定要恢复选中的记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        scheduleDataResume(this.selectArrayId).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.$message({
              type: 'success',
              message: '恢复成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '恢复失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消恢复'
        })
      })
    },
    handleSizeChange(size) {
      this.getList({ page: 1, limit: size })
    },
    handleSizeLogChange(size) {
      this.getList({ page: 1, limit: size })
    },
    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    handleCurrentLogChange(valu) {
      this.logParamsObj.page = valu
      this.getLogList(this.logParamsObj)
    },
    handleRun(ids) {
      this.$confirm('确定要立即执行选中的记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        scheduleDataRun(this.selectArrayId).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.$message({
              type: 'success',
              message: '执行成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '执行失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消执行'
        })
      })
    },
    saveForm() {
      var url = this.contentTitle === '编辑' ? 'sys/schedule/update' : null
      addScheduleData(this.addDataForm, url).then(res => {
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
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    resetLogData() {
      Object.assign(this.$data.logForm, this.$options.data().logForm)
      this.getLogList(this.logForm)
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        scheduleDataDelete(ids).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.logParamsObj.page = 1
            this.getLogList(this.logParamsObj)
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
