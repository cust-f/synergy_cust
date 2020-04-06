<template>
  <el-container>
    <el-main>
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          企业评价
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        
        
     <div style="text-align:center" >
      <label  style="font-size:16px">企业星级</label>
      </div>
      <br/>
      <el-rate  
          v-model="star"
          disabled          
          max:5
          text-color="#ff9900"  
          score-template="{value}"  
          style="text-align:center"
          >
      </el-rate>
        
     <br/>
     <el-card shadow="hover" :body-style="{padding: '0px'}"> 
     <!-- 柱形图部分 -->
    
      <div style="float:right">
        <template>
        <el-select 
        style="width:100px;margin-right:35px;margin-top:15px"
        v-model="value"
        
        @change="barChartData"
        >
            <el-option
          v-for="item in options"
          placeholder="请选择"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          width="20px"
          >
            </el-option>
          </el-select> 
        </template>
        </div>
        <div class="top">
        <bar-chart
        :barData="barData"
        ref="drawbarChart"
        style="margin-top:15px"
        ></bar-chart>
        </div>
     
     </el-card>
     <br/>
     <el-card id="leidatu" shadow="hover"  :body-style="{padding: '0px'}">
        <!-- 雷达图部分 -->
     <el-form ref="form2" label-width="110px" class="box" style="margin-top:15px">
       <el-row>
            <el-col :span="9">
              <el-form-item label="起始时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                 
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="截止时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>              
            </el-col>
             <el-col :span="5">
              <el-button type="primary" style="margin-left:55px">搜索</el-button>
               </el-col>
          </el-row>
     </el-form>
        <br/>
       <radar-chart
        :radarData="radarData"
        ref="drawradarChart"
        ></radar-chart>
        <br/>
      
      
      </el-card>
      <br/> <br/><br/> <br/>
<!--       
      <div class="lists">

           <el-table
                  :data="tableData"
                  border
                  class="table"
                  ref="multipleTable"
                 :default-sort = "{prop: 'taskId', order: 'descending'}"
                  header-cell-class-name="table-header"
                
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="taskId" label="任务编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="taskName" label="任务名称"></el-table-column>

                  <el-table-column label="任务类型" prop="taskType" show-overflow-tooltip>  
                      <template slot-scope="scope">
                        <p v-if="scope.row.taskType=='1'">流通任务</p>
                        <p v-if="scope.row.taskType=='0'">设计任务</p>
                    </template>        
                   </el-table-column>
                  <el-table-column prop="finishTime" label="完成时间">
                  
                  </el-table-column>
                   <el-table-column prop="finishState" label="状态" align="center" width="80">
                  </el-table-column> 
                  <el-table-column label="操作" align="center" >

                <template slot-scope="scope">
                  <el-button
                    @click="doevaluate(scope.row)"
                    type="text"
                    size="small "
                    class="box2"
                    id="box2"
                    
                  >生成评价</el-button>
                  <el-button
                    @click="Detail(scope.row)"
                    type="text"
                    size="small "
                    class="box1"
                  >查看详情</el-button>
                </template>
              </el-table-column>
              
     
          </el-table> 
            
      </div> -->
    
     
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import {formatDate} from "../design/dataChange";
import barChart from "./components/barChart"
import radarChart from "./components/radarChart"
export default {
  name:"evaluate",
  components:{
    "bar-chart":barChart,
    "radar-chart":radarChart,
  },
  data() {
    return {
     //选择框
     options: [{
            
            value: '2020',
           
           label: '2020'
        }, {
          value: '2021',
          label: '2021',
          disabled: true
        }, {
          value: '选2022',
          label: '2022',
          disabled: true
        }],        
         value: 2020,
         
    
      tableData:"",
      radarData:{
      radarData:[],
      },
      barData:{
      taskCount:[],
      finishTaskCount:[],
      },
      star:'',
      userName:this.$route.query.userName, 

    };
  },
  //初始化方法
   created() {
    this.getCompanyData();//企业星级读取
    //this.getData();//表格数据查找
    
    this.getRemarData();//企业雷达图数据
    this.barChartData();//柱形图数据获取
    
  },
  //初始化俩图标
  // mounted() {
  
  // },
 
   
  methods: {
    //企业雷达图数据
    getRemarData(radarData){
     var that = this;
      
      var data = Qs.stringify({
      // userName:userName
        userName:"aaaa"
      });
      //  console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/sumRemarkData",
          data: data
        })
        .then(response => {
         this.radarData.radarData=response.data.allData;
         that.$refs.drawradarChart.getCharts2();      
        // this.getCharts2();
          
        });
    },
     //企业星级读取
    getCompanyData() {
      //console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        
        userName:"aaaa"
      });
       
     
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/companyevaluate",
          data: data
        })
        .then(response => {
          //this.table = response.data.allData;
         
           this.star=response.data.allData[0].star;
          // console.log(this.star);
    
        });
         
    },
     //柱形图数据获取
    barChartData(){
 
      var that = this;
      var data = Qs.stringify({
        
        userName:"aaaa",
        year:this.value,
        
      });
       console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082//monthTaskCountData",
          data: data
        })
        .then(response => {
          //this.table = response.data.allData;
         
         this.barData.taskCount=response.data.allData.taskCount;
         this.barData.finishTaskCount=response.data.allData.finishTaskCount;          
         that.$refs.drawbarChart.getCharts1();
         //this.getCharts1();
        });

    },
  //生成评价数据
    // doevaluate(row){
    //   var that = this;
      
    //   var data = Qs.stringify({
       
    //     taskId:row.taskId
    //   });
    //     console.log(data);
     
    //   that
    //     .axios({
    //       method: "post",
    //       url:
    //         "http://127.0.0.1:8082/doevaluate",
    //       data: data
    //     })
    //     .then(() => {
    //       //this.table = response.data.allData;
    //      this.$message.success("成功生成评价！");
    //        //that.tableData = response.data.allData;
         
          
          
    //     });
    // },
    
    // Detail(row) {
    //  console.log(row.taskId);
    //  if (row.taskType==1) {
    //     this.$router.push({
    //     path: "/admin/circulationTaskEvaluationDetils",
    //     query: {
    //       taskId: row.taskId
          
    //     }
    //   });
      
    //   } else {
    //     this.$router.push({
    //     path: "/admin/designTaskEvaluationDetils",
    //     query: {
    //       taskId: row.taskId
    //     }
    //   });
       
    //   }
    
    // },
 
    // //接受数据
    // getParams() {
    //   // 需要修改接受企业ID
    //   // var routerParams = this.$route.query.taskId;
    //   // this.taskId = routerParams;
    //   // console.log(routerParams);
    // },
    //表格数据查找
    // getData() {
    //   //console.log(this.taskId);
    //   var that = this;
    //   var data = Qs.stringify({
    //     // companyId: "1111"
    //     userName:"aaaa"
    //   });
    //  // console.log(data);
     
    //   that
    //     .axios({
    //       method: "post",
    //       url:
    //         "http://127.0.0.1:8082/evaluate",
    //       data: data
    //     })
    //     .then(response => {
    //       //this.table = response.data.allData;
         
    //        that.tableData = response.data.allData;
    //       //  console.log(response.data.allData);
    
    //     });
         
    // },
   
   
 
  }
}

</script>
<style scoped>
	#inputValue{
		width:240px;
		margin-left: 20px;
		padding-left: 10px;
		border-radius: 3px;
	}
	.input_span span {
		display: inline-block;
		width: 85px;
		height: 30px;
		background: #eee;
		line-height: 20px;
	}
 
 
	
</style>

<style>
 .input-group{
   
    display: inline;
  }
.el-main {
  height: 100%;
}
.top {
  width: 70%;
  margin-left: 5%;
  height: 320px;
}
.lists {
  width: 100%;
  height: 60%;
  margin-top: 10%;
  margin-left: 0%
}
.leidatu{
 height: 400px;
}


</style>