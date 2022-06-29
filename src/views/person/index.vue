<template>
  <div class="app-container">
    <div class="card mt-30">
      <div class="rows head">
        <span class="bold">修改手机号</span>
        <span class="save" @click="save">保存</span>
      </div>
      <div class="con info">
        <p><span class="sub">手机号:</span>100000000000</p>
        <el-input v-model="phone" clearable placeholder="请输入手机号" maxlength="20" class="input mt-12" />
        <!-- 手机验证码 -->
        <div class="input-box flex-align">
          <el-input
            v-model="code"
            class="input codes"
            placeholder="请输入验证码"
            @input="checkInputRules('code', 6)"
          />
          <template v-if="!codeLoading">
            <p v-if="!codeTimes" :class="['send-times', 'no-flip-over', { 'color-disabled': !phoneLengthCorrect }]" @click="phoneLengthCorrect ? sendCode() : ''">
              {{ sendCodeText }}
            </p>
            <p v-else :class="['times', 'no-flip-over']">{{ codeTimes }}s</p>
          </template>
          <loading v-else :is-complete="false" class="loading-icon" />
        </div>
        <p class="tip_info">
          <template v-if="errorMsg">
            <span class="no-flip-over">{{ errorMsg }}</span>
          </template>
        </p>
      </div>
    </div>
    <div class="card ">
      <h2 class="head">通知</h2>
      <div class="con">
        <div class="line">
          <span>新活动通知</span>
          <el-switch
            v-model="value1"
          />
        </div>
        <div class="line">
          <span>机器人故障通知</span>
          <el-switch
            v-model="value2"
          />
        </div>
      </div>
    </div>
    <div class="card mt-40">
      <div class="rows">
        <span>Telegram 讨论组</span>
        <el-button type="primary" size="small" round>前往</el-button>
      </div>
    </div>
    <div class="card  mt-40">
      <div class="rows">
        <span>Twitter</span>
        <el-button type="primary" size="small" round>前往</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      phone: '',
      code: '',
      codeTimes: '', // 倒计时计数
      codeLoading: false, // 发送验证码loading
      errorMsg: '',
      codeCount: 0,
      value1: true,
      value2: true
    }
  },
  computed: {
    // 手机号位数是否输入正确
    phoneLengthCorrect() {
      if (this.phone.length > 6 && this.phone.length < 12) {
        return true
      }
      return false
    },
    sendCodeText() {
      if (this.codeTimes === '') {
        return '发送'
      }
      return '重发'
    }
  },
  watch: {

  },

  methods: {
    // 发送验证码
    sendCode() {
      this.codeLoading = true
      setTimeout(() => {
        console.log(1)
        this.codeLoading = false
        this.countDown()
      }, 1000)
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
    },
    limitNumber(val) {
      return val.replace(/[^0-9]/g, '')
    },
    /**
   * @title 限制文本框(数字类型)输入的长度
   * @params  // ref: data目标数据   len: 最大长度
   */
    limitInputLength(vm, ref, len) {
    // ref: data目标数据   len: 最大长度
      if (vm[ref].length > len) {
        vm[ref] = vm[ref].slice(0, len)
      }
    },
    // 文本输入框（数字类型）校验
    checkInputRules(ref, len) {
      // 限制只输入数字
      this[ref] = this.limitNumber(this[ref])
      // 限制长度
      this.limitInputLength(this, ref, len)
    },
    save() {
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {

    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 6px -3px rgb(0 0 0 / 10%);
    border: 1px solid #ebeef5;
    h2 {
      font-weight: normal;
      font-size: 20px;
    }
}
.head {
    padding: 10px 20px;
    background: #f4f4f5;
    display: block;
    margin: 0;
    .save {
          cursor: pointer;
          font-size: 12px;
          padding: 6px 20px;
          display: block;
          background: #2f537a;
          border-radius: 120px;
          color: #fff;
          &:hover {
              background: #002b5a;
          }
    }

}
.con {
  padding: 20px;
}
.mt-40 {
  margin-top: 40px;
  padding: 10px 20px;
}
.line {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    >span {
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
    }
}
.rows {
      display: flex;
    align-items: center;
    justify-content: space-between;
}
.input-box {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.input {
  max-width: 240px;

}
.info {
  .sub {
   font-size: 14px;
    color: #666;
    margin-right: 10px;
  }
}
.mt-30 {
  margin-bottom: 30px;
}
.bold {
  font-weight: bold;
}
.send-times {
    font-size: 16px;
    color: #346AA7;
    margin-left: 10px;
    cursor: pointer;
}
.times {
   margin-left: 10px;
   color: #666666;
}
.color-disabled{
    opacity: .4;
}
.mt-12 {
  margin-top: 12px;
}
.loading-icon {
  margin-left: 12px;
  width: 20px;
}
</style>
