<template>
<div class="register-box">
  <div class="block">
    <el-carousel height="600px" arrow="never" indicator-position="none">
      <el-carousel-item v-for="item in imgList" :key="item.id">
         <img :src="item.url"/>
      </el-carousel-item>
    </el-carousel>
  </div>
 
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item>
       <h3 class="register-title"> 注&nbsp;&nbsp;册 </h3>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmpassword" required>
         <el-input type="password" v-model="ruleForm.confirmpassword"></el-input>
    </el-form-item>
    <el-form-item class="register-button">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      <p>
        <span v-on:click="ToLogin">已有账号？立马登录</span>
      </p>
    </el-form-item>
    <el-form-item>
        
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import axios from '../axios.js'
export default {
     data() {
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
        },
        imgList:[
          {id:0,url:require('../assets/images/image-01.jpeg')},
          {id:1,url:require('../assets/images/image-02.jpg')},
          {id:2,url:require('../assets/images/image-03.jpg')},
        ]
      };
    },
    methods: {
      ToLogin(){
        this.$router.push('login')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                axios.userRegister(this.ruleForm)
                  .then(({data}) => {
                  if (data.success) {
                    this.$message({
                    type: 'success',
                    message: '注册成功'
                    });
                  } else {
                    this.$message({
                    type: 'error',
                    message: '用户名已经存在'
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
.block{
  width:30%;
  height:100%;
}
.block img{
  height:100%;
}
.demo-ruleForm{
  width:35%;
}
.register-box{
  display: flex;
  justify-content: center;
  margin-top:20px;
}
.register-title{
  text-align: center;
  color: #409eff;
  font-weight: bolder;
  font-size: 6rem;
}
.register-button{
  text-align: center;
}
</style>


