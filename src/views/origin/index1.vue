<template>
  <div class="order">
    <div class="middle">

      <h3 class="h3">
        <div class="head">
          <span>源列表</span>
          <el-radio-group v-model="defaults" size="small" @change="filter">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item.value" :disabled="item.disable">{{ item.name }}</el-radio-button>
          </el-radio-group>
          <span class="tip">切换过滤时不保留上次已选择源!</span>
          <a class="link" href="https://jinshuju.net/f/ERQD2x" target="_blank">没有我想要的源？</a>
        </div>
      </h3>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="list"
        style="width: 100%"
        max-height="600"
        :row-key="handleRowKey"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          reserve-selection
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
export default {
  name: 'Origin',
  props: {
    type: {
      type: String,
      default: ''
    },
    chose: {
      type: Array,
      default: () => []
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
        value: 'dc',
        disable: true
      }, {
        name: '财经媒体',
        value: 'media.live',
        disable: true
      }],
      multipleSelection: []
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
        this.toggleSelection(this.chose)
      })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getList()
    },
    Search() {
      console.log('开始搜索')
      this.currentPage = 1
      this.getList()
      // this.list = this.list.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    filter() {
      this.currentPage = 1
      // this.multipleSelection = []
      this.$nextTick(() => {
        this.getList()
      })
    },
    handleRowKey(row) {
      return row.subsourcable_type + row.id
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
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
    width: 100%;
    span {
      margin-right: 16px;
    }
}
.tip {
  font-size: 14px;
  color: orange;
  margin-left: 20px;
}
.link {
  margin-left: auto;
  color: #03a9f4;
  font-size: 14px;
}
</style>

