<template>
  <div>
    <el-table height="550px"
              stripe
              :data="page.records.filter(data => !search || data.nr.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="200px"
              label="操作人"
              prop="userName">
      </el-table-column>
      <el-table-column
              width="200px"
              label="内容"
              prop="nr">
      </el-table-column>
      <el-table-column
              width="200px"
              label="操作时间"
              prop="createTime">
      </el-table-column>
      <el-table-column
              width="100px"
              label="操作相关">
        <template slot-scope="scope">
          <span>{{scope.row.objectName === '' ? '空' : scope.row.objectName}}</span>
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
          <el-button style="margin-left: 30px" size="mini" type="text" @click="">查看详情</el-button>
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
  </div>
</template>

<script>export default {
  name: 'Rz',
  data () {
    return {
      search: '',
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
    }
  },
  methods: {
    handleSizeChange(val) {
      const that = this
      this.axios.get('/record/listAdmin?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      const that = this
      this.axios.get('/record/listAdmin?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
  },
  created() {
    const that = this
    this.axios.get('/record/listAdmin').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
