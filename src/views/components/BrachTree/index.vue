<template>
  <div>
    <el-dialog title="选择网点" :visible.sync="value" width="400px" :modal="false" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <el-tree :data="brachTree" node-key="id" :props="{label:'name'}" :highlight-current="true" :accordion="true" @node-click="handleNodeClick" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleTree">确 定</el-button>
        <el-button @click="canlce">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TREE',
  props: {
    value: {}
  },
  data() {
    return {
      showTree: false,
      brachObj: '',
      parentId: ''
    }
  },
  computed: {
    ...mapGetters([
      'brachTree'
    ])
  },
  methods: {
    handleNodeClick(obj, node) {
      this.brachObj = obj
    },
    handleTree() {
      this.$emit('getBrachName', this.brachObj)
      //this.$emit('getBrachName', this.brachName, this.parentId)
    },
    canlce() {
      this.$emit('input', false)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog{
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
