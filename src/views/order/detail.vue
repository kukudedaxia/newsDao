<template>
  <div v-wechat-title="title" class="detail">
    <div class="top">
      <div class="card">
        <el-descriptions title="群信息" border :column="2">
          <el-descriptions-item label="wx_id">{{ info.id }}</el-descriptions-item>
          <el-descriptions-item label="名称">{{ info.name }}</el-descriptions-item>
          <el-descriptions-item label="身份">{{ info.status }}</el-descriptions-item>
          <el-descriptions-item label="成员">{{ info.number }}</el-descriptions-item>
          <el-descriptions-item label="机器人">

            <div class="avator">
              <img :src="info.robot.img">
              <span>{{ info.robot.name }}</span>
            </div>

          </el-descriptions-item>
          <el-descriptions-item label="channels">
            <el-tag v-for="(item, index) in info.channel" :key="index" class="tag-item" size="small" effect="plain">{{ item.name }}</el-tag>
          </el-descriptions-item>
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
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['未订阅列表', '已订阅列表']"
          :button-texts="['取消', '订阅']"
          :format="{
            noChecked: '${total}',
            hasChecked: '已选择${checked}'
          }"
          :data="channels"
          @change="handleChange"
        >
          <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
          <!-- <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
          <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button> -->
        </el-transfer>
        <el-button type="primary" class="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrderDetail',
  data() {
    return {

      title: '123',
      info: {
        'id': '640000200811136821',
        'name': 'f)mbr24wCoEeyZ',
        'status': 'administrator',
        'number': 58,
        'robot': {
          'name': '[i6mz0j',
          'img': 'https://img.bee-cdn.com/orj360/3b9ae236lz1h39650jalvj20n00n07wh.jpg'
        },
        'channel': [
          {
            'name': 'Layer'
          },
          {
            'name': 'POS'
          },
          {
            'name': 'POS'
          },
          {
            'name': 'Layer'
          },
          {
            'name': 'POW'
          },
          {
            'name': 'Defi'
          },
          {
            'name': 'NFT'
          },
          {
            'name': 'gameFi'
          },
          {
            'name': 'POW'
          },
          {
            'name': 'Oraz'
          }
        ]
      },
      channels: [],
      value: []
    }
  },
  created() {
    this.getInfo()
    this.getChannel()
  },
  methods: {
    getInfo() {

    },
    getChannel() {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      this.channels = data
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>
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
</style>
