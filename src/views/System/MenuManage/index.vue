<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item label="">
          <el-button v-permission="'sys:menu:save'" type="primary" @click="addInspectForm()">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        size="small"
        border

        row-key="id"
      >
        <el-table-column
          label="序号"
          type="index"
        />
        <el-table-column
          prop="name"
          label="菜单名称"
        />
        <el-table-column
          prop="type"
          label="类型"
        >
          <template slot-scope="scope">{{ menuType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="菜单URL"
        />
        <el-table-column
          prop="perms"
          label="授权"
        />
        <el-table-column
          prop="orderNum"
          label="排序"
        />
        <el-table-column
          fixed="right"
          width="150"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="'sys:menu:update'"
              size="mini"
              @click="handleEdit(scope.row.menuId)"
            >编辑</el-button>
            <el-button
              v-permission="'sys:menu:delete'"
              size="mini"
              type="danger"
              @click="handleDelete([scope.row.menuId])"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <el-dialog title="新增" :visible.sync="dialogTableVisible">
      <el-form :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="addDataForm.name" />
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-input v-model="addDataForm.parentName" @click.native="showMenu=true" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="addDataForm.type ">
            <el-radio-button :label="0">目录</el-radio-button>
            <el-radio-button :label="1">菜单</el-radio-button>
            <el-radio-button :label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单URL">
          <el-input v-model="addDataForm.url" />
        </el-form-item>
        <el-form-item label="授权">
          <el-input v-model="addDataForm.perms" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="addDataForm.icon" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addDataForm.orderNum" />
        </el-form-item>
        <div style="text-align:right">
          <el-button type="primary" @click="saveForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="上级菜单" class="menlist" :visible.sync="showMenu" width="400px" :modal="false" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <el-tree :data="menuList" node-key="menuId" :props="{label:'name'}" :highlight-current="true" @node-click="menuObj=$event" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleTree">确 定</el-button>
        <el-button @click="showMenu=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTreeJson } from '@/utils/index'
import { getMenuList, deleteMenu, addMenuList, getMenuDetails, getMenuSelectList } from '@/api/system/menu-manage'
export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        city: ''
      },
      showMenu: false,
      menuList: [],
      tableData: [],
      menuObj: {},
      dialogTableVisible: false,
      addDataForm: {
        icon: '',
        menuId: '',
        name: '',
        orderNum: '',
        parentId: '',
        parentName: '',
        perms: '',
        type: '',
        url: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList()
    this.getSelectList()
  },
  methods: {
    getList(obj) {
      getMenuList(obj).then(res => {
        this.tableData = res
      })
    },
    handleTree() {
      this.addDataForm.parentId = this.menuObj.menuId
      this.addDataForm.parentName = this.menuObj.name
      this.showMenu = false
    },
    addInspectForm() {
      Object.assign(this.$data.addDataForm, this.$options.data().addDataForm)
      this.contentTitle = '新增'
      this.dialogTableVisible = true
    },
    saveForm() {
      var method = this.contentTitle === '编辑' ? 'put' : null
      addMenuList(this.addDataForm, method).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getList()
          this.getSelectList()
          this.$store.dispatch('user/getAsyncRouter')
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
        deleteMenu(ids).then(res => {
          if (res.code === 0) {
            this.getList()
            this.$store.dispatch('user/getAsyncRouter')
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
    getSelectList() {
      getMenuSelectList().then(res => {
        if (res.code === 0) {
          this.menuList = getTreeJson(res.menuList, 'menuId', 'parentId')
        } else {
          this.$alert(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleEdit(ids) {
      getMenuDetails(ids).then(res => {
        this.contentTitle = '编辑'
        this.addDataForm = res.menu
        this.dialogTableVisible = true
      })
    },
    menuType(type) {
      if (type === 0) {
        return '目录'
      } else if (type === 1) {
        return '菜单'
      } else {
        return '按钮'
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
/deep/.menlist .el-dialog{
  .el-dialog__header{
        padding: 10px 18px 10px;
  }
  .el-dialog__body{
  padding: 0px 20px;
  max-height: 400px;
  overflow-y: scroll;
  }
}
</style>
