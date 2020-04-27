<template>
  <div class="xuqiuyilanDet">
    <div class="overallSituation">
      <el-row>
        <div>
          <div class="title">
            <span @click="goHome()">首页</span>
            <span>&nbsp; > &nbsp;</span>
            <span @click="goBack()">需求一览</span>
            <span>&nbsp; > &nbsp;</span>
            <span>需求详情</span>
          </div>
          <br />
        </div>
      </el-row>
      <br />
      <el-card shadow="never" style="margin-bottom:20px;">
        <div class="np_top">
          <div class="preview">
            <div class="BigTime">
              <el-carousel height="400" width="400" direction="vertical" arrow="always">
                <el-carousel-item v-for="(item,index) in imagesbox" :key="index">
                  <img :src="item.idView" class="images" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>

          <div class="Right">
            <div>
              <div class="title-detail">
                <font>{{taskId}}</font>
                <font>{{applyList.taskName}}</font>
              </div>
            </div>
            <el-divider></el-divider>
            <ul class="ul02">
              <el-row>
                <el-col :span="8" class="task-detail">
                  <li>
                    <a>
                      价格：
                      <font>面议</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      限制类别：
                      <font>{{applyList.taskCategoryMain}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      任务类别：
                      <font>{{applyList.taskCategoryPart}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      需求类型:
                      <font v-if="applyList.taskType === 1">流通需求</font>
                      <font v-if="applyList.taskType === 0">设计需求</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      其他：
                      <font></font>
                    </a>
                  </li>
                  <br />
                  <div class="applybutten">
                    <el-button v-show="applyIf === 0" type="warning" @click="applyTask()">申请任务</el-button>
                  </div>
                </el-col>
              </el-row>
            </ul>
          </div>
        </div>
        <div class="white">
          <el-tabs type="card">
            <el-tab-pane label="企业信息">
              <div>
                <div class="message">{{companyList.introduction}}</div>
                <el-divider></el-divider>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>

    <!-- 申请任务弹出框 -->
    <el-dialog title="申请任务弹出框" :visible.sync="applyDiaLog" width="50%">
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="applyList" label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="行业类别:">
              <el-input v-bind:value="applyList.taskCategoryMain" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所在地区:">
              <el-input v-model="companyList.address" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="业务联系方式:">
              <el-input v-model="companyList.businessTel" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求类型:">
              <el-input v-model="applyList.taskTypeName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="需求开始时间:">
              <el-input v-bind:value="applyList.beginTime|formatDate" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="需求截至时间:">
              <el-input v-bind:value="applyList.deadline|formatDate" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11" v-if="circulationQuantityIf ===0">
            <el-form-item label="流通数量:">
              <template>
                <el-input-number  v-model="circulationQuantity" :step="100" step-strictly></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="apply()">确认申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "xuqiuyilanDetail",
  data() {
    return {
      circulationQuantity: 0,
      //流通数量控制器
      circulationQuantityIf:1,
      //申请框
      applyList: [
        {
          taskName: "",
          publishingCompanyId: 0,
          taskType: "",
          beginTime: "",
          deadline: "",
          businessTel: "",
          taskTypeName: "",
          applyTime: "",
          taskCategoryMain: "",
          taskCategoryMainId:0,
          taskCategory:"",
          taskCategoryPart:0
        }
      ],
      companyList: {
        companyName: "",
        companyCategory: "",
        address: "",
        businessName: "",
        introduction: ""
      },
      TaskDetail: "",
      TaskDetailContent: "",
      imagesbox: [
        { id: 0, idView: require("../company/1.png") },
        { id: 1, idView: require("../company/2.jpg") },
        { id: 2, idView: require("../company/3.jpg") }
      ],
      beginTime1: "",
      deadline1: "",
      taskId: 43,
      publishingCompanyId: 0,
      userName: "supplier",
      applyDiaLog: false,
      //判断企业是否申请过此任务
      applyIf: 0,
      //接受企业名称
      companyName1: ""
    };
  },
  created() {
    this.showTaskData();
    this.showApply();
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    // //获取详情值
    // getParams() {
    //   var routerParams = this.$route.query.taskId;
    //   this.taskID = routerParams;
    //   console.log(routerParams);
    // },
    //申请弹窗
    applyTask() {
      this.applyDiaLog = true;
    },
    //数据显示
    showTaskData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getAllDet",
          data: data
        })
        .then(response => {
          console.log(response);
          this.applyList = response.data.allData.a[0];
          this.publishingCompanyId =
            response.data.allData.a[0].publishingCompanyId;
          this.companyList = response.data.allData.b[0];
          console.log(response.data.allData.a[0].taskType);
          if ((response.data.allData.a[0].taskType == 1)) {
            this.applyList.taskTypeName = "流通";
            this.circulationQuantityIf = 0;
          } else {
            this.applyList.taskTypeName = "设计";
          }
        });
    },
    //返回首页
    goHome() {
      this.$router.push({
        path: "/Home"
      });
    },
    //判断企业是否申请过此任务
    showApply() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/applyIf",
          data: data
        })
        .then(response => {
          this.companyName1 = response.data.allData[0].Id;
          console.log(this.companyName1);
          if (this.companyName1 == 0) {
            this.applyIf = 0;
          } else {
            this.applyIf = 1;
          }
          console.log(this.applyIf);
        });
    },
    //返回首页
    goBack() {
      this.$router.push({
        path: "/xuqiuyilan",
        query: {
          taskId: this.taskId
        }
      });
    },
    //申请数据上传
    apply() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        taskName: this.applyList.taskName,
        publishingCompanyId: this.publishingCompanyId,
        userName: this.userName,
        taskType: this.applyList.taskType,
        circulationQuantity: this.circulationQuantity,
        taskCategoryMain:this.applyList.taskCategoryMain,
        taskCategoryMainId:this.applyList.taskCategoryMainId,
        taskCategory:this.applyList.taskCategory,
        taskCategoryPart:this.applyList.taskCategoryPart,
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/addApplyInformational",
        data: data
      });
      this.$message.success("提交成功");
      this.circulationQuantity = 0;
      this.$router.go(0);
    }
  }
};
</script>
<style lang="scss">
.xuqiuyilanDet {
  .overallSituation {
    width: 1200px;
    margin: 0 auto;
  }
  .images {
    width: 300px;
    height: 300px;
  }
  .inner {
    border: none;
  }
  .white {
    /* width: 67%; */
    margin-top: 20px;
  }
  .divtap {
    border-right: 1px solid #000;
    border-top: 1px solid #000;
  }
  .designcomment {
    width: 80%;
    text-align: center;
  }
  .yqk_nr_bt {
    display: block;
    width: 200px;
    font-size: 16px;
    line-height: 40px;
    color: #00a2e6;
  }
  .title {
    font-size: 14px;
    font-style: normal;
    width: 250px;
    margin-top: 22px;
  }
  .np_top {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 0px;

    margin-right: 65.61px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 10px;

    padding-left: 10px;

    padding-right: 10px;

    padding-top: 10px;

    text-decoration: none;

    width: 1280px;
  }
  .BigTime {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    height: 300px;

    line-height: normal;

    margin-bottom: 0px;

    margin-left: 0px;

    margin-right: 0px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    position: relative;

    text-decoration: none;

    width: 300px;
  }
  .ull {
    width: 200px;
  }
  .ulr {
    width: 200px;
  }
  .Right {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 0px;

    margin-left: 40px;

    margin-right: 0px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 920px;
  }
  .Right .el-divider--horizontal {
    width: 87%;
  }
  .ul02 {
    width: 920px;
  }
  .task-detail {
    font-size: 16px;
  }
  .title-detail {
    color: #ff7720;
    font-size: 20px;
    float: left;
  }
}
</style>