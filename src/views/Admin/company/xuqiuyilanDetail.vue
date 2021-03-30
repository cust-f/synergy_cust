<template>
  <div class="xuqiuyilanDet">
    <div class="overallSituation">
      <el-row>
        <div>
          <div class="XuQiutitle">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/xuqiuyilan' }"
                >需求一览</el-breadcrumb-item
              >
              <el-breadcrumb-item :to="{ path: 'admin/xuqiuyilanDetail' }"
                >需求详情</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <br />
        </div>
      </el-row>
      <br />
      <el-card shadow="never" class="XuQiustyle">
        <div class="xq_top">
          <div class="xuQiuBigTime">
            <div>
              <img :src="logo" class="xuQiuimages" :onerror="errorImg01" />
            </div>
          </div>

          <div class="Right">
            <div>
              <div class="title-detail">
                <font>{{ applyList.taskName }}</font>
              </div>
            </div>
            <br />
            <el-divider></el-divider>
            <ul class="ul02">
              <el-col :span="8" class="task-detail">
                <li>
                  <a>
                    一级行业类别：
                    <font>{{ applyList.taskCategoryMain }}</font>
                  </a>
                </li>
                <br />
                <li>
                  <a>
                    二级行业类别：
                    <font>{{ applyList.taskCategoryPart }}</font>
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
                    开始时间：
                    <font>{{ applyList.beginTime | formatDate }}</font>
                  </a>
                </li>
                <br />
                <li>
                  <a>
                    截止时间：
                    <font>{{ applyList.deadline | formatDate }}</font>
                  </a>
                </li>
                <br />
                <el-button
                  type="warning"
                  v-show="applyYinCang === 0"
                  class="button-style"
                  @click="applyTask()"
                  v-if="roleID!=4"
                  >申请任务</el-button
                >
              </el-col>
            </ul>
          </div>
          <div class="left">
            <el-card class="companybox-card">
              <div slot="header" class="clearfix">
                <div
                  style="
                    margin: -18px -20px;
                    padding: 10px 20px;
                    background: #ffc107;
                    font-size: 18px;
                  "
                >
                  {{ companyList.companyName }}
                </div>
              </div>
              <div>
                <ul class="ul02">
                  <el-row>
                    <el-col :span="8" class="company-detail">
                      <li>
                        <a>
                          所在省：
                          <font>{{ companyList.province }}省</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          所在市：
                          <font>{{ companyList.city }}市</font>
                        </a>
                      </li>
                      <br />
                      <el-popover placement="top-start" trigger="hover">
                        <div>{{ companyList.address }}</div>
                        <li class="det" slot="reference">
                          <a slot="reference">
                            企业地址：
                            <font>{{ companyList.address }}</font>
                          </a>
                        </li>
                      </el-popover>
                      <br />
                      <li>
                        <a>
                          联系电话：
                          <font>{{ applyList.demanderTel }}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          email：
                          <font>{{ companyList.email }}</font>
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
        <el-tabs type="border-card" class="overallSituation12">
          <el-tab-pane label="需求详情">
            <div class="Right2">
              <ul class="ul03">
                <el-row>
                  <el-col :span="8" class="title-task-detail">
                    <div>{{ applyList.taskDetail }}</div>
                  </el-col>
                </el-row>
              </ul>
            </div>
            <br />
            <div class="left1">
              <el-card class="filebox-card">
                <div slot="header" class="clearfix">
                  <span>附件</span>
                </div>
                <div>
                  <el-table
                    :data="tableData"
                    class="customer-table"
                    :show-header="false"
                  >
                    <el-table-column>
                      <template slot-scope="scope">
                        <el-link @click.native="downloadFile(scope.row)">{{
                          scope.row.fileName
                        }}</el-link>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="filePath"
                      label="真实地址"
                      v-if="YinCang === 0"
                    ></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </div>

            <div class="Right3" style="text-align: center">
              <br />
              <div
                v-if="applyList.taskType === 1"
                class="biaoti"
                style="
                  padding: 0 10px;
                  border-left: 3px solid #4e58c5;
                  float: left;
                "
              >
                流通清单
              </div>
              <br />
              <br />
              <div v-if="applyList.taskType === 1" class="link-top"></div>
              <br />
              <el-table
                v-if="applyList.taskType === 1"
                style="width: 95%"
                :data="tableData2"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  align="center"
                  prop="consignmentId"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="productName"
                  label="产品名称"
                ></el-table-column>
                <el-table-column
                  prop="productNumber"
                  label="产品数量"
                ></el-table-column>
                <el-table-column
                  prop="productModel"
                  label="产品规格"
                ></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="需求方详情">
            <div>
              <div class="title-company-detail">
                <font>{{ companyList.companyName }}</font>
              </div>
              <br />
              <el-divider></el-divider>
              <div v-html="companyDetailContent"></div>
            </div>
          </el-tab-pane>

          <!--  <el-tab-pane v-if="applyList.taskType === 1" label="流通清单">
            <div class="listDetil">
            <el-table :data="tableData2" style="width: 65%">
              <el-table-column
                label="序号"
                type="index"
                width="50%"
                align="center"
                prop="consignmentId"
              >
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
              ></el-table-column>
              <el-table-column prop="deliveryTime" label="发货时间" width="160"
                ><template slot-scope="scope">
                  <el-span>{{ scope.row.deliveryTime | formatDate }}</el-span>
                </template></el-table-column
              >
              <el-table-column
                prop="consignmentTimeLatest"
                label="发货截至时间"
                width="160%"
                ><template slot-scope="scope">
                  <el-span>{{
                    scope.row.consignmentTimeLatest | formatDate
                  }}</el-span>
                </template></el-table-column
              >
              <el-table-column
                prop="consignmentState"
                label="发货状态"
                width="100"
              >
                <template slot-scope="scope">
                  <el-tag v-if="+scope.row.consignmentState === 0" type="info"
                    >待发货</el-tag
                  >
                  <el-tag v-else-if="+scope.row.consignmentState === 1"
                    >已发货</el-tag
                  >
                  <el-tag
                    v-else-if="+scope.row.consignmentState === 2"
                    type="success"
                    >已完成</el-tag
                  >
                  <el-tag
                    v-else-if="+scope.row.consignmentState === 3"
                    type="danger"
                    @click="open(scope.row, scope.$index)"
                    >拒绝
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="productNumber"
                label="产品数量"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="productModel"
                label="产品规格"
                width="80"
              ></el-table-column>
            </el-table> -->
          <!--   显示公司信息的小卡片 -->
          <!--             <div class="left2">
              <el-card class="companybox-card2">
                <div slot="header" class="clearfix">
                  <div
                    style="
                      margin: -18px -20px;
                      padding: 10px 20px;
                      background: #ffc107;
                      font-size: 18px;
                    "
                  >
                    {{ companyList2[0].companyName }}
                  </div>
                </div>
                <div>
                  <ul class="ul02">
                    <el-row>
                      <el-col :span="8" class="company-detail">
                        <li>
                          <a>
                            所在省：
                            <font>{{ companyList2[0].province }}省</font>
                          </a>
                        </li>
                        <br />
                        <li>
                          <a>
                            所在市：
                            <font>{{ companyList2[0].city }}市</font>
                          </a>
                        </li>
                        <br />
                        <el-popover placement="top-start" trigger="hover">
                          <div>{{ companyList2[0].address }}</div>
                          <li class="det" slot="reference">
                            <a slot="reference">
                              企业地址：
                              <font>{{ companyList2[0].address }}</font>
                            </a>
                          </li>
                        </el-popover>
                        <br />
                        <li>
                          <a>
                            联系电话：
                            <font>{{ companyList2[0].businessTel }}</font>
                          </a>
                        </li>
                        <br />
                        <li>
                          <a>
                            email：
                            <font>{{ companyList2[0].email }}</font>
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
          </el-tab-pane>-->
        </el-tabs>
        <br />
        <br />
      </el-card>
    </div>
    <!-- 申请任务弹出框 -->
    <el-dialog :visible.sync="applyDiaLog" width="50%">
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        申请信息
      </div>
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form
        ref="applyList1"
        :rules="rules"
        class="demo-ruleForm"
        :model="applyList1"
        label-width="120px"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方：">
              <el-input
                class=".no-el-input"
                v-model="companyList.companyName"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="需求名">
              <el-input
                v-model="applyList.taskName"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="一级行业类别">
              <el-input
                v-model="applyList.taskCategoryMain"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="二级行业类别">
              <el-input
                v-model="applyList.taskCategoryPart"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="需求开始时间">
              <el-input
                v-bind:value="applyList.beginTime | formatDate"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="需求截止时间">
              <el-input
                v-bind:value="applyList.deadline | formatDate"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="需求方电话">
              <el-input
                v-model="applyList.demanderTel"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="联系方式" prop="supplierTel">
              <el-input
                v-model="applyList1.supplierTel"
                placeholder="请输入用于联系的手机号"
                autocomplete="off"
              ></el-input>
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
    var validDataPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        // this.$error("手机号码有误，请重填");
        callback(new Error("手机号码有误，请重填"));
      } else {
        callback();
        this.telphone = 0;
      }
    };
    return {
      roleID:sessionStorage.getItem("roleId"),
      //默认logo
      errorImg01: 'this.src="' + require("../company/2.jpg") + '"',
      telphone: 1,
      rules: {
        supplierTel: [
          {
            required: false,
            message: "请输入手机号码",
            trigger: "blur",
            validator: validDataPhone,
          },
        ],
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
          taskDetail: "",
        },
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
        email: "",
      },
      companyList2: {
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
        email: "",
      },
      tableData: [
        {
          fileName: "",
          filePath: "",
        },
      ],
      tableData2: [
        {
          consignmentId: "1000015",
          taskId: "1-1",
          productName: "华子",
          deliveryTime: "",
          consignmentTimeLatest: "2020.10.5",
          consignmentState: "",
          productNumber: "5",
          productModel: "很大很大",
          productPrice: "500",
          contactnumber: "18904402315",
          shippingaddress: "",
          totalPrice: "2500",
          consignmentNotes: "麻烦快点谢谢",
          checkox: "",
          refuseReason: "",
        },
      ],
      address: "",
      TaskDetail: "",
      TaskDetailContent: "",
      beginTime1: "",
      deadline1: "",
      taskID: 0,
      logo: require("../company/2.jpg"),
      userName: sessionStorage.getItem("ms_username"),
      findUserId: "",
      findUserIdVar: "",
      applyDiaLog: false,
      //判断企业是否申请过此任务
      applyIf: 0,
      taskState: "",
      applyYinCang: 0,
      //接受企业名称
      companyName1: 0,
      companyDetailContent: "",
      companyId: 0,
      YinCang: 1,
      FileNum: 0,
      count: 0,
      FileName: "",
      Dengluyanzheng: 0,
      //联系电话
      applyList1: [
        {
          supplierTel: "",
        },
      ],
      formLabelWidth: "80px",
    };
  },
  created() {
    this.getParams();
    this.showTaskData();
    this.showApply();
    this.getFilePath();
    this.showData();
    this.showCompanyData();
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    //下载
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        url: row.filePath,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          this.FileName = row.fileName;
          const content = response.data;
          const blob = new Blob([content]);
          let url = window.URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", this.FileName);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); //释放url
        });
    },
    //获取详情值
    getParams() {
      var routerParams = this.$route.query.taskID;
      this.taskID = routerParams;
    },
    taskApply() {
      // console.log("运行了么");
      if (this.taskState == "任务进行中") {
        this.applyYinCang = 1;
      } else if (this.taskState == "审核") {
        this.applyYinCang = 1;
      } else if (this.taskState == "验收") {
        this.applyYinCang = 1;
      } else if (this.taskState == "完成") {
        this.applyYinCang = 1;
      } else if (this.taskState == "失败") {
        this.applyYinCang = 1;
      }
      // else {
      //   console.log("userName" + this.userName);
      //   console.log("findUserId" + this.findUserId);
      // }
    },
    //申请弹窗
    applyTask() {
      if (this.$store.state.token) {
        if (this.applyIf != 0) {
          this.$message.error("您已申请，请勿重复申请");
        } else {
          this.applyDiaLog = true;
        }
      } else {
        this.$confirm("登录后才能进行申请，是否登录？", "提示", {
          confirmButtonText: "登录",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({
              path: "/Login",
            });
          })
          .catch(() => {});
      }
    },
    userPost() {
      var that = this;
      var data = Qs.stringify({
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/userIf",
          data: data,
        })
        .then((response) => {
          this.findUserIdVar = response.data;
          if (this.findUserIdVar == this.findUserId) {
            this.applyYinCang = 1;
          }
          // console.log("findUserIdVar:" + this.findUserIdVar);
        });
    },
    //数据显示
    showTaskData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getAllDet",
          data: data,
        })
        .then((response) => {
          this.applyList = response.data.allData.a[0];
          this.findUserId = response.data.allData.a[0].company_Id;
          this.taskState = response.data.allData.a[0].taskState;
          this.taskApply();
          this.getCompay();
          this.userPost();
          if (response.data.allData.a[0].taskType == 1) {
            this.applyList.taskTypeName = "流通";
          } else {
            this.applyList.taskTypeName = "设计";
          }
          this.login = response.data.allData.b[0].companyPicture;
        });
    },
    //居中的方法
    cellStyle({ row, column, rowIndex, columIndex }) {
      return "text-align:center";
    },
    rowClass({ row, rowIndex }) {
      return "text-align:center;";
    },
    //技术文件
    getFilePath() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/getFilePath",
          data: data,
        })
        .then((response) => {
          //
          this.tableData = response.data.allData;
        });
    },
    //返回首页
    goHome() {
      this.$router.push({
        path: "/Home",
      });
    },
    //判断企业是否申请过此任务
    showApply() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/applyIf",
          data: data,
        })
        .then((response) => {
          this.companyName1 = response.data.allData[0].Id;
          if (this.companyName1 == 0) {
            this.applyIf = 0;
          } else {
            this.applyIf = 1;
          }
        });
    },
    //返回首页
    goBack() {
      this.$router.push({
        path: "/xuqiuyilan",
      });
    },
    //申请数据上传
    apply() {
      if (this.telphone == 1) {
        this.$message.error("您的手机号填写有误");
      } else {
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
          supplierTel: this.applyList1.supplierTel,
        });
        that.axios({
          method: "post",
          url: "/api/xuqiuyilan/addApplyInformational",
          data: data,
        });
        this.$message.success("提交成功");
        this.$router.go(0);
      }
    },
    companyDetail(companyId) {
      this.$router.push({
        path: "company/excellentCompanyDetail",
        query: { companyId: companyId },
      });
    },
    //显示流通清单数据的方法
    showData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskId",
          data: data,
        })
        .then((response) => {
          this.tableData2 = response.data.allData;
          console.log(this.tableData2);
        });
    },
    //显示承接企业的所有相关信息
    showCompanyData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/findCompanyDataByTaskId",
          data: data,
        })
        .then((response) => {
          this.companyList2 = response.data.allData;
          console.log(this.companyList2);
        });
    },

    getCompay() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskID,
      });

      that
        .axios({
          method: "post",
          url: "/api/companyDetail/getCompanyFormBytaskId",
          data: data,
        })
        .then((response) => {
          this.companyList = response.data.allData.detail;
          console.log(typeof this.companyList);
          this.companyId = response.data.allData.detail.companyId;
          this.companyName = response.data.allData.detail.companyName;
          this.address = response.data.allData.detail.address;
          this.logo = response.data.allData.logo;
          this.companyDetailContent = response.data.allData.content;
          console.log(this.companyList.province);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.xuqiuyilanDet {
  .overallSituation {
    width: 1200px;
    margin: 0 auto;
  }

  .overallSituation12 {
    margin: 0 auto;
    margin-bottom: -20px;
  }

  .xuQiuimages {
    width: 250px;
    height: 250px;
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
  .XuQiutitle {
    font-size: 14px;
    font-style: normal;
    width: 250px;
    margin-top: 22px;
  }
  .XuQiustyle .xq_top {
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

    width: 1150px;
  }
  .xuQiuBigTime {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    height: 250px;

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

    width: 250px;
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
    width: 300px;
  }
  .det {
    width: 350px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ul03 {
    width: 800px;
  }
  .task-detail {
    font-size: 16px;
    width: 400px;
  }
  .company-detail {
    font-size: 16px;
    width: 300px;
  }
  .title-detail {
    color: #ff7720;
    font-size: 25px;
    float: left;
  }
  .title-company-detail {
    color: #0f0e0d;
    font-size: 18px;
    float: left;
  }
  .title-task-detail {
    font-size: 16px;
    width: 700px;
  }
  .dialog-footer {
    text-align: center;
    margin-bottom: 0px;
  }

  .companybox-card {
    width: 400px;
  }

  .filebox-card {
    width: 400px;
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

    width: 720px;
  }
  .Right3 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: right;

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

    width: 720px;
  }
  .left {
    margin-left: 50px;
    float: left;
  }
  .left1 {
    float: right;
  }
  .left2 {
    color: #ff7720;
    font-size: 25%;
    float: left;
  }
  .xuqiuyilanDet.el-dialog__header {
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
  .XuQiustyle .el-input__inner {
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
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .xuQiuBigTime .taskimage {
    height: "250px";
    width: "250px";
  }
  .link-top {
    width: 95%;
    height: 5%;
    border-top: solid #acc0d8 1px;
  }
}
</style>