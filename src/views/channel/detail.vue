<template>
  <div>
    <div class="detail">
      <div class="top">
        <div v-loading="loading1" class="card">
          <el-descriptions title="频道信息" border :column="2">
            <el-descriptions-item label="索引">{{ info.id }}</el-descriptions-item>
            <el-descriptions-item label="名称">{{ info.name }}</el-descriptions-item>
            <el-descriptions-item label="描述">{{ info.description }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ info.created_at }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="top content">
        <div>
          <div class="head">
            <span>源列表</span>
            <el-button type="primary" size="medium" @click="add">添加</el-button>
          </div>
          <el-divider />
          <el-table
            v-loading="loading"
            :data="list"
            style="width: 100%"
            max-height="600"
          >
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
                <div v-if="scope.row.tags">
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
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template></el-table-column>
          </el-table>

        </div>
      </div>
    </div>
    <!-- 添加源 -->
    <el-dialog title="添加源" :visible.sync="dialogFormVisible" destroy-on-close class="origin-dialog" width="80%">
      <OriginList ref="origin" type="add" :chose="list" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import OriginList from '../origin/index1'
import request from '@/utils/request'
export default {
  name: 'ChannelDetail',
  components: {
    OriginList
  },
  data() {
    return {
      loading1: true,
      loading: false,
      info: {},
      dialogFormVisible: false,
      list: [],
      list1: [],
      search: ''
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    this.getInfo()
    this.getOriginList()
  },
  methods: {
    getInfo() {
      request({
        url: `/backend/channels/${this.id}`,
        method: 'get'
      }).then(res => {
        console.log(res, 'res')
        this.info = res.data
        this.list = res.data.subsources
        this.list1 = res.data.subsources
        this.loading1 = false
      })
    },
    getOriginList() {

    },
    add() {
      this.dialogFormVisible = true
    },
    // 添加源
    submit() {
      console.log(this.$refs.origin.multipleSelection)
      request({
        url: `/backend/channels/${this.id}/subsources`,
        method: 'post',
        data: {
          subsources: this.$refs.origin.multipleSelection.map(item => {
            return {
              id: item.id,
              subsourcable_type: item.subsourcable_type
            }
          })
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.dialogFormVisible = false
        this.getInfo()
      })
    },
    Search() {
      this.list = this.list1.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    handleDelete(oindex, row) {
      this.$confirm('此操作将永久删除源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: `/backend/channels/${this.id}/subsources/remove`,
          method: 'post',
          data: {
            subsources: [{
              'id': row.id,
              'subsourcable_type': row.subsourcable_type
            }]
          }
        }).then(res => {
          this.list.splice(oindex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {

      })
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
.head {
  display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
  >span {
    margin-right: 20px;
  }
}
.content {
  padding: 20px;
}
</style>
<style lang="scss">
.origin-dialog {
  .el-dialog {
  max-width: 1080px;
  }
  .el-dialog__body {
    padding: 0;
      .order {
        padding: 0 10px;
      }
  }
  .el-dialog__footer {
    padding-top: 0;
  }
  .pagination {
    margin-bottom: 0;
  }
}
</style>
