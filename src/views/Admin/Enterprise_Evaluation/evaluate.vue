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
      <br/> <br/><br/> <br/>
   
     
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
      userName: localStorage.getItem("ms_username"),
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
      },
      barData:{
      taskCount:[],
      finishTaskCount:[],
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
    
  },
  //初始化俩图标
  // mounted() {
  
  // },
 
   
  methods: {
    //获取条件选择时间数据
    getTimeData() {
      let that = this;
      that.axios.post("/api/findTimes").then(response => {
        this.form2.time1 = response.data.allData[0];//本年第一天
        this.form2.time2= response.data.allData[1];  //当天时间
        console.log(response.data.allData);      
      });
    },

     //获取条件选择年份数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.value = response.data.allData.nowYear;
        this.options= response.data.allData.years; 
        this.barChartData(); 
        that.$refs.drawradarChart.getCharts2();
       // console.log(response.data.allData);      
      });
    },
    //企业雷达图数据
    getRemarData(radarData){
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