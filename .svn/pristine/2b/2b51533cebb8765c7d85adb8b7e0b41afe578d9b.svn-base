<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3> <img class="title" src="../../assets/img/dgncsyyh.png" alt=""></h3>
        <h4>用户登录</h4>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="yanzhengma" />
        </span>
        <el-input
          v-model="loginForm.captcha"
          placeholder="验证码"
          name="code"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <el-input v-show="false" v-model="loginForm.uuid" />
        <el-tooltip class="item" effect="dark" content="点击刷新验证码" placement="top">
          <span class="show-pwd valida-code" @click="getValidataCode">
            {{ validaCodeSrc }}
          </span>
        </el-tooltip>
      </el-form-item> -->
      <div class="tips">
        <span class="remenb-pass ">
          <el-checkbox v-model="remneber" @change="changeRemenber">记住密码</el-checkbox>
        </span>
        <!-- <span class="forget-pass clearfix" @click="resetPass">忘记密码</span> -->
      </div>
      <el-form-item style="text-align:center">
        <el-button :loading="loading" type="primary" style="width:30%;margin-top:30px;" round @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// import { getUUID } from '@/utils/validate'
// import { reflushCode } from '@/api/user'
import { mapGetters } from 'vuex'
import cookie_storage from '@/utils/Cookie_Storage'
import { USER_FORM_COOKIE } from '@/env_config/env'
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('请输入用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('请输入用户密码'))
    //   } else {
    //     callback()
    //   }
    // }

    return {
      loginForm: {
        username: '',
        password: ''
        // uuid: '',
        // captcha: ''
      },
      validaCodeSrc: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入用户密码' }]
        // captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      remneber: false

    }
  },
  computed: {
    ...mapGetters([
      'remenberPass'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // this.getValidataCode()
    this.remneber = this.remenberPass
  },
  mounted() {
    if (this.remneber) {
      var cookieObj = JSON.parse(cookie_storage.getInstance().getBlmCookie(USER_FORM_COOKIE))
      this.loginForm.username = cookieObj.username
      this.loginForm.password = cookieObj.password
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // // 重新获取验证码
    // getValidataCode() {
    //   this.loginForm.uuid = getUUID()
    //   reflushCode(this.loginForm.uuid).then(res => {
    //     this.validaCodeSrc = res
    //   })
    // },
    // 记住密码
    changeRemenber(val) {
      this.remneber = val
      this.$store.dispatch('user/remenber', val)
    },
    // 忘记密码
    resetPass() {
      // this.centerDialogVisible = true
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            if (res.code === 0) {
              this.$store.dispatch('user/getAsyncRouter').then(() => {
                this.$router.push({ path: '/' })
              })
            } else {
              this.getValidataCode()
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#575962;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#ffffff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
    background: url('../../assets/img/bg-4.jpg') no-repeat;
    background-attachment: fixed;
    background-position: right top;
    background-size: 50% 100%;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 150px 35px 0;
    margin: 0 100px;
    overflow: hidden;
  }
  .el-form-item {
    background: #fff;
    border-bottom: 1px solid #ebedf2;
  }

  .tips {
    font-size: 14px;
    color: #5a5656;
    margin-bottom: 10px;
    padding: 0px 10px;
    .forget-pass{
      cursor: pointer;
      float: right;
    }
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    h4{
    font-size: 24px;
    text-align: center;
    font-weight: 400;
    }
    .title {
        max-width: 100%;
        max-height: 100%;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .valida-code{

    background-color: #f5f7fa;
    color: #909399;
    width: 100px;
    height: 40px;
    border: 1px solid #dcdfe6;
    /* border-radius: 10px; */
    text-align: center;
  top: 0px;
  right:0px;
}
}

</style>
