<template>
  <div style="padding:1px;">
    <p class="forget-text">密码重置</p>
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="4">
        <div class="img-block forget">
          <img src="../assets/images/forget2.jpg"/>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="img-block">
          <img  src="../assets/images/forget.jpg"/>
        </div>
        <div class="forget-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmpassword" required>
                <el-input type="password" v-model="ruleForm.confirmpassword"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="success" @click="submitForm('ruleForm')">修改密码</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from '../axios.js'
export default {
    data(){
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirmpassword !== '') {
            this.$refs.ruleForm.validateField('confirmpassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          password: '',
          confirmpassword: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          confirmpassword: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],         
        }
      }
    },
    methods: {
      ToLogin(){
        this.$router.push('login')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                axios.userForgetPassword(this.ruleForm)
                  .then(({data}) => {
                  if (data.check) {
                    this.$message({
                    type: 'success',
                    message: '修改密码成功'
                    });
                  } else {
                    this.$message({
                    type: 'info',
                    message: '用户名不存在'
                    });
                  }
                })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>
<style scoped>
.forget-form{
  width: 600px;
  background: rgba(246, 246, 246, 1);
  display: flex;
  justify-content: center;
  margin-top: -3px;
  border: none;
}
.forget-form form{
  width:400px;
}
.img-block{
  width:600px;
  overflow: hidden;
}
.forget img{
  height:400px;
}
.forget-text{
  text-align: center;
  font-size: 4rem;
  padding: 0px;
  color: #1d6b10;
  font-family: monospace;
  font-weight: 700;
}
</style>

