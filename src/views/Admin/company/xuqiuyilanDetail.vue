<template>
  <div class="xuqiuyilanDet">
    <div class="overallSituation">
      <el-row>
        <div>
          <div class="title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/xuqiuyilan' }">需求一览</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: 'admin/xuqiuyilanDetail' }">需求详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <br />
        </div>
      </el-row>
      <br />
      <el-card shadow="never" style="margin-bottom:20px;">
        <div class="np_top">
          <div class="preview">
            <div class="BigTime">
              <el-carousel height="200" width="200" direction="vertical" arrow="always">
                <el-carousel-item v-for="(item,index) in imagesbox" :key="index">
                  <img :src="item.idView" class="images" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>

          <div class="Right">
            <div>
              <div class="title-detail">
                <font>{{taskID}}</font>
                <font>{{applyList.taskName}}</font>
              </div>
            </div>
            <br />
            <el-divider></el-divider>
            <ul class="ul02">
              <el-row>
                <el-col :span="8" class="task-detail">
                  <li>
                    <a>
                      行业类别：
                      <font>{{applyList.taskCategoryMain}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      需求类别：
                      <font>{{applyList.taskCategoryPart}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      需求类型：
                      <font v-if="applyList.taskType === 1">流通需求</font>
                      <font v-if="applyList.taskType === 0">设计需求</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      发布需求企业：
                      <font>{{applyList.companyName}}</font>
                    </a>
                  </li>
                  <br />
                </el-col>
              </el-row>
            </ul>
          </div>
        </div>
        <div class=".np_top1">
          <el-tabs type="border-card">
            <el-tab-pane label="需求详情">
              <div class="Right1">
                <ul class="ul02">
                  <el-row>
                    <el-col :span="8" class="task-detail">
                      <li>
                        <a>
                          需求开始时间：
                          <font>{{applyList.beginTime|formatDate}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          需求截止时间：
                          <font>{{applyList.deadline|formatDate}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          需求方联系电话：
                          <font>{{applyList.businessTel}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          发布企业：
                          <font>{{companyList.companyName}}</font>
                        </a>
                      </li>
                      <br />

                      <li>
                        <a>
                          行业类别：
                          <font>{{applyList.taskCategoryMain}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          需求类别：
                          <font>{{applyList.taskCategoryPart}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          规格文件：
                          <el-button type="warning" >下载规格文件</el-button>
                        </a>
                      </li>
                       
                    </el-col>
                  </el-row>
                </ul>
               
              </div>
              
            </el-tab-pane>
            <el-tab-pane label="需求方详情">
              <div class="Right1">
                <div class="title-company-detail">
                  <font @click="companyDetail()">{{companyList.companyName}}</font>
                </div>
                <br />
                <el-divider></el-divider>
                <ul class="ul02">
                  <el-row>
                    <el-col :span="8" class="task-detail">
                      <li>
                        <a>
                          经营范围：
                          <font>{{companyList.product}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          企业所在省：
                          <font>{{companyList.province}}省</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          企业所在市：
                          <font>{{companyList.city}}市</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          企业地址：
                          <font>{{companyList.address}}</font>
                        </a>
                      </li>
                      <br />

                      <li>
                        <a>
                          联系电话：
                          <font>{{companyList.businessTel}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          email：
                          <font>{{companyList.email}}</font>
                        </a>
                      </li>
                      <br />
                    </el-col>
                  </el-row>
                </ul>
              </div>
              <div class="left">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <div
                      style="margin:-18px -20px; padding:10px 20px; background:#ffc107; font-size:18px;"
                    >企业简介</div>
                  </div>
                  <div>{{companyList.introduction}}</div>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <br />
        <br />
        <div class="dialog-footer">
          <el-button v-show="applyIf === 0" type="warning" @click="applyTask()">申请任务</el-button>
        </div>
      </el-card>
    </div>

    <!-- 申请任务弹出框 -->
    <el-dialog
      :visible.sync="applyDiaLog"
      width="30%"
    ><div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请任务</div>
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="applyList" label-width="120px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="联系电话:" prop="buyerPhone" required>
              <el-input v-model="ruleForm.buyerPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label-width="0" class="dialog-footer">
          <el-button type="warning" @click="apply()">确认申请</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "xuqiuyilanDetail",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      ruleForm: {
        buyerPhone: ""
      },
      rules: {
        buyerPhone: [{ validator: checkPhone, trigger: "blur" }]
      },
      //申请框
      applyList: [
        {
          taskName: "",
          companyId: 0,
          taskType: "",
          beginTime: "",
          deadline: "",
          businessTel: "",
          taskTypeName: "",
          applyTime: "",
          taskCategoryMain: "",
          taskCategoryMainId: 0,
          taskCategory: "",
          taskCategoryPart: 0,
          companyName: ""
        }
      ],
      companyList: {
        companyId: 0,
        province: "",
        city: "",
        companyName: "",
        companyCategory: "",
        address: "",
        businessName: "",
        introduction: "",
        product: "",
        address: "",
        businessTel: "",
        email: ""
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
      taskID: 40,
      userName: "supplier",
      applyDiaLog: false,
      //判断企业是否申请过此任务
      applyIf: 0,
      //接受企业名称
      companyName1: 0,
      companyId: 0,
      //联系电话
      applyList1: [
        {
          supplierTel: ""
        }
      ]
    };
  },
  created() {
    this.showTaskData();
    this.showApply();
    // this.getParams();
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    //获取详情值
    getParams() {
      var routerParams = this.$route.query.taskID;
      this.taskID = routerParams;
      console.log(routerParams);
    },
    //申请弹窗
    applyTask() {
      this.applyDiaLog = true;
    },
    //数据显示
    showTaskData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID
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
          this.companyList = response.data.allData.b[0];
          companyId = response.data.allData.b[0].companyId;
          if (response.data.allData.a[0].taskType == 1) {
            this.applyList.taskTypeName = "流通";
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
        taskId: this.taskID,
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
        path: "/xuqiuyilan"
      });
    },
    //申请数据上传
    apply() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
        taskName: this.applyList.taskName,
        publishingCompanyId: this.companyList.companyId,
        userName: this.userName,
        taskType: this.applyList.taskType,
        taskCategoryMain: this.applyList.taskCategoryMain,
        taskCategoryMainId: this.applyList.taskCategoryMainId,
        taskCategory: this.applyList.taskCategory,
        taskCategoryPart: this.applyList.taskCategoryPart,
        supplierTel: this.ruleForm.buyerPhone
      });
      that.axios({
        method: "post",
        url: "/api/xuqiuyilan/addApplyInformational",
        data: data
      });
      this.$message.success("提交成功");
      this.$router.go(0);
    },
    companyDetail(companyId) {
      console.log("触发了呀");
      this.$router.push({
        path: "company/excellentCompanyDetail",
        query: { companyId: companyId }
      });
    }
  }
};
</script>
<style lang="scss" scope>
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
    width: 900px;
  }
  .task-detail {
    font-size: 16px;
    width: 900px;
  }
  .title-detail {
    color: #ff7720;
    font-size: 25px;
    float: left;
  }
  .title-company-detail {
    color: #0f0e0d;
    font-size: 20px;
    float: left;
  }
  .dialog-footer {
    text-align: center;
  }
  .np_top1 {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 0px;

    /* margin-left: 305.6px; */

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
  .Right1 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 10px;

    margin-left: 0px;

    margin-right: 0px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 600px;
  }
  .box-card {
    width: 480px;
  }
  .Right1 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 10px;

    margin-left: 0px;

    margin-right: 0px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 600px;
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
  .left {
    margin-left: 30px;
    float: right;
  }
}
</style>