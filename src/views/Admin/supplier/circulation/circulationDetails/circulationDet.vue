<template>
  <div class="circulationDet">
    <el-main style="overflow: hidden">
      <el-page-header @back="goBack" content="详情"></el-page-header>&nbsp;
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <div align="center">
        <el-steps :active="milepostActive" align-center>
          <el-step
            v-for="(stpesdata, key) in milepost"
            :title="stpesdata.title"
            :icon="stpesdata.icon"
            :description="stpesdata.description"
            :key="key"
          ></el-step>
        </el-steps>
      </div>
      <br />
      <br />
      <!-- 基本信息模块 -->
      <div>
        <essential-Information
          ref="essentialInformation"
        ></essential-Information>
      </div>
      <br />
      <br />
      <!-- 申请信息模块 -->
      <div>
        <application-Information
          ref="applicationInformation"
        ></application-Information>
      </div>
      <br />
      <br />
      <!-- 任务计划模块 -->
      <div v-show="show > 0">
        <mission-Plan ref="missionPlan"></mission-Plan>
      </div>
      <br />
      <br />
      <!-- 合同模块 -->
      <div v-show="show > 0">
        <div v-show="state2 === 2">
          <contract-Management ref="contractManagement"></contract-Management>
        </div>
      </div>
      <br />
      <!-- 发货清单模块 -->
      <div v-show="show > 1">
        <div v-show="state3 === 2">
          <delivery-List ref="deliveryList"></delivery-List>
        </div>
      </div>
      <br />
      <div v-show="show > 3" class="designDet">
        <br />
        <br />
        <div
          class="biaoti"
          style="padding: 0 10px; border-left: 3px solid #4e58c5"
        >
          任务评价
        </div>
        <br />
        <br />
        <!-- 评价模块 -->
        <div v-if="reMarkId === 0">
          <div
            class="loading1"
            v-loading="loading"
            element-loading-text="评价生成中......"
          >
            <!-- 雷达图 -->
            <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>

            <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <div class="WCZL">完成质量</div>
                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                <br />
                <br />
              </el-form>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div v-if="reMarkId === 1">
          <!-- 雷达图 -->
          <div class="LDT">
            <!-- 雷达图 -->
            <radar-chart :radarData="radarData" ref="QradarChart"></radar-chart>

            <div class="input_span" align="center">
              <el-form ref="form" :modelZL="formZL">
                <label>完成质量:</label>
                <label id="word" style="font-size: 16px"></label>
                <br />
                <br />
              </el-form>
              <span id="one"></span>
              <span id="two"></span>
              <span id="three"></span>
            </div>
          </div>
        </div>
      </div>
      <el-button @click="passArray()">传数组</el-button>
    </el-main>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../../design/designDetails/dataChange";
import essentialInformation from "../../assembly/essentialInformation";
import applicationInformation from "../../assembly/applicationInformation";
import missionPlan from "../../assembly/missionPlan";
import contractManagement from "../../assembly/contractManagement";
import deliveryList from "../../assembly/deliveryList";
import radarChart from "../circulationDetails/radarChart";
export default {
  data() {
    return {
      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" },
      ],
      //步骤图默认步骤数
      milepostActive: 0,
      //任务Id
      taskId: 0,
      //获取用户名
      userName: sessionStorage.getItem("ms_username"),
      //主要信息数据
      cool: {},
      taskApplyTableData: {},
      taskTableData: {},
      //表格显示控制
      show: 0,
      show1: 0,
      show3: 0,
      //状态显示控制
      state: "",
      state2: 0,
      loading: true,
      state3: 0,
      reMarkId: 1,
      //重做次数
      form: {
        circulationCount: "", //流通完成质量
      },
      //雷达图的数据定义
      radarData: {
        radarData: [],
        indicatorData: [],
      },
      arrayList: [1, 2, 2, 3],
    };
  },
  created() {
    this.getParams();
    this.showData();
    this.getLDData();
    this.getCirculationCount();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //taskId传递方法，获取通过主界面传过来的taskId
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    getCirculationCount() {
      var that = this;
      var data = Qs.stringify({
        // taskId: this.taskId
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/findCirculationCount",
          data: data,
        })
        .then((response) => {
          (this.form.circulationCount = response.data.allData),
            this.styleswith();
        });
    },
    //雷达图数据查找
    getLDData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/remarkDetilsL",
          data: data,
        })
        .then((response) => {
          this.radarData.radarData = response.data.allData.AllRemarkLength;
          this.radarData.indicatorData = response.data.allData.indicator;
          // if (response.data.allData[0] == null) {
          //   this.reMarkId = 0;
          // }
          that.$refs.QradarChart.getCharts1();
        });
    },
    //提交次数 背景颜色变化
    styleswith() {
      if (this.form.circulationCount > -4) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML = "优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.form.circulationCount < -3 && this.form.circulationCount > -8) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
        document.getElementById("word").innerHTML = "良";
        document.getElementById("word").style.color = "orange";
      }
      if (this.form.circulationCount < -7 || this.form.circulationCount == -8) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML = "差";
        document.getElementById("word").style.color = "red";
      }
    },
    //数据显示方法
    showData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data,
        })
        .then((response) => {
          this.cool = response.data.allData.a[0];
          this.taskApplyTableData = response.data.allData.b;
          this.taskTableData = response.data.allData.a;
          this.state = response.data.allData.a[0].taskState;
          this.state2 = response.data.allData.b[0].checkPlanState;
          this.state3 = response.data.allData.a[0].contractState;
          this.sendMsg();
          if (this.state == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.state == "计划提交") {
            this.milepostActive = 1;
            this.show = 1;
          } else if (this.state == "任务进行中") {
            this.milepostActive = 2;
            this.show = 2;
          } else if (this.state == "验收") {
            this.milepostActive = 3;
            this.show = 3;
          } else if (this.state == "完成") {
            this.milepostActive = 4;
            this.show = 4;
          } else {
            this.milepostActive = 6;
            if (response.data.allData.b[0].refuseApplyMessage != null) {
              this.show = 0;
            } else if (response.data.allData.b[0].refusePlanMessage != null) {
              this.show = 1;
            }
          }
          if (this.milepostActive >= 0) {
            this.milepost[0].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].applyTime
            );
          }
          if (this.milepostActive > 1) {
            this.milepost[1].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].checkPlanTime
            );
          }
          if (this.milepostActive > 2) {
            this.milepost[2].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].uploadCircuaterTime
            );
          }
          if (this.milepostActive > 3) {
            this.milepost[3].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].checkCircuaterTime
            );
          }
          if (this.milepostActive >= 4) {
            this.milepost[4].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].finishTime
            );
          }
          this.styleswith();
        });
    },
    //数据传递方法
    sendMsg() {
      this.$refs.essentialInformation.getMsg(this.cool);
      this.$refs.applicationInformation.getMsg(this.taskApplyTableData);
      this.$refs.missionPlan.getMsg(this.taskApplyTableData);
      this.$refs.contractManagement.getMsg(this.taskTableData);
      this.$refs.deliveryList.getMsg(this.taskTableData);
    },
    //返回列表
    goBack() {
      this.$router.push({
        path: "/admin/designTaskq",
        query: {
          taskId: this.taskId,
        },
      });
    },
    passArray() {
      var that = this;
      var strify = JSON.stringify(this.arrayList)
      var data = Qs.stringify({
        array: strify,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplierCon/passArray",
          data: data,
        })
        .then((response) => {
          console.log(response.data.allData);
        });
    },
  },
  components: {
    "essential-Information": essentialInformation, //基本信息
    "application-Information": applicationInformation,
    "mission-Plan": missionPlan,
    "contract-Management": contractManagement,
    "delivery-List": deliveryList,
    "radar-chart": radarChart,
  },
};
</script>
<style lang="scss" scoped>
.circulationDet {
  //雷达图
  .LDT {
    height: 300px;
  }

  //完成质量
  .WCZL {
    font-size: 11px;
  }

  .table {
    font-size: 13px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .loading1 {
    height: 400px;
  }
  .box-card {
    width: 960px;
    /* border: 1px solid #00a2e6 ; */
  }
  //返回字体
  .el-page-header__title {
    font-size: 18px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }

  // 进度样式调整
  .el-step__head.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .minheight {
    min-height: 100px;
    font-size: 16px;
  }

  //质量图样式调整
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
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
  .task-detail {
    font-size: 16px;
    width: 400px;
  }
  .title-detail {
    color: #000000;
    font-size: 25px;
    float: left;
    width: 350px;
  }
}
</style>
