<template>
    <div>
        <div class="a">
            <div class="a1" style="background-color: #33CABB">
                <router-link :to="{path: '/dt'}">
              <div style="float: left;width: 130px;height: 120px">
                <img src="../assets/sy2.jpg" style="width: 100px"/>
              </div>
              <div style="float: right;width: 170px;height: 120px">
                <h3>已发布动态</h3>
                <span>{{map.yfbdt}}</span>
              </div>
                </router-link>
            </div>
            <div class="a2" style="background-color: #F96868">
                <router-link :to="{path: '/yh'}">
              <div style="float: left;width: 130px;height: 120px">
                <img src="../assets/sy1.jpg" style="width: 100px"/>
              </div>
              <div style="float: right;width: 170px;height: 120px">
                <h3>注册用户</h3>
                <span>{{map.zcyh}}</span>
              </div>
                </router-link>
            </div>
            <div class="a3" style="background-color: #926DDE">
                <router-link :to="{path: '/'}">
              <div style="float: left;width: 130px;height: 120px">
                <img src="../assets/sy3.jpg" style="width: 100px"/>
              </div>
              <div style="float: right;width: 170px;height: 120px">
                <h3>已录入车型</h3>
                <span>{{map.ylrcx}}</span>
              </div>
                </router-link>
            </div>
        </div>
        <div class="b">
            <div style="float: left;width: 450px;margin-top: 15px">
                <span style="font-size: 14px"><b>文章审核通过率</b></span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="map.wzshtgl"></el-progress>
                <br>
                <span style="font-size: 14px"><b>动态合格率</b></span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="map.dthgl" status="success"></el-progress>
                <br>
                <span style="font-size: 14px"><b>转发合格率</b></span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="map.zfhgl" status="exception"></el-progress>
                <br>
                <span style="font-size: 14px"><b>评论合格率</b></span>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="map.plhgl" status="warning"></el-progress>
            </div>
            <div style="margin-left: 500px">
                <span style="font-size: 12px;"><b>车家号用户比</b></span>
                <el-progress type="circle" :percentage="map.cjhzb" style="margin-top: 15px"></el-progress>
                <el-progress type="circle" status="success" :percentage="map.ptyhzb"></el-progress>
            </div>
        </div>
        <div class="x">
            <div class="block">
                <div class="radio" style="padding: 30px">
                    <b>工作事项 </b>
                    <el-radio-group v-model="reverse">
                        <el-radio :label="true">倒序</el-radio>
                        <el-radio :label="false">正序</el-radio>
                    </el-radio-group>
                </div>
                <div style="width: 270px">
                <el-timeline :reverse="reverse">
                    <el-timeline-item
                            v-for="(item, index) in page.records"
                            :key="index"
                            :timestamp="item.createTime">
                        {{item.text}}
                    </el-timeline-item>
                </el-timeline>
                </div>
                <el-button style="float: right" type="text" @click="xq">更多</el-button>
            </div>
        </div>
        <div class="d">
            <div class="d2" style="background-color: #926DDE">
                <router-link :to="{path: '/yfb'}">
                <div style="float: left;width: 130px;height: 120px">
                    <img src="../assets/sy3.jpg" style="width: 100px"/>
                </div>
                <div style="float: right;width: 170px;height: 120px">
                    <h3>已发布文章</h3>
                    <span>{{map.yfbwz}}</span>
                </div>
                </router-link>
            </div>
            <div class="d3" style="background-color: #15C377">
                <router-link :to="{path: '/dsh'}">
                <div style="float: left;width: 130px;height: 120px">
                    <img src="../assets/sy4.jpg" style="width: 100px"/>
                </div>
                <div style="float: right;width: 170px;height: 120px">
                    <h3>待审核文章</h3>
                    <span>{{map.dsh}}</span>
                </div>
                </router-link>
            </div>
            <el-button style="float: right" type="text" @click="dialogForm2Visible = true">更多</el-button>
        </div>
<!--        弹出框-->
        <el-dialog title="工作日志" :visible.sync="dialogFormVisible" width="1000px">
            <el-table height="460px"
                      stripe
                      :data="page2.records.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
                      style="width: 100%;padding-left: 20px;padding-right: 20px">
                <el-table-column
                        width="550px"
                        label="执行内容"
                        prop="text">
                </el-table-column>
                <el-table-column
                        width="200px"
                        label="操作时间"
                        prop="createTime">
                </el-table-column>
                <el-table-column
                        width="140px"
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="sc(scope.row)" mini>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page2.current"
                        :page-size="page2.size"
                        layout="prev, pager, next, jumper"
                        :total="page2.total">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="数据统计" :visible.sync="dialogForm2Visible">
            <div class="a1" style="background-color: #33CABB">
                <router-link :to="{path: '/zf'}">
                    <div style="float: left;width: 130px;height: 120px">
                        <img src="../assets/sy2.jpg" style="width: 100px"/>
                    </div>
                    <div style="float: right;width: 170px;height: 120px">
                        <h3>转发量</h3>
                        <span>{{map.zfl}}</span>
                    </div>
                </router-link>
            </div>
            <div class="a2" style="background-color: #F96868">
                <router-link :to="{path: '/pl'}">
                    <div style="float: left;width: 130px;height: 120px">
                        <img src="../assets/sy1.jpg" style="width: 100px"/>
                    </div>
                    <div style="float: right;width: 170px;height: 120px">
                        <h3>评论数</h3>
                        <span>{{map.pls}}</span>
                    </div>
                </router-link>
            </div>
            <div class="a3" style="background-color: #926DDE;margin-top: 30px">
                <router-link :to="{path: '/bq'}">
                    <div style="float: left;width: 130px;height: 120px">
                        <img src="../assets/sy3.jpg" style="width: 100px"/>
                    </div>
                    <div style="float: right;width: 170px;height: 120px">
                        <h3>已上线标签</h3>
                        <span>{{map.ysxbq}}</span>
                    </div>
                </router-link>
            </div>
            <div class="a1" style="background-color: #15C377;margin-top: 30px">
                <router-link :to="{path: '/'}">
                    <div style="float: left;width: 130px;height: 120px">
                        <img src="../assets/sy4.jpg" style="width: 100px"/>
                    </div>
                    <div style="float: right;width: 170px;height: 120px">
                        <h3>视频集</h3>
                        <span>{{map.spj}}</span>
                    </div>
                </router-link>
            </div>
        </el-dialog>
    </div>
</template>

<script>export default {
    name: 'Sy',
    // 页面刷新
    inject: ['reload'],
    data() {
        return {
            reverse: false,
            dialogFormVisible: false,
            dialogForm2Visible: false,
            search: '',
            page: {
                records: [],
                current: 1,
                total: 20,
                size: 6
            },
            page2: {
                records: [],
                current: 1,
                total: 20,
                size: 6
            },
            map: {}
        };
    },
    methods: {
        handleSizeChange(val) {
            const that = this
            this.axios.get('/record-admin/list?size=' + val).then(function (rest) {
                that.page2 = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/record-admin/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page2 = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        xq() {
            this.dialogFormVisible = true
            const that = this
            this.axios.get('/record-admin/list').then(function (rest) {
                that.page2 = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        sc(row){
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                const that = this
                this.axios.post('/record-admin/deleteAdmin', { id: row.id}).then(function (rest) {
                    that.msg(rest.data.msg)
                    // 刷新页面
                    that.reload()
                }, function (error) {
                    console.log(error)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 提示
        msg(data) {
            this.$message({
                showClose: true,
                message: data,
                type: 'success'
            })
        }
    },
    created() {
        const that = this
        this.axios.get('/record-admin/list').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
        this.axios.get('/record-admin/home').then(function (rest) {
            that.map = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #fff;
    }
    .a {
      width: 1000px;
      padding: 10px;
      height: 120px;
      margin: 0 auto;
    }
    .a1,.a2,.a3 {
      width: 300px;
      height: 120px;
      float: left;
      text-align: center;
      margin-left: 30px;
    }
    .d {
        width: 670px;
        padding: 10px;
        height: 120px;
    }
    .x {
        width: 300px;
        height: 400px;
        float: right;
    }
    .d2,.d3 {
        width: 300px;
        height: 120px;
        float: left;
        text-align: center;
        margin-left: 30px;
    }
    .b {
      width: 660px;
      height: 320px;
      float: left;
        margin-left: 30px;
    }
    .c {
      width: 1000px;
      float: left;
      margin: 50px auto;
    }
</style>
