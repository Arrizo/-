<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="开户网点：">
          <el-input v-model="form.branchName" @click.native="showTree=true;currentName='form'" />
        </el-form-item>
        <el-form-item label="机构编号：">
          <el-input v-model="form.branchNo" />
        </el-form-item>
        <el-form-item label="账户：">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="企业类型：">
          <el-select v-model="form.entType" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="企业" />
            <el-option value="20" label="非企业" />
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="form.enterpriseName" />
        </el-form-item>
        <el-form-item label="年检状态：">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="未年检" />
            <el-option value="15" label="年检中" />
            <el-option value="20" label="不通过" />
            <el-option value="30" label="通过" />
            <el-option value="40" label="已整改" />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'inspect:batch_inspect'" type="primary" @click="showInspectAll=true">批量年检</el-button>
            <!--<el-button v-permission="'inspect:save'" type="primary" @click="addInspectForm()">新增</el-button>-->
            <el-button type="primary" @click="getList(form)">查询</el-button>

            <el-button v-permission="'inspect:import_demo'" type="primary" @click="download_excel()">模板</el-button>
            <el-button v-permission="'inspect:export'" type="primary" @click="export_excel()">导出</el-button>
            <el-upload
              style="display: inline-block;"
              :action="uploadUrl"
              :headers="{
                token: token
              }"
              accept="file"
            >
              <el-button v-permission="'inspect:excelImport'" size="small" type="primary">导入</el-button>
            </el-upload>
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
          v-if="false"
          label="ID"
          prop="id"
        />
        <el-table-column
          prop="branchName"
          label="开户网点"
        />
        <el-table-column
          prop="branchNo"
          label="机构编号"
        />
        <el-table-column
          prop="account"
          label="账户"
          width="120px"
        />
        <el-table-column
          label="企业类型"
        >
          <template slot-scope="scope">
            {{ entTypeZhi(scope.row.entType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="enterpriseName"
          label="企业名称"
          width="200px"
        />
        <el-table-column
          prop="status"
          label="年检状态"
          width="90px"
        >
          <template slot-scope="scope  ">
            <el-button
              size="mini"
              type="warning"
              @click="changeStatus(scope.row.id,scope.row.status,scope.row.remark)"
            >{{ changeContent(scope.row.status) }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="remark"
          label="年检备注"
          width="250px"
        />
        <el-table-column
          prop="inspectUserName"
          label="同步人行数据标识"
        />
        <el-table-column
          prop="inspectUserName"
          label="同步工商数据标识"
        />
        <el-table-column
          prop="inspectTime"
          label="年检日期"
          width="150px"
        />
        <el-table-column
          prop="inspectUserName"
          label="年检人员"
          width="120px"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'inspect:update'"
              size="mini"
              @click="handleEdit( scope.row.id)"
            >编辑</el-button>
            <el-button
              v-permission="'inspect:delete'"
              size="mini"
              type="danger"
              @click="handleDelete( scope.row.id)"
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
      <el-form :inline="true" size="small">
        <el-form-item label="开户网点">
          <el-input v-model="inspectManifestForm.branchName " @click.native="showTree=true;currentName='inspectManifestForm'" />
        </el-form-item>
        <el-form-item label="账户">
          <el-input v-model="inspectManifestForm.account" />
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="inspectManifestForm.enterpriseName" />
        </el-form-item>
        <el-form-item label="所属地市">
          <el-input v-model="inspectManifestForm.city" />
        </el-form-item>
        <el-form-item label="所属区县">
          <el-input v-model="inspectManifestForm.county" />
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      width="1000px"
      title="批量年检"
      :visible.sync="showInspectAll"
      center
      @close="closeBatchCheckDialog"
    >
      <!-- <span>是否进行批量年检?</span> -->
      <el-row>
        <el-col :lg="2">
          <span>比对标准：</span>
        </el-col>
        <el-col :lg="22">
          <el-radio-group v-model="compairForm.compariRule">
            <el-radio :label="10">核心与工商信息比对</el-radio>
            <el-radio :label="20">核心与人行信息比对</el-radio>
            <el-radio :label="30">人行信息与工商信息比对</el-radio>
            <el-radio :label="40">核心信息、工商信息和人行信息三者比对</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row v-for="(item,index) in compariPointList" :key="index">
        <el-col :lg="2">
          <span v-if="index==0">比对要素：</span>
          <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-col>
        <template v-if="!item.hide||compairForm.compariRule=='10'||compairForm.compariRule=='30'||compairForm.compariRule=='40'">
          <el-col :lg="4">
            <span>{{ item.name }}&nbsp;&nbsp;</span>
          </el-col>
          <el-col :lg="18">
            <el-radio-group v-model="compairForm[item.filed]">
              <template v-for="(child,index1) in item.childList">
                <el-radio :key="index1" :label="child.code">{{ child.name }}</el-radio>
                <!-- <el-radio :label="20">不限制</el-radio> -->
              </template>
            </el-radio-group>
            <!-- 经营范围选项为部分一致时显示 -->
            <el-row v-if="item.filed=='compariCompBusScope'&&compairForm.compariCompBusScope==2" style="margin-bottom:0">
              <el-col :span="12" style="margin-top:10px;">
                <!-- <el-slider v-if="item.filed=='compariCompBusScope'&&compairForm.compariCompBusScope==2" v-model="compairForm.compariCompBusScopePer" /> -->
                <el-input-number v-model="compairForm.compariCompBusScopePer" :min="0" :max="100" label="百分比" size="mini" />
                <span>%</span>
                <!-- <span style="color:red">注：此处按百分比来计算（%）</span> -->
              </el-col>
            </el-row>
            <!-- 住所选项为部分一致时显示 -->
            <el-row v-if="item.filed=='compariCompPlace'&&compairForm.compariCompPlace==2" style="margin-bottom:0">
              <el-col :span="12" style="margin-top:10px;">
                <!-- <el-slider v-if="item.filed=='compariCompBusScope'&&compairForm.compariCompBusScope==2" v-model="compairForm.compariCompBusScopePer" /> -->
                <el-input-number v-model="compairForm.compariCompPlacePer" :min="0" :max="100" label="百分比" size="mini" />
                <span>%</span>
                <!-- <span style="color:red">注：此处按百分比来计算（%）</span> -->
              </el-col>
            </el-row>
          </el-col>
        </template>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inspectSomeData">年检已勾选的数据</el-button>
        <el-button type="primary" @click="inspectAllData">年检全部数据</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="checkResult" :visible.sync="dialogNoPass" width="800px">
      <el-table
        :data="diffDataInfo"
        tooltip-effect="dark"
        size="small"
        border
      >
        <el-table-column property="compareName" label="" width="100">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.compareName }}</span></template>
        </el-table-column>
        <el-table-column property="BOCLast" label="中国银行核心数据">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.BOCLast }}</span></template>
        </el-table-column>
        <el-table-column property="ICLast" label="人民银行账管数据">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.ICLast }}</span></template>
        </el-table-column>
        <el-table-column property="peopleBankLast" label="工商企业数据">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.peopleBankLast }}</span></template>
        </el-table-column>
      </el-table>
      <div class="remark"><div class="remark-th">备注</div><div>{{ remarkContent }}</div></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogNoPass=false">确 定</el-button>
      </div>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInspectList, downloadExcel, exportExcel, batchInspect, batchInspectAll, getInspecMethodsDetails, getInspecMethodsdelte, getInspecInfoCompare, excelImport,getBranchTree } from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'
export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      checkResult: '',
      currentName: '',
      showTree: false,
      totalCount: 0,
      remarkContent: '',
      diffDataInfo: null,
      dialogNoPass: false,
      contentTitle: '',
      showInspectAll: false,
      compairForm: {
        compariCompBusScopePer: 0,
        compariCompPlacePer: 0
      }, // 比对元素对象
      compariRule: '', // 比对标准
      compariPointList: [// 比对要素数组
        { name: '公司名称', filed: 'compariCompName',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '企业登记状态', filed: 'compariCompStus',
          childList: [
            { code: '1', name: '正常' },
            { code: '2', name: '注销' },
            { code: '3', name: '不限制' }
          ]
        },
        { name: '统一社会信用代码', filed: 'compariCompCode',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '经营期限', filed: 'compariCompEndDate',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '成立日期', filed: 'compariCompBgnDate',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '注册资本', filed: 'compariCompRegMoney',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '法人或单位负责人名称', filed: 'compariCompPersonName',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '经营范围', filed: 'compariCompBusScope',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '部分一致' },
            { code: '3', name: '不限制' }
          ]
        },
        { name: '住所', filed: 'compariCompPlace',
          childList: [
            { code: '1', name: '一致' },
            { code: '2', name: '部分一致' },
            { code: '3', name: '不限制' }
          ]
        },
        { name: '是否违法失信企业', filed: 'compariCompIsDish', hide: true,
          childList: [
            { code: '1', name: '无违法失信' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '是否经营异常', filed: 'compariCompIsNomnal', hide: true,
          childList: [
            { code: '1', name: '无经营异常' },
            { code: '2', name: '不限制' }
          ]
        },
        { name: '年报公示情况', filed: 'compariCompReport', hide: true,
          childList: [
            { code: '1', name: '年报公示正常' },
            { code: '2', name: '不限制' }
          ]
        }
      ],
      form: {
        page: 1,
        branchName: '',
        branchNo: '',
        account: '',
        entType: '',
        enterpriseName: '',
        status: '',
        uploadFlag: '',
        limit: ''
      },
      inspectManifestForm: {
        account: '',
        branchId: '',
        branchName: '',
        city: '',
        county: '',
        enterpriseName: ''
      },
      paramsObj: {
        page: 1,
        limit: 10
      },
      time: '',
      tableData: [],
      dialogTableVisible: false,
      uploadUrl: '',
      selectArrayId: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'token'
    ])
  },
  created() {
    this.uploadUrl = excelImport('inspect/excel_import')
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
    inspectSomeData() {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        batchInspect(this.selectArrayId).then(res => {
          if (res.code === 0) {
            this.$alert(res.msg)
            this.paramsObj.page = 1
            this.getList(this.paramsObj)
          } else {
            this.$alert(res.msg)
          }
        })
      }
      this.showInspectAll = false
    },
    // 全部年检
    inspectAllData() {
      batchInspectAll(this.form).then(res => {
        if (res.code === 0) {
          this.paramsObj.page = 1
          this.showInspectAll = false
          this.getList(this.paramsObj)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    // 选择时间
    changeDate($event) {
      this.form.inspectTimeStart = $event[0]
      this.form.inspectTimeEnd = $event[1]
      this.form.inspectTime = $event.join('~')
    },
    addInspectForm() {
      Object.assign(this.$data.inspectManifestForm, this.$options.data().inspectManifestForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    // 查询
    saveForm() {
      getInspectList(this.inspectManifestForm, 'post').then(res => {
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
      getInspectList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    // 重置
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.time = ''
      this.getList(this.form)
    },
    // 年检状态
    changeContent(text) {
      var content = ''
      switch (text) {
        case 10:
          content = '未年检'
          break
        case 15:
          content = '年检中'
          break
        case 20:
          content = '不通过'
          break
        case 30:
          content = '通过'
          break
        case 40:
          content = '已整改'
          break
        default:
          break
      }
      return content
    },
    // 企业类型
    entTypeZhi(flg) {
      if (flg === 10) {
        return '企业'
      } else if (flg === 20) {
        return '非企业'
      }
    },

    transDate(list, idstr, pidstr) {
      var result = []; var temp = {}
      for (var i = 0; i < list.length; i++) {
        temp[list[i][idstr]] = list[i]// 将nodes数组转成对象类型
      }
      for (var j = 0; j < list.length; j++) {
        var tempVp = temp[list[j][pidstr]] // 获取每一个子对象的父对象
        if (tempVp) { // 判断父对象是否存在，如果不存在直接将对象放到第一层
          if (!tempVp['children']) tempVp['children'] = []// 如果父元素的nodes对象不存在，则创建数组
          tempVp['children'].push(list[j])// 将本对象压入父对象的nodes数组
        } else {
          result.push(list[j])// 将不存在父对象的对象直接放入一级目录
        }
      }
      return result
    },
    // 下载模板
    download_excel() {
      downloadExcel('inspect/download_excel')
    },
    export_excel() {
      exportExcel('inspect/export_excel?', this.form)
    },

    handleEdit(ids) {
      getInspecMethodsDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.inspectManifestForm = res.result
        this.dialogTableVisible = true
      })
    },
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getInspecMethodsdelte(ids).then(res => {
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
    handleTree(obj) {
      console.log(obj)
      this.showTree = false
      this[this.currentName].branchName = obj.name
    },
    changeStatus(id, status, remark) {
      getInspecInfoCompare(id).then(res => {
        if (res.code === 0) {
          if (status === 40) {
            this.checkResult = '已整改'
          } else {
            this.dialogNoPass = true
            this.remarkContent = remark
            this.checkResult = status === 20 ? '不通过' : '通过'
            this.diffDataInfo = res.result
          }
        }
      })
    },
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
    },
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    // 批量年检窗口关闭事件
    closeBatchCheckDialog() {
      console.log(this.compairForm)
      this.compairForm = {
        compariCompBusScopePer: 0,
        compariCompPlacePer: 0
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
.el-row{
  margin-bottom: 20px;
}
</style>
