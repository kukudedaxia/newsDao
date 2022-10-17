<template>
  <div class="app-container">
    <div class="line">
      <p style="margin-bottom: 20px"><img :src="require('./image/docs.png')">工具概述</p>
      <div>1.本工具可用于自动抓取各种币圈相关社交媒体上的指定作者的内容，由机器人自动转发到您的微信社群内（后续会开通其他社交软件渠道）</div>
      <div>2.在这里，您可以订阅您喜欢的任何推特、discord、财经媒体 的作者，机器人将第一时间将内容自动转发到您指定的群聊内</div>
      <div><el-image
        class="img1"
        :src="require('./image/0.png')"
        :preview-src-list="[require('./image/0.png')]"
      /></div>
      <div>3.极大提高社群内信息的捕获速度，避免错过相关信息</div>
      <div>4.本工具目前处于Alpha版本（完全免费，先到先得），一旦机器人好友数量满后短期内将不再开放使用名额</div>
      <div>5.参与工具使用的用户将有机会获得后期生态建设Token空投，项目参与资本机构暂不与公开</div>
    </div>
    <div class="line">
      <p><img :src="require('./image/bg-tool.png')" class="small">工具使用教程</p>
      <div class="docs">
        <div class="text flex"><span>1.加主机器人为微信好友（必要条件）：WEILAI_PxB</span><img class="jpg2" :src="require('./image/1.png')"></div>
        <div class="text flex"><span>2.添加备用机器人为微信好友（非必要条件）：richyour001</span><img class="jpg2" :src="require('./image/2.png')"></div>
        <div class="text">3.将（主机器人）拉入您想要获取信息的群聊内，（主机器人）将自动同意进群。</div>
        <div class="text">4.使用浏览器打开管理界面 <a href="https://www.bcaca.xyz/user-center" target="_blank">https://www.bcaca.xyz/user-center</a> ，然后填入邮箱进行注册。（此处需填入wx_code,给机器人发送 /code 即可获取这段密码）</div>
        <div class="line">  <el-image
          class="jpg3"
          :src="require('./image/15.png')"
          :preview-src-list="[require('./image/15.png')]"
        /></div>
        <div class="line">  <el-image
          class="jpg3"
          :src="require('./image/14.png')"
          :preview-src-list="[require('./image/14.png')]"
        /></div>
        <div class="text">5.注册成功后会自动登录到后台，然后点击左侧栏（群管理），查看目前机器人已经加入的群聊进行管理。</div>
        <div class="line">
          <el-image
            class="jpg4"
            :src="require('./image/4.png')"
            :preview-src-list="[require('./image/4.png')]"
          />
        </div>

        <div class="text">6.选择您想要配置的群聊点击（编辑）按钮。</div>
        <div class="line">  <el-image
          class="jpg5"
          :src="require('./image/5.png')"
          :preview-src-list="[require('./image/5.png')]"
        /></div>
        <div class="text">7.进入编辑选项之后，我们可以看到频道管理，这里可以订阅您自己创建的频道，由于您还未创建任何频道，所以这里的频道都是我們已经创建好的公共頻道。如果您想创建属于自己的频道，这个时候我们需要先点击左侧栏的（定制频道）按钮，创建频道。</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/6.jpg')"
          :preview-src-list="[require('./image/6.jpg')]"
        /></div>
        <div class="text">8.点击（定制频道）按钮之后，点击（新建）按钮。</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/7.png')"
          :preview-src-list="[require('./image/7.png')]"
        /></div>
        <div class="text">9.填写信息并创建频道</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/8.png')"
          :preview-src-list="[require('./image/8.png')]"
        /></div>
        <div class="text">10.点击（定制）按钮</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/9.png')"
          :preview-src-list="[require('./image/9.png')]"
        /></div>
        <div class="text">11.点击（添加）按钮</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/10.png')"
          :preview-src-list="[require('./image/10.png')]"
        /></div>
        <div class="text">12.查找并选择您想添加到 [频道] 内的（消息源/作者），然后按（确定）键</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/11.png')"
          :preview-src-list="[require('./image/11.png')]"
        /></div>
        <div class="text">13.🔙返回到（群管理），选择群组点击（编辑）</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/12.png')"
          :preview-src-list="[require('./image/12.png')]"
        /></div>
        <div class="text">14.这个时候您会在下方频道管理处看到您创建的频道，选择并订阅之后按（保存）</div>
        <div class="line"><el-image
          class="jpg5"
          :src="require('./image/13.png')"
          :preview-src-list="[require('./image/13.png')]"
        /></div>
        <div class="text bold">end：一旦您的频道有相应的消息，就会第一时间转发到您指定该频道的群聊内啦 ^-^</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  max-width: 1000px;
    margin: 0 auto;
}
.line {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 24px;
  color: #666;

  >p {
     font-size: 18px;
     color: #000;
     font-weight: bold;
     display: flex;
     align-items: center;
     img {
       width: 40px;
       margin-right: 10px;
     }
     .small {
        width: 30px;
     }
  }
}
.tip {
  color: red;
}
.jpg2 {
  width: 180px;
      border: 1px solid #ddd;
}
.jpg4 {
  width: 140px;
  border: 1px solid #ddd;
}
.jpg3 {
  max-width: 300px;
  border: 1px solid #ddd;
}
.jpg5 {
  max-width: 800px;
  width: 100%;
      border: 1px solid #ddd;
}
.text {
  >span {
  margin-right: 20px;
  }
  a {
        color: #2196f3
  }
}
.img1 {
  width: 200px;
  border: 1px solid #ddd;
}
.flex {
   display: flex;
   align-items: center;
   flex-wrap: wrap;
}
.docs {
  .text {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
.bold {
  font-weight: bold;
  color: green;
}
</style>
