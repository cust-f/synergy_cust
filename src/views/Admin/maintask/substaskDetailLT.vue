<template>
  <div class="substaskDetailLT">
    <div>
      <el-container>
        <el-main style="overflow: hidden">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
          <el-form ref="mainTaskInfo" :model="mainTaskInfo" label-width="110px" class="formYS">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称">
                  <template slot-scope="scope">
                    <el-button class="anniu" @click="showMainTaskDetail(scope.row)">
                      {{ mainTaskInfo.mainTaskName }}
                    </el-button>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="产品名称">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined" value="暂无产品" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="项目负责人">
                  <el-input v-model="mainTaskInfo.principalName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="需求类别">
                  <el-input v-if="mainTaskInfo.mainTaskType == 0" value="设计需求" :disabled="true"></el-input>
                  <el-input v-else value="流通需求" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="发布时间">
                  <el-input v-bind:value="mainTaskInfo.publishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="截止时间">
                  <el-input v-bind:value="mainTaskInfo.deadline | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求状态">
                  <el-input v-if="mainTaskInfo.taskState == 0" value="进行中" :disabled="true"></el-input>
                  <el-input v-else value="已完成" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="完成日期">
                  <el-input v-if="mainTaskInfo.finishTime == null" value="暂未完成" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.finishTime | formatDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="一级行业类别">
                  <el-input v-model="mainTaskInfo.taskCategoryMain" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="二级行业类别">
                  <el-input v-model="mainTaskInfo.taskCategoryPart" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="产品报价">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined" value="暂无报价" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productPrice" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="数量总计">
                  <el-input v-if="mainTaskInfo.consignmentInfo == undefined" value="暂无数量" :disabled="true"></el-input>
                  <el-input v-else v-bind:value="mainTaskInfo.consignmentInfo.productNumber" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="附件下载">
                  <div>
                    <el-table :data="technicalFile" class="customer-table" :show-header="false">
                      <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                      <el-table-column>
                        <template slot-scope="scope">
                          <el-link style="color: #409eff" @click.native="downloadFile(scope.row)">{{ scope.row.realName }}</el-link>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- <br /> -->
          <div id="div2" align="right">
            <el-button type="primary" class="button1" @click="completeMainTask()">完成任务</el-button>
            <el-button type="primary" class="button1" @click="showMainTaskChange()">修改</el-button>
            <el-button type="primary" class="button1" @click="downloadFiles()">打包下载</el-button>
          </div>
          <el-divider></el-divider>

          <!-- <div v-show="applyListVisible"> -->
          <div>
            <el-row>
              <el-col :span="13">
                <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
                  申请列表
                </div>
              </el-col>
              <el-col :span="11">
                <div id="div2" align="right">
                  <el-button v-if="quotaButtonVisible == true" type="primary" size="medium" style="margin-top: -20px" @click="setQuota">配额分配</el-button>
                </div>
              </el-col>
            </el-row>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-table :data="applyTableData" border class="table1" ref="multipleTable" header-cell-class-name="table-header">
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" align="center" label="供应商" width="210">
                <template slot-scope="scope">
                  <el-button type="text" @click="showCompanyDetail(scope.row)">{{ scope.row.Company_Name }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="Product_Name" label="产品名称" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Product_Name != undefined">{{scope.row.Product_Name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Parts_Category" label="类别" align="center" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.Parts_Category != undefined">{{scope.row.Parts_Category}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Sale" label="销量" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Sale != undefined">{{scope.row.Sale}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" label="库存" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Reserve != undefined">{{scope.row.Reserve}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Price" label="价格" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Price != undefined">{{scope.row.Price}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Apply_Way" label="申请/邀请" align="center" width="82">
                <template slot-scope="scope">
                  <span v-if="scope.row.Apply_Way == 0">邀请</span>
                  <span v-else-if="scope.row.Apply_Way == 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column prop="Check_Apply_State" label="申请/邀请状态" align="center" width="90">
                <template slot-scope="scope">
                  <el-tag v-if="+scope.row.Check_Apply_State === 0">待审核</el-tag>
                  <el-tag v-else-if="+scope.row.Check_Apply_State === 1" type="success">通过</el-tag>
                  <el-tag v-else type="danger">拒绝</el-tag>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope" v-if="scope.row.Apply_Way == 1 && scope.row.Check_Apply_State == 0">
                  <el-button @click="SQTG(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>

          <div v-show="quotaListVisible">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              配额分配
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <br />
            <el-table :data="quotaTableData" border class="table1" ref="multipleTable" header-cell-class-name="table-header">
              <!-- mainTaskID冲-->
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="Company_Name" align="center" label="供应商" width="210">
                <!-- <template slot-scope="scope">
                  <el-button type="text" @click="showCompanyDetail(scope.row)">
                    {{ scope.row.Company_Name }}
                  </el-button>
                </template> -->
              </el-table-column>
              <el-table-column prop="Product_Name" label="产品名称" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.Product_Name != undefined">{{scope.row.Product_Name}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Parts_Category" label="类别" align="center" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.Parts_Category != undefined">{{scope.row.Parts_Category}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Sale" label="销量" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Sale != undefined">{{scope.row.Sale}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Reserve" label="库存" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Reserve != undefined">{{scope.row.Reserve}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Price" label="价格" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Price != undefined">{{scope.row.Price}}</span>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-table-column prop="Apply_Way" label="申请/邀请" align="center" width="82">
                <template slot-scope="scope">
                  <span v-if="+scope.row.Apply_Way === 0">邀请</span>
                  <span v-else-if="+scope.row.Apply_Way === 1">申请</span>
                  <span v-else>其他</span>
                </template>
              </el-table-column>
              <el-table-column prop="Quota_Number" label="配额" align="center" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.Quota_Number != undefined">{{scope.row.Quota_Number}}</span>
                  <span v-else>0</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="XGPE(scope.row)" type="text" size="small">修改</el-button>
                  <el-button @click="substaskDetailLT(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br />
            <br />
          </div>

          <!-- 修改主需求 弹出框 -->
          <!-- <el-dialog title :visible.sync="mainTaskEditVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">修改</div>
            <br />
            <el-form ref="mainTaskEditInfo" :model="mainTaskEditInfo" label-width="110px" class="box">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="需求任务名称">
                    <el-input v-model="name"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="11">
                  <el-form-item label="发布时间">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="publishTime1" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row>
                <el-col :span="11">
                  <el-form-item label="总负责人">
                    <el-select v-model="cool.principalName" placeholder="请选择总负责人" class="selectsupply" style="width:100%;">
                      <el-option width="180" v-for="coo1 in FZR" :key="coo1" :label="coo1" :value="coo1"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="截止时间">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="deadline1" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-form-item label="行业类别">
                    <el-cascader style="width:100%;" expand-trigger="hover" v-model="selectCateKeys" :options="xuanzelist" :props="cateProps" @change="handleChange" props.checkStrictly="true"></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="完成时间">
                    <el-date-picker type="datetime" placeholder="选择日期" :disabled="finishTimeState" v-model="finishTime1" style="width: 100%;" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22" class="xiangxi">
                  <el-form-item label="需求任务详情">
                    <el-input type="textarea" :rows="3" style="width:100%;" placeholder="请输入内容" v-model="cool.mainTaskDetail" class="gongsiDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="22" class="xiangxi">
                  <el-form-item label="附件管理">
                    <div>
                      <el-table :data="fujian" class="customer-table" :show-header="false">
                        <el-table-column label="序号" type="index" width="20" align="center"></el-table-column>
                        <el-table-column>
                          <template slot-scope="scope">
                            <el-link style="color:#409EFF" @click.native="downloadFile(scope.row)">{{scope.row.realName}}</el-link>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="120">
                          <template slot-scope="scope">
                            <el-button size="small" type="text" icon="el-icon-delete" class="red" @click="shanchuwenjian(scope.row)">删除文件</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="添加附件">
                <el-upload 
                  class="upload-demo" 
                  action="/api/MainTaskInformation/import" 
                  :on-preview="handlePreview" 
                  :on-remove="handleRemove" 
                  :before-remove="beforeRemove" 
                  :on-success="handleAvatarSuccess" 
                  multiple 
                  :limit="10" 
                  :on-exceed="handleExceed" 
                  ref="upload" 
                  :file-list="fileList">
                  <el-button size="small" type="primary">上传文件</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="mainTaskEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="xiugaixuqiuxinxi">确 定</el-button>
            </span>
          </el-dialog> -->

          <!-- 主需求详情 弹框 -->
          <el-dialog :visible.sync="mainTaskDetailVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              需求详情
            </div>
            <br />
            <el-form ref="form" :model="mainTaskInfo" label-width="10px">
              <el-row>
                <el-col>
                  <el-form-item label>
                    <div class="wenzi">{{ mainTaskInfo.mainTaskDetail }}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <br />
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="mainTaskDetailVisible = false">关 闭</el-button>
            </span>
          </el-dialog>
          <!-- 企业信息详情 弹框 -->
          <el-dialog :visible.sync="companyDetailVisible" width="50%">
            <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
              企业信息
            </div>
            <br />
            <el-form ref="companyDetailForm" :model="companyDetailForm" label-width="80px" class="company-detail-form">
              <el-row :gutter="20">
                <el-col :offset="1" :span="7" style="padding-left: 0px; padding-right: 0px">
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <div class="company-detail-imgdiv">
                      <img class="company-detail-img" :src="this.companyDetailForm.logo" fit="fill" border="1" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <span style="font-size: 18px">{{ this.companyDetailForm.companyName }}</span>
                  </el-form-item>
                  <el-form-item label-width="0" class="company-detail-form-item">
                    <el-rate v-model="this.companyDetailForm.star" disabled text-color="#ff9900"></el-rate>
                  </el-form-item>
                  <el-divider></el-divider>
                  <el-form-item label="业务范围" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.product }}</span>
                  </el-form-item>
                  <el-form-item label="企业地址" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.address }}</span>
                  </el-form-item>
                  <el-form-item label="联系电话" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.officeNumber }}</span>
                  </el-form-item>
                  <el-form-item label="电子邮箱" class="company-detail-form-item">
                    <span>{{ this.companyDetailForm.email }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="companyDetailVisible = false">关 闭</el-button>
            </span>
          </el-dialog>

        </el-main>
      </el-container>
    </div>
  </div>
</template>




<script>
import Qs from "qs";
import { formatDate } from "./dataChange";

export default {
  name: "substaskDetailLT",
  prop: {},
  inject: ["reload"],
  data() {
    return {
      //禁用今天以前的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      usernameX: sessionStorage.getItem("ms_username"),
      mainTaskID: this.$route.query.mainTaskID,
      mainTaskDetailVisible: false, //主需求详情弹框显示
      mainTaskEditVisible: false, //主需求修改弹框显示
      companyDetailVisible: false, //企业信息弹框显示
      applyListVisible: true, //申请列表列表显示
      quotaListVisible: true, //配额分配列表显示
      quotaButtonVisible: false, //配额分配按钮显示
      //主需求基本信息数据
      mainTaskInfo: {},
      //主需求基本信息修改数据
      mainTaskEditInfo: {},
      //企业信息详情数据
      companyDetailForm: [],
      //申请列表数据
      applyTableData: [],
      //配额分配数据
      quotaTableData: [],
      //主任务需求书数据
      technicalFile: [],
    };
  },

  filters: {
    formatDate(time) {
      if (time === "尚未完成") {
        return "暂未完成";
      }
      // var index = time.lastIndexOf(".");
      // time = time.substring(0, index);
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },

  created() {
    //获得主任务信息
    this.getMainTaskData();
  },

  methods: {
    //返回需求管理
    goBack() {
      this.$router.push("/admin/mainStaskShow");
    },
    //获取需求基本信息
    getMainTaskData() {
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
      });
      that
        .axios({
          method: "post",
          url: "/api/MainTaskInformation/combineMS",
          data: data,
        })
        .then((response) => {
          this.mainTaskInfo = response.data.allData.a[0];
          this.mainTaskEditInfo = JSON.parse(JSON.stringify(this.mainTaskInfo));
          this.technicalFile = response.data.allData.c;
          this.mainTaskInfo.consignmentInfo = response.data.allData.d[0];
          //获得子任务信息
          this.getSubtaskData();
        });
    },
    //获取子任务基本信息
    getSubtaskData() {
      var that = this;
      var data = Qs.stringify({
        mainTaskID: this.mainTaskID,
        productName: this.mainTaskInfo.consignmentInfo.productName,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/circulationSubtaskApplyInfo",
          data: data,
        })
        .then((response) => {
          this.applyTableData = response.data.allData.applyList;
          this.quotaTableData = response.data.allData.quotaList;
          this.quotaButtonVisible = response.data.allData.quotaButtonVisible;
          this.applyListVisible = response.data.allData.applyListVisible;
          this.quotaListVisible = response.data.allData.quotaListVisible;
        });
    },
    // 主需求基本信息 - 查看需求详情（点击需求名）
    showMainTaskDetail(row) {
      this.mainTaskDetailVisible = true;
    },
    // 主需求基本信息 - 附件下载（单独 点击文件名）
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        //taskID: this.taskId,
        url: row.realPath,
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
          console.log(response);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          link.setAttribute("download", row.realName);
          document.body.appendChild(link);
          link.click();
        });
    },
    // 主需求基本信息 - 完成任务
    completeMainTask() {
      this.$confirm("确定要完成任务吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          var that = this;
          var data = Qs.stringify({
            mainStaskID: this.mainTaskID,
          });
          that
            .axios({
              method: "post",
              url: "/api/MainTaskInformation/achieveMainTask",
              data: data,
            })
            .then((response) => {
              if (response.data == "成功") {
                this.$message.success("主任务完成");
              } else {
                this.$message.error("主任务完成失败");
              }
            });
        })
        .catch(() => {
          this.$message.info("取消完成主任务");
        });
    },
    // 主需求基本信息 - 修改弹出
    showMainTaskChange() {},
    // 主需求基本信息 弹框 - 修改保存
    saveMainTaskChange() {},
    // 主需求基本信息 弹框 - 修改取消
    cancleMainTaskChange() {},
    // 主需求基本信息 - 打包下载
    downloadFiles() {
      var that = this;
      var data = Qs.stringify({
        taskID: this.mainTaskID,
        leixing: "ZRWFJ",
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob",
        })
        .then((response) => {
          response.data = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          this.download(response.data, "ZFJ");
        });
    },
    // 主需求基本信息 - 打包下载 - 下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      //let url = window.URL.createObjectURL(new Blob([data], {type: 'application/octet-stream'} ) ) ;
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = data;
      if (leixing === "JHS") {
        link.setAttribute("download", "设计文档.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZFJ") {
        link.setAttribute("download", "主任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
    // 点击标题查看企业详情弹框
    showCompanyDetail(row) {
      this.companyDetailForm = [];
      var that = this;
      var data = Qs.stringify({
        CompanyID: row.Company_ID,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/showCompanyDetal",
          data: data,
        })
        .then((response) => {
          this.companyDetailForm = response.data.allData.companyDetail[0];
          this.companyDetailForm.logo = response.data.allData.logo;
          this.companyDetailVisible = true;
        });
    },
    // 子任务 - 查看详情
    substaskDetailLT(row){
      this.$router.push({
        path: "/admin/mainStaskDetailLT",
        query: {
          taskId: row.Task_ID,
          acceptCompanyId: row.Company_ID
        },
      });
    }
  },
};
</script>

<style lang="scss" >
.substaskDetailLT {
  .wenzi {
    padding-right: 18px;
  }

  .shenhe {
    color: #ff8040;
    background-color: #ffe6d9;
    border-color: #ffdcb9;
  }
  .yanshou {
    color: #e066ff;
    background-color: #ffe1ff;
    border-color: #fff0f5;
  }
  .el-upload-list__item {
    width: 90%;
  }
  .first-child.el-upload-list__item {
    width: 90%;
  }

  .el-dialog__footer {
    padding-right: 40px;
  }
  .anniu .el-dialog__footer {
    padding-right: 20px;
  }
  .anniu {
    width: 100%;
    border-left: cadetblue;
    background-color: white;
    color: #409eff;
    border-left-width: 0px;
    border-right-width: 0px;
    border-top-width: 0px;
    border-color: #dcdfe6;
    border-radius: 0px;
  }
  .el-table__empty-block {
    min-height: 40px;
  }
  .el-table td,
  .el-table th {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .simichakan {
    line-height: 40px;
  }
  .formYS .el-input__inner {
    /* // 表格样式调整 */

    border-left: none;
    border-right: none;
    border-top: none;
    border-radius: 0px;
    text-align: center;
  }

  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
  }

  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  .formYS .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #606266;
  }

  .table {
    font-size: 14px;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-upload--text {
    width: 85px;
    height: 40px;
  }
  /* //返回字体 */
  .el-page-header__title {
    font-size: 18px;
  }

  /* // 去掉表格单元格边框 */
  .customer-table th {
    border: none;
  }
  .customer-table td,
  .customer-table th.is-leaf {
    border: none;
  }
  /* // 表格最外边框 */
  .customer-table .el-table--border,
  .customer-table .el-table--group {
    border: none;
  }
  /* // 头部边框 */
  .customer-table thead tr th.is-leaf {
    border: 1px solid #ebeef5;
    border-right: none;
  }
  .customer-table thead tr th:nth-last-of-type(2) {
    border-right: 1px solid #ebeef5;
  }
  /* // 表格最外层边框-底部边框 */
  .customer-table .el-table--border::after,
  .customer-table .el-table--group::after {
    width: 0;
  }
  .customer-table::before {
    width: 0;
  }
  .customer-table .el-table__fixed-right::before,
  .el-table__fixed::before {
    width: 0;
  }
}
.consignment {
  .el-dialog__body {
    padding-right: 0px;
    padding-top: 20px;
    padding-bottom: 0px;
  }
  .el-dialog__header {
    padding-right: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  .el-dialog__footer {
    padding-right: 40px;
    padding-top: 0px;
  }
}

.company-detail-form {
  .company-detail-form-item {
    margin-bottom: 0px;
    .company-detail-imgdiv {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .company-detail-img {
        width: 100%;
        height: 100%;
        position: absolute;
        -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
        filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
        border-radius: 5px;
      }
    }
  }
  .company-detail-divider {
    margin: 13px 0;
  }
}
</style>