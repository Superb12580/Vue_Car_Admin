<template>
  <div>
    <div style="margin-left: 830px;margin-top: 20px">
      <el-button style="float: right" type="text" @click="tj" size="medium">添加轮播图</el-button>
      <el-button type="warning" @click="dialogFormXgVisible = true, xsxg()" size="mini"><b>显示效果</b></el-button>
    </div>
    <el-table height="530px"
              stripe
              :data="page.records.filter(data => !search || data.style_name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="150px"
              label="相关车型">
        <template slot-scope="scope">
          <span><b>{{scope.row.style_name}}</b></span>
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
              label="口碑"
              prop="pf">
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
          <el-button style="margin-left: 30px" size="mini" type="text" @click="xq(scope.$index, scope.row)">详情</el-button>
          <el-button style="margin-left: 30px" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
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
    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <img :src="lbt" width="720px" height="340px" style="margin: 0 auto">
    </el-dialog>
    <el-dialog title="显示效果" :visible.sync="dialogFormXgVisible" width="1300px">
      <el-button style="float: right" type="text" @click="xsxg()" size="mini">换一组</el-button>
      <div>
        <el-carousel :interval="4000" type="card" height="300px" style="width: 1200px;margin: 0 auto">
          <el-carousel-item v-for="(item,index) in imgLbt" :key="index">
            <img :src="item.imgLbt" style="height: 300px">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogFormTjVisible">
      <el-form :model="lbtForm" :rules="rulesLbt" ref="lbtForm" label-width="80px" class="demo-ruleForm" style="margin: 0 50px">
        <el-form-item label="关联车型" prop="styleName">
          <el-cascader v-model="lbtForm.styleName"
                  clearable
                  placeholder="试试搜索：宝马三系"
                  :options="options"
                  filterable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="轮播图" prop="imgLbt">
          <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :show-file-list="false"
                  action="http://localhost:8081/car/style/addLbt"
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :on-success="success"
                  :data="this.lbtForm">
            <img v-if="lbtForm.imgLbt" :src="lbtForm.imgLbt" class="avatar" style="width: 300px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLbtForm ('lbtForm')">保存</el-button>
          <el-button @click="resetForm ('lbtForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>export default {
  name: 'Lbt',
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      // 详情轮播图
      lbt: '',
      dialogFormVisible: false,
      // 显示效果
      imgLbt: [],
      dialogFormXgVisible: false,
      search: '',
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      dialogFormTjVisible: false,
      // 添加
      lbtForm: {
        // 实际传的是styleId
        styleName: '',
        imgLbt: ''
      },
      options: [
        {
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则'
        }, {
          value: 'daohang',
          label: '导航',},
          {
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        },
        {
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则'
          }, {
            value: 'daohang',
            label: '导航',},
            {
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
        }],
      rulesLbt: {
        styleName: {required: true, message: '请关联车型', trigger: 'change'},
        imgLbt: {required: true, message: '待上传', trigger: 'change'}
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      const that = this
      this.axios.get('/style/listAdminLbt?size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange(val) {
      const that = this
      this.axios.get('/style/listAdminLbt?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
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
    // 添加轮播图
    tj() {
      this.dialogFormTjVisible = true
      const that = this
      this.axios.get('/style/adminDjxl').then(function (rest) {
        that.options = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.resetForm('lbtForm')
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
    // 提示
    msg(data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
    // 移除
    handleDelete(index, row) {
      this.$confirm('此操作将移除轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        const that = this
        this.axios.post('/style/deleteAdminLbt', {styleId: row.style_id}).then(function (rest) {
          that.msg("已移除")
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
    xq(index, row) {
      this.dialogFormVisible = true
      this.lbt = row.img_lbt
    },
    // 显示效果
    xsxg() {
      const that = this
      this.axios.get('/style/itemLbt').then(function (rest) {
        that.imgLbt = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created() {
    const that = this
    this.axios.get('/style/listAdminLbt').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
