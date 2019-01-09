<template> 
<div>
 <p>请根据下表的格式，填写要上传的数据</p>
 <el-button size="mini" class="add-button" @click="addDemo">+</el-button>
 <el-table :data="submitData"  highlight-current-row border ref="submitTable" class="el-tb-edit" @current-change="handleCurrentChange">
     <el-table-column type="index" width="50"></el-table-column>
     <el-table-column prop="productCategory" label="产品类型" width="150">
         <template slot-scope="scope">
            <el-select v-model="scope.row.productCategory" placeholder="产品型号">
                <el-option
                    v-for="item in baseGroup"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span>{{scope.row.productCategory}}</span>
         </template>
     </el-table-column>
     <el-table-column prop="organization" label="基地组织" width="150">
         <template slot-scope="scope">
             <el-select v-model="scope.row.organization" placeholder="基地组织">
                <el-option
                    v-for="item in baseOrganization"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <span>{{scope.row.organization}}</span>
         </template>
     </el-table-column>
     <el-table-column prop="factoryCategory"  label="厂别" width="120">
         <template slot-scope="scope">
             <el-select v-model="scope.row.factoryCategory" placeholder="厂别">
                <el-option
                    v-for="item in factorySeparation"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
             </el-select>
             <span>{{scope.row.factoryCategory}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="productNumber" label="产品型号" width="150">
         <template slot-scope="scope">
             <el-input v-model="scope.row.productNumber" placeholder="产品型号"> </el-input>
             <span>{{scope.row.productNumber}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="new_date" label="时间" width="180">
         <template slot-scope="scope">
               <el-date-picker size="mini" v-model="scope.row.new_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
               <span>{{scope.row.new_date}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="monplan" label="m+1锁定规划" width="100">
         <template slot-scope="scope">
             <el-input v-model="scope.row.monplan" placeholder="请输入值"> </el-input>
             <span>{{scope.row.monplan}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="orgMonPlan" label="基地月锁定规划" width="100">
         <template slot-scope="scope">
             <el-input v-model="scope.row.orgMonPlan" placeholder="请输入值"> </el-input>
             <span>{{scope.row.orgMonPlan}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="planProduce" label="量产计划产出" width="100">
         <template slot-scope="scope">
             <el-input v-model="scope.row.planProduce" placeholder="请输入值"> </el-input>
             <span>{{scope.row.planProduce}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="realProduce" label="量产实际产出">
         <template slot-scope="scope">
             <el-input v-model="scope.row.realProduce" placeholder="请输入值"> </el-input>
             <span>{{scope.row.realProduce}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="gap" label="GAP值" v-if="show" >
         <template slot-scope="scope">
             <span>{{scope.row.gap}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="achievement" label="达成率" v-if="show">
        <template slot-scope="scope">
             <span>{{scope.row.achievement}}</span>
         </template> 
     </el-table-column>
     <el-table-column prop="reason" label="原因分析" width="150">
         <template slot-scope="scope">
             <el-input v-model="scope.row.reason" placeholder="请输入值"> </el-input>
             <span>{{scope.row.reason}}</span>
         </template> 
     </el-table-column>
     <el-table-column  label="操作" >
         <template slot-scope="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template> 
     </el-table-column>
 </el-table>
 <el-button class="submit-data" @click="submitReport()" type="success">上传数据</el-button>
 <el-button class="submit-data" @click="showMessage" type="warning">显示GAP和达成率</el-button>

 
</div> 
</template>

<script>
import axios from 'axios'
// import qs from 'qs'
export default {
    data(){
        return {
            show:false,
            at:'',
            ed:'',
            submitData:[
                {
                productCategory: 'A-SI',
                organization:'武汉F10',
                factoryCategory:'TFT段',
                productNumber:'',
                monplan:'',
                orgMonPlan:'',
                reason:'',
                planProduce:'',
                realProduce:'',
                gap:'',
                achievement:''
            },
            {
                productCategory: 'A-SI',
                organization:'武汉F11',
                factoryCategory:'TFT段',
                productNumber:'',
                monplan:'',
                orgMonPlan:'',
                reason:'',
                planProduce:100,
                realProduce:200,
                gap:'',
                achievement:''
            }
            ],
            currentRow: null, 
            baseGroup:[
                {label:'A-SI',value:'A-SI'},
                {label:'LTPS',value:'LTPS'},
                {label:'OLED',value:'OLED'},
            ],
            baseOrganization:[
                {label:'武汉F10',value:'武汉F10'},
                {label:'武汉F11',value:'武汉F11'},
                {label:'武汉F12',value:'武汉F12'},
                {label:'武汉F13',value:'武汉F13'},
                {label:'厦门G5.5',value:'厦门G5.5'},
                {label:'厦门G6',value:'厦门G6'},
                {label:'厦门G4.5',value:'厦门G4.5'},
                {label:'上海OLED',value:'上海OLED'},
            ],      
            factorySeparation:[
                {label:'TFT段',value:'TFT段'},
                {label:'CF',value:'CF'},
                {label:'模组',value:'模组'},
                {label:'蒸镀',value:'蒸镀'},
            ],

            
        }
    },
    methods:{
       addDemo() {
            var d = {
                productCategory: 'A-SI',
                organization:'武汉F10',
                factoryCategory:'TFT段',
                productNumber:'',
                monplan:'',
                orgMonPlan:'',
                reason:'',
                planProduce:0,
                realProduce:0,
                gap:0,
                achievement:''
            };
            this.submitData.push(d);          
            setTimeout(()=> { this.$refs.submitTable.setCurrentRow(d); }, 10);//<==用于延时渲染后选中这行
        },
        handleCurrentChange(index,val) {        
            this.currentRow = val;        
            val.gap=val.realProduce-val.planProduce
           // this.submitData[index].gap=val.gap;
            console.log(val.gap);
        },
        handleDelete(index, r) {
            this.submitData.splice(index, 1)
        },
        showMessage(){
            this.show=!this.show;
        },
        submitReport(){
            let formData=this.submitData;
            formData=JSON.stringify(formData);
           axios.post('/server/submit',formData,{
               headers: { "Content-Type": "application/json;" }
           }).then(res=>{
               console.log(res)
           })
        },
        sub(){
            console.log("kkk")
            let data=this.submitData;
            data.forEach(function(v){
                v.gap=v.realProduce-v.planProduce;
            })
        }
    },
   mounted(){
    // this.sub();
    }
}
</script>
<style scoped>


body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #495060;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
            background-color: #fff;
}

/* 可编辑表格 */

.el-tb-edit .el-input,
.el-tb-edit .el-input-number,
.el-tb-edit .el-select {
    display: none;
    width: 100%;
}

.el-tb-edit .current-row .el-input,
.el-tb-edit .current-row .el-input-number,
.el-tb-edit .current-row .el-select {
    display: inherit;
}

.el-tb-edit .current-row .el-input+span,
.el-tb-edit .current-row .el-input-number+span,
.el-tb-edit .current-row .el-select+span {
    display: none;
}
.add-button{
    padding:7px 15px;
}
.submit-data{
    float: right;
}
</style>


