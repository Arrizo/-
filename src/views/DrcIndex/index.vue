<template>
  <div id="innerWrapper" class="index-container">
    <div class="index-carousel">
      <el-carousel :interval="4000" height="450px">
        <el-carousel-item v-for="item in 4" :key="item">
          <!-- <h3 class="small">{{ item+'农商行' }}</h3> -->
          <img src="../../assets/img/timg.jpg" alt="" class="rotation">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- <router-view /> -->
    <div class="product-item">
      <div style="text-align:center">
        <div v-for="(item,index) in asyncRouter" :key="index+'router'" class="wrap-item" @click="handlder(item)">
          <i :class="['icon-'+item[0].name]" class="iconfont icon-block" />
          <!-- <i class="el-icon-share icon-block" /> -->
          <h3 class="product-title">{{ item[0].meta.title }}</h3>
        </div>
      </div>
    </div>
    <h3 class="w3_agile_header concat">
      快速
      <span>联系</span>
    </h3>
    <p class="agile_para">以下方式会快速与我们取得联系。</p>
    <right-panel v-if="true">
      <el-menu :router="true" :default-active="'/'">
        <el-menu-item index="/">
          <i class="el-icon-menu" />
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item @click.native="logout">
          <i class="el-icon-menu" />
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </right-panel>
    <!-- <return-top /> -->
  </div>
</template>
<script>
import RightPanel from '@/components/RightPanel'
import { getBranchTree } from '@/api/inspect/inspect-list'
// import ReturnTop from '@/components/ReturnTop'
import { mapGetters } from 'vuex'
export default {
  name: 'DrcIndex',
  components: {
    RightPanel
    // ReturnTop
  },
  props: {},

  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'asyncRouter',
      'brachTree'
    ])
  },
  created() {
    if (this.asyncRouter.length === 0) {
      this.$store.dispatch('user/getAsyncRouter')
    }
  },
  mounted() {
    if (this.brachTree.length === 0) {
      getBranchTree().then(res => {
        if (res.code === 0) {
          this.$store.dispatch('app/getBrachTree', res.result)
        }
      }).catch(error => {
        console.log(111, error)
      })
    }
  },
  methods: {
    async handlder(direct) {
      await (this.$router.options.routes).splice(5)
      await this.aysnroure(direct)
      this.$router.push({ path: direct[0].path })
    },
    aysnroure(query) {
      return new Promise((resolve, reject) => {
        var timeOut = setTimeout(() => {
          this.$router.options.routes = this.$router.options.routes.concat(query)
          this.$router.addRoutes(query)
          if ((this.$router.options.routes).length > 5) {
            clearTimeout(timeOut)
            resolve()
          }
        }, 500)
      })
    },
    logout() {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
      }).catch(() => {
        console.log()
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.small{
    text-align: center;
}
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .product-item{
    padding: 30px 40px;
  .wrap-item{
    padding-top: 30px;
    width: 200px;
    height: 200px;
    display: inline-block;
    transition: all 0.2s ease-in;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .icon-block{
      display: block;
      color: #337ab7;
    font-size: 60px;
      &::after{
        content: '';
        margin: 0 auto;
        width: 70%;
        height: 10px;
        display: block;
        background: #5bb510
      }
    }
    text-align: center;
    &:hover{
      background-color: #5bb510;
      .icon-block{
        color: #fff;
        &::after{
          background-color: #fff;
        }
      }

    }
  }
  }
  .concat::after,.concat::before{
    content: '';
    background: #212121;
    height: 2px;
    position: absolute;
  }
  .w3_agile_header{
        font-size: 36px;
    color: #212121;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 5px;
    position: relative;
    padding-bottom: .5em;
    margin-bottom: .5em;
    &::before{
        bottom: 0%;
    left: 46%;
    width: 8%;
    }
    &::after{
    bottom: -10%;
    right: 37.5%;
    width: 25%;
    }
    span{
      color: #5bb510;
    }
  }
  .agile_para{
    color: #999;
    text-align: center;
    line-height: 1.8em;
  }
  .rotation{
    max-width: 100%;
    min-height: 100%;
    height: 100%;
  }
</style>
