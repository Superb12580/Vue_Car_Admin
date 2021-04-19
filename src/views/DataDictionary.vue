<template>
    <div>
        <el-table height="530px"
                  stripe
                  :data="page.records.filter(data => !search || data.type_name.toLowerCase().includes(search.toLowerCase()))"
                  style="width: 100%">
            <el-table-column
                    width="150px"
                    label="父节点"
                    prop="parent">
            </el-table-column>
            <el-table-column
                    width="150px"
                    label="类型名称"
                    prop="type_name">
            </el-table-column>
            <el-table-column
                    width="220px"
                    label="数据">
                <template slot-scope="scope">
                    <span><b>{{scope.row.data}}</b></span>
                </template>
            </el-table-column>
            <el-table-column
                    width="220px"
                    label="最近操作"
                    prop="update_time">
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
    </div>
</template>

<script>export default {
    name: 'DataDictionary',
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
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            const that = this
            this.axios.get('/data-dictionary/list?size=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        },
        handleCurrentChange(val) {
            const that = this
            this.axios.get('/data-dictionary/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
                that.page = rest.data.data
            }, function (error) {
                console.log(error)
            })
        }
    },
    created() {
        const that = this
        this.axios.get('/data-dictionary/list').then(function (rest) {
            that.page = rest.data.data
        }, function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped>
</style>
