<template>

  <el-container>
    <el-header height="80px" style="padding:0px;">
        <Header></Header>
    </el-header>
    <el-container>
    <el-aside width="190px"><leftNav/></el-aside>
    <el-main>     
          <Submit></Submit>
          <el-footer>
           <p >&copy;Chenxq,2018/11/26</p>
          </el-footer>    
    </el-main>
  </el-container>
    
  </el-container>
</template>

<script>
import Submit from './SubmitForm.vue'
import Header from './header.vue'
import LeftNav from './leftNav.vue'

export default {
    components:{Submit ,Header,LeftNav},
    methods:{
        drawline(){
              // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
        
 
    },
    mounted(){
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


