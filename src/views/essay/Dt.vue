<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="已发布" name="first">
                <div v-if="page.total !== 0">
                    <div>
                        <el-timeline>
                            <el-timeline-item v-for='(record,index) in page.records' :key="index" placement="top">
                                <el-button style="margin-left: 830px" icon="el-icon-delete" type="text"
                                           @click="sc(record.essayId, record.essayTitle)">删除
                                </el-button>
                                <el-card style="padding-left: 50px">
                                    <el-button @click="xq(record.userId)">
                                        <img style="width: 80px;height: 80px" v-if="record.user.photo"
                                             :src="record.user.photo">
                                        <el-avatar v-else :size="80" style="color: indianred">
                                            {{record.user.userName}}
                                        </el-avatar>
                                    </el-button>
                                    <h2>
                                        <router-link :to="{path: '/dtxq',query: {essayId: record.essayId}}">
                                            {{record.essayTitle}}
                                        </router-link>
                                    </h2>
                                    <h4 style="color: red" v-if="record.essayLabel">
                                        <span style="margin-right: 20px" v-for="item in record.essayLabel">#{{item.labelText}}#</span>
                                    </h4>
                                    发表于 {{record.createTime}}
                                    <el-badge :value="record.forwardCount" class="item2" type="primary">
                                        <el-button size="small" @click="">转发</el-button>
                                    </el-badge>
                                    <el-badge :value="record.agreeCount" class="item">
                                        <el-button size="small" @click="">点赞</el-button>
                                    </el-badge>
                                    <el-badge :value="record.commentCount" class="item" type="warning">
                                        <el-button size="small" @click="">评论</el-button>
                                    </el-badge>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
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
                </div>
                <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
            </el-tab-pane>
            <el-tab-pane label="已删除" name="second">
                <div v-if="page2.total !== 0">
                    <div>
                        <el-timeline>
                            <el-timeline-item v-for='(record,index) in page2.records' :key="index" placement="top">
                                <el-button style="margin-left: 830px" type="text" @click="fb(record.essayId, record.essayTitle)">重新发布
                                </el-button>
                                <el-card style="padding-left: 50px">
                                    <el-button @click="xq(record.userId)">
                                        <img style="width: 80px;height: 80px" v-if="record.user.photo"
                                             :src="record.user.photo">
                                        <el-avatar v-else :size="80" style="color: indianred">
                                            {{record.user.userName}}
                                        </el-avatar>
                                    </el-button>
                                    <h2>
                                        <router-link :to="{path: '/dtxq',query: {essayId: record.essayId}}">
                                            {{record.essayTitle}}
                                        </router-link>
                                    </h2>
                                    <h4 style="color: red" v-if="record.essayLabel">
                                        <span style="margin-right: 20px" v-for="item in record.essayLabel">#{{item.labelText}}#</span>
                                    </h4>
                                    发表于 {{record.createTime}}
                                    <el-badge :value="record.forwardCount" class="item2" type="primary">
                                        <el-button size="small" @click="">转发</el-button>
                                    </el-badge>
                                    <el-badge :value="record.agreeCount" class="item">
                                        <el-button size="small" @click="">点赞</el-button>
                                    </el-badge>
                                    <el-badge :value="record.commentCount" class="item" type="warning">
                                        <el-button size="small" @click="">评论</el-button>
                                    </el-badge>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <div>
                        <el-pagination
                                @size-change="handleSizeChange2"
                                @current-change="handleCurrentChange2"
                                :current-page="page2.current"
                                :page-sizes="[5, 8, 10, 15]"
                                :page-size="page2.size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="page2.total">
                        </el-pagination>
                    </div>
                </div>
                <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
            </el-tab-pane>
        </el-tabs>
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
    name: 'Dt',
    inject: ['reload'],
    data() {
        return {
            // 发布
            page: {
                records: [],
                current: 1,
                total: 20,
                size: 5
            },
            // 删除
            page2: {
                records: [],
                current: 1,
                total: 20,
                size: 5
            },
            dialogFormVisible: false,
            activeName: 'first',
            user: {}
        }
    },
    methods: {
        handleSizeChange(val) {
            const that = this
            this.axios.get('/essay/list?size=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/essay/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleSizeChange2(val) {
            const that = this
            this.axios.get('/essay/listAdmin?size=' + val).then(function (rest) {
                that.page2 = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange2(val) {
            const that = this
            this.axios.get('/essay/listAdmin?size=' + that.page2.size + '&current=' + val).then(function (rest) {
                that.page2 = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleClick(tab, event) {
            console.log(tab, event)
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
        // 下架动态
        sc(essayId, essayTitle) {
            const that = this
            this.$confirm('此操作将变更设置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/essay/deleteAdmin', {essayId: essayId, essayTitle: essayTitle}).then(function (rest) {
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
        // 重新发布
        fb(essayId, essayTitle) {
            const that = this
            this.$confirm('此操作将变更设置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/essay/fbAdmin', {essayId: essayId, essayTitle: essayTitle}).then(function (rest) {
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
        this.axios.get('/essay/list').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
        this.axios.get('/essay/listAdmin').then(function (rest) {
            that.page2 = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .item2 {
        margin-top: 10px;
        margin-right: 40px;
        margin-left: 300px;
    }

    .vip img {
        margin: 0 3px;
        width: 40px;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    a:hover {
        color: red;
    }
</style>
