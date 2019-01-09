<template>
   
    <el-container>
    <el-header height="80px" style="padding:0px;">
        <Header></Header>
    </el-header>
    <el-container>
    <el-aside width="190px"><leftNav/></el-aside>
    <el-main>     
          <div id="result">
    <!--创建一个echarts的容器-->
        <h1>这是产能达成页面</h1>
        <div id="Container" style="width:800px; height:500px"></div>
        <h2>
             <el-button @click="createChart" round>生成报表</el-button></h2>
           
        </div>
          <el-footer>
           <p >&copy;Chenxq,2018/11/26</p>
          </el-footer>    
    </el-main>
  </el-container>
    
  </el-container>
</template>
<script>
import Header from './header.vue'
import LeftNav from './leftNav.vue'
var echarts = require('echarts/lib/echarts')
      // 引入柱状图
      require('echarts/lib/chart/pie')
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')
export default {
      components:{Header,LeftNav},
      data(){
        return{
            xArr:[],
            yArr:[],
            chart:'',
      
            }
        },
      methods:{
       createChart(){
          console.log(JSON.parse(this.chart));
       }

      },
      created(){
         let data=this.$route.query.data;
         this.chart=data;
      },
      mounted(){ 
            let option = {
            legend: {},
            tooltip: {},
            dataset: {
                // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
                // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射.
                dimensions: ['date', '2018October','2018November', '2018December'],
                // 提供一份数据。
                source: [
                    ['date', '2018October','2018November', '2018December'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1]
                ],

            },     
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
               ]
            }
            echarts.init(document.getElementById("Container")).setOption(option);

      } 
}
</script>
<style scoped>

</style>
