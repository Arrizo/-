<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="年检时间：">
          <el-date-picker
            v-model="form.inspectTime"
            type="month"
            placeholder="请选择"
          />
        </el-form-item>
        <!-- <el-form-item label="地市：">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="区县：">
          <el-input v-model="form.county" />
        </el-form-item> -->
        <div>
          <el-form-item>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button type="primary" @click="export_excel()">导出</el-button>
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
          prop="branchName"
          label="开户网点"
        />
        <el-table-column
          prop="inspectTotal"
          label="年检总数"
        />
        <el-table-column
          prop="inspectSuccessNum"
          label="年检通过数"
        />
        <el-table-column
          prop="inspectFailNum"
          label="年检不通过数"
        />
        <el-table-column
          prop="inspectBlackNum"
          label="年检黑名单数"
        />
        <el-table-column
          prop="inspectChangeNum"
          label="年检已整改数"
        />
        <el-table-column
          prop="county"
          label="所属区县"
        />
        <el-table-column
          prop="city"
          label="所属地市"
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
import { inspectDetailInfo, exportExcel } from '@/api/inspect/inspect-detail'
export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 0,
      form: {
        page: 1,
        city: '',
        county: '',
        inspectTime: '',
        limit: ''
      },
      paramsObj: {
        page: 1
      },
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
      inspectDetailInfo(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleSelectionChange() {

    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    export_excel() {
      exportExcel('inspect/export_excel?', this.form)
    },
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
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
