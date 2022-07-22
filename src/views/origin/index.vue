<template>
  <div class="order">
    <div class="middle">

      <h3 class="h3">
        <div class="head">
          <span>源列表</span>
          <el-radio-group v-model="defaults" size="small" @change="filter">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item.value">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </div>

        <el-button v-if="type !== 'add'" type="primary" disabled @click="creates">新建</el-button>
      </h3>
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        max-height="600"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="type == 'add'"
          type="selection"
          width="55"
        />
        <el-table-column
          label="ID"
          prop="id"
          width="60"
          sortable
        />
        <el-table-column
          label="名称"
          prop="name"
          width="140"
        />
        <el-table-column
          label="描述"
          min-width="120"
        >
          <template slot-scope="scope">
            <p class="desc">{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="用户"
        >
          <template slot-scope="scope">
            <div class="avator">
              <img v-if="scope.row.avatar" :src="scope.row.avatar">
              <span>{{ scope.row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="tag"
        >
          <template slot-scope="scope">
            <div>
              <el-tag v-for="(item, index) in scope.row.tags.data" :key="index" class="tag-item" size="small" effect="plain">{{ item.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="type"
          prop="subsourcable_type_text"
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
import { getToken } from '@/utils/auth'
export default {
  name: 'Origin',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      search: '',
      currentPage: 1,
      pageSize: 10,
      // 新建
      defaults: 'twitter.follower',
      types: [{
        name: '推特作者',
        value: 'twitter.follower'
      }, {
        name: '推特列表',
        value: 'twitter.list'
      }, {
        name: 'Discord',
        value: 'dc'
      }, {
        name: '财经媒体',
        value: 'media.live'
      }],
      multipleSelection: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      request({
        url: `backend/subsources/${this.defaults}`,
        method: 'get',
        params: {
          page: this.currentPage,
          perPage: this.pageSize,
          keywords: this.search || ''
        }
      }).then(res => {
        console.log(res, 'res')
        this.list = res.data
        this.total = res.meta.pagination.total
        this.loading = false
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    handleEdit(oindex, row) {
      console.log(oindex, row)
      this.$router.push({
        path: `/channel/list/${oindex}`,
        query: {
          hideHeader: true
        }
      })
    },
    handleDelete(oindex, row) {
      this.$confirm('此操作将永久删除该频道, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: `/backend/channels?token=${getToken()}`,
          method: 'delete',
          params: {
            id: row.id
          }
        }).then(res => {
          this.list.splice(oindex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    Search() {
      console.log('开始搜索')
      this.currentPage = 1
      this.getList()
      // this.list = this.list.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    filter() {
      this.currentPage = 1
      this.getList()
    },
    creates() {}

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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.avator {
  display: flex;
  align-items: center;
  svg {
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
.input {
  max-width: 300px;
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
.head {
  display: flex;
    align-items: center;
    span {
      margin-right: 16px;
    }
}
</style>

