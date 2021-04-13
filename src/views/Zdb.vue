<template>
    <div>
        <div style="margin-left: 900px">
            <el-button type="text" @click="tj">添加折叠板
            </el-button>
        </div>
        <el-table height="530px"
                  stripe
                  :data="page.records.filter(data => !search || data.style.styleName.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column
                    width="150px"
                    label="车名称"
                    prop="style.styleName">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="标题1"
                    prop="title1">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="标题2"
                    prop="title2">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="标题3"
                    prop="title3">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="标题4"
                    prop="title4">
            </el-table-column>
            <el-table-column
                    width="250px"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button style="margin-left: 30px" size="mini" type="text" @click="xq(scope.$index, scope.row)">查看详情</el-button>
                    <el-button style="margin-left: 30px" size="mini" type="text" @click="bj(scope.$index, scope.row)">编辑</el-button>
                    <el-button style="margin-left: 30px" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="foldForm" :rules="rulesFold" ref="foldForm" label-width="80px" class="demo-ruleForm" style="margin: 0 50px">
                <el-form-item label="关联车型" prop="styleId">
                    <el-select style="width: 300px" v-model="foldForm.styleId" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.styleId"
                                :label="item.styleName"
                                :value="item.styleId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传封面" ref="uploadElement" prop="stylePhoto">
                    <el-input v-model="foldForm.stylePhoto" v-if="false"></el-input>
                    <el-upload
                            class="avatar-uploader"
                            ref="upload"
                            :show-file-list="false"
                            action="http://localhost:8081/car/fold/addUpdate"
                            :before-upload="beforeUpload"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :data="this.foldForm">
                        <img v-if="foldForm.stylePhoto" :src="foldForm.stylePhoto" class="avatar" style="width: 300px">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题一" prop="title1">
                    <el-input placeholder="请输入标题一" v-model="foldForm.title1"></el-input>
                </el-form-item>
                <el-form-item label="段落1" prop="text1">
                    <el-input type="textarea" :rows="2" placeholder="请输入第一段内容" v-model="foldForm.text1"></el-input>
                </el-form-item>
                <el-form-item label="段落2" prop="text2">
                    <el-input type="textarea" :rows="2" placeholder="请输入第二段内容" v-model="foldForm.text2"></el-input>
                </el-form-item>
                <el-form-item label="标题二" prop="title2">
                    <el-input placeholder="请输入标题二" v-model="foldForm.title2"></el-input>
                </el-form-item>
                <el-form-item label="段落1" prop="text3">
                    <el-input type="textarea" :rows="2" placeholder="请输入第三段内容" v-model="foldForm.text3"></el-input>
                </el-form-item>
                <el-form-item label="段落2" prop="text4">
                    <el-input type="textarea" :rows="2" placeholder="请输入第四段内容" v-model="foldForm.text4"></el-input>
                </el-form-item>
                <el-form-item label="标题三" prop="title3">
                    <el-input placeholder="请输入标题三" v-model="foldForm.title3"></el-input>
                </el-form-item>
                <el-form-item label="段落1" prop="text5">
                    <el-input type="textarea" :rows="2" placeholder="请输入第五段内容" v-model="foldForm.text5"></el-input>
                </el-form-item>
                <el-form-item label="段落2" prop="text6">
                    <el-input type="textarea" :rows="2" placeholder="请输入第六段内容" v-model="foldForm.text6"></el-input>
                </el-form-item>
                <el-form-item label="标题四" prop="title4">
                    <el-input placeholder="请输入标题四" v-model="foldForm.title4"></el-input>
                </el-form-item>
                <el-form-item label="段落1" prop="text7">
                    <el-input type="textarea" :rows="2" placeholder="请输入第七段内容" v-model="foldForm.text7"></el-input>
                </el-form-item>
                <el-form-item label="段落2" prop="text8">
                    <el-input type="textarea" :rows="2" placeholder="请输入第八段内容" v-model="foldForm.text8"></el-input>
                </el-form-item>
                <el-input v-model="foldForm.id" type="hidden"></el-input>
                <el-form-item>
                    <el-button type="primary" @click="submitFoldForm ('foldForm')">保存</el-button>
                    <el-button @click="resetForm ('foldForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="折叠板详情" :visible.sync="dialogXqVisible" width="1000px">
            <div style="height: 300px">
                <!--      折叠图开始-->
                <div style="float: left;margin-left: 25px">
                    <router-link :to="{name: '',query: {styleId: imgZb.styleId}}">
                        <el-image :src="imgZb.stylePhoto" style="width: 400px;height: 250px">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </router-link>
                </div>
                <!--      折叠图结束-->
                <!--      折叠文开始-->
                <div style="width: 450px;margin-left: 460px">
                    <el-collapse v-model="imgZb.activeName" accordion>
                        <el-collapse-item>
                            <template slot="title">
                                {{imgZb.title1}}<i class="header-icon el-icon-success"></i>
                            </template>
                            <div>{{imgZb.text1}}</div>
                            <div>{{imgZb.text2}}</div>
                        </el-collapse-item>
                        <el-collapse-item name="1">
                            <template slot="title">
                                {{imgZb.title2}}<i class="header-icon el-icon-s-flag"></i>
                            </template>
                            <div>{{imgZb.text3}}</div>
                            <div>{{imgZb.text4}}</div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                {{imgZb.title3}}<i class="header-icon el-icon-menu"></i>
                            </template>
                            <div>{{imgZb.text5}}</div>
                            <div>{{imgZb.text6}}</div>
                        </el-collapse-item>
                        <el-collapse-item>
                            <template slot="title">
                                {{imgZb.title4}}<i class="header-icon el-icon-info"></i>
                            </template>
                            <div>{{imgZb.text7}}</div>
                            <div>{{imgZb.text8}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <!--      折叠文结束-->
            </div>
        </el-dialog>
    </div>
</template>

<script>export default {
    name: 'Zdb',
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
            // 下拉框
            options: [],
            title: '',
            dialogFormVisible: false,
            dialogXqVisible: false,
            foldForm: {
                id: '',
                styleId: '',
                stylePhoto: '',
                title1: '',
                title2: '',
                title3: '',
                title4: '',
                text1: '',
                text2: '',
                text3: '',
                text4: '',
                text5: '',
                text6: '',
                text7: '',
                text8: '',
            },
            rulesFold: {
                styleId: {required: true, message: '请关联车型', trigger: 'blur'},
                stylePhoto: {required: true, message: '请上传折叠板图片', trigger: 'blur'},
                title1: [
                    {required: true, message: '请输入标题一', trigger: 'blur'},
                    {min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change'}
                ],
                title2: [
                    {required: true, message: '请输入标题二', trigger: 'blur'},
                    {min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change'}
                ],
                title3: [
                    {required: true, message: '请输入标题三', trigger: 'blur'},
                    {min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change'}
                ],
                title4: [
                    {required: true, message: '请输入标题四', trigger: 'blur'},
                    {min: 2, max: 35, message: '长度在 2 到 35 个字符', trigger: 'change'}
                ],
                text1: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text2: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text3: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text4: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text5: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text6: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text7: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ],
                text8: [
                    {required: true, message: '必填项', trigger: 'blur'},
                    {min: 2, max: 35, message: '建议长度在25个字符左右', trigger: 'change'}
                ]
            },
            // 折叠详情
            imgZb: {
                activeName: '',
                stylePhoto: '',
                styleId: 1,
                title1: '一致性 Consistency',
                text1: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
                text2: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
                title2: '一致性 Consistency',
                text3: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
                text4: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
                title3: '一致性 Consistency',
                text5: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
                text6: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
                title4: '一致性 Consistency',
                text7: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
                text8: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。'
            },
        }
    },
    methods: {
        handleSizeChange(val) {
            const that = this
            this.axios.get('/fold/list?size=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/fold/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        // 彻底删除
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                const that = this
                this.axios.post('/fold/delete', row).then(function (rest) {
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
        // 编辑赋值弹窗
        bj(index, row) {
            const that = this
            this.axios.get('/fold/itemAdmin?id=' + row.id).then(function (rest) {
                that.foldForm = rest.data.data
            }, function (error) {
                console.log(error)
            })
            this.dialogFormVisible = true
            this.title = '编辑折叠板'
        },
        // 添加
        tj() {
            this.dialogFormVisible = true
            this.title = '添加折叠板'
            this.resetForm('foldForm')
            this.foldForm.id = ''
        },
        xq(index, row) {
            const that = this
            this.axios.get('/fold/itemAdmin?id=' + row.id).then(function (rest) {
                that.imgZb = rest.data.data
                that.dialogXqVisible = true
                that.imgZb.activeName = '1'
            }, function (error) {
                console.log(error)
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        handleChange(file, fileList) {
            this.foldForm.stylePhoto = URL.createObjectURL(file.raw)
        },
        beforeUpload(file) {
            return true
        },
        // 提示
        msg(data) {
            this.$message({
                showClose: true,
                message: data,
                type: 'success'
            })
        },
        // 保存
        submitFoldForm(formName) {
            const that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.$refs.upload.submit()
                    that.dialogFormVisible = false
                    that.resetForm('foldForm')
                    that.msg("保存成功")
                    that.reload()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    created() {
        const that = this
        this.axios.get('/fold/list').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
        this.axios.get('/style/itemDjl').then(function (rest) {
            that.options = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
</style>
