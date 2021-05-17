<template>
  <div class="designDet">
    <el-main style="overflow: hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp;
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(stpesdata, key) in milepost"
          :title="stpesdata.title"
          :icon="stpesdata.icon"
          :description="stpesdata.description"
          :key="key"
        ></el-step>
      </el-steps>
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
      <div v-show="show > 0 && state4 === 1">
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
      <!-- 内部审核模块  人员分配-->
      <div v-show="show > 1">
        <div v-show="state3 === 2">
          <Internal-Audit ref="InternalAudit"></Internal-Audit>
        </div>
      </div>
      <br />
      <!-- 设计模块 -->
      <div v-show="show > 1">
        <div v-show="designCount > 0">
          <design-Acceptance ref="designAcceptance"></design-Acceptance>
        </div>
      </div>
      <!-- 重传文件模块 -->
      <!-- <div>
          <return-File ref="returnFile"></return-File>
        </div> -->
      <div v-show="show > 4 && state3 === 2" class="designDet">
        <br />
        
        <!-- <div v-show="evaluationHiding === 1" class="remark">    此处为临时注释，大佬手下留情误删除-->
          <div  class="remark">
          <div
            class="biaoti"
            style="padding: 0 10px; border-left: 3px solid #4e58c5"
          >
            任务评价
          </div>
          <!-- 评价模块 -->
          <div v-if="reMarkId === 0 && state3 === 2">
            <div
              class="loading1"
              v-loading="loading"
              element-loading-text="评价生成中......"
            >
              <radar-chart
                :radarData="radarData"
                ref="QradarChart"
                style="height:330px"
              ></radar-chart>

              <div class="supplierinput_span" align="center">
                <el-form ref="form">
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
               <div id="charts1" style="height:380px; width:530px; float:left">
              <radar-chart
                :radarData="radarData"
                ref="QradarChart"
              ></radar-chart>
              </div>
              <div class="supplierinput_span" align="center">
                <el-form ref="form">
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
      </div>
      <!-- <el-divider content-position="center"
        ><el-link type="primary" :underline="false" @click="remarkControl()">{{
          tips
        }}</el-link></el-divider
      > -->
    </el-main>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../designDetails/dataChange";
import essentialInformation from "../../assembly/essentialInformationDesign";
import applicationInformation from "../../assembly/applicationInformation";
import missionPlan from "../../assembly/missPlanDesign";
import contractManagement from "../../assembly/contractManagementDesign";
import InternalAudit from "../../assembly/InternalAudit";
import designAcceptance from "../../assembly/designAcceptance";
import returnFile from "../../assembly/returnFile";
import radarChart from "../../assembly/radarChart";
export default {
  data() {
    return {
      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" },
      ],
      //步骤图默认步骤数
      milepostActive: 0,
      //任务Id
      taskId: 0,
      state4: 0,
      //获取用户名
      userName: sessionStorage.getItem("ms_username"),
      //主要信息数据
      cool: {},
      loading: true,
      taskApplyTableData: {},
      taskTableData: {},
      //表格显示控制
      show: 0,
      show1: 0,
      show3: 0,
      tips: "显示任务评价",
      evaluationHiding: 0,

      //状态显示控制

      state: "",
      state2: 0,
      state3: 0,
      reMarkId: 1,
      //重做次数
      designCount: 0,
      //雷达图的数据定义
      radarData: {
        radarData: [],
        indicatorData: [],
      },
    };
  },
  created() {
    this.getParams();
    this.showData();
    this.getLDData();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  methods: {
    remarkControl() {
      if (this.evaluationHiding == 1) {
        this.evaluationHiding = 0;
        this.tips = "显示任务评价";
      } else if (this.evaluationHiding == 0) {
        (this.evaluationHiding = 1), (this.tips = "隐藏任务评价");
      }
    },
    //taskId传递方法，获取通过主界面传过来的taskId
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
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
          // console.log(response.data.allData);
          // if (response.data.allData[0] == null) {
          //   this.reMarkId = 0;
          // }
          that.$refs.QradarChart.getCharts1();
        });
    },
    //质量图方法
    styleswith() {
      if (this.designCount > 0 && this.designCount < 3) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML = "优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.designCount > 2 && this.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
        document.getElementById("word").innerHTML = "良";
        document.getElementById("word").style.color = "orange";
      }
      if (this.designCount > 4 || this.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML = "差";
        document.getElementById("word").style.color = "red";
      } else {
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
          if (this.state2 == 2) {
            this.state3 = response.data.allData.a[0].contractState;
          } else {
            this.state3 = 0;
          }
          this.state4 = response.data.allData.b[0].checkApplyState;
          if (this.state2 == 2) {
            this.designCount = response.data.allData.a[0].designCount;
          } else {
            this.designCount = 0;
          }
          this.sendMsg();
          //this.$refs.returnFile.getMsg(response.data.allData);
          if (this.state == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.state == "计划提交") {
            this.milepostActive = 1;
            this.show = 1;
          } else if (this.state == "任务进行中") {
            this.milepostActive = 2;
            this.show = 2;
          } else if (this.state == "审核") {
            this.milepostActive = 3;
            this.show = 3;
          } else if (this.state == "验收") {
            this.milepostActive = 4;
            this.show = 4;
          } else if (this.state == "完成") {
            this.milepostActive = 5;
            this.show = 5;
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
              response.data.allData.a[0].uploadDesignTime
            );
          }
          if (this.milepostActive > 3) {
            this.milepost[3].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].supplierCheckDesignTime
            );
          }
          if (this.milepostActive > 4) {
            this.milepost[4].description = this.$options.filters["formatDate"](
              response.data.allData.a[0].demandorCheckDesignTime
            );
          }
          if (this.milepostActive >= 5) {
            this.milepost[5].description = this.$options.filters["formatDate"](
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
      this.$refs.InternalAudit.getMsg(this.taskTableData);
      this.$refs.designAcceptance.getMsg(this.taskTableData);
    },
    //返回列表
    goBack() {
      // this.$router.push({
      //   path: "/admin/designTaskq",
      //   query: {
      //     taskId: this.taskId,
      //   },
      // });
      window.history.back(-1);
    },
  },
  components: {
    "essential-Information": essentialInformation, //基本信息
    "application-Information": applicationInformation,
    "mission-Plan": missionPlan,
    "contract-Management": contractManagement,
    "Internal-Audit": InternalAudit,
    "design-Acceptance": designAcceptance,
    "return-File": returnFile,
    "radar-chart": radarChart,
  },
};
</script>
<style lang="scss">
//雷达图
.designDet.LDT {
  height:380px;
   width:530px;
}

//完成质量
.designDet.WCZL {
  font-size: 11px;
}

.designDet .table {
  font-size: 13px;
}
.designDet .text {
  font-size: 14px;
}

.designDet .item {
  padding: 18px 0;
}
.designDet .loading1 {
  height: 400px;
}
/*.designDet .box-card {
  width: 960px;
  border: 1px solid #00a2e6 ; 
}*/
//返回字体
.designDet .el-page-header__title {
  font-size: 18px;
}
.designDet .biaoti {
  font-size: 18px;
  color: #303133;
}
.designDet .el-input.is-disabled .el-input__inner {
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
.designDet .minheight {
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

.designDet .supplierinput_span span {
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
.designDet .el-dialog__header {
  padding: 0px 0px 0px;
}
.designDet .task-detail {
  font-size: 16px;
  width: 400px;
}
.designDet .title-detail {
  color: #000000;
  font-size: 25px;
  float: left;
  width: 350px;
}
.remark{
  height: 450px;
}
</style>
