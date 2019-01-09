<template>
  <div>
   
    <el-menu  :default-active="$route.path"
      class="changeColor" 
      @select="handleOpen"
      active-text-color="#ffd04b" >
         <el-menu-item index="/index"  >
            <i class="el-icon-location"></i>
            <span slot="title">报表查看</span>
         </el-menu-item>
        <el-menu-item index="/submit" >
            <i class="el-icon-menu"></i>
            <span slot="title">报表新增</span>
        </el-menu-item>
        <el-menu-item index="/image" >
            <i class="el-icon-location"></i>
            <span slot="title">产能达成报表</span>
        </el-menu-item>
    </el-menu>  

 </div>
</template>
<script>
export default {
    data() {
      return {
        reportData:[]
      };
    },
    props:['data'],
    created(){        
        this.$watch('data', function(newVal, oldVal){
          console.log(newVal);
          this.reportData=newVal;
        });
  
      },
    methods: {
      handleOpen(key, keyPath) {
        switch(key){
          case '/index':
            this.$router.push('/index');
            this.breadcrumbItems  = ['报表查看'];
            break;
          case '/submit':
            this.$router.push('/submit');
            this.breadcrumbItems=['报表新增'];
            break;
          case '/image':
            this.$router.push({path:'/image',query:{data:JSON.stringify(this.reportData)}});
            this.breadcrumbItems  = ['产能达成报表'];
            break;
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
}
</script>

<style scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 850px;
  }
  .changeColor{
    width: 180px;
    min-height: 400px;
    background-color:rgb(84, 145, 180);
    color:#fff;
  }
  .changeColor:active,
  .changeColor:hover,
  .changeColor:focus{
    color:#ffd04b;
  }
</style>
