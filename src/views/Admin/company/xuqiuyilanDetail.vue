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
                <font>{{cool.taskName}}</font>
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
                      <font>很多类</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      任务类别：
                      <font>{{companyList.companyCategory}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      其他：
                      <font>{{cool.all}}</font>
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
              <el-input v-bind:value="companyList.companyCategory" :readonly="true"></el-input>
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
          <el-col :span="11">
            <el-form-item label="流通数量:">
              <template>
                <el-input-number v-model="circulationQuantity" :step="100" step-strictly></el-input-number>
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
      //需求信息
      cool: {
        taskName: "",
        taskType: ""
      },
      //申请框
      applyList: {
        taskType: "",
        beginTime: "",
        deadline: "",
        businessTel: "",
        taskTypeName: "",
        applyTime: ""
      },
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
      taskId: 43,
      publishingCompanyId: 0,
      userName: "supplier",
      applyDiaLog: false,
      //判断企业是否申请过此任务
      applyIf: 0,
      //接受企业名称
      companyName: ""
    };
  },
  created() {
    this.showTaskData();
    this.showCompanyData();
    this.applyIf();
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
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/xuqiuyilan/getAllDet",
          data: data
        })
        .then(response => {
          console.log(response);
          this.cool = response.data.allData;
          this.applyList = response.data.allData;
          this.publishingCompanyId = response.data.allData;
          if ((response.data.allData.taskType = 1)) {
            this.applyList.taskTypeName = "流通";
          } else {
            this.applyList.taskTypeName = "设计";
          }
        });
    },
    showCompanyData() {
      var that = this;
      var data = Qs.stringify({
        companyId: this.publishingCompanyId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/xuqiuyilan/getCompanyDet",
          data: data
        })
        .then(response => {
          console.log(response);
          this.companyList = response.data.allData;
        });
    },
    //返回首页
    goHome() {
      this.$router.push({
        path: "/Home",
        query: {
          taskId: this.taskId
        }
      });
    },
    //判断企业是否申请过此任务
    applyIf() {
      var that = this;
      var data = Qs.stringify({
        userName: this.userName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8081/xuqiuyilan/applyIf",
          data: data
        })
        .then(response => {
          this.applyIf = 1;
          this.companyName = response.data.allData;
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
        taskName: this.cool.taskName,
        publishingCompanyId: this.publishingCompanyId,
        userName: this.userName,
        beginTime: this.applyList.beginTime,
        deadline: this.applyList.deadline,
        taskType: this.applyList.taskType,
        applyTime: this.applyList.applyTime,
        circulationQuantity: this.circulationQuantity
      });
      that.axios({
        method: "post",
        url: "http://127.0.0.1:8081/xuqiuyilan/addApplyInformational",
        data: data
      });
      this.$message.success("提交成功");
      this.circulationQuantity = 0;
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
    font-size: 18px;
  }
  .title-detail {
    color: #ff7720;
    font-size: 20px;
    float: left;
  }
}
</style>