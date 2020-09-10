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
          label="企业年报"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit( scope.row)"
            >查看</el-button>
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
    <el-dialog title="企业年报" :visible.sync="showAnnualReport" width="1000px">

      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />基本信息
          </template>
          <el-form :inline="true" size="mini">
            <el-col :span="12">
              <el-form-item label="统一社会信用代码/注册号：">
                <span>{{ reportData.creditCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业名称：">
                <span>{{ reportData.enterpriseName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业通信地址：">
                <span>{{ reportData.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码：">
                <span>{{ reportData.zipCode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业联系电话：">
                <span>{{ reportData.telephone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业电子邮箱：">
                <span>{{ reportData.email }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="从业人数：">
                <span>{{ reportData.colleguesNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业经营状态：">
                <span>{{ reportData.status }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有投资信息或购买其他公司股权：">
                <span>{{ reportData.ifInvest }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有网站或网店： ">
                <span>{{ reportData.ifWebsite }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否有对外提供担保信息：">
                <span>{{ reportData.ifExternalGuarantee }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有限责任公司本年度是否发生股东股权转让：">
                <span>{{ reportData.ifEquity }}</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="企业主营业务活动:" class="active">
                <el-input v-model="reportData.status" type="textarea" autosize /></el-form-item>
            </el-col> -->

          </el-form>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />网站或网店信息
          </template>
          <div v-if="reportData.websites.length>0">
            <el-card v-for="(item,index) in reportData.websites" :key="index+11" class="card-box box-25">
              <div>{{ item.webName }}</div>
              <div>类型: {{ item.webType }}</div>
              <div>网址：{{ item.webUrl }}</div>
            </el-card>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />股东及出资信息
          </template>
          <el-table
            :data="reportData.partners"
            tooltip-effect="dark"
            size="mini"
            border
            height="400"
          >
            <el-table-column
              type="index"
              label="序号"
            />
            <el-table-column
              prop="stockName"
              label="股东"
            />
            <el-table-column
              prop="shouldCapi"
              label="认缴出资额（万元）"
            >
              <template slot-scope="scope"><span v-if="scope.row.investShouldCapiList.length>0"> {{ scope.row.investShouldCapiList[0].shouldCapi }}</span></template>
            </el-table-column>
            <el-table-column
              prop="shouldCapiDate"
              label="认缴出资时间"
            >
              <template slot-scope="scope"><span v-if="scope.row.investShouldCapiList.length>0"> {{ scope.row.investShouldCapiList[0].shouldCapiDate }}</span></template>
            </el-table-column>
            <el-table-column
              prop="shouldInvestType"
              label="认缴出资方式"
            >
              <template slot-scope="scope"><span v-if="scope.row.investShouldCapiList.length>0"> {{ scope.row.investShouldCapiList[0].shouldInvestType }}</span></template>
            </el-table-column>
            <el-table-column
              prop="realCapi"
              label="实缴出资额（万元）	"
            >
              <template slot-scope="scope"><span v-if="scope.row.investRealCapiList.length>0"> {{ scope.row.investRealCapiList[0].realCapi }}</span></template>
            </el-table-column>
            <el-table-column
              prop="realCapiDate"
              label="实缴出资时间	"
            >
              <template slot-scope="scope"><span v-if="scope.row.investRealCapiList.length>0"> {{ scope.row.investRealCapiList[0].realCapiDate }}</span></template>
            </el-table-column>
            <el-table-column
              prop="realInvestType"
              label="实缴出资方式"
            >
              <template slot-scope="scope"><span v-if="scope.row.investRealCapiList.length>0"> {{ scope.row.investRealCapiList[0].realInvestType }}</span></template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="1"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="reportData.partners.length"
          />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />对外投资信息
          </template>
          <div v-if="reportData.invest.length>0">
            <el-card v-for="(item,index) in reportData.invest" :key="index+'1'" class="card-box box-33">
              <div>{{ item.investName }}</div>
              <div>统一社会信用代码/注册号:{{ item.investRegNo }}</div>
            </el-card>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />企业资产状况信息
          </template>
          <el-row :gutter="10">
            <el-col :span="12" class="report">
              <el-row>
                <el-col :span="12">资产总额</el-col>
                <el-col :span="12">{{ reportData.totalEquity }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">营业总收入</el-col>
                <el-col :span="12">{{ reportData.saleIncome }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">营业总收入中主营业务收入	</el-col>
                <el-col :span="12">{{ reportData.servFareIncome }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">纳税总额</el-col>
                <el-col :span="12">{{ reportData.taxTotal }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12" class="report">
              <el-row>
                <el-col :span="12">所有者权益合计</el-col>
                <el-col :span="12">{{ reportData.profitReta }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">利润总额</el-col>
                <el-col :span="12">{{ reportData.profitTotal }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">净利润</el-col>
                <el-col :span="12">{{ reportData.netAmount }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12">负债总额</el-col>
                <el-col :span="12">{{ reportData.debitAmount }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />对外提供保证担保信息
          </template>
          <el-table
            :data="reportData.guarantee"
            tooltip-effect="dark"
            size="mini"
            border
            height="400"
          >
            <el-table-column
              type="index"
              label="序号"
            />
            <el-table-column
              prop="creditor"
              label="债权人"
            />
            <el-table-column
              prop="debitor"
              label="债务人"
            />
            <el-table-column
              prop="debitType"
              label="主债权种类"
            />
            <el-table-column
              prop="debitAmount"
              label="主债权数额"
            />
            <el-table-column
              prop="debitPeriod"
              label="履行债务的期限"
            />
            <el-table-column
              prop="guarantPeriod"
              label="保证的期间"
            />
            <el-table-column
              prop="guarantMethod"
              label="保证的方式"
            />
          </el-table>
          <el-pagination
            :current-page="1"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="reportData.guarantee.length"
          />
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon-style" />股权变更信息
          </template>
          <el-table
            :data="reportData.stockChanges"
            tooltip-effect="dark"
            size="mini"
            border
            height="400"
          >
            <el-table-column
              type="index"
              label="序号"
            />
            <el-table-column
              prop="name"
              label="股东"
            />
            <el-table-column
              prop="beforePercent"
              label="变更前股权比例"
            />
            <el-table-column
              prop="afterPercent"
              label="变更后股权比例"
            />
            <el-table-column
              prop="changeDate"
              label="股权变更日期"
            />

          </el-table>
          <el-pagination
            :current-page="1"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="reportData.stockChanges.length"
          />
        </el-collapse-item>
      </el-collapse>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExaminationList, addExamination, getEnterpriseReport } from '@/api/examination/examination-accout'
export default {
  name: 'Dashboard',
  data() {
    return {
      reportData: {
        websites: [],
        invest: [],
        partners: [],
        guarantee: [],
        stockChanges: []
      },
      showAnnualReport: false,
      totalCount: 0,
      form: {
        page: 1,
        enterpriseName: '',
        creditCode: '',
        legalPersonName: '',
        registeredCurrencyType: '',
        establishmentDate: ''

      },
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
    // 获取id

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

    handleEdit(row) {
      getEnterpriseReport(row).then(res => {
        if (res.code === 0) {
          this.showAnnualReport = true
          this.reportData = res.result[0]
        } else {
          this.$alert(res.msg)
        }
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
.benefit{
  border-bottom: 1px solid gainsboro;
h4{
    margin: 6px 0px;
    font-size: 15px;
    color: #000;
}
}
.header-icon-style{
      width: 7px;
    margin-right: 5px;
    background: #804000;
    display: inline-block;
    height: 14px;
}
/deep/.active{
  width: 100%;
  .el-form-item__content{
    width: 80%;
  }
}
.report {
  .el-col{
    box-sizing: border-box;
    padding: 8px 10px;
    border: 1px solid #efefef;
  }
  .el-col:nth-child(odd){
    background-color: #eae3d8;
    color: #997528;
    text-align: right;
    font-weight: bold;
  }
  .el-col:nth-child(even){
      color: #666;

      background-color: #f9f9f9;
  }
}
.card-box{
  display: inline-block;
   background:#f6f9f9
}
.box-33{
  width: 33%
}
.box-25{
  width: 25%;
}
// .report-item{
//       border: 1px solid #efefef;
//     background-color: #eae3d8;
//     color: #997528;
//     padding: 8px 10px;
//     box-sizing: border-box;
// }
// .report-value{
//       box-sizing: border-box;
//      padding: 8px 10px;
// }
</style>
