<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="账户：">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item label="统一信用代码：">
          <el-input v-model="form.creditCode" />
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="form.enterpriseName" />
        </el-form-item>
        <el-form-item label="企业类型：">
          <el-select v-model="form.entType" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="企业" />
            <el-option value="20" label="非企业" />
          </el-select>
        </el-form-item>
        <el-form-item label="年检结果：">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="未年检" />
            <el-option value="15" label="年检中" />
            <el-option value="20" label="不通过" />
            <el-option value="30" label="通过" />
          </el-select>
        </el-form-item>
        <el-form-item label="年检类型：">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="网上年检通过" />
            <el-option value="20" label="柜台年检" />
            <el-option value="30" label="柜台已年检" />
            <el-option value="40" label="无需年检" />
          </el-select>
        </el-form-item>
        <el-form-item label="加注年检标识：">
          <el-select v-model="form.uploadFlag" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="未提交" />
            <el-option value="20" label="提交成功" />
            <el-option value="30" label="加注成功" />
            <el-option value="40" label="加注失败" />
          </el-select>
        </el-form-item>
        <el-form-item label="短信通知状态：">
          <el-select v-model="form.smsNotice" placeholder="请选择">
            <el-option value="" label="请选择" />
            <el-option value="10" label="无需发送短信" />
            <el-option value="20" label="已提交短信通知提醒" />
            <el-option value="30" label="短信通知成功" />
            <el-option value="40" label="短信通知失败" />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="getList(form)">查询</el-button>
            <el-button v-permission="'inspect:export'" type="primary" @click="export_excel()">导出</el-button>
            <el-button v-permission="'inspect:report_people_bank'" type="primary" @click="showReCheck=true">复核操作
            </el-button>
            <el-button v-permission="'inspect:report_people_bank'" type="primary" @click="showInspectAll=true">年检加注
            </el-button>
            <el-button v-permission="'inspect:report_people_bank'" type="primary" @click="showShort=true">发送短信通知
            </el-button>
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
          prop="account"
          label="账户"
        />
        <el-table-column
          prop="creditCode"
          label="统一信用代码"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enterpriseName"
          label="企业名称"
        />
        <el-table-column
          label="企业类型"
        >
          <template slot-scope="scope">
            {{ entTypeZhi(scope.row.entType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="年检结果"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="changeStatus(scope.row.id,scope.row.status,scope.row.remark)"
            >{{ changeContent(scope.row.status) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="年检类型"
        >
          <template slot-scope="scope">
            {{ typeZhi(scope.row.type) }}
          </template>
        </el-table-column>

        <el-table-column
          label="加注年检标识"
        >
          <template slot-scope="scope">
            {{ uploadFlag(scope.row.uploadFlag) }}
          </template>
        </el-table-column>

        <el-table-column
          label="短信通知状态"
        >
          <template slot-scope="scope">
            {{ smsNotice(scope.row.smsNotice) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit( scope.row.id,false)"
            >详情
            </el-button>
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
          <el-input
            v-model="inspectManifestForm.branchName "
            @click.native="showTree=true;currentName='inspectManifestForm'"
          />
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
      width="400px"
      title="年检加注"
      :visible.sync="showInspectAll"
      center
    >
      <span>是否进行批量年检加注？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inspectSomeData">年检加注已勾选数据</el-button>
        <el-button type="primary" @click="inspectAllData">年检加注全部数据</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="400px"
      title="发送短信通知"
      :visible.sync="showShort"
      center
      @close="reShortStus=''"
    >
      <span>是否进行批量发送短信通知？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inspectSomeData">短信通知已勾选数据</el-button>
        <el-button type="primary" @click="inspectAllData">短信通知全部数据</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="600px"
      title="年检复核"
      :visible.sync="showReCheck"
      center
      @close="reCheckStus=''"
    >

      <el-radio-group v-model="reCheckStus">
        <el-radio :label="10">网上年检通过</el-radio>
        <el-radio :label="20">柜台年检</el-radio>
        <!-- <el-radio :label="30">柜台已年检</el-radio>-->
        <el-radio :label="40">无需年检</el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inspectSomeData">复核已勾选的数据</el-button>
        <el-button type="primary" @click="dialogFormVisi">复核全部数据</el-button>
      </span>
    </el-dialog>

    <el-dialog title="通过" :visible.sync="dialogNoPass" width="800px">
      <el-table
        :data="diffDataInfo"
        tooltip-effect="dark"
        size="small"
        border
      >
        <el-table-column property="compareName" label="" width="100">
          <template slot-scope="scope"><span
            :class="{ 'vigilant':(scope.row.flag===1)}"
          >{{ scope.row.compareName }}</span></template>
        </el-table-column>
        <el-table-column property="BOCLast" label="中国银行核心数据">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.BOCLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="ICLast" label="人民银行账管数据">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===1)}">{{ scope.row.ICLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="peopleBankLast" label="工商企业数据">
          <template slot-scope="scope"><span
            :class="{ 'vigilant':(scope.row.flag===1)}"
          >{{ scope.row.peopleBankLast }}</span></template>
        </el-table-column>
      </el-table>
      <div class="remark">
        <div class="remark-th">备注</div>
        <div>{{ remarkContent }}</div>
      </div>
    </el-dialog>

    <!-- 复合全部数据验证 -->
    <el-dialog title="验证" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form" label-width="85px">
        <el-form-item label="账户">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPersonOnDialog(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="已整改" :visible.sync="dialogEdite" width="1000px">
      <div class="remark bor-top">
        <div class="remark-th" />
        <div class="remark-th">中国银行核心数据</div>
        <div class="remark-th">人民银行账管数据</div>
        <div class="remark-th">工商企业数据</div>
        <div>{{ remarkContent }}</div>
      </div>
      <el-table
        :data="diffDataInfo"
        tooltip-effect="dark"
        size="small"
        border
      >
        <el-table-column property="compareName" label="" width="100">
          <template slot-scope="scope"><span
            :class="{ 'vigilant':(scope.row.flag===0)}"
          >{{ scope.row.compareName }}</span></template>
        </el-table-column>
        <el-table-column property="BOCLast" label="整改后">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===0)}">{{ scope.row.BOCLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="BOCFirst" label="整改前">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===0)}">{{ scope.row.BOCLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="peopleBankLast" label="整改后">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===0)}">{{ scope.row.ICLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="peopleBankFirst" label="整改前">
          <template slot-scope="scope"><span :class="{ 'vigilant':(scope.row.flag===0)}">{{ scope.row.ICLast }}</span>
          </template>
        </el-table-column>
        <el-table-column property="ICLast" label="整改后">
          <template slot-scope="scope"><span
            :class="{ 'vigilant':(scope.row.flag===0)}"
          >{{ scope.row.peopleBankLast }}</span></template>
        </el-table-column>
        <el-table-column property="ICFirst" label="整改前">
          <template slot-scope="scope"><span
            :class="{ 'vigilant':(scope.row.flag===0)}"
          >{{ scope.row.peopleBankLast }}</span></template>
        </el-table-column>
      </el-table>
      <div class="remark">
        <div class="remark-th">备注</div>
        <div>{{ remarkContent }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rectification()">通过</el-button>
        <el-button type="primary" @click="dialogEdite=false">不通过</el-button>
      </div>
    </el-dialog>
    <brach-tree v-model="showTree" @getBrachName="handleTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getInspectList,
  exportExcel,
  reportRpeopleBank,
  reportRpeopleBankAll,
  getInspecMethodsDetails,
  getInspecMethodsdelte,
  getInspecInfoCompare,
  changeStatusInfo
} from '@/api/inspect/inspect-list'
import BrachTree from '@/views/components/BrachTree'

export default {
  name: 'Dashboard',
  components: {
    BrachTree
  },
  data() {
    return {
      dialogEdite: false,
      currentName: '',
      showTree: false,
      totalCount: 0,
      remarkContent: '',
      diffDataInfo: null,
      dialogNoPass: false,
      contentTitle: '',
      showInspectAll: false,
      statusId: '',
      dialogFormVisible: false, // 复合全部数据
      showReCheck: false, // 年检复核
      reCheckStus: '', // 复核状态
      showShort: false, // 短信通知
      reShortStus: '', // 短信通知状态
      form: {
        page: 1,
        conType: 'history',
        type: '',
        account: '',
        creditCode: '',
        enterpriseName: '',
        entType: '',
        status: '',
        uploadFlag: '',
        smsNotice: '',
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
        conType: 'history'
      },
      time: '',
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
    inspectSomeData() {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        if (this.reCheckStus === '') {
          this.$alert('请勾选一个！')
          return
        }
        console.log(this.selectArrayId)
        reportRpeopleBank(this.selectArrayId).then(res => {
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
    // 复核年检全选数据
    dialogFormVisi() {
      if (this.reCheckStus === '') {
        this.$alert('请勾选一个！')
        return
      }
      const selectId = []
      this.tableData.forEach(item => {
        selectId.push(item.id)
      })
      this.dialogFormVisible = true
    },
    // 全部年检
    inspectAllData() {
      reportRpeopleBankAll(this.form).then(res => {
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
    // 查询
    saveForm() {
      getInspectList(this.inspectManifestForm).then(res => {
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
        default:
          break
      }
      return content
    },
    // 企业类型
    entTypeZhi(flg) {
      if (flg === '10') {
        return '企业'
      } else if (flg === '20') {
        return '非企业'
      }
    },
    // 年检类型
    typeZhi(flg) {
      if (flg === 10) {
        return '网上年检通过'
      } else if (flg === 20) {
        return '柜台年检'
      } else if (flg === 30) {
        return '柜台已年检'
      } else if (flg === 40) {
        return '无需年检'
      }
    },
    // 加注年检标识
    uploadFlag(flg) {
      if (flg === 10) {
        return '未提交'
      } else if (flg === 20) {
        return '提交成功'
      } else if (flg === 30) {
        return '加注成功'
      } else if (flg === 40) {
        return '加注失败'
      }
    },
    // 短信通知状态
    smsNotice(flg) {
      if (flg === 10) {
        return '无需发送短信'
      } else if (flg === 20) {
        return '已提交短信通知提醒'
      } else if (flg === 30) {
        return '短信通知成功'
      } else if (flg === 40) {
        return '短信通知失败'
      }
    },
    // 下载模板
    export_excel() {
      exportExcel('inspect/export_excel?', this.form)
    },

    handleEdit(ids) {
      getInspecMethodsDetails(ids).then(res => {
        this.contentTitle = '详情'
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
      this.showTree = false
      this[this.currentName].branchName = obj.name
    },
    handleSizeChange(size) {
      this.$data.form.limit = size
      this.getList(this.$data.form)
    },
    changeStatus(id, status, remark) {
      this.statusId = id
      getInspecInfoCompare(id).then(res => {
        if (res.code === 0) {
          this.diffDataInfo = res.result
          this.remarkContent = remark
          if (status === 40) {
            this.dialogEdite = true
          } else {
            this.dialogNoPass = true
          }
        }
      })
    },
    rectification() {
      changeStatusInfo(this.statusId).then(res => {
        if (res.code === 0) {
          this.dialogEdite = false
          this.$message({
            type: 'success',
            message: '更改成功!'
          })
        }
      })
    },
    handleCurrentChange(valu) {
      // this.paramsObj.page = valu
      this.$data.form.page = valu
      this.getList(this.$data.form)
    }
    // a(arrData) {
    //   const arrDatas = []
    //   for (const item of arrData) {
    //     if (item.parentId === -1) {
    //       const obj = {
    //         id: item.id,
    //         parentId: item.parentId,
    //         name: item.name,
    //         children: []
    //       }
    //       obj.children = this.b(arrData, item)
    //       arrDatas.push(obj)
    //       console.log('arrDatas', arrDatas)
    //     }
    //   }
    //   this.dddd = arrDatas
    // },
    // b(arr, node) {
    //   const children = []
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].parentId === node.id) {
    //       const obj = {
    //         id: arr[i].id,
    //         parentId: arr[i].parentId,
    //         name: arr[i].name,
    //         children: []
    //       }
    //       arr.splice(i, 1)
    //       i--
    //       if (arr.length > 0) {
    //         obj.children = this.b(arr, obj)
    //       }
    //       children.push(obj)
    //     }
    //   }
    //   return children
    // },

    // toTreeData(data, id, pid, name) {
    // // 建立个树形结构,需要定义个最顶层的父节点，pId是1
    //   const parent = []
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i][pid] !== -1) {
    //       console.log(2)
    //     } else {
    //       const obj = {
    //         label: data[i][name],
    //         id: data[i][id],
    //         children: []
    //       }
    //       parent.push(obj)// 数组加数组值
    //     }
    //     // console.log(obj);
    //     //  console.log(parent,"bnm");
    //   }
    //   children(parent)

    //   // 调用子节点方法,参数为父节点的数组
    //   function children(parent) {
    //     console.log(parent)
    //     if (data.length !== 0) {
    //       for (let i = 0; i < parent.length; i++) {
    //         for (let j = 0; j < data.length; j++) {
    //           if (parent[i].id === data[j][pid]) {
    //             const obj = {
    //               label: data[j][name],
    //               id: data[j][id],
    //               children: []
    //             }
    //             parent[i].children.push(obj)
    //           }
    //         }
    //         children(parent[i].children)
    //       }
    //     }
    //   }
    //   console.log(parent, 'bjil')
    //   return parent
    // }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
  }

  .remark {
    height: 50px;
    line-height: 50px;
    border: 1px solid #EBEEF5;
    border-top: unset;

    div {
      font-size: 15px;
      display: inline-block;
    }

    .remark-th {
      width: 100px;
      border-right: 1px solid #EBEEF5;
    }
  }

  .bor-top {
    border-top: 1px solid #EBEEF5;
    border-bottom: unset;

    .remark-th:first {
      width: 100px;
    }

    .remark-th:not(:first-child) {
      text-align: center;
      width: 286px;
      border-right: unset;
      border-left: 1px solid #EBEEF5;
    }
  }

  .vigilant {
    color: red;
  }

</style>
