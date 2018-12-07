<template>

  <el-container>
    <el-header>
        <Header></Header>
    </el-header>
    <el-main>
        <el-row>
            <el-col :span="4"> <el-aside ><leftNav/></el-aside></el-col>
            <el-col :span="18">
                <div class="main">
                    <Hello></Hello>
                </div>
            </el-col>
            <el-col :span="2"><div class="right"></div></el-col>
        </el-row>
    </el-main>
    <el-footer>
        <p >	&copy;Chenxq,2018/11/26</p>
    </el-footer>
  </el-container>
</template>

<script>
import Hello from './Hello.vue'
import Header from './header.vue'
import LeftNav from './leftNav.vue'

export default {
    components:{Hello,Header,LeftNav},
    methods:{

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


