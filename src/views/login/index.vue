<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login NewsDao</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="Username"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          :disabled="step == 2"
        />
      </el-form-item>

      <el-form-item v-show="step == 2" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item v-show="step == 2 && !register" class="input-box flex-align verfiy" prop="verification_code">
        <el-input
          v-model="loginForm.verification_code"
          placeholder="请输入验证码"
          type="text"
          auto-complete="on"
        />
        <template v-if="!codeLoading">
          <p v-if="!codeTimes" :class="['send-times']" @click=" sendCode()">
            {{ sendCodeText }}
          </p>
          <p v-else :class="['times', 'no-flip-over']">{{ codeTimes }}s</p>
        </template>
        <loading v-else :is-complete="false" class="loading-icon" />
      </el-form-item>

      <el-form-item v-show="step == 2 && !register" prop="code">
        <el-input
          ref="code"
          v-model="loginForm.code"
          placeholder="请输入Wx_code"
          name="code"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ step == 1 ? 'NEXT' : "LOGIN" }}</el-button>
      <el-button v-if="step == 2" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="back">返回账号输入</el-button>

      <div class="tips">
        <span v-if="step == 1" style="margin-right:20px;">step1: 请选输入邮箱账号</span>
        <!-- <span></span> -->
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import request from '@/utils/request'
import Loading from '@/components/Loading'

const validateUsername = (rule, value, callback) => {
  if (!validUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}

export default {
  name: 'Login',
  components: {
    Loading
  },
  data() {
    return {
      loginForm: {
        email: 'lengh123456@gmail.com',
        password: '',
        code: '',
        verification_code: '',
        verification_key: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }]
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      step: 1, // 第一步先验证邮箱 第二部才输入密码
      register: false,
      codeTimes: '', // 倒计时计数
      codeLoading: false, // 发送验证码loading
      errorMsg: '',
      codeCount: 0
    }
  },
  computed: {
    sendCodeText() {
      if (this.codeTimes === '') {
        return '发送'
      }
      return '重发'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
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
    back() {
      this.loginForm = {
        email: this.loginForm.email,
        password: '',
        code: '',
        verification_code: '',
        verification_key: ''
      }
      this.step = 1
    },
    handleLogin() {
      if (this.step === 1) {
        this.$refs.loginForm.validate(valid => {
          console.log(valid, 'valid')
          request({
            url: `/checkEmail`,
            method: 'post',
            data: {
              email: this.loginForm.email
            }
          }).then(res => {
            console.log(res, '11')
            if (res.code === 200) {
              this.register = true
            } else {
              this.register = false
            }
            this.step = 2
            this.loginRules = {
              email: [{ required: true, trigger: 'blur', validator: validateUsername }],
              password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            }
          }).catch((err) => {
            this.$message({
              type: 'info',
              message: err
            })
          })
        })
      } else {
        this.$refs.loginForm.validate(valid => {
          console.log(valid, 'valid')
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
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
    },
    sendCode() {
      this.codeLoading = true
      request({
        url: `/verificationCodes`,
        method: 'post',
        data: {
          email: this.loginForm.email
        }
      }).then(res => {
        this.codeLoading = false
        this.loginForm.verification_key = res.key
        this.countDown()
      })
    },
    // 倒计时
    countDown() {
      this.codeCount++
      this.codeTimes = 60
      let times = null
      // eslint-disable-next-line no-undef
      if (!times) {
        times = setInterval(() => {
          this.codeTimes--
          if (this.codeTimes <= 0) {
            clearInterval(times)
            times = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
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
      caret-color: $cursor;

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
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

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
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
}

.send-times {
    font-size: 16px;
    color: #2196f3;
    margin-left: 10px;
    cursor: pointer;
}
.times {
   margin-left: 10px;
   color: #03a9f4;
}
</style>
<style lang="scss">
.el-button+.el-button {
  margin-left: 0;
}
.el-input.is-disabled .el-input__inner {
  background: transparent;
}
.verfiy {
  .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
}
.svg-icon {
  vertical-align: sub;
}
</style>
