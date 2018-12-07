<template>
<div>
<div class="login">
   
    <div class="login-form">
        <img src=""/>
        <el-tabs type="border-card" v-model="tabname">
        <el-tab-pane label="登录" name="login">
            <el-form :model="ruleForm"  ref="ruleForm" label-width="80px" >
                <el-form-item label="用户名">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item >
                   <el-button type="primary" @click="submitForm('ruleForm')" >登录 </el-button>
                   <el-button  @click="resetForm('ruleForm')">重置</el-button>
                   <span v-on:click="forgetPassword">
                       <router-link to="/forgetpass">忘记密码？</router-link>
                    </span>
                </el-form-item>
                <el-form-item>
                    <span v-on:click="ToRegister">没有账号？马上注册</span>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="注册" name="register">
           
        </el-tab-pane> -->
        </el-tabs>
        
        
    </div>
</div>
    <p class="copyright">	&copy;Chenxq,2018/11/26</p>
</div>

</template>

<script>
import Register from './register.vue'
import store from '@/store/index'
import axios from '../axios.js'
export default {
    components:{Register},
     data() {
      return {
        tabname:'login',
        ruleForm: {
          name: '',
          password: '',
          type: ''
        }
      };
    },
    store,
    methods:{
        handleClick(tab,event){

        },
        submitForm(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                axios.userLogin(this.ruleForm)
                .then(({ data }) => {
                //账号不存在
                if (data.info === false) {
                    this.$message({
                    type: 'info',
                    message: '账号不存在'
                    });
                    return;
                }
                //账号存在
                if (data.success) {
                    this.$message({
                    type: 'success',
                    message: '登录成功'
                    });
                    //拿到返回的token和username，并存到store
                    let token = data.token;
                    let username = data.username;
                    this.$store.dispatch('UserLogin', token);
                    this.$store.dispatch('UserName', username);
                    //跳到目标页
                    this.$router.push('index');
                }else{
                   this.$message({
                    type: 'error',
                    message: '账号密码错误'
                    }); 
                }
                });
                }
             })
        },
        forgetPassword(){},
        ToRegister(){
          //切换tab标签页
          //this.tabname="register";
          this.$router.push('register');
        },




    }
}
</script>

<style scoped>
body{
    background: rgb(236, 227, 227);
}
.login{
    position: absolute;
    height: 500px;
    background: beige;
    width: 80%;
    left: 10%;
    top: 14%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    background-image: url(" ../assets/images/login.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
}
.login-form{
    width:400px;
}
.copyright{
    position:absolute;
    bottom: 10%;
    left: 10%;
}

</style>
