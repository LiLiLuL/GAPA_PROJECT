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
            class="tagcheck"
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
            class="tag"
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
            class="tag"
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
            class="tag"
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
        <el-button type="warning"  @click="downloadExcel">导出为Excel</el-button>
        <el-button type="success" @click="downloadExl">仅导出当前页为excel</el-button>
    </span>
    <div class="my-search">
          <el-input placeholder="请输入搜索内容" class="search-input" v-model="input23" ref="sea"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="search_result()">搜索</el-button>
    </div>
    <div >
    <el-table
        :data="subContents.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe style="width: 100%;" height="500" id="content"
        @cell-mouse-leave="cellMouseLeave"  @cell-mouse-enter="cellMouseEnter"
        :row-class-name="tableRowClassName"
         :span-method="objectSpanMethod" :cell-class-name="tableRowClassName"
    >
        <el-table-column prop="productCategory" label="产品类型" width="150"></el-table-column>
        <el-table-column prop="organization" label="基地组织" width="150"></el-table-column>
        <el-table-column prop="factoryCategory" label="厂别" width="150"></el-table-column>
        <el-table-column prop="productNumber" v-if="show" label="产品型号" width="150"></el-table-column>
        <el-table-column prop="new_date"  v-if="showDate" sortable label="日期" width="150"></el-table-column>
        <el-table-column  label="M+1锁定规划" prop="monplan" width="140" sortable></el-table-column>
        <el-table-column  label="基地月锁定规划" prop="orgMonPlan" width="150" sortable></el-table-column>
        <el-table-column  label="量产计划产出">
            <el-table-column :key="index" v-if="getShow(index)" v-for="(col,index) in cols.plan" :prop="col.prop" :label="col.label"  width="120"></el-table-column>
            <el-table-column prop="zip"   label="总计"    width="120" sortable></el-table-column>
        </el-table-column>
        <el-table-column label="量产计划实际产出">
            <el-table-column :key="index" v-if="getShow(index)" v-for="(col,index) in cols.real" :prop="col.prop" :label="col.label"  width="120" sortable></el-table-column>
            <el-table-column prop="zip"   label="总计"    width="120" sortable></el-table-column>
        </el-table-column>   
        <el-table-column prop="gap" label="GAP" width="150" sortable></el-table-column>
        <el-table-column prop="achievement" label="达成率" width="150" sortable></el-table-column>
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
    </div>
    <div class="my-pagination">
        <el-pagination
            background
            layout="total, sizes,prev, pager, next,jumper"
            @size-change="handleSizeChange"
            :page-sizes="pageSizes"
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
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

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
      showDate:true,
      cols:{
        plan: [
        {prop: 'date_content', label: '月份'},
        {prop: 'planProduce', label: '计划产出'},
        ],
        real: [
        {prop: 'date_content', label: '月份'},
        {prop: 'produce', label: '实际产出'},
      ]
      },
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
      radio2:1,
      input23:'',
      // 筛选完的结果数组
      subContents:[],
      search:'',
      startnum:0,
      endnum:1,
      pageSize:20,
      pageSizes:[20,50,100,200],
      currentPage:1,
      total:0,
      tableData3: [],
      spanArr:[],
      rowIndex:'-1',
      hoverOrderArr: []
    }
  },
  computed:{
      // 模糊搜索
      
      tables () {
        const search = this.search;
        if (search) {
          // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
          // 注意： filter() 不会对空数组进行检测。
          // 注意： filter() 不会改变原始数组。
          return this.subContents.filter(data => {
            // some() 方法用于检测数组中的元素是否满足指定条件;
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // 注意： some() 不会改变原始数组。
            return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }       
        return this.subContents
      }
  },

    methods:{
        sendToParent(){
            this.$emit("listenTochildEvent",this.subContents)
        },
       
        exportChooseExcel() { // 兼容ie10哦！
            require.ensure([], () => {
                const { export_json_to_excel } = require('../excel_plugin/Export2Excel'); // 引入文件
                //消息號    PDF 生成批次號    保單號    客戶號    消息類型    業務分類    接收人類型    模板 ID    消息創建者    創建時間    狀態
                const tHeader = ['消息號','基地组织']; //Excel的列名称信息定义
                const filterVal = ['productCategory', 'organization']; //
                const list =this.subContents; //这是表格中的数据内容 （需要导出的数据内容信息 tableData）
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '列表excel'); //列头信息 数据内容 导出的excel文件名字
                })
                
        },
        formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
        },
     
        //导出为excel
         exportExcel () {
         var wb = XLSX.utils.table_to_book(document.querySelector('#content'))
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     },
       downloadExcel(){
           let formData=this.subContents
           formData=JSON.stringify(formData);
           axios.post('/server/download',formData,{
               headers: { "Content-Type": "application/json;application/octet-stream" },
               responseType: 'arraybuffer',
           }).then(res=>{
               let b = new Blob([res.data], { type: 'application/vnd.ms-excel' });            
               let url = URL.createObjectURL(b);           
                let link = document.createElement('a');            
                link.download = 'Gap达成率.xls';            
                link.href = url;            
                link.click();
           })

       },
        downloadExl() {
                let wb = XLSX.utils.table_to_book(document.getElementById('content')),
                    wopts = {
                        bookType: 'xlsx',
                        bookSST: false,
                        type: 'binary'
                    },
                    wbout = XLSX.write(wb, wopts);

               FileSaver.saveAs(new Blob([this.s2ab(wbout)], {
                    type: "application/octet-stream;charset=utf-8"
                }), "GAP达成率.xlsx");
            },
        s2ab(s) {
            console.log(s.length);
                if (typeof ArrayBuffer !== 'undefind') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            },


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
             let all=this.subContents;
            if(this.search!=""){
              all= all.filter(data => {
              return Object.keys(data).some(key => {
                 return String(data[key]).toLowerCase().indexOf(this.search) > -1
             })
            })
            this.subContents=all;
            }else{
                axios.get("/server/all").then(res=>{
                    this.subContents=res.data;
                })
            }
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
         handleSizeChange(val){ this.pageSize=val;},
        // 产品型号一列是否显示
        showColumn(){
            if(this.radio=="1"){
                this.show=true;
            }else{
                this.show=false;
            }
        },
        getShow(index){
           if(this.radio2===2||this.radio2===3){
               console.log(index);
               return true;
           }else{
               return false;
           }
        },
        // 以哪一种单位显示数据
        showMethod(){
           
           if(this.radio2===1){
               this.showDate=true;
                axios.get('/server/all')
                .then(response=>{
                    console.log(response);
                    let data=response.data;
                    this.subContents=data;
                    this.total=data.length;
                    this.cols=[];
                })
           }else if(this.radio2===2){
               this.showDate=false;
               axios.get('/server/datedef',{params:{"num":this.radio2}}).then(res=>{
                   let data=res.data.data.result;
                   this.subContents=data;
               })
               console.log("以周为单位展示数据")
           }else if(this.radio2===3){
               this.showDate=false;
               axios.get('/server/datedef',{params:{"num":this.radio2}}).then(res=>{
                   let data=res.data.data.result;
                   let arr=[];              
                   for(let item in data){
                        arr.push(data[item].date_content);
                   }
                   this.subContents=data;
                   
               })
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
        check(){
          let data=this.subContents;
           data.forEach(function(v){
                if(v.reason==null){
                    v.reason="请输入要填写的值"
                }
            })
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
        },
           // 合并单元格
      objectSpanMethod({row,column,rowIndex,columnIndex}) {
          if(this.radio2===2||this.radio2===3){
           if (columnIndex === 6||columnIndex===9 ) {
          for (let i = 0; i < this.spanArr.length; i++) {
            let element = this.spanArr[i];
            for (let j = 0; j < element.length; j++) {
              let item = element[j];
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      }
      },
        //合并随意行数
        getOrderNumber(){
            this.spanArr=[];
            let OderObj={};
            this.subContents.forEach((ele,index)=>{
                ele.rowIndex=index;
                if(OderObj[ele.date_content]){
                    OderObj[ele.date_content].push(index)
                }else{
                    OderObj[ele.date_content]=[];
                    OderObj[ele.date_content].push(index)
                }
            })
            for(let k in OderObj){
                if(OderObj[k].length>1){
                    this.spanArr.push(OderObj[k])
                }
            }
             console.log(this.spanArr)
        },
          tableRowClassName({row,rowIndex}) {
        let arr = this.hoverOrderArr
        for (let i = 0; i < arr.length; i++) {
          if (rowIndex == arr[i]) {
            return 'hovered-row'
          }
        }
      },


      cellMouseEnter(row, column, cell, event) {
        this.rowIndex = row.rowIndex;
        this.hoverOrderArr = [];
        this.spanArr.forEach(element => {
            if (element.indexOf(this.rowIndex) >= 0) {
              this.hoverOrderArr = element
            }
        })
      },

      cellMouseLeave(row, column, cell, event) {
        this.rowIndex = '-1'
        this.hoverOrderArr = [];
      }
       
    },
    updated:function(){
        this.addData();  
        this.check(); 
        this.getOrderNumber();
        this.sendToParent();
    },
    mounted(){
        this.getOrderNumber()
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
        });     
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
    color:#1c7946;
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
.tag:hover,
.tag:focus,
.tag:active{
    background: #086d8b;
    color:#fff;
}
.tagcheck{
    background:rgba(219, 8, 15, 0.39);
    color:#086d8b;
}
.el-table .hovered-row {
      background: #03192e;
 }
</style>
