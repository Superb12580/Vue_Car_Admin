<template>
  <div>
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
          <el-button size="mini" type="text" @click="bj(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="xq(scope.$index, scope.row)">详情</el-button>
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
    <el-dialog title="编辑Car" :visible.sync="dialogFormBjCarVisible">
      <el-form :model="carForm" :rules="rulesCar" ref="carForm" label-width="200px" class="demo-ruleForm" style="margin: 0 50px">
        <el-form-item label="Car名称" prop="carName">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.carName"></el-input>
        </el-form-item>
        <el-form-item label="厂商指导价" prop="cszdj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.cszdj">
            <template slot="append">单位（万）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="轴距" prop="zj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.zj">
            <template slot="append">单位（mm）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="油箱容积" prop="yxrj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.yxrj">
            <template slot="append">单位（L）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="发动机型号" prop="fdjxh">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.fdjxh"></el-input>
        </el-form-item>
        <el-form-item label="排量" prop="pl">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.pl">
            <template slot="append">单位（L）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车长" prop="cc">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.cc">
            <template slot="append">单位（mm）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车宽" prop="ck">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.ck">
            <template slot="append">单位（mm）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="车高" prop="cg">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.cg">
            <template slot="append">单位（mm）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最大扭矩" prop="zdnj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.zdnj">
            <template slot="append">单位（N*m）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="进气方式" prop="jqfs">
          <el-select style="width: 300px" clearable filterable v-model="carForm.jqfs" placeholder="请选择">
            <el-option
                    v-for="item in optionsJqfs"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驱动方式" prop="qdfs">
          <el-select style="width: 300px" clearable filterable v-model="carForm.qdfs" placeholder="请选择">
            <el-option
                    v-for="item in optionsQdfs"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制动类型" prop="zdlx">
          <el-select style="width: 300px" clearable filterable v-model="carForm.zdlx" placeholder="请选择">
            <el-option
                    v-for="item in optionsZdlx"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最大马力" prop="zdml">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.zdml">
            <template slot="append">单位（Ps）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最大功率" prop="zdgl">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.zdgl">
            <template slot="append">单位（kW）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="百公里加速" prop="bgljs">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.bgljs">
            <template slot="append">单位（s）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="百公里油耗" prop="bglyh">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.bglyh">
            <template slot="append">单位（L）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最高车速" prop="zgcs">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="carForm.zgcs">
            <template slot="append">单位（Km/h）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="燃油标号" prop="rybh">
          <el-select style="width: 300px" clearable filterable v-model="carForm.rybh" placeholder="请选择">
            <el-option
                    v-for="item in optionsRybh"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLbtFormCar ('carForm')">保存</el-button>
          <el-button @click="resetForm ('carForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="Car详情" :visible.sync="dialogFormCarXqVisible">
      <h2>Car详情待完善</h2>
    </el-dialog>
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
      },
      // 制动类型
      optionsZdlx: [],
      // 驱动方式
      optionsQdfs: [],
      // 燃油标号
      optionsRybh: [],
      // 进气方式
      optionsJqfs: [],
      dialogFormBjCarVisible: false,
      dialogFormCarXqVisible: false,
      car: {},
      // car编辑
      carForm: {
        carId: '',
        carName: '',
        styleId: '',
        cszdj: '',
        zdnj: '',
        cc: '',
        ck: '',
        cg: '',
        zj: '',
        yxrj: '',
        fdjxh: '',
        pl: '',
        jqxs: '',
        zdml: '',
        zdgl: '',
        qdfs: '',
        zdlx: '',
        bgljs: '',
        bglyh: '',
        zgcs: '',
        rybh: ''
      },
      rulesCar: {
        carName: {required: true, message: '请输入内容', trigger: 'change'},
        cszdj: {required: true, message: '请输入内容', trigger: 'change'},
        zdnj: {required: true, message: '请输入内容', trigger: 'change'},
        cc: {required: true, message: '请输入内容', trigger: 'change'},
        ck: {required: true, message: '请输入内容', trigger: 'change'},
        cg: {required: true, message: '请输入内容', trigger: 'change'},
        zj: {required: true, message: '请输入内容', trigger: 'change'},
        yxrj: {required: true, message: '请输入内容', trigger: 'change'},
        fdjxh: {required: true, message: '请输入内容', trigger: 'change'},
        pl: {required: true, message: '请输入内容', trigger: 'change'},
        jqfs: {required: true, message: '请输入内容', trigger: 'change'},
        zdml: {required: true, message: '请输入内容', trigger: 'change'},
        zdgl: {required: true, message: '请输入内容', trigger: 'change'},
        qdfs: {required: true, message: '请输入内容', trigger: 'change'},
        zdlx: {required: true, message: '请输入内容', trigger: 'change'},
        bgljs: {required: true, message: '请输入内容', trigger: 'change'},
        bglyh: {required: true, message: '请输入内容', trigger: 'change'},
        zgcs: {required: true, message: '请输入内容', trigger: 'change'},
        rybh: {required: true, message: '请输入内容', trigger: 'change'}
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
    bj(index, row) {
      this.cshCar()
      this.dialogFormBjCarVisible = true
      this.carForm = row
    },
    xq(index, row) {
      this.dialogFormCarXqVisible = true
      this.car = row
    },
    // 编辑保存
    submitLbtFormCar(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/car/saveAdmin', this.carForm).then(function (rest) {
            that.msg(rest.data.msg)
            that.dialogFormBjCarVisible = false
            that.reload()
          }, function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 初始化car下拉框
    cshCar(){
      const that = this
      this.axios.get('/data-dictionary/itemJqfs').then(function (rest) {
        that.optionsJqfs = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemRybh').then(function (rest) {
        that.optionsRybh = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemQdfs').then(function (rest) {
        that.optionsQdfs = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemZdlx').then(function (rest) {
        that.optionsZdlx = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
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
