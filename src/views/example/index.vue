<template>
  <div class="app-container">
    <div class="line">
      <p>概述</p>
      <div>1.允许机器人通过好友</div>
      <div>2.在指定群邀请机器人进群</div>
    </div>
    <div class="line">
      <p>定制频道</p>
      <div>
        <p>前往填写谷歌表单，后续会有工作人员为你账户添加私人定制频道</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.line {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  >p {
     font-size: 16px;
     color: #333;
  }
}
</style>
