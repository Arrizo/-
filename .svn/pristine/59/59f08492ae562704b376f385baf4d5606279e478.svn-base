<template>
  <div class="item-config">

    <el-checkbox-group v-model="itemConfig" class="group">

      <el-checkbox-button v-for="(item,index) in tableData" :key="index" class="group-item" :label="item.paramKey">{{ item.remark }}</el-checkbox-button>
    </el-checkbox-group>
    <el-button type="primary" @click="savePrams">保存</el-button>
  </div>
</template>
<script>
import { getConfigList, getUpdataParms } from '@/api/system/inspect-config'
export default {
  name: '',
  data() {
    return {
      itemConfig: [],
      tableData: [],
      newArry: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getConfigList().then(res => {
        if (res.code === 0) {
          this.tableData = res.result
          this.tableDataChange(this.tableData)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    tableDataChange(list) {
      list.forEach(item => {
        if (item.paramValue === 'true') {
          this.itemConfig.push(item.paramKey)
        }
      })
    },
    savePrams() {
      this.itemConfig.forEach(item => {
        this.newArry[item] = 'true'
      })
      console.log(this.newArry)
      getUpdataParms(this.newArry).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item-config{
text-align: center;
  margin: 10% 20%;
}
.group{
  margin-bottom: 70px;
  .group-item{
    margin: 10px ;
  }
}

</style>
