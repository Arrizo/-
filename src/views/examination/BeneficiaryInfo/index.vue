<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="企业名称：">
          <el-input v-model="form.enterpriseName" />
        </el-form-item>
        <el-form-item label="统一社会信用代码：">
          <el-input v-model="form.creditCode" />
        </el-form-item>
        <el-form-item label="法定代表人/单位负责人姓名：">
          <el-input v-model="form.legalPersonName" />
        </el-form-item>
        <el-form-item label="注册币种：">
          <el-input v-model="form.registeredCurrencyType" />
        </el-form-item>
        <el-form-item label="企业成立日期：">
          <el-date-picker
            v-model="form.establishmentDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          />
        </el-form-item>

        <div>
          <el-form-item>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button type="primary" @click="resetData()">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        size="small"
        border
        height="500"
        @selection-change="handleSelectionChangeId"
      >
        <el-table-column
          type="selection"
        />
        <el-table-column
          prop="enterpriseName"
          label="企业名称"
        />
        <el-table-column
          prop="creditCode"
          label="统一社会信用代码"
        />
        <el-table-column
          prop="legalPersonName"
          label="法定代表人/单位负责人姓名"
        />

        <el-table-column
          width="100px"
          align="center"
          prop="benefitResult"
          label="受益人信息详情"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.benefitResult!==null"
              type="primary"
              size="mini"
              @click="handleEdit( scope.row.id,false)"
            >详情</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="info" @click="getBenefitList(scope.row.id)">受益人穿透</el-button>
            <el-button
              size="mini"
              @click="handleEdit( scope.row.id,true)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete( [scope.row.id])"
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
    <el-dialog title="编辑" :visible.sync="dialogTableVisible" width="900px">
      <el-form :inline="true" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="inspectManifestForm.enterpriseName " />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="inspectManifestForm.creditCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法定代表人/单位负责人姓名">
              <el-input v-model="inspectManifestForm.legalPersonName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业成立日期">
              <el-date-picker
                v-model="inspectManifestForm.establishmentDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经营范围">
              <el-input v-model="inspectManifestForm.operationScope" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="inspectManifestForm.registeredAddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册资本">
              <el-input v-model="inspectManifestForm.registeredCapital" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册币种">
              <el-input v-model="inspectManifestForm.registeredCurrencyType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="核查结果">
              <el-input v-model="inspectManifestForm.checkResult" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业期限开始时间">
              <el-date-picker
                v-model="inspectManifestForm.businessStartDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业期限结束时间">
              <el-date-picker
                v-model="inspectManifestForm.businessEndDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input v-model="inspectManifestForm.rmk1" />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="showDialogDetails" title="受益人详情" width="900px">
      <el-table
        :data="tableDetails"
        tooltip-effect="dark"
        size="small"
        border
        height="500px"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          width="100"
          prop="name"
          label="最终受益人信息名称"
        />
        <el-table-column
          width="100"
          prop="stockPercent"
          label="持股比例"
        />
        <el-table-column
          prop="benefitDetailList"
          label="股权链"
        >
          <template slot-scope="scope">
            <div v-for="(item,index) in (scope.row.benefitDetailList)" :key="index" class="benefit">
              <h4>股权路径{{ index+1 }} (占比约 {{ item.stockPercent }} )</h4>
              <span>{{ item.path }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExaminationList, addExamination, deleteExamination, getExaminationDetails, getBenefitInfo } from '@/api/examination/examination-accout'
export default {
  name: 'Dashboard',
  data() {
    return {
      showDialogDetails: false,
      totalCount: 0,
      form: {
        page: 1,
        enterpriseName: '',
        creditCode: '',
        legalPersonName: '',
        registeredCurrencyType: '',
        establishmentDate: ''

      },
      tableDetails: [],
      abnormal: {},
      dialogabnormalVisible: false,
      inspectManifestForm: {
        businessEndDate: '',
        businessStartDate: '',
        checkResult: '',
        creditCode: '',
        enterpriseName: '',
        establishmentDate: '',
        legalPersonName: '',
        operationScope: '',
        registeredAddress: '',
        registeredCapital: '',
        registeredCurrencyType: '',
        rmk1: ''
      },
      paramsObj: {
        page: 1
      },
      tableData: [],
      dialogTableVisible: false,
      selectArrayId: []
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
    // 获取id
    handleSelectionChangeId(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.id)
      })
      console.log(this.selectArrayId)
    },
    // 选择时间
    changeDate($event) {
      this.form.inspectTimeStart = $event[0]
      this.form.inspectTimeEnd = $event[1]
      this.form.inspectTime = $event.join('~')
    },
    // 查询
    saveForm() {
      var method = 'put'; var url = 'examination/update'
      addExamination(this.inspectManifestForm, url, method).then(res => {
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
    // 经营检查结果

    getList(obj) {
      this.tableData = []
      getExaminationList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.page.list
          this.totalCount = res.page.totalCount
        }
      })
    },
    // 重置
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.getList(this.form)
    },
    getBenefitList(id) {
      getBenefitInfo(id).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '受益人穿透成功',
            type: 'success'
          })
          this.resetData()
        }
      }).catch(error => {
        this.$message({
          message: error,
          type: 'warning'
        })
      })
    },
    handleEdit(ids, type) {
      getExaminationDetails(ids).then(res => {
        this.inspectManifestForm = res.examinationInfo
        var benefit = JSON.parse(res.examinationInfo.benefitResult)
        this.tableDetails = benefit ? benefit.result.benefitList : []
        type ? this.dialogTableVisible = true : this.showDialogDetails = true
      })
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteExamination(ids).then(res => {
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
.remark{
  height: 50px;
  line-height: 50px;
  border: 1px solid #EBEEF5;
  border-top: unset;
  div{
    font-size: 15px;
    display: inline-block;
  }
  .remark-th{
    width: 100px;
    border-right: 1px solid #EBEEF5;
  }
}
.vigilant{
  color: red;
}
.check-fail{
  color: #f56c6c;
  text-decoration: underline;
}
.check-succes{
  color: #67c23a;

}
.not-allowed{
  cursor: not-allowed;
}
.abnormal{
    width: 100%;
    height: 1px;
    color: #f56c6c;
    padding-top: 10px;
    margin-bottom: 24px;
    border-top: 1px solid;
}
.benefit{
  border-bottom: 1px solid gainsboro;
h4{
    margin: 6px 0px;
    font-size: 15px;
    color: #000;
}
}
</style>
