<template>
  <div>
    <div v-if="page.total !== 0" class="left2">
      <!--一条新闻-->
      <div class="ytxw" v-for="news in page.records">
        <!--新闻图-->
        <div class="xwt">
          <router-link :to="{path: '/wzxq',query: {id: news.id}}">
            <img style="width: 100%;height: 100%" v-if="news.newsPhoto" :src="news.newsPhoto">
            <img style="width: 100%;height: 100%" v-else src="../../assets/0.jpg">
          </router-link>
        </div>
        <!--新闻右侧-->
        <div class="xwyc">
          <router-link :to="{path: '/wzxq',query: {id: news.id}}"><h3 style="height: 60px">{{news.title}}</h3></router-link>
          <a href="#" @click="xq(news.user.userId)" ><h4 style="float: left">{{news.user.userName}}</h4></a>
          <div style="margin-top: 25px;float: left">
            <i class="vip"><img src="../../assets/vip.png" alt="vip" /></i>
            <span style="font-size: 14px;margin-left: 20px">{{news.createTime}}</span>
          </div>
          <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{news.count}}</h5>
        </div>
        <div style="float: right;margin-top: 60px;margin-right: 20px">
          <el-button type="text" @click="bh(news)"><img style="width: 60px" src="../../assets/驳回.png">驳回</el-button>
        </div>
      </div>
      <div style="float: left;margin: 30px 0 30px 50px">
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
    </div>
    <div style="padding: 200px 350px" v-else><h2 style="color: red">暂无数据</h2></div>
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
  name: 'Yfb',
  inject: ['reload'],
  data () {
    return {
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
    handleSizeChange (val) {
      const that = this
      this.axios.get('/news/list?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.axios.get('/news/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
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
    },
    bh(news) {
      const that = this
      this.$confirm('此操作将变更设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('/news/bhAdmin', { id: news.id, userId: news.user.userId, title: news.title}).then(function (rest) {
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
    }
  },
  created () {
    const that = this
    this.axios.get('/news/list').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .left2 {
    width: 850px;
    float: left;
  }
  .ytxw {
    width: 1000px;
    height: 200px;
    margin: 10px 20px;
    border: 1px solid #ccc;
    float: left;
  }
  .vip img{
    margin: 0 3px;
    width: 40px;
  }
  .xwt {
    width: 220px;
    height: 160px;
    float: left;
    margin: 20px;
  }
  .xwyc {
    width: 530px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: left;
  }
  a {
    text-decoration: none;
    color: #1f2129;
  }
  a:hover {
    color: red;
  }
</style>
