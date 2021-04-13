<template>
  <div>
    <div class="left2">
      <div class="title" style="text-align: center;padding-top: 15px"><h2>{{news.title}}</h2></div>
      <div class="time" style="text-align: center"><h4>发布时间：<span style="color: #ff6700;margin-right: 30px">{{news.createTime}}</span>点击量：<span style="color: #ff6700">{{news.count}}</span></h4></div>
      <div class="text">{{news.text1}}</div>
      <img class="imgs" v-if="news.photo[0]" :src="news.photo[0].photoUrl">
      <div class="text">{{news.text2}}</div>
      <img class="imgs" v-if="news.photo[1]" :src="news.photo[1].photoUrl">
      <div class="text">{{news.text3}}</div>
      <img class="imgs" v-if="news.photo[2]" :src="news.photo[2].photoUrl">
      <div class="text">{{news.text4}}</div>
      <img class="imgs" v-if="news.photo[3]" :src="news.photo[3].photoUrl">
      <div class="text">{{news.text5}}</div>
      <img class="imgs" v-if="news.photo[4]" :src="news.photo[4].photoUrl">
      <div class="text">{{news.text6}}</div>
      <img class="imgs" v-if="news.photo[5]" :src="news.photo[5].photoUrl">
      <div class="text">{{news.text7}}</div>
      <el-col style="margin-left: 50px;margin-top: 20px;margin-bottom: 20px" :span="6" v-for="(photo,index) in news.photo" :key="index" :offset="1">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image style="width: 218px;height: 144px" :src="photo.photoUrl">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      </el-card>
      </el-col>
    </div>
  </div>
</template>
<!--选车-->
<script>
export default {
  name: 'Wzxq',
  data () {
    return {
      news: {}
    }
  },
  methods: {
  },
  created () {
    const id = this.$route.query.id
    const that = this
    // 初始化文章详情
    this.axios.get('/news/itemXq?id=' + id).then(function (rest) {
      that.news = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .imgs {
    width: 700px;
    margin-left: 90px;
    margin-top: 30px;
  }
  .left2 {
    margin-top: 5px;
    width: 880px;
  }
  a {
    text-decoration: none;
  }
  .title {
    margin: 0 auto;
    /*width: 800px;*/
    height: 70px;
  }
  .time {
    margin: 0 auto;
    width: 800px;
    height: 50px;
  }
  .text {
    width: 800px;
    margin: 0 auto;
    padding-top: 30px;
    text-indent: 35px;
  }
</style>
