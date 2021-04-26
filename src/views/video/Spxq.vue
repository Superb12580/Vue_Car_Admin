<template>
  <div>
    <div class="left2">
      <div class="title" style="text-align: center;padding-top: 15px"><h2>{{video.title}}</h2></div>
      <div class="time" style="text-align: center"><h4>发布时间：<span style="color: #ff6700;margin-right: 30px">{{video.createTime}}</span>点击量：<span style="color: #ff6700">{{video.count}}</span></h4></div>
      <div class="text">{{video.videoText}}</div>
    </div>
  </div>
</template>
<!--选车-->
<script>
export default {
  name: 'Spxq',
  data () {
    return {
      video: {}
    }
  },
  methods: {
  },
  created () {
    const id = this.$route.query.id
    const that = this
    // 初始化文章详情
    this.axios.get('/video/itemXq?id=' + id).then(function (rest) {
      that.video = rest.data.data
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
