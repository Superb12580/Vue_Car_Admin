<template>
    <div>
        <div style="margin-left: 900px">
            <el-button type="text" @click="tj">添加标签</el-button>
        </div>
        <el-table height="500px"
                  stripe
                  :data="page.records.filter(data => !search || data.labelText.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column
                    width="200px"
                    label="标签名称">
                <template slot-scope="scope">
                    <span><b>{{scope.row.labelText}}</b></span>
                </template>
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="创建时间"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    width="200px"
                    label="最近操作"
                    prop="updateTime">
            </el-table-column>
            <el-table-column
                    width="100px"
                    label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.deleted === 1 ? '已禁用' : '已启用'}}</span>
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
                    <el-button v-if="scope.row.deleted === 1" style="margin-left: 30px" size="mini" type="success" @click="jy(scope.$index, scope.row)">启用</el-button>
                    <el-button v-else style="margin-left: 30px" size="mini" type="danger" @click="jy(scope.$index, scope.row)">禁用</el-button>

                    <el-button style="margin-left: 30px" size="mini" type="text" @click="bj(scope.$index, scope.row)">编辑</el-button>
                    <el-button style="margin-left: 30px" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">彻底删除</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="labelForm" :rules="rulesLabel" ref="labelForm" label-width="100px" class="demo-ruleForm" style="margin-left: 140px">
                <el-form-item label="标签名称" prop="labelText">
                    <el-input style="width: 300px" v-model="labelForm.labelText"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLabelForm ('labelForm')">保存</el-button>
                    <el-button @click="resetForm ('labelForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>export default {
    name: 'Bq',
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
            title: '',
            dialogFormVisible: false,
            labelForm: {
                labelId: '',
                labelText: ''
            },
            rulesLabel: {
                labelText: [
                    { required: true, message: '请输入标签名', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            const that = this
            this.axios.get('/label/listAdmin?size=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/label/listAdmin?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        // 彻底删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const that = this
                this.axios.post('/label/deleteAdmin', row).then(function (rest) {
                    that.msg("删除成功")
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
        // 禁用
        jy (index, row) {
            const that = this
            this.axios.post('/label/jy', row).then(function (rest) {
                that.msg(rest.data.msg)
                // 刷新页面
                that.reload()
            }, function (error) {
                console.log(error)
            })
        },
        // 编辑赋值弹窗
        bj (index, row) {
            this.labelForm.labelId = row.labelId
            this.labelForm.labelText = row.labelText
            this.dialogFormVisible = true
            this.title = '编辑标签'
        },
        // 添加弹窗
        tj () {
            this.labelForm.labelText = ''
            this.dialogFormVisible = true
            this.title = '添加标签'
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 提示
        msg (data) {
            this.$message({
                showClose: true,
                message: data,
                type: 'success'
            })
        },
        // 保存
        submitLabelForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const that = this
                    this.axios.post('/label/addOrPutAdmin', that.labelForm).then(function (rest) {
                        const data = rest.data
                        that.msg(data.msg)
                        if (data.code === 200) {
                            that.dialogFormVisible = false
                            that.reload()
                        }
                        that.resetForm('labelForm')
                    }, function (error) {
                        console.log(error)
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    created() {
        const that = this
        this.axios.get('/label/listAdmin').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
</style>
