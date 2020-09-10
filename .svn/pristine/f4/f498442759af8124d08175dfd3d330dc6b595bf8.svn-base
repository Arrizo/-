<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="用户名：">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="角色：">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="员工：">
          <el-input v-model="form.realName" />
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="form.timeStart"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
          <el-date-picker
            v-model="form.timeEnd"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'sys:log:export'" type="primary" @click="export_excel()">导出</el-button>
            <el-button type="primary" @click="resetData()">重置</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
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
          label="账户"
        />
        <el-table-column
          prop="workNo"
          label="操作工号"
        />
        <el-table-column
          prop="realName"
          label="员工"
        />
        <el-table-column
          prop="roleName"
          label="角色"
        />
        <el-table-column
          prop="deptName"
          label="部门"
        />
        <el-table-column
          prop="ip"
          label="IP地址"
        />
        <el-table-column
          prop="operation"
          label="操作"
        />
        <el-table-column
          prop="createDate"
          label="操作时间"
        />

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getLogQueryList } from '@/api/system/log-query'
import { exportExcel } from '@/api/inspect/inspect-list'
export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        page: 1,
        timeStart: '',
        timeEnd: '',
        username: '',
        roleName: '',
        realName: ''
      },
      paramsObj: {
        page: 1
      },
      totalCount: 0,
      tableData: [],
      dialogTableVisible: false
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
      getLogQueryList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    export_excel() {
      exportExcel('sys/log/export_excel?', this.form)
    },
    handleSizeChange(size) {
      this.getList({ page: 1, limit: size })
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.time = ''
      this.getList(this.form)
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
