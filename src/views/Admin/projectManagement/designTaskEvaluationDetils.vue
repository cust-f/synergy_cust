<template>
  <el-container>
    <el-main>
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          数据统计
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-card shadow="hover" :body-style="{padding: '0px'}"> 
        
        <el-col :span="8" >
         <div class="grid-content grid-con-3">
                <i class="el-icon-s-data grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num" v-html="sumTime">1101</div>
                  <div>完成总天长</div>
                </div>
              </div>
        </el-col>
         <el-col :span="16" >
          <div class="input_span">
            <el-form ref="form" :model="form">
              <label class="grid-cont-right" style="margin-left:275px;">平均完成质量：</label>
               <label id="word" style="font-size:14px" ></label>
              <br />
              <br />
            </el-form>
            <div style="margin-left:200px;">
            <span id="one"></span>
            <span id="two"></span>
            <span id="three"></span>
            </div>
          </div>
        </el-col>
       
      </el-card>
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
    
      <br/> <br/><br/> <br/>

    
     
    </el-main>
  </el-container>
</template>

<script>
import Qs from "qs";

import barChart from "./components/barChart"

export default {
  name:"designTaskEvaluationDetils",
 
  components:{
    "bar-chart":barChart,
    
  },
  data() {
    return {
      designername:localStorage.getItem("designer_name"),
     //选择框
     options: [],        
        value:'',
      
       form: {
        designCount:[]
      },
      sumTime:[],
     
      barData:{
      taskCount:[],
      finishTaskCount:[],
      },
     
     // userName:this.$route.query.userName, 

    };
  },
  //初始化方法
   created() {
    this.getYearData(); //获取条件选择时间数据
    this.getData();
    this.barChartData();//柱形图数据获取
   
    
  },
 
   
  methods: {

    //获取条件选择时间数据
    getYearData() {
      let that = this;
      that.axios.post("/api/findYearsList").then(response => {
        this.value = response.data.allData.nowYear;
        this.options= response.data.allData.years;  
        this.barChartData();
        console.log(response.data.allData);      
      });
    },

    styleswith() {
      if (this.form.designCount > 0 && this.form.designCount < 6) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML="优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.form.designCount > 5 && this.form.designCount < 11) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
         document.getElementById("word").innerHTML="良";
         document.getElementById("word").style.color = "orange";
      }
      if (this.form.designCount > 10 || this.form.designCount == 11) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML="差";
         document.getElementById("word").style.color = "red";
      }
    },
     //获取总时长，平均完成质量
      getData(){
 
      var that = this;
      var data = Qs.stringify({
        
        designer:this.designername,      
        
      });
      // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/findDesignerTaskLists",
          data: data
        })
        .then(response => {
                  
         this.form.designCount=response.data.allData[1];
         this.sumTime=response.data.allData[0];  
         this.styleswith() ;        
        
        });

    },

    
     //柱形图数据获取
    barChartData(){
     var charts = [];
      var that = this;
      var data = Qs.stringify({
        
        designer:this.designername,  
        year:this.value,
        
      });
      // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "/api/monthDesignerTaskCountData",
          data: data
        })
        .then(response => {
          //this.table = response.data.allData;
         
         this.barData.taskCount=response.data.allData.taskCount;
         this.barData.finishTaskCount=response.data.allData.finishTaskCount;          
         that.$refs.drawbarChart.getCharts2();
          console.log(response.data.allData); 
         
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
.grid-content {
  display: flex;
  align-items: center;
  height: 80px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.input_span span {
  display: inline-block;
  width: 85px;
  height: 30px;
  background: #eee;
  line-height: 20px;
}

#one {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 0px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
</style>