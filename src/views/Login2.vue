<template>
  <div id="login">
    <el-container>
      <el-header>
        <img src="../assets/logo.png">
      </el-header>
      <el-main style="margin-top: 50px">
        <el-form id="form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="用户名或邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>export default {
  name: 'Login2',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: {
          required: true,
          message: '请输入用户名或邮箱',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          this.axios.post('/login/admin', this.ruleForm).then(function (rest) {
            const login = rest.data

            // 提示消息
            that.msg(login.msg)

            // 跳到主界面
            if (login.code === 200) {
              that.$store.commit('SET_USER', login.data)
              that.$router.push('/')
            }
            that.resetForm('ruleForm')
          }, function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 清空表单
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
    }
  }
}
</script>

<style scoped>
  #login {
    text-align: center;
  }

  #form {
    width: 400px;
    margin: 100px auto;
  }
</style>
