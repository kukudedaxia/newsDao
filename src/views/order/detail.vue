<template>
  <div v-wechat-title="title" v-loading="loading1 && loading2" class="detail">
    <div class="top">
      <div class="card">
        <el-descriptions title="群信息" border :column="2">
          <el-descriptions-item label="索引">{{ info.id }}</el-descriptions-item>
          <el-descriptions-item label="群名称">{{ info.name }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ info.created_at }}</el-descriptions-item>
          <el-descriptions-item label="描述">{{ info.description }}</el-descriptions-item>
          <el-descriptions-item label="群成员数量">{{ info.member_count }}</el-descriptions-item>
          <el-descriptions-item label="群身份">{{ info.receiver }}</el-descriptions-item>
          <!-- <el-descriptions-item label="机器人">

            <div class="avator">
              <img :src="info.robot.img">
              <span>{{ info.robot.name }}</span>
            </div>

          </el-descriptions-item> -->
        </el-descriptions>
      </div>
    </div>
    <div class="middle top">
      <h3>频道管理</h3>
      <div class="flex">
        <el-transfer
          v-model="value"
          style="text-align: left; display: inline-block"
          filterable
          :filter-method="filterMethod"
          :left-default-checked="leftcheck"
          :right-default-checked="[6]"
          :titles="['未订阅列表', '已订阅列表']"
          :button-texts="['取消', '订阅']"
          :format="{
            noChecked: '${total}',
            hasChecked: '已选择${checked}'
          }"
          :data="channels"
          @change="handleChange"
        >
          <span slot-scope="{ option }">{{ option.name }}
            <span v-if="option.is_owner" class="custom">自创</span>
          </span>
          <!-- <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
          <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button> -->
        </el-transfer>
        <el-button type="primary" class="save" :loading="saveLoding" @click="save">保存</el-button>
      </div>
      <div class="info" />
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'OrderDetail',
  data() {
    return {
      title: '123',
      info: {

      },
      channels: [],
      value: [],
      leftcheck: [],
      rightcheck: ['6'],
      saveLoding: false,
      loading1: true,
      loading2: true,
      filterMethod(query, item) {
        console.log(query, 1)
        return item.name.indexOf(query) > -1
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.getInfo()
    this.getChannel()
  },
  methods: {
    getInfo() {
      this.loading = true
      request({
        url: `/backend/receivers/${this.id}`,
        method: 'get'
      }).then(res => {
        console.log(res, '群姑那里list')
        this.info = res.data
        this.value = res.data.channels.data.map(item => item.id)
        this.loading1 = false
      })
    },
    getChannel() {
      request({
        url: `/backend/channels`,
        method: 'get',
        params: {
          page: 1,
          perPage: 1000
        }
      }).then(res => {
        console.log(res, 'res')
        this.channels = res.data.map(item => {
          item.key = item.id
          item.lable = item.name
          return item
        })
        this.channels = this.channels.sort((a, b) => { a.grade - b.grade })
        this.loading2 = false
      })
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    save() {
      this.saveLoding = true
      request({
        url: `/backend/receivers/${this.id}/subscribe`,
        method: 'post',
        data: {
          channelIds: this.value
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.saveLoding = false
      }).catch(() => {
        this.saveLoding = false
      })
    }

  }
}
</script>
<style lang="scss">
.detail .el-transfer-panel__list {
    height: 244px;
}
.detail .el-transfer-panel__body {
  height: 300px;
}
.el-checkbox:last-of-type  {
 margin-right: 30px;
}

</style>
<style lang="scss" scoped>
.detail {
  padding: 20px;
}
.top {
 box-shadow: 0 3px 6px -3px rgb(0 0 0 / 10%);
    border: 1px solid #ebeef5;
    background: #fff;
}
.card {
    max-width: 800px;
    padding: 20px;
}
.avator {
  display: flex;
  align-items: center;
  margin-left: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 6px;
  }
}
.tag-item {
  margin: 4px;
  cursor: pointer;
}
.middle {
  margin: 40px 0;
  padding: 20px;
  background: #fff;
  >h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 20px;
  }
}
.flex {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-top: 30px;
    justify-content: center;
    align-items: center;
}
.save {
  margin-top: 40px;
  width: 200px;
}
.custom {
font-size: 12px;
    padding: 2px 6px;
    line-height: 14px;
    background: linear-gradient(270deg,#2196f3,#3f51b5);
    color: #fff;
    border-radius: 4px;
    margin-left: 10px;
    margin-bottom: 4px;
    display: inline-block;
    transform: scale(.8);
    position: absolute;
    right: -30px;
    top: 6px;
}
</style>
