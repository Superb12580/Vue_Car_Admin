<template>
  <div>
    <div style="margin-left: 830px;margin-top: 20px">
      <el-button style="float: right" type="text" @click="tj()" size="medium">录入车型</el-button>
      <el-button type="info" @click="dialogFormXsxgVisible = true, xsxg()" size="mini"><b>显示效果</b></el-button>
    </div>
    <el-table height="530px"
              stripe
              :data="page.records.filter(data => !search || data.styleName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
      <el-table-column
              width="120px"
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
              width="90px"
              label="环保标准">
        <template slot-scope="scope">
          <span>{{scope.row.hbbz === 0 ? '国V' : '国VI'}}</span>
        </template>
      </el-table-column>
      <el-table-column
              width="150px"
              label="价格区间"
              prop="jgqj">
      </el-table-column>
      <el-table-column
              width="100px"
              label="销量"
              prop="xl">
      </el-table-column>
      <el-table-column
              width="100px"
              label="点击量"
              prop="djl">
      </el-table-column>
      <el-table-column
              width="90px"
              label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.deleted === 0"><b>已上架</b></span>
          <span style="color: red" v-else><b>已下架</b></span>
        </template>
      </el-table-column>
      <el-table-column
              width="200px"
              align="right">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button v-if="scope.row.deleted === 0" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
          <el-button v-else size="mini" type="text" @click="sj(scope.$index, scope.row)"><span style="color: red">上架</span></el-button>
          <el-button size="mini" type="text" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="sctj(scope.$index, scope.row)">上传</el-button>
          <el-button size="mini" type="text" @click="cktj(scope.$index, scope.row)">查看图集</el-button>


          <el-button size="mini" type="text" @click="carXq(scope.$index, scope.row)">相关Car</el-button>
          <el-button size="mini" type="text" @click="tjCar(scope.$index, scope.row)">下级增加</el-button>
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
    <el-dialog title="添加车型" :visible.sync="dialogFormTjVisible">
      <el-form :model="styleForm" :rules="rulesStyle" ref="styleForm" label-width="80px" class="demo-ruleForm" style="margin: 0 50px">
        <el-form-item label="车型名称" prop="styleName">
          <el-input style="width: 300px" v-model="styleForm.styleName"></el-input>
        </el-form-item>
        <el-form-item label="车图片" prop="stylePhoto">
          <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :show-file-list="false"
                  action="http://localhost:8081/car/style/addStyle"
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :on-success="success"
                  :data="this.styleForm">
            <img v-if="styleForm.stylePhoto" :src="styleForm.stylePhoto" class="avatar" style="width: 300px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格区间" prop="jgqj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="styleForm.jgqj">
            <template slot="append">单位（万）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="环保标准" prop="hbbz">
          <el-radio v-model="styleForm.hbbz" :label="0">国V</el-radio>
          <el-radio v-model="styleForm.hbbz" :label="1">国VI</el-radio>
        </el-form-item>
        <el-form-item label="厂商" prop="cs">
          <el-select style="width: 300px" clearable filterable v-model="styleForm.cs" placeholder="请选择">
            <el-option
                    v-for="item in optionsCs"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="jb">
          <el-select style="width: 300px" clearable filterable v-model="styleForm.jb" placeholder="请选择">
            <el-option
                    v-for="item in optionsJb"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国别" prop="gb">
          <el-select style="width: 300px" clearable filterable v-model="styleForm.gb" placeholder="请选择">
            <el-option
                    v-for="item in optionsGb"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能源类型" prop="nylx">
          <el-select style="width: 300px" clearable filterable v-model="styleForm.nylx" placeholder="请选择">
            <el-option
                    v-for="item in optionsNylx"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市时间" prop="sssj">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="styleForm.sssj" style="width: 300px"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 300px"
                label="销量"
                prop="xl"
                :rules="[{ required: true, message: '销量不能为空'},{ type: 'number', message: '销量必须为数字值'}]">
          <el-input type="age" v-model.number="styleForm.xl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLbtForm ('styleForm')">保存</el-button>
          <el-button @click="resetForm ('styleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑车型" :visible.sync="dialogFormBjVisible">
      <el-form :model="styleForm2" :rules="rulesStyle2" ref="styleForm2" label-width="80px" class="demo-ruleForm" style="margin: 0 50px">
        <el-form-item label="车型名称" prop="styleName">
          <el-input style="width: 300px" v-model="styleForm2.styleName"></el-input>
        </el-form-item>
        <el-form-item label="车图片" prop="stylePhoto">
          <el-upload
                  class="avatar-uploader"
                  ref="upload"
                  :show-file-list="false"
                  action="http://localhost:8081/car/style/editStylePhoto"
                  :before-upload="beforeUpload2"
                  :on-change="handleChange2"
                  :auto-upload="true"
                  :data="this.styleForm2">
            <img v-if="styleForm2.stylePhoto" :src="styleForm2.stylePhoto" class="avatar" style="width: 300px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格区间" prop="jgqj">
          <el-input style="width: 300px" placeholder="请输入内容" v-model="styleForm2.jgqj">
            <template slot="append">单位（万）</template>
          </el-input>
        </el-form-item>
        <el-form-item label="环保标准" prop="hbbz">
          <el-radio v-model="styleForm2.hbbz" :label="149">国V</el-radio>
          <el-radio v-model="styleForm2.hbbz" :label="150">国VI</el-radio>
        </el-form-item>
        <el-form-item label="厂商" prop="cs">
          <el-select style="width: 300px" clearable filterable v-model="styleForm2.cs" placeholder="请选择">
            <el-option
                    v-for="item in optionsCs"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="jb">
          <el-select style="width: 300px" clearable filterable v-model="styleForm2.jb" placeholder="请选择">
            <el-option
                    v-for="item in optionsJb"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国别" prop="gb">
          <el-select style="width: 300px" clearable filterable v-model="styleForm2.gb" placeholder="请选择">
            <el-option
                    v-for="item in optionsGb"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能源类型" prop="nylx">
          <el-select style="width: 300px" clearable filterable v-model="styleForm2.nylx" placeholder="请选择">
            <el-option
                    v-for="item in optionsNylx"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上市时间" prop="sssj">
          <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="styleForm2.sssj" style="width: 300px"></el-date-picker>
        </el-form-item>
        <el-form-item style="width: 300px"
                      label="销量"
                      prop="xl"
                      :rules="[{ required: true, message: '销量不能为空'},{ type: 'number', message: '销量必须为数字值'}]">
          <el-input type="age" v-model.number="styleForm2.xl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLbtForm2 ('styleForm2')">保存</el-button>
          <el-button @click="resetForm ('styleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="相关Car" :visible.sync="dialogFormCarVisible" width="1250px">
      <el-table height="480px"
                width="1180px"
                stripe
                :data="car.filter(data => !searchCar || data.carName.toLowerCase().includes(searchCar.toLowerCase()))"
                style="width: 100%">
        <el-table-column
                width="350px"
                label="Car名称">
          <template slot-scope="scope">
            <span><b>{{scope.row.carName}}</b></span>
          </template>
        </el-table-column>
        <el-table-column
                width="135px"
                label="厂商指导价(万)"
                prop="cszdj">
        </el-table-column>
        <el-table-column
                width="135px"
                label="最大扭矩(N·m)"
                prop="zdnj">
        </el-table-column>
        <el-table-column
                width="150px"
                label="长宽高(mm)">
          <template slot-scope="scope">
            <span>{{scope.row.cc}}*{{scope.row.ck}}*{{scope.row.cg}}</span>
          </template>
        </el-table-column>
        <el-table-column
                width="180px"
                label="创建时间"
                prop="createTime">
        </el-table-column>
        <el-table-column
                width="90px"
                label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.deleted === 0"><b>已上架</b></span>
            <span style="color: red" v-else><b>已下架</b></span>
          </template>
        </el-table-column>
        <el-table-column
                width="150px"
                align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="searchCar"
                    size="mini"
                    placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button v-if="scope.row.deleted === 0" style="margin-left: 30px" size="mini" type="text" @click="handleDeleteCar(scope.$index, scope.row)">下架</el-button>
            <el-button v-else size="mini" type="text" @click="sjCar(scope.$index, scope.row)"><span style="color: red">上架</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="上传图集" :visible.sync="dialogFormSctjVisible">
    <div>
      <el-form label-width="100px">
        <el-form-item label="上传图集">
          <el-upload
                  class="upload-demo"
                  action="http://localhost:8081/car/style/uploadStyleTJ"
                  :file-list="fileList"
                  :data="this.styleTj"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormSctjVisible = false">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-dialog>
    <el-dialog title="查看图集" :visible.sync="dialogFormCktjVisible" width="900px">
      <div>
        <el-carousel :interval="4000" type="card" height="300px" style="width: 800px;margin: 0 auto">
          <el-carousel-item v-for="(item,index) in imgLbt" :key="index">
            <img :src="item.photoUrl" style="height: 300px">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-dialog>
    <el-dialog title="显示效果" :visible.sync="dialogFormXsxgVisible" width="1400px">
      <a style="color: #999;margin-left: 1300px;" href="javascript:;" @click="refresh"><i></i><span>换一换</span></a>
      <div>
        <el-row>
          <el-col :span="6" v-for="(item, index) in imgDb" :key="index" :offset="0">
            <router-link :to="{name: '',query: {styleId: item.styleId}}">
              <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
                <img style="height: 230px" :src="item.stylePhoto" class="image">
                <div style="padding: 14px;">
                  <span>{{item.styleName}}</span>
                  <div class="bottom clearfix">
                    <time class="time">上市时间：{{ item.sssj }}</time>
                    <el-button type="text" class="button">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="添加Car" :visible.sync="dialogFormTjCarVisible">
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
  </div>
</template>

<script>export default {
  name: 'Style',
  // 页面刷新
  inject: ['reload'],
  data() {
    return {
      // 显示效果
      imgDb: [],
      // 查看图集
      imgLbt: [],
      // 上传图集
      fileList: [],
      // 上传图集
      styleTj: {
        styleId: '',
        styleName: ''
      },
      search: '',
      searchCar: '',
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      // style相关car
      car: [],
      // 厂商
      optionsCs: [],
      // 级别
      optionsJb: [],
      // 国别
      optionsGb: [],
      // 环保标准
      optionsHbbz: [],
      // 能源类型
      optionsNylx: [],
      // 制动类型
      optionsZdlx: [],
      // 驱动方式
      optionsQdfs: [],
      // 燃油标号
      optionsRybh: [],
      // 进气方式
      optionsJqfs: [],
      dialogFormTjVisible: false,
      dialogFormBjVisible: false,
      dialogFormCarVisible: false,
      dialogFormSctjVisible: false,
      dialogFormCktjVisible: false,
      dialogFormXsxgVisible: false,
      dialogFormTjCarVisible: false,
      // style添加
      styleForm: {
        styleName: '',
        cs: '',
        jgqj: '',
        stylePhoto: '',
        jb: '',
        gb: '',
        sssj: '',
        hbbz: '',
        nylx: '',
        xl: '',
      },
      rulesStyle: {
        styleName: {required: true, message: '请输入车名称', trigger: 'change'},
        cs: {required: true, message: '请输入厂商', trigger: 'change'},
        jgqj: {required: true, message: '请输入价格区间', trigger: 'change'},
        stylePhoto: {required: true, message: '待上传', trigger: 'change'},
        jb: {required: true, message: '请关联级别', trigger: 'change'},
        gb: {required: true, message: '请关联国别', trigger: 'change'},
        sssj: {required: true, message: '请输入上市时间', trigger: 'change'},
        hbbz: {required: true, message: '请输入环保标准', trigger: 'change'},
        nylx: {required: true, message: '请输入能源类型', trigger: 'change'}
      },
      // style编辑
      styleForm2: {
        styleId: '',
        styleName: '',
        cs: '',
        jgqj: '',
        stylePhoto: '',
        jb: '',
        gb: '',
        sssj: '',
        hbbz: '',
        nylx: '',
        xl: '',
      },
      rulesStyle2: {
        styleName: {required: true, message: '请输入车名称', trigger: 'change'},
        cs: {required: true, message: '请输入厂商', trigger: 'change'},
        jgqj: {required: true, message: '请输入价格区间', trigger: 'change'},
        stylePhoto: {required: true, message: '待上传', trigger: 'change'},
        jb: {required: true, message: '请关联级别', trigger: 'change'},
        gb: {required: true, message: '请关联国别', trigger: 'change'},
        sssj: {required: true, message: '请输入上市时间', trigger: 'change'},
        hbbz: {required: true, message: '请输入环保标准', trigger: 'change'},
        nylx: {required: true, message: '请输入能源类型', trigger: 'change'}
      },
      // car添加
      carForm: {
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
      },
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
      this.csh()
      this.dialogFormTjVisible = true
      this.resetForm('styleForm')
    },
    handleChange(file, fileList) {
      this.styleForm.stylePhoto = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      return true
    },
    handleChange2(file, fileList) {
      this.styleForm2.stylePhoto = URL.createObjectURL(file.raw)
    },
    beforeUpload2(file) {
      return true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 添加成功
    success() {
      this.resetForm('styleForm')
      this.msg("保存成功")
      this.reload()
    },
    // 显示效果
    xsxg() {
      const that = this
      this.axios.get('/style/item').then(function (rest) {
        that.imgDb = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 刷新显示效果
    refresh () {
      const that = this
      this.axios.get('/style/item').then(function (rest) {
        that.imgDb = rest.data.data
      }, function (error) {
        console.log(error)
      })
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
    // 编辑保存
    submitLbtForm2(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/style/editStyle', this.styleForm2).then(function (rest) {
            that.resetForm('styleForm2')
            that.msg(rest.data.msg)
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
    carXq(index, row){
      this.dialogFormCarVisible = true
      const that = this
      this.axios.get('/car/listAdminByStyleId?styleId=' + row.styleId).then(function (rest) {
        that.car = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 上传图集
    sctj(index, row){
      this.dialogFormSctjVisible = true
      this.styleTj.styleId = row.styleId
      this.styleTj.styleName = row.styleName
    },
    // 查看图集
    cktj(index, row){
      this.dialogFormCktjVisible = true
      const that = this
      this.axios.get('/photo/styleById?styleId=' + row.styleId).then(function (rest) {
        that.imgLbt = rest.data.data
      }, function (error) {
        console.log(error)
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
        this.axios.post('/style/deleteAdmin', {styleId: row.styleId, styleName: row.styleName}).then(function (rest) {
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
        this.axios.post('/style/sjAdmin', {styleId: row.styleId, styleName: row.styleName}).then(function (rest) {
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
    edit(index, row) {
      this.csh()
      this.dialogFormBjVisible = true
      this.styleForm2 = row
      this.resetForm('styleForm2')
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
    },
    // 初始化style下拉框
    csh(){
      const that = this
      this.axios.get('/data-dictionary/itemCs').then(function (rest) {
        that.optionsCs = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemGb').then(function (rest) {
        that.optionsGb = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemJb').then(function (rest) {
        that.optionsJb = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemHbbz').then(function (rest) {
        that.optionsHbbz = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.axios.get('/data-dictionary/itemNylx').then(function (rest) {
        that.optionsNylx = rest.data.data
      }, function (error) {
        console.log(error)
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
    tjCar(index, row){
      this.cshCar()
      this.dialogFormTjCarVisible = true
      // 关联车型
      this.carForm.styleId = row.styleId
      this.resetForm('carForm')
    },
    submitLbtFormCar(formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/car/saveAdmin', this.carForm).then(function (rest) {
            that.msg(rest.data.msg)
            that.dialogFormTjCarVisible = false
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
    this.axios.get('/style/listAdmin').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
</style>
