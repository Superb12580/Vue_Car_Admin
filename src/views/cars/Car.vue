<template>
  <div>
    <div style="margin-left: 830px;margin-top: 20px">
      <el-button style="float: right" type="text" @click="tj()" size="medium">添加Car</el-button>
    </div>
    <el-table height="530px"
              stripe
              :data="page.records.filter(data => !search || data.carName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="350px"
              label="Car名称">
        <template slot-scope="scope">
          <span><b>{{scope.row.carName}}</b></span>
        </template>
      </el-table-column>
      <el-table-column
              width="90px"
              label="排量(L)"
              prop="pl">
      </el-table-column>
      <el-table-column
              width="120px"
              label="发动机型号"
              prop="fdjxh">
      </el-table-column>
      <el-table-column
              width="180px"
              label="创建时间"
              prop="createTime">
      </el-table-column>
      <el-table-column
              width="80px"
              label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.deleted === 0"><b>已上架</b></span>
          <span style="color: red" v-else><b>已下架</b></span>
        </template>
      </el-table-column>
      <el-table-column
              width="180px"
              align="right">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button v-if="scope.row.deleted === 0" style="margin-left: 30px" size="mini" type="text" @click="handleDeleteCar(scope.$index, scope.row)">下架</el-button>
          <el-button v-else size="mini" type="text" @click="sjCar(scope.$index, scope.row)"><span style="color: red">上架</span></el-button>
          <el-button style="margin-left: 30px" size="mini" type="text" @click="bj(scope.$index, scope.row)">编辑</el-button>
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
  name: 'Car',
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
    // 提示
    msg(data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 添加成功
    // success() {
    //   this.resetForm('lbtForm')
    //   this.msg("保存成功")
    //   this.reload()
    // },
    // 添加保存
    // submitLbtForm(formName) {
    //   const that = this
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       that.$refs.upload.submit()
    //       that.dialogFormTjVisible = false
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // 下架Car
    handleDeleteCar(index, row) {
      this.$confirm('此操作将删除该车型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/car/deleteAdmin', {carId: row.carId, carName: row.carName}).then(function (rest) {
          that.msg("已下架")
          // 刷新页面
          that.reload()
        }, function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 上架Car
    sjCar(index, row) {
      this.$confirm('此操作将变更设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/car/sjAdmin', {carId: row.carId, carName: row.carName}).then(function (rest) {
          that.msg("已上架")
          // 刷新页面
          that.reload()
        }, function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleCurrentChange(val) {
      const that = this
      this.axios.get('/car/listAdmin?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChange(val) {
      const that = this
      this.axios.get('/car/listAdmin?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created() {
    const that = this
    this.axios.get('/car/listAdmin').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
