<template>
  <div class="order">
    <div class="middle">
      <h3 class="h3"><span>定制频道列表</span> <el-button type="primary" @click="creates">新建</el-button></h3>
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        max-height="600"
      >
        <el-table-column
          label="ID"
          prop="id"
          width="140"
          sortable
        />
        <el-table-column
          label="名称"
          prop="name"
          width="140"
        />
        <el-table-column
          label="描述"
          prop="description"
        />
        <!-- <el-table-column
          label="创建者"
        >
          <template slot-scope="scope">
            <div class="avator">
              <svg-icon icon-class="guanfang" />
              <span>官方</span>
            </div>
          </template>
        </el-table-column> -->
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
            >定制</el-button>
            <el-button
              size="mini"
              @click="handleModify(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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

    <!-- 新建 -->
    <el-dialog title="创建频道" :visible.sync="dialogFormVisible" width="34%" destroy-on-close class="channel-dialog">
      <el-form ref="channelForm" :model="form" :rules="rules">
        <el-form-item label="名称:" :label-width="formLabelWidth" required prop="name">
          <el-input v-model="form.name" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth" required prop="description">
          <el-input
            v-model="form.description"
            autocomplete="off"
            class="input"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'Channels',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      search: '',
      currentPage: 1,
      pageSize: 10,
      // 新建
      dialogFormVisible: false,
      form: {
        name: '',
        description: ''
      },
      formLabelWidth: '80px',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { max: 100, message: '长度在 100 个字符', trigger: 'blur' }
        ]
      },
      type: 'add', // 默认创建
      activeId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      request({
        url: `/backend/channels`,
        method: 'get',
        params: {
          page: this.currentPage,
          perPage: this.pageSize,
          onlyOwner: 1,
          keywords: this.search
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
      this.$router.push({
        path: `/channel/list/${row.id}`,
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
          url: `/backend/channels/${row.id}`,
          method: 'delete'

        }).then(res => {
          this.list.splice(oindex, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {

      })
    },
    handleModify(oindex, row) {
      this.type = 'modify'
      this.form = {
        name: row.name,
        description: row.description
      }
      this.activeId = row.id
      this.dialogFormVisible = true
    },
    Search() {
      console.log('开始搜索')
      this.currentPage = 1

      this.getList()
    },
    // 新建
    creates() {
      this.type = 'add'
      this.form = {
        name: '',
        desc: ''
      }
      if (this.$refs.channelForm) {
        this.$refs.channelForm.resetFields()
      }
      this.dialogFormVisible = true
    },
    cancel() {
      this.form = {
        name: '',
        desc: ''
      }
      this.dialogFormVisible = false
    },

    submit() {
      this.$refs.channelForm.validate(valid => {
        console.log(valid, 'valid')
        if (valid) {
          if (this.type === 'add') {
            request({
              url: `/backend/channels`,
              method: 'post',
              data: this.form
            }).then(res => {
              this.dialogFormVisible = false
              this.getList()
            })
          } else {
            request({
              url: `/backend/channels/${this.activeId}`,
              method: 'put',
              data: this.form
            }).then(res => {
              this.dialogFormVisible = false
              this.getList()
            })
          }
        }
      })
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

</style>
<style lang="scss">
.channel-dialog {
  .el-dialog {
    min-width: 320px
  }
}
</style>
