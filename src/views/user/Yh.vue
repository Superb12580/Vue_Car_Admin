<template>
    <div>
        <el-table height="520px"
                  stripe
                  :data="page.records.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column
                    width="120px"
                    label="用户名">
                <template slot-scope="scope">
                    <span><b>{{scope.row.userName}}</b></span>
                </template>
            </el-table-column>
            <el-table-column
                    width="100px"
                    label="性别">
                <template slot-scope="scope">
                    <span>{{scope.row.gender === 1 ? '男' : '女'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="邮箱"
                    prop="email">
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="注册时间"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    width="80px"
                    label="是否认证">
                <template slot-scope="scope">
                    <span v-if="scope.row.sfrz === 1" style="color: red">已认证</span>
                    <span v-else>未认证</span>
                </template>
            </el-table-column>
            <el-table-column
                    width="300px"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.sfrz === 0" style="margin-left: 30px" size="mini" type="success"
                               @click="rz(scope.$index, scope.row)">设为车家号
                    </el-button>
                    <el-button v-else style="margin-left: 30px" size="mini" type="text"
                               @click="rz(scope.$index, scope.row)">取消认证
                    </el-button>
                    <el-button style="margin-left: 30px" size="mini" type="text" @click="xq(scope.$index, scope.row)">
                        详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
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
<!--        弹窗-->
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
    name: 'Yh',
    // 页面刷新
    inject: ['reload'],
    data() {
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
            this.axios.get('/user/adminList?size=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/user/adminList?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        // 认证
        rz(index, row) {
            this.$confirm('此操作将变更用户设置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const that = this
                if (row.sfrz === 0) {
                    this.axios.post('/user/rz', {userId: row.userId}).then(function (rest) {
                        that.msg(rest.data.msg)
                    }, function (error) {
                        console.log(error)
                    })
                } else {
                    this.axios.post('/user/qxrz', {userId: row.userId}).then(function (rest) {
                        that.msg(rest.data.msg)
                    }, function (error) {
                        console.log(error)
                    })
                }
                // 刷新页面
                that.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 详情
        xq(index, row) {
            this.dialogFormVisible = true
            const that = this
            this.axios.get('/user/user?userId=' + row.userId).then(function (rest) {
                that.user = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        // resetForm (formName) {
        //   this.$refs[formName].resetFields()
        // },
        // 提示
        msg(data) {
            this.$message({
                showClose: true,
                message: data,
                type: 'success'
            })
        },
        // 保存
        // submitUserForm (formName) {
        //   this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //       const that = this
        //       this.axios.post('/user/addOrPutAdmin', that.labelForm).then(function (rest) {
        //         const data = rest.data
        //         that.msg(data.msg)
        //         if (data.code === 200) {
        //           that.dialogFormVisible = false
        //           that.reload()
        //         }
        //         that.resetForm('labelForm')
        //       }, function (error) {
        //         console.log(error)
        //       })
        //     } else {
        //       console.log('error submit!!')
        //       return false
        //     }
        //   })
        // }
    },
    created() {
        const that = this
        this.axios.get('/user/adminList').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
</style>
