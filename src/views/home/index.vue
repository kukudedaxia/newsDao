<template>
  <div class="container">
    <div class="head">
      <img src="https://pic.233.mx/images/2021/05/24/SbT2CEW435puxgm.jpg">
    </div>
    <div class="time">
      <el-radio-group v-model="tabPosition" size="small">
        <el-radio-button label="day">本日</el-radio-button>
        <el-radio-button label="week">本周</el-radio-button>
        <el-radio-button label="month">本月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="con">
      <div class="main">
        <div class="top">
          <Words />
          <Charts />
        </div>
      </div>
      <div class="right">
        <Top />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Charts from './component/charts'
import Words from './component/words'
import Top from './component/top'
export default {
  name: 'Dashboard',
  components: {
    Charts,
    Words,
    Top
  },
  data() {
    return {
      tabPosition: 'week'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
    margin:  20px 30px 20px;
    .head {
      position: relative;
      img {
        width: 100%;
        height: 240px;
        object-fit: cover;
        border-radius: 6px;
        position: relative;
        display: block;
      }
      &::before {
          position: absolute;
          content: '';
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          background: rgba(0,0,0,0.4);
          z-index: 10;
        }
    }
}
.time {
  margin-top: 20px;
}
.con {
 display: flex;
 margin-top: 20px;
 .main {
      width: 800px;
    }
}
.top {
  display: flex;
}
</style>
