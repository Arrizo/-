<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="账号：">
          <el-input v-model="form.accountNumber" />
        </el-form-item>
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
          <el-select v-model="form.registeredCurrencyType" placeholder="币种">
            <el-option v-for="item in currencyTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
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
            <el-button v-permission="'account:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button type="primary" @click="resetData()">重置</el-button>
            <!-- <el-button type="primary" @click="resetData()">导入</el-button> -->
            <el-button v-permission="'account:download_demo'" type="primary" @click="downloadExcel()">模板</el-button>
            <el-upload style="display: inline-block;" :action="uploadUrl" :headers="{ token:token}" accept="file">
              <el-button v-permission="'account:import_excel'" size="small" type="primary">导入</el-button>
            </el-upload>
            <el-button v-permission="'account:export_excel'" type="primary" @click="export_excel()">导出</el-button>
            <el-button type="primary" @click="resetData()">e路通</el-button>
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
          label="统一社会信用代码"
        />
        <el-table-column
          prop="registeredCurrencyType"
          label="注册币种"
          :formatter="getCurrencyType"
        />
        <el-table-column
          prop="registeredCapital"
          label="注册资本"
        />
        <el-table-column
          prop="legalPersonName"
          label="法定代表人/单位负责人姓名"
        />
        <el-table-column
          prop="accoutType"
          label="账户性质"
          :formatter="accountStyleFormat"
        />
        <el-table-column
          prop="establishmentDate"
          label="成立日期"
        />
        <el-table-column
          prop="addressCode"
          label="地区代码"
        />
        <el-table-column
          prop="operationType"
          label="操作类型"
          :formatter="operationTypeFormat"
        />
        <el-table-column
          prop="bankSubmitStatus"
          label="人行上报状态"
        >
          <template slot-scope="scope">
            {{ scope.row.bankSubmitStatus===0 ? '未上报':'已上报' }}
          </template>
        </el-table-column>
        <el-table-column
          v-slot="scope"
          prop="status"
          label="监测状态"
        >
          {{ scope.row.status===1?'正常':scope.row.status===2?'冻结':'忽略' }}
        </el-table-column>
        <el-table-column
          prop="creditSubmitStatus"
          label="征信上报状态"
        >
          <template slot-scope="scope">
            {{ scope.row.creditSubmitStatus===0 ? '未上报':'已上报' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
        />
        <el-table-column
          prop="branchNo"
          label="操作机构号"
        />
        <el-table-column
          prop="sourceFlag"
          label="来源"
        />
        <el-table-column
          prop="establishmentDate"
          label="更新时间"
        />

        <el-table-column label="操作" fixed="right" width="345">
          <template slot-scope="scope">
            <el-button
              v-permission="'account:update'"
              size="mini"
              @click="handleEdit( scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="peopleReport( scope.row.id)"
            >人行上报</el-button>
            <el-button
              size="mini"
              @click="creditReport( scope.row.id)"
            >征信上报</el-button>
            <el-button
              size="mini"
              @click="monitor( scope.row.id,scope.row.status)"
            >监测编辑</el-button>
            <el-button
              v-permission="'account:delete'"
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
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible" width="900px">
      <el-form :inline="true" size="small">
        <el-form-item label="账号">
          <el-input v-model="CorporateAccountForm.accountNumber " />
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="CorporateAccountForm.enterpriseName " />
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input v-model="CorporateAccountForm.creditCode" />
        </el-form-item>
        <el-form-item label="注册资本">
          <el-input v-model="CorporateAccountForm.registeredCapital" />
        </el-form-item>
        <el-form-item label="注册币种">
          <el-select v-model="CorporateAccountForm.registeredCurrencyType" placeholder="币种">
            <el-option v-for="item in currencyTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="企业电话">
          <el-input v-model="CorporateAccountForm.enterpriseTel" />
        </el-form-item>
        <el-form-item label="企业成立日期">
          <el-date-picker v-model="CorporateAccountForm.establishmentDate" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="营业期限开始时间">
          <el-date-picker v-model="CorporateAccountForm.businessStartDate" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="营业期限结束时间">
          <el-date-picker v-model="CorporateAccountForm.businessEndDate" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="核准日期">
          <el-date-picker v-model="CorporateAccountForm.approvalDate" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="CorporateAccountForm.registeredAddress" />
        </el-form-item>
        <el-form-item label="法定代表人/单位负责人姓名">
          <el-input v-model="CorporateAccountForm.legalPersonName" />
        </el-form-item>
        <el-form-item label="存款人类别">
          <el-select v-model="CorporateAccountForm.depositPeopleType" placeholder="存款人类别">
            <el-option v-for="item in depositPeopleTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="行业分类">
          <el-select v-model="CorporateAccountForm.tradeType" placeholder="行业分类">
            <el-option v-for="item in tradeTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="CorporateAccountForm.operationScope" />
        </el-form-item>
        <el-form-item label="地区代码">
          <el-input v-model="CorporateAccountForm.addressCode" />
        </el-form-item>
        <el-form-item label="法定代表人/单位负责人证件号码">
          <el-input v-model="CorporateAccountForm.legalPersonCardNo" />
        </el-form-item>
        <el-form-item label="法定代表人/单位负责人证件类型">
          <el-select v-model="CorporateAccountForm.legalPersonCardType" placeholder="证件类型">
            <el-option v-for="item in cardTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="法定代表人/单位负责人联系方式">
          <el-input v-model="CorporateAccountForm.legalPersonTel" />
        </el-form-item>
        <el-form-item label="账户性质">
          <el-select v-model="CorporateAccountForm.accoutType" placeholder="证件类型">
            <el-option v-for="item in accountTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="上级法人或单位名称">
          <el-input v-model="CorporateAccountForm.superCorporationUnitName" />
        </el-form-item>
        <el-form-item label="上级机构组织机构代码">
          <el-input v-model="CorporateAccountForm.superOrganizationCode" />
        </el-form-item>
        <el-form-item label="上级机构基本存款账户编号">
          <el-input v-model="CorporateAccountForm.superLicenseNumber" />
        </el-form-item>
        <el-form-item label="法人或单位负责人">
          <el-input v-model="CorporateAccountForm.superLegalOrContactPerson" />
        </el-form-item>
        <el-form-item label="上级法人或单位负责人证件类型">
          <el-select v-model="CorporateAccountForm.superCardType" placeholder="证件类型">
            <el-option v-for="item in cardTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="上级法人或单位负责人证件号">
          <el-input v-model="CorporateAccountForm.superCardNumber" />
        </el-form-item>
        <el-form-item label="开户许可证号">
          <el-input v-model="CorporateAccountForm.licenseNumber" />
        </el-form-item>
        <el-form-item label="临时账户到期日">
          <el-date-picker v-model="CorporateAccountForm.tempAccTermDate" />
        </el-form-item>
        <el-form-item label="专用账户资金性质">
          <el-select v-model="CorporateAccountForm.specialFundProperty" placeholder="专用账户资金性质">
            <el-option v-for="item in specialFundPropertys" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="CorporateAccountForm.postCode" />
        </el-form-item>
        <el-form-item label="企业类型">
          <el-select v-model="CorporateAccountForm.enterpriseType" placeholder="企业类型">
            <el-option v-for="item in enterpriseTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-input v-model="CorporateAccountForm.sourceFlag" />
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="CorporateAccountForm.operationType" placeholder="操作类型">
            <el-option v-for="item in operationTypes" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作员">
          <el-input v-model="CorporateAccountForm.operator" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="CorporateAccountForm.remark" />
        </el-form-item>
        <el-form-item label="虚拟存款账户编号">
          <el-input v-model="CorporateAccountForm.virtualLicenseNo" />
        </el-form-item>
        <el-form-item label="网点机构号">
          <el-input v-model="CorporateAccountForm.branchNo" />
        </el-form-item>
        <el-form-item label="网点名称">
          <el-input v-model="CorporateAccountForm.branchName" />
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>

    </el-dialog>
    <el-dialog title="监测修改" :visible.sync="visibleMonitor" width="300px">
      <el-select v-model="monitorObj.status">
        <el-option v-for="item in MonitorItem" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
      <div slot="footer">
        <el-button @click="visibleMonitor=false">取消</el-button>
        <el-button type="primary" @click="editorMonitor">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="征信上报"
      :visible.sync="dialogSumCreditVisible"
      width="600px"
      class="dialog"
      data-v-f3f1212229
    >
      <el-form class="dialog">
        <el-form-item label="开户许可核准号">
          <el-input v-model="licenseNumber" placeholder="请输入开户许可核准号" style="width: 424px" />
        </el-form-item>
        <el-form-item label="地址" style="margin-left: 45px;">
          <el-cascader v-model="creditAddress" expand-trigger="hover" :options="regionDatas" style="width: 449px" @change="getCreditArea" />
        </el-form-item>
        <el-form-item label="详细地址" style="margin-left: 17px;">
          <el-input v-model="detAddress" placeholder="请输入详细地址" style="width: 449px" />
        </el-form-item>
        <el-form-item label="存款人类别">
          <el-select v-model="depositPeopleType" @change="getMoneyerSubType">
            <el-option v-for="item in depositPeopleTypeItems" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
          <el-select v-model="moneyerSubType">
            <el-option v-for="item in moneyerSubTypeItems" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSumCreditVisible = false">返 回</el-button>
        <el-button type="primary" @click="submitCredit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { regionData } from 'element-china-area-data'
import dataJson from '@/json/account.json'
import { getAccountManageList, addAccountManage, getAccountManageDetails, deleteAccountManage, amsReport, eccsReport, exportExcel, excelImport, downloadExcel, updateMonitor } from '@/api/accountManage/index'
export default {
  name: 'Dashboard',
  data() {
    return {
      MonitorItem: [{ label: '正常', value: 1 }, { label: '冻结', value: 2 }, { label: '忽略', value: 3 }],
      monitorObj: { status: '' },
      visibleMonitor: false,
      totalCount: 0,
      contentTitle: '',
      form: {
        page: 1,
        accountNumber: '',
        enterpriseName: '',
        creditCode: '',
        legalPersonName: '',
        registeredCurrencyType: '',
        establishmentDate: ''

      },
      CorporateAccountForm: {
        accountNumber: '',
        enterpriseName: '',
        creditCode: '',
        registeredCapital: '',
        registeredCurrencyType: '',
        enterpriseTel: '',
        establishmentDate: '',
        businessStartDate: '',
        businessEndDate: '',
        approvalDate: '',
        registeredAddress: '',
        legalPersonName: '',
        depositPeopleType: '',
        tradeType: '',
        operationScope: '',
        addressCode: '',
        legalPersonCardNo: '',
        legalPersonCardType: '',
        legalPersonTel: '',
        accoutType: '',
        superCorporationUnitName: '',
        superOrganizationCode: '',
        superLicenseNumber: '',
        superLegalOrContactPerson: '',
        superCardType: '',
        superCardNumber: '',
        licenseNumber: '',
        tempAccTermDate: '',
        specialFundProperty: '',
        postCode: '',
        enterpriseType: '',
        sourceFlag: '',
        operationType: '',
        operator: '',
        remark: '',
        virtualLicenseNo: '',
        branchNo: '',
        branchName: ''
      },
      paramsObj: {
        page: 1
      },
      tableData: [],
      dialogTableVisible: false,
      selectArrayId: [],
      depositPeopleTypeItems: [
        { label: '请选择', value: '' },
        { label: '企业', value: '1' },
        { label: '事业单位', value: '2' },
        { label: '机关', value: '3' },
        { label: '社会团体', value: '4' },
        { label: '个体工商户', value: '7' },
        { label: '其他', value: '9' }
      ],
      dialogSumCreditVisible: false,
      licenseNumber: '',
      creditAddress: '',
      detAddress: '',
      depositPeopleType: '',
      moneyerSubType: '',
      tradeId: '',
      moneyerSubTypeItems: [],
      regionDatas: regionData || [],
      uploadUrl: '',
      currencyTypes: dataJson.currencyType,
      depositPeopleTypes: dataJson.depositPeopleType,
      enterpriseTypes: dataJson.enterpriseType,
      specialFundPropertys: dataJson.specialFundProperty,
      cardTypes: dataJson.cardType,
      accountTypes: dataJson.accountType,
      tradeTypes: dataJson.tradeType,
      operationTypes: dataJson.operationType
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('account/account/import_excel')
    this.getList(this.paramsObj)
  },
  methods: {
    editorMonitor() {
      updateMonitor(this.monitorObj).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.paramsObj.page = 1
          this.getList(this.paramsObj)
          this.visibleMonitor = false
        }
      })
    },
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
    addInspectForm() {
      Object.assign(this.$data.CorporateAccountForm, this.$options.data().CorporateAccountForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    // 查询
    saveForm() {
      var method = ''; var url = ''
      if (this.contentTitle === '编辑') {
        method = 'put'
        url = 'account/account/update'
      }
      addAccountManage(this.CorporateAccountForm, url, method).then(res => {
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

    getList(obj) {
      getAccountManageList(obj).then(res => {
        if (res.code === 0) {
          console.log(res)
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

    handleEdit(ids) {
      console.log(ids)
      getAccountManageDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.CorporateAccountForm = res.corporateAccount
        this.dialogTableVisible = true
      })
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAccountManage(ids).then(res => {
          if (res.code === 0) {
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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

    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    peopleReport(id) {
      amsReport(id).then(r => {
        if (r.code === 0) {
          this.$message.success(r.msg)
        } else {
          this.$message.error(r.data.message)
        }
      })
    },
    monitor(id, status) {
      this.monitorObj.status = status
      this.monitorObj.id = id
      this.visibleMonitor = true
    },
    creditReport(id) {
      this.dialogSumCreditVisible = true
      this.tradeId = id
    },
    getMoneyerSubType(val) {
      console.log(val)
      if (val === '1') {
        this.moneyerSubTypeItems = [
          { label: '请选择', value: '' },
          { label: '企业法人', value: '10' },
          { label: '个人独资、合伙企业', value: '13' },
          { label: '企业的分支机构', value: '14' },
          { label: '其他企业', value: '11' },
          { label: '农民专业合作社', value: '12' }
        ]
      } else if (val === '2') {
        this.moneyerSubTypeItems = [
          { label: '请选择', value: '' },
          { label: '事业法人', value: '20' },
          { label: '未登记的事业单位', value: '21' },
          { label: '事业单位的分支机构', value: '24' }
        ]
      } else if (val === '3') {
        this.moneyerSubTypeItems = [
          { label: '请选择', value: '' },
          { label: '机关法人', value: '30' },
          { label: '机关的内设机构', value: '31' },
          { label: '机关的下设机构', value: '32' }
        ]
      } else if (val === '4') {
        this.moneyerSubTypeItems = [
          { label: '请选择', value: '' },
          { label: '社会团体法人', value: '40' },
          { label: '社会团体分支机构', value: '41' }
        ]
      } else if (val === '7') {
        this.moneyerSubTypeItems = [{ text: '请选择', value: '' },
          { label: '个体工商户', value: '70' }]
      } else if (val === '9') {
        this.moneyerSubTypeItems = [
          { label: '请选择', value: '' },
          { label: '民办非企业', value: '51' },
          { label: '基金会', value: '52' },
          { label: '居委会', value: '53' },
          { label: '村委会', value: '54' },
          { label: '律师事务所、司法鉴定所', value: '60' },
          { label: '宗教活动场所', value: '61' },
          { label: '境外在境内成立的组织机构', value: '62' },
          { label: '其他', value: '99' }
        ]
      } else {
        this.moneyerSubTypeItems = []
      }
    },
    getCreditArea(val) {
      this.creditArea = val[2]
    },
    submitCredit() {
      console.log(this.licenseNumber)
      console.log(this.creditArea)
      console.log(this.detAddress)
      console.log(this.depositPeopleType)
      console.log(this.moneyerSubType)
      eccsReport(this.licenseNumber, this.tradeId, this.creditArea, this.detAddress, this.moneyerSubType, 2).then(r => {
        if (r.code === 0) {
          if (r.data.flag === false) {
            this.$message.error(r.data.message)
          } else {
            this.$message.success(r.msg)
            this.dialogSumCreditVisible = false
            this.getDataList()
          }
        } else {
          this.$message.error(r.data.message)
        }
      })
    },
    export_excel() {
      exportExcel('account/account/export_excel?', this.form)
    },
    downloadExcel() {
      downloadExcel('account/account/download_demo')
    },
    getCurrencyType(row, column) {
      if (row.registeredCurrencyType === '1') {
        return '人民币'
      } else if (row.registeredCurrencyType === '2') {
        return '美元'
      } else if (row.registeredCurrencyType === '3') {
        return '港币'
      } else if (row.registeredCurrencyType === '4') {
        return '日元'
      } else if (row.registeredCurrencyType === '5') {
        return '欧元'
      } else if (row.registeredCurrencyType === 'A') {
        return '英镑'
      } else if (row.registeredCurrencyType === 'B') {
        return '加拿大元'
      } else if (row.registeredCurrencyType === 'C') {
        return '澳大利元'
      } else if (row.registeredCurrencyType === 'D') {
        return '韩元'
      } else if (row.registeredCurrencyType === 'E') {
        return '新加坡元'
      } else if (row.registeredCurrencyType === 'F') {
        return '其他货币折美元'
      }
    },
    accountStyleFormat(row, column) {
      if (row.accoutType === 1) {
        return '基本结算账户'
      } else if (row.accoutType === 2) {
        return '本省一般户'
      } else if (row.accoutType === 3) {
        return '异地一般户'
      } else if (row.accoutType === 4) {
        return '本省非预算专用户'
      } else if (row.accoutType === 5) {
        return '异地非预算专用户'
      } else if (row.accoutType === 6) {
        return '注册验资账户'
      } else if (row.accoutType === 7) {
        return '临时机构临时账户'
      } else if (row.accoutType === 8) {
        return '非临时机构临时账户'
      } else if (row.accoutType === 9) {
        return '预算单位专用户'
      } else if (row.accoutType === 10) {
        return '特殊单位专用户'
      }
    },
    operationTypeFormat(row, column) {
      if (row.operationType === 1) {
        return '开户'
      } else if (row.operationType === 2) {
        return '变更'
      } else if (row.operationType === 3) {
        return '销户'
      }
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
</style>
