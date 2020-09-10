<template>
  <div v-show="returnTop" id="full" ref="goTop" class="gotop" @click.stop="goTop()">
    <a />
  </div>
</template>

<script>
export default {
  name: 'Inde',
  data() {
    return {
      returnTop: false,
      interValTimer: null,
      isTop: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    goTop() {
      const _this = this
      this.interValTimer = setInterval(function() {
        const scrolltop = document.getElementById('innerWrapper').scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-scrolltop / 6)
        _this.isTop = true
        if (ispeed === 0) {
          clearInterval(_this.interValTimer)
          _this.interValTimer = null
        }
        document.getElementById('innerWrapper').scrollTop = document.body.scrollTop = scrolltop + ispeed
      }, 30)
    },
    init() {
      const _this = this
      const clientHeight = document.body.clientHeight / 2 || document.getElementById('innerWrapper').clientHeight / 2
      document.getElementById('innerWrapper').addEventListener('scroll', function() {
        console.log(clientHeight)
        const scrolltop = document.getElementById('innerWrapper').scrollTop || document.body.scrollTop
        if (scrolltop > clientHeight) {
          _this.returnTop = true
        } else {
          _this.returnTop = false
        }
        if (!_this.isTop) {
          clearInterval(_this.interValTimer)
        }
        _this.isTop = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*返回顶部*/
.gotop {
  position: fixed;
  z-index: 30;
  text-align: center;
  cursor: pointer;
  right: 20px;
  bottom: 60px;
  background:rgba(0,0,0,0.5);
  border-radius: 50%;
  &:active,&:hover{
      background:rgba(0,0,0,0.7);
  }
}
.gotop a {
  width: 28px;
  height: 28px;
  display: block;
  background:  url('../../icons/svg/link.svg') no-repeat center / 40%;
}
</style>
