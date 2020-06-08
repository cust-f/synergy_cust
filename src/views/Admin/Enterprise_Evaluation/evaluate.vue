<template>
  <el-container>
    <el-main>
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          数据统计
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
       
        <el-tabs v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="发布的任务" name="first">
               <cloumn-chart1 style="width: 600px;height:400px;"  >
        
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
     <el-card  shadow="hover" :body-style="{padding: '0px'}"> 
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
        style="margin-top:10px"
        ></bar-chart>
        </div>
     
     </el-card>
     <br/>
     <el-card  shadow="hover"  :body-style="{padding: '0px'}">
        <!-- 雷达图部分 -->
     <el-form ref="form2" :model="form2" label-width="110px" class="box" style="margin-top:15px">
       <el-row>
            <el-col :span="9">
              <el-form-item label="起始时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form2.time1"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="截止时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form2.time2"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>              
            </el-col>
             <el-col :span="5">
              <el-button type="primary" style="margin-left:55px" @click="getRemarData">搜索</el-button>
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
      

               </cloumn-chart1>
              </el-tab-pane>
<!-- ---------------------------------- 承接的任务----------------------------------------- -->
<!-- ---------------------------------- 承接的任务----------------------------------------- -->
<!-- ---------------------------------- 承接的任务----------------------------------------- -->

    <el-tab-pane label="承接的任务" name="second">
      <cloumn-chart2  style="width: 600px;height:400px;" >
              
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
     <el-card  shadow="hover" :body-style="{padding: '0px'}"> 
     <!-- 柱形图部分 -->
    
      <div style="float:right" >
        <template>
        <el-select 
        style="width:100px;margin-right:35px;margin-top:15px"
        v-model="value"
        
        @change="barChartDataSS"
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
        <bar-chartS
        :barDataS="barDataS"
        ref="drawbarChartS"
        style="margin-top:10px"
        
        ></bar-chartS>
        </div>
     
     </el-card>
     <br/>
     <el-card  shadow="hover"  :body-style="{padding: '0px'}">
        <!-- 雷达图部分 -->
     <el-form ref="form2" :model="form2" label-width="110px" class="box" style="margin-top:15px">
       <el-row>
            <el-col :span="9">
              <el-form-item label="起始时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form2.time1"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="截止时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form2.time2"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>              
            </el-col>
             <el-col :span="5">
              <el-button type="primary" style="margin-left:55px" @click="getRemarDataSS">搜索</el-button>
               </el-col>
          </el-row>
     </el-form>
        <br/>
       <radar-chartS
        :radarDataS="radarDataS"
        
        ref="drawradarChartS"
        ></radar-chartS>
        <br/>
      
      
      </el-card>
      
                </cloumn-chart2>
                
              </el-tab-pane>
        </el-tabs>
 
      <br/> <br/><br/> <br/>
   
     
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";
import {formatDate} from "../design/dataChange";
import barChart from "./components/barChart"
import radarChart from "./components/radarChart"
import barChartS from "./components/barChartS"
import radarChartS from "./components/radarChartS"
export default {
  name:"evaluate",
    
  components:{
    "bar-chart":barChart,
    "radar-chart":radarChart,
    "bar-chartS":barChartS,
    "radar-chartS":radarChartS,
  },
  data() {
    return {
      userName: localStorage.getItem("ms_username"),
      
      activeName: 'first',
     //选择框
     options: [],        
         value:'',
        form2:{
         time1:"",
         time2:"",
        } ,
    
      tableData:"",
      
      radarData:{
      radarData:[],
       indicatorData:[],
      },
       radarDataS:{
       radarDataS:[],
       indicatorDataS:[],
      },
     
      barData:{
      taskCount:[],
      finishTaskCount:[],
      },
       barDataS:{
      taskCountS:[],
      finishTaskCountS:[],
      },
      star:'',
    
       
    };
  },
  //初始化方法
   created() {
    this.getCompanyData();//企业星级读取
    this.getYearData(); //获取条件选择年份数据
    this.getTimeData();///获取条件选择时间数据
    
    this.getRemarData();//企业雷达图数据
    this.barChartData();//柱形图数据获取

     this.getRemarDataSS();//承接雷达图数据
    this.barChartDataSS();//承接柱形图数据获取
    
  },
  //初始化俩图标
  // mounted() {
  
  // },
 
   
  methods: {
     handleClick(tab, event) {
        this.getYearData(); //获取条件选择年份数据
       this.getTimeData();///获取条件选择时间数据
        console.log(tab, event);
      },
    
    

    //获取条件选择时间数据
    getTimeData() {
      let that = this;
      that.axios.post("/api/findTimes").then(response => {
        this.form2.time1 = response.data.allData[0];//本年第一天
        this.form2.time2= response.data.allData[1];  //当天时间
        this.getRemarData();
        this.getRemarDataSS();

           
      });
    },

     //获取条件选择年份数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.value = response.data.allData.nowYear;
        this.options= response.data.allData.years; 
        this.barChartDataSS(); 
        this.barChartData(); 
      
        // that.$refs.drawradarChart.getCharts2();
        // that.$refs.drawradarChartS.getCharts2S();
       // console.log(response.data.allData);      
      });
    },
    //企业雷达图数据
    getRemarData(){
     var that = this;
      
      var data = Qs.stringify({
      // userName:userName
        userName:this.userName,
        startTime:this.form2.time1,
        finishTime:this.form2.time2,
      });
      //  console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findRemarkTimes",
          data: data
        })
        .then(response => {
         this.radarData.radarData=response.data.allData.AllRemarkLength;
         this.radarData.indicatorData=response.data.allData.indicator;
         that.$refs.drawradarChart.getCharts2();  
          
          
        // this.getCharts2();
          
        });
    },
     //承接雷达图数据
    getRemarDataSS(){
     var that = this;
      
      var data = Qs.stringify({
      // userName:userName
        userName:this.userName,
        startTime:this.form2.time1,
        finishTime:this.form2.time2,
      });
      //  console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findRemarkTimesS",
          data: data
        })
        .then(response => {
        // this.radarData.radarData=response.data.allData;
          this.radarDataS.radarDataS=response.data.allData.AllRemarkLengthS;
         this.radarDataS.indicatorDataS=response.data.allData.indicatorS;
         that.$refs.drawradarChartS.getCharts2S();   
          console.log(response.data.allData)   
        // this.getCharts2();
          
        });
    },
     //企业星级读取
    getCompanyData() {
      //console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        
        userName:this.userName,
      });
            
      that
        .axios({
          method: "post",
          url:
            "/api/companyevaluate",
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
        
       userName:this.userName,
        year:this.value,
        
      });
     //  console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/monthTaskCountData",
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
    //承接柱形图数据获取
    barChartDataSS(){
 
      var that = this;
      var data = Qs.stringify({
        
       userName:this.userName,
        year:this.value,
         
        
      });
     
     console.log(data);
      that
        .axios({
          method: "post",
          url:
            "/api/monthTaskCountDataS",
          data: data
          
        })
        .then(response => {
          //this.table = response.data.allData;
         
         this.barDataS.taskCountS=response.data.allData.taskCountS;
         this.barDataS.finishTaskCountS=response.data.allData.finishTaskCount;  

         that.$refs.drawbarChartS.getCharts1S();
         console.log(response.data.allData);
         //this.getCharts1();
        });

    },
     
 
  }
}

</script>
<style scoped>
	/* #inputValue{
		width:240px;
		margin-left: 20px;
		padding-left: 10px;
		border-radius: 3px;
	} */
	.span {
		display: inline-block;
		width: 85px;
		height: 30px;
		background: #eee;
		line-height: 20px;
	}

 /* .input-group{
   
    display: inline;
  } */
.el-main {
  height: 100%;
}
/* .top {
  width: 70%;
  margin-left: 5%;
  height: 320px;
} */
/* .lists {
  width: 100%;
  height: 60%;
  margin-top: 10%;
  margin-left: 0%
} */



</style>