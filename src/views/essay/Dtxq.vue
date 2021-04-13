<template>
  <div>
    <div class="checkbox">
    <div class="detail">
      <div style="height: 100px">
        <h1 style="color: dodgerblue;">{{essay.essayTitle}}</h1>
        <h4 style="color: red" v-if="essay.label">
          <span style="margin-right: 20px" v-for="item in essay.label">#{{item.labelText}}#</span>
        </h4>
      </div>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="essay.essayText"></div>
    </div>
    <div id="homepage">
      <div class="box">
        <div class="header">
          <h2>评论</h2>
          <span class="all">共<span>{{essay.commentCount}}</span>条评论</span>
          <el-button style="margin-left: 600px" type="primary" circle icon="el-icon-s-promotion" @click="">{{essay.forwardCount}}</el-button>
          <el-button type="success" circle icon="el-icon-thumb" @click="">{{essay.agreeCount}}</el-button>
        </div>
        <div class="call">
          <div class="left">
            <img style="width: 60px;height: 60px" src="../../assets/搬砖.jpg" alt="logo" />
          </div>
          <div class="right">
            <form>
              <textarea placeholder="评论" v-model="text"></textarea>
            </form>
            <div class="icon-left"></div>
            <div class="bottom">
              <div class="chose">
                <i class="icon-small"></i>
                <i class="icon-at"></i>
              </div>
              <div class="send">
                <span>140 </span>
                <a href="javascript:;" @click="">发表</a>
              </div>
            </div>
          </div>
        </div>
        <div class="comments" v-if="page.total !== 0">
          <div class="top">最新评论</div>
          <div class="items">
            <ul>
              <li v-for="(item,i) in page.records" :key="i">
                <div class="left">
                  <a href="#" @click="xq(item.user.userId)">
                    <img v-if="item.user.photo" :src="item.user.photo">
                    <el-avatar v-else :size="54"> {{item.user.userName}} </el-avatar>
                  </a>
                </div>
                <div class="right">
                  <div class="up">
                    <a href="#" @click="xq(item.user.userId)">{{item.user.userName}}</a>
                    <i class="icon-wangyi"></i>
                    <i class="icon-vip"><img src="../../assets/vip.png" alt="vip" /> </i>
                    &nbsp;:&nbsp;<span class="letter">{{item.commentText}}</span>
                  </div>
                  <div class="down">
                    <div class="time">{{item.createTime}}</div>
                    <div class="zan">
                      <a href="javascript:;" @click=""><i class="icon-zan"></i></a>
                      <span class="nums">(<span class="num">{{item.count}}</span>)</span>
                      <span>&nbsp;|&nbsp;</span> <a href="javascript:;"><span>回复</span></a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div style="margin-top: 20px">
            <el-pagination
              background="true"
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
        <div style="margin-left: 80px" v-else><h4 style="color: #475669">快来坐沙发吧...</h4></div>
      </div>
    </div>
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

<script>
export default {
  name: 'Dtxq',
  data () {
    return {
      essay: {},
      // 评论
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 10
      },
      // 评论正文
      text: '',
      dialogFormVisible: false,
      user: {}
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.axios.get('/comment/itemByEssayId/?essayId=' + that.essay.essayId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.axios.get('/comment/itemByEssayId/?essayId=' + that.essay.essayId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
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
    const essayId = this.$route.query.essayId
    const that = this
    // 动态详情
    this.axios.get('/essay/item/?essayId=' + essayId).then(rest => {
      that.essay = rest.data.data
      // 转成Markdown显示
      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      that.essay.essayText = md.render(that.essay.essayText)
    })
    // 评论初始化
    this.axios.get('/comment/itemByEssayId/?essayId=' + essayId).then(rest => {
      that.page = rest.data.data
    })
  }
}
</script>
<style scoped>
  .detail {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 5px;
  }

  h1 {
    text-align: center;
  }
  ul,
  li {
    margin: 0px;
    padding: 0px;
  }
  li {
    list-style: none;
  }

  body {
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #0c73c2;
  }
  a:hover{
    color: red;
  }
  .box .header {
    padding: 5px 0;
    border-bottom: 2px solid #c20c0c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .box .header h2 {
    font-weight: normal;
    font-size: 22px;
  }
  .box .header .all {
    margin-left: 20px;
    color: #666;
  }
  /* 评论 */
  .box .call {
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
  }
  .box .call .right {
    position: relative;
  }

  .box .call .right textarea {
    width: 800px;
    margin-left: 15px;
    height: 63px;
    padding: 5px 6px 6px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    line-height: 19px;
    outline: 0;
  }
  .box .call .right .icon-left {
    content: "";
    width: 10px;
    height: 10px;
    border: 1px solid #cdcdcd;
    border-top-color: transparent;
    border-right-color: transparent;
    background-color: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: 15px;
    left: 10px;
  }
  .box .call .right .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 15px;
  }

  .box .call .right .chose .icon-small,
  .box .call .right .chose .icon-at {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(../../assets/icon.png);
    background-repeat: no-repeat;
    margin-right: 10px;
  }
  .box .call .right .chose .icon-small {
    background-position: -40px -490px;
  }
  .box .call .right .chose .icon-at {
    background-position: -60px -490px;
  }
  .box .call .right .send {
    text-align: center;
  }
  .box .call .right .send span {
    color: #999;
    height: 25px;
    line-height: 25px;
  }
  .box .call .right .send a {
    display: inline-block;
    width: 46px;
    height: 25px;
    line-height: 25px;
    background-color: rgb(0, 153, 255);
    color: #fff;
    border-radius: 5px;
  }

  /* 热门评论 */
  .box .top {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    font-weight: bold;
    margin-top: 20px;
  }
  .box .items ul li {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .box .items ul li:last-child {
    border-bottom: 0;
  }
  .box .items ul li .left img {
    width: 50px;
    height: 50px;
  }
  .box .items ul li .right {
    width: 100%;
    margin-left: 10px;
  }
  .box .items ul li .son {
    width: 100%;
    background-color: #f4f4f4;
    margin-top: 10px;
    padding: 8px 19px;
    border: 1px solid #dedede;
    position: relative;
  }
  .box .items ul li .son i{
    content: "";
    width: 5px;
    height: 5px;
    border: 1px solid #dedede;
    border-top-color: transparent;
    border-right-color: transparent;
    background-color: #f4f4f4;
    transform: rotate(135deg);
    position: absolute;
    top: -4px;
    left: 15px;
  }
  .box .items ul li .right .up .icon-wangyi img {
    margin: 0 3px;
    width: 15px;
  }
  .box .items ul li .right .up .icon-vip img {
    margin: 0 3px;
    width: 30px;
  }
  .box .items ul li .right .down {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  .box .items ul li .right .down .time {
    color: #999;
  }

  .box .items ul li .right .down .zan {
    text-align: center;
  }
  .box .items ul li .right .down .zan .icon-zan {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/icon2.png);
    background-repeat: no-repeat;
    background-position: -150px 0;
  }
  .right .down .zan .nums {
    color: #333;
    margin: 0 5px;
  }
  .right .down .zan a {
    color: #666;
    margin: 0 5px;
  }
</style>
