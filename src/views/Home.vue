<template>
    <div class="home">
        <div class="head">
            <div style="float: left">
            <router-link :to="{path: '/'}"><img src="../assets/logo.png"></router-link>
            </div>
            <div style="float: left;margin-top: 15px">
                <h1>后台管理</h1>
            </div>
            <div class="people">
                <img v-if="user.photo" :src="user.photo">
                <el-avatar v-else :size="60"> {{user.userName}}</el-avatar>
                <div class="others">
                    <span>
                        <el-link type="primary" @click="dialogFormVisible = true">个人中心</el-link>
                        <el-link type="danger" @click="layout">注 销</el-link>
                    </span>
                </div>
            </div>
        </div>
        <div class="left">
            <el-col :span="24">
                <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router
                        unique-opened="true"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>文章管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/yfb">
                                <i class="el-icon-menu"></i>
                                <span slot="title">已发布</span>
                            </el-menu-item>
                            <el-menu-item index="/dsh">
                                <i class="el-icon-menu"></i>
                                <span slot="title">待审核</span>
                            </el-menu-item>
                            <el-menu-item index="/ybh">
                                <i class="el-icon-menu"></i>
                                <span slot="title">已驳回</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>汽车频道</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/lbt">
                                <i class="el-icon-menu"></i>
                                <span slot="title">轮播图</span>
                            </el-menu-item>
                            <el-menu-item index="/style">
                                <i class="el-icon-menu"></i>
                                <span slot="title">车型</span>
                            </el-menu-item>
                            <el-menu-item index="/car">
                                <i class="el-icon-menu"></i>
                                <span slot="title">车</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>动态管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/dt">
                                <i class="el-icon-menu"></i>
                                <span slot="title">动态</span>
                            </el-menu-item>
                            <el-menu-item index="/zf">
                                <i class="el-icon-menu"></i>
                                <span slot="title">转发</span>
                            </el-menu-item>
                            <el-menu-item index="/pl">
                                <i class="el-icon-menu"></i>
                                <span slot="title">评论</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/yh">
                                <i class="el-icon-menu"></i>
                                <span slot="title">用户</span>
                            </el-menu-item>
                            <el-menu-item index="/cjh">
                                <i class="el-icon-menu"></i>
                                <span slot="title">车家号</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/zdb">
                        <i class="el-icon-menu"></i>
                        <span slot="title">折叠板</span>
                    </el-menu-item>
                    <el-menu-item index="/bq">
                        <i class="el-icon-document"></i>
                        <span slot="title">标签维护</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据处理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/data_type">
                                <i class="el-icon-menu"></i>
                                <span slot="title">数据类型</span>
                            </el-menu-item>
                            <el-menu-item index="/data_dictionary">
                                <i class="el-icon-menu"></i>
                                <span slot="title">数据字典</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/rz">
                        <i class="el-icon-setting"></i>
                        <span slot="title">日志管理</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </div>
        <div class="right">
            <div class="right_center">
                <router-view/>
            </div>
        </div>
        <el-dialog title="个人资料" :visible.sync="dialogFormVisible">
            <div style="text-align: center">
                <el-image v-if="user.photo" :src="user.photo" style="width: 80px;height: 80px">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
                <el-avatar v-else :size="80"> {{user.userName}}</el-avatar>
                <h3 style="color: red">汽车之家后台管理员</h3><br>
                <span>{{user.userName}}</span><br><br><br>
                <span>{{user.email}}</span><br>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                user: {},
                dialogFormVisible: false
            }
        },
        methods: {
            layout() {
                const user = this.$store.getters.GET_USER
                const that = this
                this.axios.post('/login/layout', user).then(function (rest) {
                    // 提示消息
                    that.msg('注销成功')
                }, function (error) {
                    console.log(error)
                })
                // this.$store.commit('REMOVE_USER')
                this.$store.commit('SET_USER', '')
                this.$store.commit('REMOVE_USER', '')
                this.$router.push('/login')
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
            this.user = this.$store.getters.GET_USER
        }
    }
</script>
<style scoped>
    .head {
        width: 1300px;
        height: 100px;
        /*background-color: #ddd;*/
        margin: 0 auto;
        padding-bottom: 10px;
        border: 1px solid #ccc;
    }

    .left {
        width: 240px;
        float: left;
        margin-top: 10px;
        margin-left: 110px;
    }

    .right {
        width: 1040px;
        float: right;
        margin-right: 110px;
    }

    .right_center {
        width: 1000px;
        margin: 10px 20px;
    }


    /*    头部头像*/
    .head .people {
        display: inline-block;
        margin-top: 20px;
        position: absolute;
        left: 1320px;
        top: 8px;
    }

    .head .people.show {
        display: block;
    }

    .head .people.hidden {
        display: none;
    }

    .head .people a.list {
        text-decoration: none;
        color: #000;
    }

    .head .people img {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
    }

    .head .people:hover .others {
        opacity: 1;
        transition: all 1s;
    }

    .head .people .others {
        width: 100px;
        height: 60px;
        background-color: #fff;
        opacity: 0;
        z-index: 10;
        position: absolute;
        top: 60px;
        left: 0;
    }

    .head .people .others a {
        margin: 10px 5px;
        display: block;
        text-decoration: none;
        color: #000 !important;
    }

    .head .people .others a:hover {
        background-color: #ff6700;
    }

    /*    结束头像*/
</style>
