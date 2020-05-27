<template>
  <div>
    <div>
      <el-container>
        <el-main>
          <h3>流通任务数据统计</h3>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <!-- 步骤图片 -->

          <!-- <el-steps :active="milepostActive1" align-center>
            <el-step
              v-for="(stpesdata, key) in milepost"
              :title="stpesdata.title"
              :icon="stpesdata.icon"
              :description="stpesdata.description"
              :key="key"
            ></el-step>
          </el-steps> -->

          <br />
          <br />
          <!-- 雷达图 -->
          <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>
          <br />
          <br />

          <div class="input_span">
            <el-form ref="form" :model="form">
              <label>完成质量:</label>
              <label id="word" style="font-size:16px" ></label>
              <br />
              <br />
            </el-form>
            <span id="one"></span>
            <span id="two"></span>
            <span id="three"></span>
            
          </div>
           
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
import radarChart from "./components/radarChart";
export default {
  name: "circulationTaskEvaluationDetils",
  components: {
    "radar-chart": radarChart
  },

  data() {
    return {
      form: {
        designCount: "",//设计完成质量
        circulationCount:"",//流通完成质量
      },

      radarData: {
        radarData: []
      },
      

      stpesdata: [],

      taskId: this.$route.query.taskId, //获取值，初始化

      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" }
      ],

      // 默认步骤数
      milepostActive: 5,
      // 动态添加类名
      stepActive: "stepActive",
      //申请状态按钮显示隐藏
      applicationStatus: 0,
      //任务计划状态按钮显示隐藏
      taskPlanStatus: 0,
      //合同管理状态按钮显示隐藏
      contractManagementStatus: 0,
      //设计任务状态按钮显示隐藏
      designState: 0
    };
  },
  //初始化方法
  created() {
    // this.getParams();
    this.getData(); //步骤图数据查找
    this.getData1(); //雷达图数据查找
   
    this.getCirculationCount();
  },
  //初始化俩图标
  // mounted() {

  // },

  methods: {
    //   goBack() {
    //     this.$router.push("/admin/Enterprise_Evaluation/evaluate");
    //   },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.form.circulationCount > -4 ) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML="优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.form.circulationCount < -3 && this.form.circulationCount > -8) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
         document.getElementById("word").innerHTML="良";
         document.getElementById("word").style.color = "orange";
      }
      if (this.form.circulationCount < -7 || this.form.circulationCount == -8) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML="差";
         document.getElementById("word").style.color = "red";
      }
     
    },

    //步骤图数据查找
    getData() {
      var that = this;
      // console.log(this.taskId);
      var data = Qs.stringify({
        taskId: this.taskId
      });
      //console.log(data);

      that
        .axios({
          method: "post",
          url: "/api/evaluateDetils",
          data: data
        })
        .then(response => {
          // that.stpesdata = response.data.allData[0];
          that.form.designCount = response.data.allData[6]; //完成质量数据

          this.milepost[0].description = response.data.allData[0];
          this.milepost[1].description = response.data.allData[1];
          this.milepost[2].description = response.data.allData[2];
          this.milepost[3].description = response.data.allData[3];
          this.milepost[4].description = response.data.allData[4];
          this.milepost[5].description = response.data.allData[5];
          this.styleswith();
          // console.log(response.data.allData)

          // publishTime:"",//发布时间
          //   finishTime:"",//完成时间
          //   applyTime:"",//申请时间
          //   planUploadTime:"",//计划书提交时间
          //   checkPlanTime:"",//审核计划书时间
          //   demandorCheckDesignTime:"",//项目审核时间
        });
    },

    //雷达图数据查找
    // getData1() {
    //   var that = this;
    //   var data = Qs.stringify({
    //     taskId: this.taskId
    //   });
    //   that
    //     .axios({
    //       method: "post",
    //       url: "http:/api/remarkDetils",
    //       data: data
    //     })
    //     .then(response => {
    //       // this.radarData.radarData.push( response.data.allData.taskLength),
    //       // this.radarData.radarData.push( response.data.allData.planLength),
    //       // this.radarData.radarData.push( response.data.allData.checkLength),
    //       // this.radarData.radarData.push( response.data.allData.applyLength),
    //       // this.radarData.radarData.push( response.data.allData.demandorCheckLength),
    //       this.radarData.radarData = response.data.allData;

    //       that.$refs.QradarChart.getCharts1();
    //       // this.$refs.QadarChart.getCharts();
    //       // this.getCharts1();
    //       // console.log(response.data.allData);
    //     });
    // },
    getCirculationCount(){
     var that = this;
      var data = Qs.stringify({
       // taskId: this.taskId
       taskId:this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/findCirculationCount",
          data: data
        })
        .then(response => {
        
         this.form.circulationCount=response.data.allData,
          this.styleswith();
         
        });
    }
  }
};
</script>

<style scoped>
.is-horizontal {
  display: none;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.block {
  margin-top: 10px;
  margin-bottom: 20px;
}
.stars {
  white-space: nowrap;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.stars li {
  display: inline-block;
  color: #adadad;
  font-size: 40px;
}
.charts1 {
  width: 66%;
  margin-top: 5%;
  margin-left: 0%;
  height: 320px;
}
.el-input__inner {
  border-left: none;
  border-right: none;
  border-top: none;
  border-radius: 0px;
  text-align: center;
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}

#inputValue {
  width: 240px;
  margin-left: 0px;
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
#font span:nth-child(1) {
  color: #00d1b2;
  margin-left: 80px;
}
#font span:nth-child(2) {
  color: orange;
  margin: 0 60px;
}
#font span:nth-child(3) {
  color: red;
}
</style>