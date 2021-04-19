<template>
  <div>
    <div style="margin-left: 830px;margin-top: 20px">
      <el-button style="float: right" type="text" @click="tj()" size="medium">添加车型</el-button>
    </div>
    <el-table height="530px"
              stripe
              :data="page.records.filter(data => !search || data.styleName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="150px"
              label="车型名称">
        <template slot-scope="scope">
          <span><b>{{scope.row.styleName}}</b></span>
        </template>
      </el-table-column>
      <el-table-column
              width="150px"
              label="上市时间"
              prop="sssj">
      </el-table-column>
      <el-table-column
              width="150px"
              label="价格区间"
              prop="jgqj">
      </el-table-column>
      <el-table-column
              width="120px"
              label="销量"
              prop="xl">
      </el-table-column>
      <el-table-column
              width="120px"
              label="点击量"
              prop="djl">
      </el-table-column>
      <el-table-column
              width="120px"
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
          <el-button v-if="scope.row.deleted === 0" style="margin-left: 30px" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
          <el-button v-else size="mini" @click="sj(scope.$index, scope.row)">上架</el-button>
          <el-button style="margin-left: 30px" size="mini" type="text" @click="xq(scope.$index, scope.row)">相关Car</el-button>
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
    <el-dialog title="添加" :visible.sync="dialogFormTjVisible">
      <el-form :model="styleForm" :rules="rulesStyle" ref="styleForm" label-width="80px" class="demo-ruleForm" style="margin: 0 50px">
        <el-form-item label="车型名称" prop="styleName">
        </el-form-item>
        <el-form-item label="轮播图" prop="stylePhoto">
          <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :show-file-list="false"
                  action="http://localhost:8081/car/style/addAdmin"
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :on-success="success"
                  :data="this.styleForm">
            <img v-if="styleForm.stylePhoto" :src="styleForm.stylePhoto" class="avatar" style="width: 300px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLbtForm ('styleForm')">保存</el-button>
          <el-button @click="resetForm ('styleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>export default {
  name: 'Style',
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
      dialogFormTjVisible: false,
      styleForm: {

      },
      rulesStyle: {
        styleName: {required: true, message: '请关联车型', trigger: 'change'},
        imgLbt: {required: true, message: '待上传', trigger: 'change'}
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
    tj() {
      this.dialogFormTjVisible = true
    },
    handleChange(file, fileList) {
      this.lbtForm.imgLbt = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      return true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 添加成功
    success() {
      this.resetForm('lbtForm')
      this.msg("保存成功")
      this.reload()
    },
    // 添加保存
    submitLbtForm(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$refs.upload.submit()
          that.dialogFormTjVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 下架
    handleDelete(index, row) {
      this.$confirm('此操作将删除该车型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/style/deleteAdmin', {styleId: row.styleId}).then(function (rest) {
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
    // 上架
    sj(index, row) {
      this.$confirm('此操作将变更设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/style/sjAdmin', {styleId: row.styleId}).then(function (rest) {
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
    handleSizeChange(val) {
      const that = this
      this.axios.get('/style/listAdmin?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      const that = this
      this.axios.get('/style/listAdmin?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created() {
    const that = this
    this.axios.get('/style/listAdmin').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
