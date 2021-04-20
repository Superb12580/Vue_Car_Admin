<template>
  <div>
    <el-table height="550px"
              stripe
              :data="page.records.filter(data => !search || data.nr.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="120px"
              label="操作人">
        <template slot-scope="scope">
          <a href="#" @click="xq(scope.row.userId)" v-if="scope.row.userName"><b>{{scope.row.userName}}</b></a>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
              width="180px"
              label="内容"
              prop="nr">
      </el-table-column>
      <el-table-column
              width="200px"
              label="操作时间"
              prop="createTime">
      </el-table-column>
      <el-table-column
              width="300px"
              label="操作相关">
        <template slot-scope="scope">
          <a href="#" @click="" v-if="scope.row.objectName"><b>{{scope.row.objectName}}</b></a>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column
              width="180px"
              align="right">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button style="margin-left: 30px" size="mini" type="text" @click="sc(scope.row)">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="page.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
      </el-pagination>
    </div>
    <!--    弹出框-->
    <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
      <div style="height: 300px">
        <div style="text-align: center">
          <el-image v-if="user.photo" :src="user.photo" style="width: 80px;height: 80px">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <el-avatar v-else :size="80"> {{user.userName}} </el-avatar>
          <h4>{{user.sign}}</h4>
        </div>
        <div>
          <div style="float: left;margin-left: 100px">
            <el-form label-width="100px" style="width: 200px">
              <el-form-item label="生日：">
                <span>{{user.dateBirth}}</span>
              </el-form-item>
              <el-form-item label="积分：">
                <span>{{user.grade}}</span>
              </el-form-item>
              <el-form-item label="收藏：">
                <span>{{user.collectionCount}}</span>
              </el-form-item>
            </el-form>
          </div>
          <div style="float: right;margin-right: 100px">
            <el-form label-width="100px" style="width: 200px">
              <el-form-item label="消息：">
                <span>{{user.messageCount}}</span>
              </el-form-item>
              <el-form-item label="关注：">
                <span>{{user.attentionCount}}</span>
              </el-form-item>
              <el-form-item label="粉丝：">
                <span>{{user.fansCount}}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>export default {
  name: 'Rz',
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      search: '',
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      dialogFormVisible: false,
      user: {}
    }
  },
  methods: {
    handleSizeChange(val) {
      const that = this
      this.axios.get('/record/listAdmin?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      const that = this
      this.axios.get('/record/listAdmin?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 彻底删除
    sc(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/record/deleteAdmin', {id :row.id, nr: row.nr}).then(function (rest) {
          that.msg(rest.data.msg)
          // 刷新页面
          that.reload()
        }, function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 详情
    xq(userId) {
      this.dialogFormVisible = true
      const that = this
      this.axios.get('/user/user?userId=' + userId).then(function (rest) {
        that.user = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    }
  },
  created() {
    const that = this
    this.axios.get('/record/listAdmin').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  a {
    color: #606266;
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
</style>
