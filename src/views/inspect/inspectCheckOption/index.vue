<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-card class="box-card">
        <el-form ref="form" :model="compairForm" label-width="380px">

          <el-form-item label="比对标准：">
            <el-radio-group v-model="compairForm.rule">
              <el-radio :label="10">核心与工商信息比对</el-radio>
              <el-radio :label="20">核心与人行信息比对</el-radio>
              <el-radio :label="30">人行信息与工商信息比对</el-radio>
              <el-radio :label="40">核心信息、工商信息和人行信息三者比对</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="比对要素：">
            <el-row v-for="(item,index) in compariPointList" :key="index">
              <template v-if="!item.hide||compairForm.rule=='10'||compairForm.rule=='30'||compairForm.rule=='40'">
                <el-col :lg="4">
                  <span>{{ item.name }}&nbsp;&nbsp;</span>
                </el-col>

                <el-col :lg="18">
                  <el-radio-group v-model="compairForm[item.filed]">
                    <template v-for="(child,index1) in item.childList">
                      <el-radio :key="index1" :label="child.code">{{ child.name }}</el-radio>
                    </template>
                  </el-radio-group>
                  <!-- 经营范围选项为部分一致时显示 -->
                  <el-row v-if="item.filed=='scopeFlag'&&compairForm.scopeFlag==20">
                    <el-col :span="12">
                      <el-input-number v-model="compairForm.scopeRate" :min="0" :max="1" label="百分比" size="mini" :step="0.1" placeholder="0~1" />
                      <span>(请输入0~1之间的数值)</span>
                    </el-col>
                  </el-row>
                  <!-- 住所选项为部分一致时显示 -->
                  <el-row v-if="item.filed=='addressFlag'&&compairForm.addressFlag==20">
                    <el-col :span="12">
                      <el-input-number v-model="compairForm.addressRate" :min="0" :max="100" label="百分比" size="mini" :step="0.1" placeholder="0~1" />
                      <span>(请输入0~1之间的数值)</span>
                    </el-col>
                  </el-row>

                  <!-- 年报公示情况为正常时显示 -->
                  <el-row v-if="item.filed=='yearReportFlag'&&compairForm.yearReportFlag==10">
                    <el-col :span="12">
                      <el-select v-model="compairForm.year" placeholder="请选择">
                        <el-option
                          v-for="year in yearList"
                          :key="year.value"
                          :label="year.label"
                          :value="year.value"
                        />
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
              </template>
            </el-row>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="margin-left:30%;" @click="save">保存</el-button>
          </el-form-item>

        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getInspectCheckOption, saveInspectCheckOption } from '@/api/inspect/inspect-check-option'
export default {
  name: 'Dashboard',
  components: {

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
      compairForm: {}, // 比对元素对象
      compariPointList: [// 比对要素数组
        { name: '公司名称', filed: 'enterpriseNameFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '企业登记状态', filed: 'enterpriseTypeFlag',
          childList: [
            { code: 10, name: '正常' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '统一社会信用代码', filed: 'creditCodeFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '经营期限', filed: 'termDateFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '成立日期', filed: 'bussinessStartDateFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '注册资本', filed: 'regCapFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '法人或单位负责人名称', filed: 'legalPersonNameFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '经营范围', filed: 'scopeFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 20, name: '部分一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '住所', filed: 'addressFlag',
          childList: [
            { code: 10, name: '一致' },
            { code: 20, name: '部分一致' },
            { code: 30, name: '不限制' }
          ]
        },
        { name: '是否违法失信企业', filed: 'illegalFlag', hide: true,
          childList: [
            { code: 10, name: '无违法失信' },
            { code: 20, name: '不限制' }
          ]
        },
        { name: '是否经营异常', filed: 'abnormalFlag', hide: true,
          childList: [
            { code: 10, name: '无经营异常' },
            { code: 20, name: '不限制' }
          ]
        },
        { name: '年报公示情况', filed: 'yearReportFlag', hide: true,
          childList: [
            { code: 10, name: '年报公示正常' },
            { code: 20, name: '不限制' }
          ]
        }
      ],
      yearList: [],
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
    const nowYear = new Date().getFullYear()
    for (let i = 0; i < 5; i++) {
      const yearObj = { value: nowYear - i + '', label: nowYear - i }
      this.yearList.push(yearObj)
    }
    this.queryCheckOption()
  },
  methods: {
    queryCheckOption() {
      getInspectCheckOption().then(res => {
        if (res.code === 0) {
          this.compairForm = res.result
        }
      })
    },
    // 批量年检窗口关闭事件
    closeBatchCheckDialog() {
      console.log(this.compairForm)
      this.compairForm = {}
    },
    save() {
      console.log('save', JSON.stringify(this.compairForm))
      saveInspectCheckOption(this.compairForm).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存失败!'
          })
        }
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
