<template>

  <el-container>
    <el-header height="80px" style="padding:0px;">
        <Header></Header>
    </el-header>
  <el-container>
    <el-aside width="190px"><leftNav v-bind:data="data"></leftNav></el-aside>
    <el-main>     
         <Hello v-on:listenTochildEvent="showMsgFromChild"></Hello>   
          <el-footer>
            <p >&copy;Chenxq,2018/11/26</p>
         </el-footer>   
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import Hello from './Hello.vue'
import Header from './header.vue'
import LeftNav from './leftNav.vue'

export default {
    components:{Hello,Header,LeftNav},
    data(){
      return {
        data:[]
      }
    },
    methods:{
       showMsgFromChild(data){
         this.data=data;
       }
    }
}
</script>

<style scoped>
  .left{
      height: 20px;
  }
  .right{
      height:20px;

  }
  .main{
     
  }

</style>


