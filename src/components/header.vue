<template>
    <div class="my-header">
        <h1 class="title"><b class="tianma">TIANMA</b>GAPA报表查看系统</h1>
        <ul class="right">
            <li>
                <i class="icon iconfont icon-ren "></i>
                <a>欢迎您！{{$store.state.username}}</a>
            </li>
            <li>
                <i class="icon iconfont icon-weibiaoti2fuzhi16 "></i>
                <router-link to="/usercenter">个人中心</router-link>
            </li>
            <li>
                <i class="icon iconfont icon-tuichu1 "></i>
                <span v-on:click="logOut" >退出</span>
            </li>
        </ul>
    </div>
</template>
<script>
import store from '@/store/index'
export default {
    data(){
        return{
            msg:'xiaoqing_chen'
        }
    },
    store,
    methods:{
        logOut(){
           let token = '';
           this.$store.dispatch('UserLogin', token);
           this.$router.push('login')
        }
    }
}
</script>
<style scoped>
li{
    list-style: none;
}
 .my-header{
     display: flex;
     justify-content:space-between;
     background:rgb(84, 145, 180);
     color:#fff;
 }
 .tianma{
     color:rgb(27, 75, 235);
     font-family:fantasy;
     font-size:30px;
     font-style:italic;
     margin-left:20px;
     margin-right:20px;
 }
 .right li{
    display:inline-block;
    margin-right:10px;
    margin-top:10px;
 }
 .right li:focus,
 .right li:hover,
 .right li:active{
     color:rgb(10, 77, 60);
 }
 .right a{
     text-decoration: none;
     color:#fff;
 }
</style>


