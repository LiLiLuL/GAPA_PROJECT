<template>
<div>
  <div class="requests">
    <el-button type="text">按条件搜索，可以选择以下多种条件</el-button>
    <span>
        选中的搜索条件：
        <el-tag 
            :key="index" 
            v-for="(tag,index) in selections" 
            type="success" 
            closable  
            @close="handleClose(tag)">
            {{tag.name}}
        </el-tag>
        <el-button icon="el-icon-search" circle  @click.native="handleSearch()"></el-button>
    </span>
    <div class="item">
        <label > 产品类型</label>
        <ul >
            <el-tag
            :key="index"
            v-for="(tag,index) in baseGroup"
            type="info"
            v-on:click.native="handleTag(tag);handleProCategory(tag);filters(tag.id)"
            >
               {{tag.name}}
            </el-tag>
        </ul>
    </div>
    <div class="item">
        <label> 基地组织</label>
        <ul>
            <el-tag
            :key="index"
            v-for="(tag,index) in baseOrganization"
            type="info"
            @click.native="handleTag(tag);handleOrganization(tag)"
            >
               {{tag.name}}
            </el-tag>
        </ul>
    </div>
    <div class="item">
        <label> 厂别</label>
        <ul>
            <el-tag
            :key="index"
            v-for="(tag,index) in factorySeparation"
            type="info"
            @click.native="handleTag(tag);handleFacCategory(tag)"
            >
                {{tag.name}}
            </el-tag>
        </ul>
    </div>
   <div class="item">
        <label> 日    期</label>
       <ul>
        <div class="block">
            <el-date-picker
                v-model="DateLength"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd"
                end-placeholder="结束日期"
                @change="changeDate()"
                >
            </el-date-picker>
            <span>选中的开始和结束时间：{{ DateLength}}</span>
        </div>
        </ul>
    </div>
    <div class="item"> 
        <label>报表呈现方式</label>
        <el-radio-group v-model="radio2" @change="showMethod" class="radio-label">
        <el-radio   :label="1" >日</el-radio>
        <el-radio  :label="2">周</el-radio>
        <el-radio  :label="3">月</el-radio>
        </el-radio-group>
        <label style="margin-left:160px">是否选择产品型号</label>
        <el-radio-group v-model="radio" @change="showColumn" class="radio-label">
        <el-radio   :label="1" >是</el-radio>
        <el-radio  :label="2">否</el-radio>
        </el-radio-group>
    </div>
</div>
<p style="height:2px;background:green" />
<div class="table">
    <span class="my-options">
        <el-button type="warning">导出为Excel</el-button>
        <el-button type="success">导出为PDF</el-button>
    </span>
    <div class="my-search">
          <el-input placeholder="请输入搜索内容" class="search-input" v-model="input23" ref="sea"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search_result()">搜索</el-button>
    </div>
    <el-table
        :data="subContents.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        style="width: 100%;"
        :row-class-name="tableRowClassName"
    >
        <el-table-column prop="productCategory" label="产品类型" width="150"></el-table-column>
        <el-table-column prop="organization" label="基地组织" width="150"></el-table-column>
        <el-table-column prop="factoryCategory" label="厂别" width="150"></el-table-column>
        <el-table-column prop="productNumber" v-if="show" label="产品型号" width="150"></el-table-column>
         <el-table-column prop="new_date" label="日期" width="150"></el-table-column>
        <el-table-column  label="M+1锁定规划">
           <el-table-column prop="monplan"  label="月份"  width="120"> </el-table-column>
        </el-table-column>
        <el-table-column  label="基地月锁定规划">
           <el-table-column prop="orgMonPlan"  label="月份"  width="120"> </el-table-column>
        </el-table-column>
        <el-table-column  label="量产计划产出">
            <el-table-column prop="planProduce" label="10月week1" width="120"></el-table-column>
            <el-table-column prop="zip"   label="总计"    width="120"></el-table-column>
        </el-table-column>
         <el-table-column label="量产计划实际产出">
            <el-table-column prop="realProduce" label="10月week1" width="120"></el-table-column>
            <el-table-column prop="zip"   label="总计"    width="120"></el-table-column>
        </el-table-column>
       
        <el-table-column prop="gap" label="GAP" width="150"></el-table-column>
        <el-table-column prop="achievement" label="达成率" width="150"></el-table-column>
        <el-table-column prop="reason" label="原因分析" width="150">
            <template slot-scope="scope">
                <el-popover placement="bottom"  title=" " width="400" trigger="click"  >
                    <el-input type="textarea" :rows="4" placeholder="请输入原因分析" v-model="scope.row.reason"></el-input> 
                    <el-button  @click="handleEdit(scope.row)" type="success" size="mini">保存</el-button>
                     <span slot="reference" style="margin-left: 10px">{{ scope.row.reason }}</span>
                </el-popover>            
               
            </template>
        </el-table-column>      
    </el-table>
    <div class="my-pagination">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            @current-change="current_change">
        </el-pagination>
    </div>
    
</div> 

</div>
  
</template>

<script>
import axios from 'axios';
import qs from 'Qs';
import myaxios from '../axios.js'
// 数组去重
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i])
        }
    }
    return res
}
// 计算两个日期之间相隔的天数
function subdate(arr){
    //其中dateString1.replace('/-/g','/')是将日期格式为yyyy-mm-dd转换成yyyy/mm/dd  
    //Date.parse()静态方法的返回值为1970年1月1日午时到当前字符串时间的毫秒数，返回值为整数  
	//如果传入的日期只包含年月日不包含时分秒，则默认取的毫秒数为yyyy/mm/dd 00:00:00  
	//取的是0时0分0秒的毫秒数，如果传入的是2015/07/03 12:20:12则取值为该时间点的毫秒数 
    var  startDate=Date.parse(arr[0].replace('/-/g','/'));  
    var  endDate=Date.parse(arr[1].replace('/-/g','/')); 
    // 包含当前天，故加上一天的毫秒数   
    var diffDate=(endDate-startDate)+1*24*60*60*1000;  
	 //计算出两个日期字符串之间的相差的天数  
    var days=diffDate/(1*24*60*60*1000);  
    return  days;
}
export default {
  name: 'Hello',
  data () {
    return {
      styleObject:{
         display:''
      },
      hide:false,
      show:true,
      msg: '查询条件',
      baseGroup:[
          {name:'A-SI',id:1,check:'false',type:'productCategory'},
          {name:'LTPS',id:2,check:'false',type:'productCategory'},
          {name:'OLED',id:3,check:'false',type:'productCategory'},
      ],
      baseOrganization:[
          {name:'武汉F10',id:4,check:'false',type:'organization'},
          {name:'武汉F11',id:5,check:'false',type:'organization'},
          {name:'武汉F12',id:6,check:'false',type:'organization'},
          {name:'武汉F13',id:7,check:'false',type:'organization'},
          {name:'厦门G5.5',id:8,check:'false',type:'organization'},
          {name:'厦门G6',id:9,check:'false',type:'organization'},
          {name:'厦门G4.5',id:10,check:'false',type:'organization'},
          {name:'上海OLED',id:11,check:'false',type:'organization'},
      ],      
      factorySeparation:[
          {name:'TFT段',id:11,check:'false',type:'factoryCategory'},
          {name:'CF',id:12,check:'false',type:'factoryCategory'},
          {name:'模组',id:13,check:'false',type:'factoryCategory'},
          {name:'蒸镀',id:14,check:'false',type:'factoryCategory'},
          ],
      editFormVisible:false,
      selections:[],
      DateLength: '',
      radio: 1,
      radio2:2,
      input23:'',
      // 筛选完的结果数组
      subContents:[],
      search:'',
      startnum:0,
      endnum:1,
      pageSize:20,
      currentPage:1,
      total:0,
      tableData3: [],
      reason:''
    }
  },
    methods:{
        current_change:function(currentPage){
        this.currentPage = currentPage;
        },
        addData(){
           this.total=this.subContents.length;
        },
        changeDate(){
            let data={
                startDate:this.DateLength[0],
                enDate:this.DateLength[1]
            }
            axios.post('/server/date',data).then(res=>{
                console.log(res.data);
                this.subContents=res.data;
            })
        },
         //选中标签值
        handleTag(tag){
            let len=this.selections.length;
            let arr=this.selections;
            if(len==0){
                arr.splice(len,0,tag); 
            }else{
             for(let i=0;i<len;i++){
                if(arr[i].type==tag.type){
                    arr.splice(i,1,tag); 
                }else{
                    arr.splice(len,0,tag);
                }
            }
            }          
            this.selections=unique(arr);
            console.log("selections:")
            console.log(this.selections)
        },
        // 选中产品类型的事件
        handleProCategory(tag){
             let url='/server/product/'+tag.name;
            axios.get(url).then(response=>{
                console.log(response.data);
                this.subContents=response.data;
            }).catch(error=>{
                console.log(error)
            })
        },
        //选中基地组织
        handleOrganization(tag){
            let data = {"organization":tag.name};
            // axios.post('/server/org/organization',
            // qs.stringify({"organization":tag.name})).then(res=>{
            //     console.log(res.data);
            //     this.subContents=res.data;
            // })      
            axios.get('/server/org/organization',
            {params:{"organization":tag.name}}).then(res=>{
                console.log(res.data);
                this.subContents=res.data;
            })      
        },
        //选中厂别
        handleFacCategory(tag){
            axios.post('/server/factory',{
                "factoryCategory":tag.name
                }).then(res=>{
                    console.log(res.data.data);
                    this.subContents=res.data.data.content;
                })
             
        },
        //多条件搜索
        handleSearch(){
         let arr=this.selections;
         let data={};
         arr.forEach(tag=>{
             data[tag.type]=tag.name;
         });
         console.log(data);
         axios.post('/server/allsearch',data).then(res=>{
             console.log(res.data);
             this.subContents=res.data;
         })
        },
        // 关闭筛选条件
        handleClose(tag) {
            this.selections.splice(this.selections.indexOf(tag), 1);
            //this.subContents=this.tableData3;
           // this.total=this.subContents.length;
        },
        // 模糊搜索
        search_result(){
             this.search=this.$refs.sea.value;
             console.log(this.search);
             this.subContents=this.subContents.filter(items=>{
                var searchRegex = new RegExp(this.search, 'i');
                var arr=[];
                for(var i= 0, j = items.length; i < j; i++){
                    arr[i] = {};
                    arr[i].contacters = [];
                    for(var item = 0, len = items[i].contacters.length; item < len; item++){
                        if(searchRegex.test(items[i].contacters[item].name) || searchRegex.test(items[i].contacters[item].enterpriseName) || searchRegex.test(items[i].contacters[item].phoneNumber) || searchRegex.test(items[i].contacters[item].uniqueID)){
                            arr[i].firstLetter = items[i].firstLetter;
                            arr[i].contacters.push(items[i].contacters[item]);
                        }
                    }
                }
                return arr;
            });
            console.log("222")
        },
        // 过滤器，筛选条件
        filters(num){
            switch(num){
                case 1:
                    this.subContents=this.tableData3;
                    this.subContents=this.subContents.filter(num=>{
                        return String(num['name']).includes('A-SI')
                    })
                    console.log(this.subContents);
                    break;
            }
        },
        // 实现分页
        fenye(){

        },
        // 产品型号一列是否显示
        showColumn(){
            if(this.radio=="1"){
                this.show=true;
            }else{
                this.show=false;
            }
        },
        // 以哪一种单位显示数据
        showMethod(){
           if(this.radio2===1){
               console.log("以天展示数据");
               let arr=this.value6;
               let days=subdate(arr);
               console.log(days);
           }else if(this.radio2===2){
               console.log("以周为单位展示数据")
           }else{
               console.log("以月为单位展示数据")
           }
        },
        // 给相隔列添加不同的类
        tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2===0) {
          return 'odd-row';
        } else {
          return 'even-row';
        }
        return '';
        },
    
        //编辑原因列
        reason_editor(){
           console.log(this.reason);
           this.styleObject.display="none";
         
        },
        handleEdit(row){
          console.log(row);
          axios.post('/server/updateReason',{
              "reason":row.reason,
              "contentId":row.contentId
          }).then(res=>{
              console.log(res);

          })
        }

        
    },
    updated:function(){
        this.addData();      
    },
    created(){
        axios.get('http://localhost:3333/report/all')
        .then(response=>{
              console.log(response);
              let data=response.data;
              this.subContents=data;
              this.total=data.length;
        })
        .catch(error=>{
            console.log("error");
            console.log(error);
        })
    }
    }
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
    list-style: none;
}
a{
    text-decoration: none;
    color:#2c3e50;
}

.item ul{
    text-align: left;
     display: inline-block;
    margin-left:10px;
}
.item ul li{
     display: inline-block;
     background: #ccc;
     border-radius: 5px;
     margin-right:5px;
}
.item ul span{
    margin-right:5px;
}
.item label{
    width:150px;
    text-align: right;
    display: inline-block;
}

.table{
    margin-top:20px;
}
.my-search{
    float:right;
    margin-bottom: 20px;
}
.my-option{
    float: left;
}
.search-input{
   width:300px;
}
.my-pagination{
    float: right;
}
.el-table .odd-row {
    background: oldlace;
}

.el-table .even-row {
    background: #f0f9eb ! important;
}
.radio-label{
    margin-left:36px;
}
.radio-label label{
    width:50px;
}
</style>
