<template>
  <div class="order">
    <div class="middle">
      <h3 class="h3">群管理</h3>
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        max-height="500"
      >
        <el-table-column
          label="群名称"
          prop="name"
          width="140"
        />
        <el-table-column
          label="群成员数量"
          sortable
          prop="member_count"
          width="120"
        />
        <el-table-column
          label="描述"
          prop="description"
        />
        <el-table-column
          label="receiver"
          prop="receiver"
        />

        <!-- <el-table-column
          label="身份"
          :filters="[{ text: '创建者', value: 'owner' }, { text: '管理员', value: 'administrator' },{ text: '普通群员', value: 'masses' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.status == 'owner' ? '群的创建者': scope.row.status == 'administrator' ? '群的管理者': '普通群员' }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag effect="dark" size="medium" :type="scope.row.status == 'owner' ? 'danger' : scope.row.status == 'administrator' ? 'success' : ''">{{ scope.row.status }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column
          label="机器人"
        >
          <template slot-scope="scope">
            <!-- <div class="avator">
              <img :src="scope.row.robot.img">
              <span>{{ scope.row.robot.name }}</span>
            </div> -->
          </template>
        </el-table-column>
        <el-table-column
          label="channel"
        ><template slot-scope="scope">
          <div v-if="scope.row.channels">
            <el-popover v-for="(item, index) in scope.row.channels.data.slice(0,2)" :key="index" trigger="hover" placement="top">
              <p>{{ item.name }}</p>
              <el-tag slot="reference" class="tag-item" size="small" effect="plain">{{ item.name }}</el-tag>
            </el-popover>
            <el-popover v-if="scope.row.channels.data.length>2" trigger="hover" placement="top">
              <p>访问更多数据请前往详情页</p>
              <el-tag slot="reference" class="tag-item" size="small" effect="plain">More</el-tag>
            </el-popover>
          </div>
        </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_at"
        />
        <el-table-column
          align="right"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="small"
              placeholder="输入关键字搜索"
              @keyup.enter.native="Search"
            >
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next, jumper, total"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'Order',
  data() {
    return {
      list: [],
      total: 0,
      search: '',
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      request({
        url: `/backend/me/receivers`,
        method: 'get',
        params: {
          page: this.currentPage,
          perPage: this.pageSize,
          keywords: this.search
        }
      }).then(res => {
        console.log(res, 'res')
        this.list = res.data
        this.total = res.meta.pagination.total
        this.loading = false
      })
    },
    Search() {
      console.log('开始搜索')
      this.currentPage = 1

      this.getList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    handleEdit(oindex, row) {
      console.log(oindex, row)
      this.$router.push({
        path: `order/list/${row.id}`,
        query: {
          hideHeader: true
        }
      })
    },
    filterTag(value, row) {
      return row.status === value
    }
  }
}
</script>
<style lang="scss" scoped>
.order {
  padding: 20px;
  .h3 {
    padding: 12px 20px;
    background: #f4f4f5;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    border: 1px solid #ececec;
  }
}
.avator {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 6px;
  }
}
.tag-item {
  margin-right: 4px;
  margin-top: 4px;
}
.pagination {
  text-align: right;
  margin-bottom:  30px;
      text-align: right;
    background: #fff;
    padding: 10px 0;

}
</style>
