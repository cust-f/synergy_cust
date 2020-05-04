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
      <el-card shadow="never">
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
                    <font>{{companyList.businessTel}}</font>
                  </a>
                </li>
                <br />
                <el-button
                  v-show="applyIf === 0"
                  type="warning"
                  class="button-style"
                  @click="applyTask()"
                >申请任务</el-button>
              </el-col>
            </ul>
          </div>
          <div class="left">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div
                  style="margin:-18px -20px; padding:10px 20px; background:#ffc107; font-size:18px;"
                >{{companyList.companyName}}</div>
              </div>
              <div>
                <ul class="ul02">
                  <el-row>
                    
                    <el-col :span="8" class="task-detail">
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
            </el-card>
          </div>
        </div>
        <br />
        <br />
        <div class=".np_top1">
          <el-tabs type="border-card">
            <el-tab-pane label="需求详情">
              <div class="Right2">
                <ul class="ul03">
                  <el-row>
                    <el-col :span="8" class="title-task-detail">
                      <div>{{applyList.taskDetail}}</div>
                    </el-col>
                  </el-row>
                </ul>
              </div>
              <div class="left1">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>附件</span>
                  </div>
                  <div>
                    <el-table :data="tableData" class="customer-table" :show-header="false">
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-link @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="realPath" label="真实地址" v-if="YinCang===0"></el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="需求方详情">
              <div>
                <div class="title-company-detail">
                  <font>{{companyList.companyName}}</font>
                </div>
                <br />
                <el-divider></el-divider>
                <div>{{companyList.introduction }}</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <br />
        <br />
      </el-card>
    </div>
    <!-- 申请任务弹出框 -->
    <el-dialog :visible.sync="applyDiaLog" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请信息</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="ruleForm" :rules="rules" :model="applyList1" label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方：">
              <el-input class=".no-el-input" v-model="companyList.companyName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="需求名：">
              <el-input v-model="applyList.taskName" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="行业类别：">
              <el-input v-model="applyList.taskCategoryMain" :readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="需求类别：">
              <el-input v-model="applyList.taskCategoryPart" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求开始时间：">
              <el-input v-bind:value="applyList.beginTime|formatDate" :readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="需求截止时间：">
              <el-input v-bind:value="applyList.deadline|formatDate" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方电话：">
              <el-input v-model="companyList.businessTel" :readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="联系电话" prop="supplierTel">
              <el-input v-model="applyList1.supplierTel" placeholder="请输入联系电话"></el-input>
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
    return {
      TelIf: 1,
      rules: {
        supplierTel: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
                TelIf = 2;
              } else {
                callback();
                TelIf = 1;
              }
            },
            trigger: "blur"
          }
        ]
      },
      //申请框
      applyList: [
        {
          taskName: "",
          companyId: 0,
          taskType: "",
          beginTime: "",
          deadline: "",
          taskTypeName: "",
          applyTime: "",
          taskCategoryMain: "",
          taskCategoryMainId: 0,
          taskCategory: "",
          taskCategoryPart: 0,
          companyName: "",
          taskDetail: ""
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
      tableData: [
        {
          realName: "",
          realPath: ""
        }
      ],
      TaskDetail: "",
      TaskDetailContent: "",
      imagesbox: [
        { id: 0, idView: require("../company/1.png") },
        { id: 1, idView: require("../company/2.jpg") },
        { id: 2, idView: require("../company/3.jpg") }
      ],
      beginTime1: "",
      deadline1: "",
      taskID: 44,
      userName: localStorage.getItem("ms_username"),
      applyDiaLog: false,
      //判断企业是否申请过此任务
      applyIf: 0,
      //接受企业名称
      companyName1: 0,
      companyId: 0,
      YinCang: 1,
      FileNum: 0,
      count: 0,
      FileName: "",
      //联系电话
      applyList1: [
        {
          supplierTel: ""
        }
      ],
      formLabelWidth: "80px"
    };
  },
  created() {
    this.getParams();
    this.showTaskData();
    this.showApply();
    this.getFilePath();
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    //下载
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        url: row.realPath
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/DownloadTelFile",
          data: data
        })
        .then(response => {
          console.log(response);
          this.FileName = row.realName;
          this.download(response.data);
        });
    },
    // 下载文件
    download(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(data); //表示一个指定的file对象或Blob对象
      console.log(url, "看一下这是啥");
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    },
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
          this.companyId = response.data.allData.b[0].companyId;
          if (response.data.allData.a[0].taskType == 1) {
            this.applyList.taskTypeName = "流通";
          } else {
            this.applyList.taskTypeName = "设计";
          }
        });
    },
    //技术文件
    getFilePath() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getFilePath",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.tableData = response.data.allData;
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
    //手机号校验
    animate() {
      var re = /^1\d{10}$/;
      let str = this.applyList1.supplierTel;
      if (re.test(str)) {
        this.TelIf = 1;
      } else {
        this.TelIf = 2;
      }
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
        supplierTel: this.applyList1.supplierTel
      });
      if (this.applyList1.supplierTel == 0) {
        this.$message.success("请填写手机号");
      } else {
        that.axios({
          method: "post",
          url: "/api/xuqiuyilan/addApplyInformational",
          data: data
        });
        this.$message.success("提交成功");
        this.$router.go(0);
      }
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
  .center {
    text-align: center;
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

    width: 400px;
  }
  .ul02 {
    width: 900px;
  }
  .ul03 {
    width: 800px;
  }
  .task-detail {
    font-size: 16px;
    width: 400px;
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
  .title-task-detail {
    font-size: 16px;
    width: 750px;
  }
  .dialog-footer {
    text-align: center;
  }
  .np_top1 {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 55px;

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

    width: 80px;
  }
  .box-card {
    width: 350px;
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
  .Right2 {
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

    width: 750px;
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
    margin-left: 50px;
    float: left;
  }
  .left1 {
    float: right;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
  .button-style {
    float: right;
  }
  .nobroad {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  .no-el-input__inner {
    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }
  // 去掉表格单元格边框
  .customer-table th {
    border: none;
  }
  .customer-table td,
  .customer-table th.is-leaf {
    border: none;
  }
  // 表格最外边框
  .el-table--border,
  .el-table--group {
    border: none;
  }
  // 头部边框
  .customer-table thead tr th.is-leaf {
    border: 1px solid #ebeef5;
    border-right: none;
  }
  .customer-table thead tr th:nth-last-of-type(2) {
    border-right: 1px solid #ebeef5;
  }
  // 表格最外层边框-底部边框
  .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }
  .customer-table::before {
    width: 0;
  }
  .customer-table .el-table__fixed-right::before,
  .el-table__fixed::before {
    width: 0;
  }
  // 表格有滚动时表格头边框
  .el-table--border th.gutter:last-of-type {
    border: 1px solid #ebeef5;
    border-left: none;
  }
}
</style>