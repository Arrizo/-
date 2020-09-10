<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">

        <el-form-item label="角色编号：">
          <el-input v-model="form.roleCode" />
        </el-form-item>
        <el-form-item label="角色：">
          <el-input v-model="form.roleName" />
        </el-form-item>
        <div>
          <el-form-item>
            <el-button v-permission="'sys:role:save'" type="primary" @click="addInspectForm()">新增</el-button>
            <el-button v-permission="'sys:role:delete'" type="danger" @click="handleDeleteAll()">刪除</el-button>
            <el-button type="primary" @click="getList(form)">查询</el-button>
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
          prop="roleId"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
        />
        <el-table-column
          prop="roleCode"
          label="角色编码"
        />
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.status===0?'生效':'无效' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:role:update'"
              size="mini"
              @click="handleEdit(scope.row.roleId)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:role:delete'"
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.roleId])"
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
    <el-dialog :title="contentTitle" :visible.sync="dialogTableVisible" :close-on-click-modal="false" @close="newCheckMenu=[];showTree=false" @open="showTree=true">
      <el-form :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model="addDataForm.roleName" />
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="addDataForm.roleCode" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="addDataForm.status">
            <el-radio :label="0">生效</el-radio>
            <el-radio :label="1">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addDataForm.remark" />
        </el-form-item><br>
        <el-form-item label="菜单权限">
          <el-tree v-if="showTree" :data="treeList" node-key="menuId" :show-checkbox="true" :props="{label:'name'}" :highlight-current="true" :default-checked-keys="newCheckMenu" @check="handleNodeClick" />
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
import { getTreeJson } from '@/utils/index'
import { getRoleList, roleDataDelete, roleDataDetails, addRoleData, MenuList } from '@/api/system/role-manage'
export default {
  name: 'Dashboard',
  data() {
    return {
      showTree: false,
      newCheckMenu: [],
      form: {
        page: 1,
        roleCode: '',
        roleName: ''
      },
      dialogTableVisible: false,
      tableData: [],
      selectArrayId: [],
      paramsObj: {
        page: 1
      },
      treeList: [],
      totalCount: 0,
      addDataForm: {
        menuIdList: [],
        remark: '',
        roleCode: '',
        roleName: '',
        status: 0
      },
      contentTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList(this.paramsObj)
    MenuList().then(res => {
      this.treeList = getTreeJson(res, 'menuId', 'parentId')
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleSelectionChange(row) {
      this.selectArrayId = []
      row.forEach(item => {
        this.selectArrayId.push(item.roleId)
      })
      console.log(this.selectArrayId)
    },
    handleCurrentChange(valu) {
      this.paramsObj.page = valu
      this.getList(this.paramsObj)
    },
    getList(obj) {
      getRoleList(obj).then(res => {
        if (res.code === 0) {
          this.tableData = res.result.list
          this.totalCount = res.result.totalCount
        }
      })
    },
    handleNodeClick(obj, node) {
      this.addDataForm.menuIdList = [...node.checkedKeys, ...node.halfCheckedKeys]
      this.$alert(this.addDataForm)
    },
    addInspectForm() {
      Object.assign(this.$data.addDataForm, this.$options.data().addDataForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    handleDeleteAll(ids) {
      if (this.selectArrayId.length === 0) {
        this.$alert('请最少选择一行！')
      } else {
        this.handleDelete(this.selectArrayId)
      }
    },
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addRoleData(this.addDataForm, method).then(res => {
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
    handleDelete(ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleDataDelete(ids).then(res => {
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
    handleEdit(ids) {
      roleDataDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.addDataForm = res.result
        this.newCheckMenu = res.result.menuIdList
        this.dialogTableVisible = true
      })
    },
    handleSizeChange(size) {
      this.getList({ page: 1, limit: size })
    },
    resetData() {
      Object.assign(this.$data.form, this.$options.data().form)
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
