<template>
  <div class="warp">
    <div class="top">
      <div class="bold">channel 精选</div>
      <div class="refresh"><i class="el-icon-refresh" /><span>点击刷新</span></div>
    </div>
    <div class="content">
      <div v-for="(item ,index) in 9" :key="index" class="panel">
        <div class="left">
          <div class="rank">{{ index + 1 }}</div>
          <div class="title">GameFi</div>
          <div class="num">{{ Math.ceil(Math.random() * 100000 + 100) }}</div>
        </div>
        <div v-if="index % 3 == 0" class="right">
          <span class="icon hot">热</span>
        </div>
      </div>
      <div class="panel">
        <div class="left">
          <div class="rank">10</div>
          <div class="title">GameFi</div>
          <div class="num">100</div>
        </div>
        <div class="right">
          <span class="icon new">新</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Top'
}
</script>
<style lang="scss" scoped>
.warp {
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
}
.top {
    height: 40px;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    border-bottom: 1px solid #f9f9f9;
    .refresh {
      color: #939393;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      >i {
        font-size: 18px;
        margin-right: 6px;
      }
    }
}
.content {
 padding: 0 20px;
 max-height: 300px;
 overflow: scroll;
}
.panel {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #fafafa;
}
.left {
  display: flex;
  align-items: center;
  .rank {
    font-size: 16px;
    font-weight: 700;
    color: #f26d5f;
  }
  .title {
    font-size: 12px;
    line-height: 16px;
    color: #333;
    margin: 0 10px;
  }
  .num {
    font-size: 12px;
    line-height: 16px;
    color: #666666;
  }
}
.icon {
    display: inline-block;
    height: 20px;
    border-radius: 4px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    width: 20px;
    transform: scale(.8);
    color: #fff;
}
.new {
  background: #ff9406;
}
.hot {
  background: rgb(255, 56, 82);
}
.bold {
  font-weight: bold;
}
</style>
