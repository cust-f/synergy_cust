<template>
  <div>
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请列表</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <el-table
      :data="tableData"
      border
      class="table1"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="companyName" width="200" label="供应商">
        <template slot-scope="scope">
          <el-button type="text" @click="companyDetail(scope.row)">{{scope.row.companyName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="supplierTel" label="联络电话" width="120"></el-table-column>
      <el-table-column prop="applyWay" label="承接方式" width="80">
        <template slot-scope="scope">
          <span v-if="+scope.row.applyWay === 0">邀请</span>
          <span v-else-if="+scope.row.applyWay === 1">申请</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkApplyState" label="申请/邀请状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="+scope.row.checkApplyState === 0">待审核</el-tag>
          <el-tag v-else-if="+scope.row.checkApplyState === 1" type="success">通过</el-tag>
          <el-tag v-else type="danger">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="applyTime" width="200" label="申请/邀请时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.applyTime === 0">暂未申请</el-span>
          <el-span v-if-else>{{scope.row.applyTime | formatDate}}</el-span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="changeTime(scope.row)" size="small" type="text">修改</el-button>

          <el-button
            @click="SQTG(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1"
          >通过</el-button>
          <el-button
            @click="SQJJ(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.checkApplyState===0&&scope.row.applyWay===1"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 企业详情弹窗 -->
    <el-dialog title :visible.sync="addVisibleCD" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业图片</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="imgsrc" :onerror="errorImg01"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业营业执照</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="qiyezhizhao" :onerror="errorImg02"></el-image>
      </div>
      <br />
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业税务登记证</div>
      <br />
      <div width="500" align="center" height="200px">
        <el-image :src="shuiwudengjizheng" :onerror="errorImg03"></el-image>
      </div>
      <br />

      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">企业信息</div>
      <br />
      <div style="width:800px;height:250px">
        <div style="float: left">
          <el-image align="left" style="width:200px;height:200px" :src="logo" :onerror="errorImg00"></el-image>
        </div>

        <div style="float: right;width:490px;height:250px">
          <br />
          <el-rate label="企业级别：" v-model="form.star" disabled text-color="#ff9900"></el-rate>
          <br />
          <div align>
            <font size="5">{{ form.companyName}}</font>
          </div>
          <br />
          <div align>
            <font size="4">{{ form.officeNumber}}</font>
          </div>
        </div>
      </div>
      <div align="right" class="formYS">
        <el-form ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称">
                <el-input v-model="form.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业联络电话">
                <el-input v-model="form.businessTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业所在省份">
                <el-input v-model="form.province" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业所在县市">
                <el-input v-model="form.city" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址">
                <el-input v-model="form.address" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮政编码">
                <el-input v-model="form.postcode" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业成立时间">
                <el-input v-bind:value="form.foundingTime | formatDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工商注册号">
                <el-input v-model="form.brNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业业务范围">
                <el-input v-model="form.product" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="form.email" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业联系人">
                <el-input v-model="form.businessName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公室电话">
                <el-input v-model="form.officeNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="注册资产">
                <el-input v-model="form.registeredCapital" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总资本">
                <el-input v-model="form.totalAssets" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="固定资产">
                <el-input v-model="form.fixedAssets" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流动资产">
                <el-input v-model="form.currentAssets" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="法人代表">
                <el-input v-model="form.legalPerson" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="员工人数">
                <el-input v-model="form.workerNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="开户银行">
                <el-input v-model="form.deposit_Bank" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账户">
                <el-input v-model="form.bankNumber" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="企业详情"></el-form-item>
              <el-form-item label>
                <div class="leftDet" v-html="companyDetailContent"></div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisibleCD = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 修改时间弹出框 -->
    <el-dialog :visible.sync="changeTimeDialog" width="70%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">请输入修改的时间</div>
      <br />
      <br />

      <el-form ref="form" class="changeTimeFrom" :model="timeList" label-width="120px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="任务开始时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.beginTimeJudge"
                v-model="timeList.beginTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="申请时间">
              <el-date-picker
                :disabled="timeListJudge.applyTimeJudge"
                type="datetime"
                placeholder="选择日期"
                v-model="timeList.applyTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="申请审核时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.checkApplyTimeJudge"
                v-model="timeList.checkApplyTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="计划书上传时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.planUploadTimeJudge"
                v-model="timeList.planUploadTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="计划书审核时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.checkPlanTimeJudge"
                v-model="timeList.checkPlanTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="合同上传时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.uploadContractTimeJudge"
                v-model="timeList.uploadContractTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="合同审核时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.checkContractTimeJudge"
                v-model="timeList.checkContractTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <div v-if="timeList.supplierDistributionTime === 0"></div>
            <el-form-item v-else label="分配人员时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.supplierDistributionTimeJudge"
                v-model="timeList.supplierDistributionTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="接受任务时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.designerAcceptTimeJudge"
                v-model="timeList.designerAcceptTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="上传设计时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.uploadDesignTimeJudge"
                v-model="timeList.uploadDesignTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="内部审核时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="timeList.supplierCheckDesignTime"
                :disabled="timeListJudge.supplierCheckDesignTimeJudge"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="设计验收时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.demandorCheckDesignTimeJudge"
                v-model="timeList.demandorCheckDesignTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="任务完成时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                :disabled="timeListJudge.finishTimeJudge"
                v-model="timeList.finishTime"
                style="width: 80%;"
                value-format
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="changeTimeFrom">
          <el-col :span="11">
            <el-button @click="changeTimeMethod()">确认</el-button>
          </el-col>
          <el-col :span="11">
            <el-button @click="changeTimeDialog=false ">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../dataChange";

export default {
  data() {
    return {
      //基本数据
      tableData: [],
      //申请拒绝原因       的模态框开始是否存在
      addVisible: false,
      //企业信息弹窗
      addVisibleCD: false,
      timeListJudge: {
        beginTimeJudge: false,
        publishTimeJudge: false,
        applyTimeJudge: false,
        checkApplyTimeJudge: false,
        planUploadTimeJudge: false,
        checkPlanTimeJudge: false,
        uploadContractTimeJudge: false,
        checkContractTimeJudge: false,
        supplierDistributionTimeJudge: false,
        designerAcceptTimeJudge: false,
        uploadDesignTimeJudge: false,
        supplierCheckDesignTimeJudge: false,
        demandorCheckDesignTimeJudge: false,
        finishTimeJudge: false,
      },
      timeList: {
        beginTime: "",
        publishTime: "",
        applyTime: "",
        checkApplyTime: "",
        planUploadTime: "",
        checkPlanTime: "",
        uploadContractTime: "",
        checkContractTime: "",
        supplierDistributionTime: "",
        designerAcceptTime: "",
        uploadDesignTime: "",
        supplierCheckDesignTime: "",
        demandorCheckDesignTime: "",
        finishTime: "",
        checkCircuaterTime: "",
        uploadCircuaterTime: "",
      },
      changeTimeDialog: false,
      companyId: 0,
      companyName: "",
      logo: "",
      imgsrc: "",
      qiyezhizhao: require("../../company/营业执照.jpg"),
      shuiwudengjizheng: require("../../company/税务登记证.jpg"),
      errorImg00: 'this.src="' + require("../../company/2.jpg") + '"',

      //默认企业图片
      errorImg01: 'this.src="' + require("../../company/1.png") + '"',
      //默认营业执照
      errorImg02: 'this.src="' + require("../../company/营业执照.jpg") + '"',
      //默认税务登记
      errorImg03: 'this.src="' + require("../../company/税务登记证.jpg") + '"',
      //企业详情路径
      companyDetailContent: "",
      applyRefuse: 0,
      planRefusse: 0,
      taskId: 0,
      taskState: 0,
      applyID: 0,

      addList: {
        SQrefuseReason: "", //申请拒绝原因
      },
      form: {
        businessName: "",
        companyID: "",
        companyName: "",
        Address: "",
        postcode: "",
        foundingTime: "",
        brNumber: "",
        officeNumber: "",
        email: "",
        bussessName: "",
        product: "",
        introduction: "",
        province: "",
        city: "",
        registeredCapital: "",
        totalAssets: "",
        currentAssets: "",
        fixedAssets: "",
        legalPerson: "",
        workerNumber: "",
        deposit_Bank: "",
        bankNumber: "",
        //  @input.native="changeCode"
      },
    };
  },
  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      } else {
        return "暂未开始";
      }
    },
  },
  methods: {
    getMsg(msg) {
      this.tableData = msg[1];
      if (this.tableData.length != 0) {
        //读取所有需求的时间
        this.timeList.publishTime = msg[0][0].publishTime;
        this.timeList.beginTime = msg[0][0].beginTime;
        this.timeList.deadLine = msg[0][0].deadLine;
        this.timeList.uploadContractTime = msg[0][0].uploadContractTime;
        this.timeList.checkContractTime = msg[0][0].checkContractTime;
        this.timeList.supplierDistributionTime =
          msg[0][0].supplierDistributionTime;
        this.timeList.designerAcceptTime = msg[0][0].designerAcceptTime;
        this.timeList.uploadDesignTime = msg[0][0].uploadDesignTime;
        this.timeList.supplierCheckDesignTime =
          msg[0][0].supplierCheckDesignTime;
        this.timeList.demandorCheckDesignTime =
          msg[0][0].demandorCheckDesignTime;
        this.timeList.finishTime = msg[0][0].finishTime;
        console.log("FinishTime");
        console.log(msg);
        //读取时间结束
      }
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    changeTimeJudge() {
      console.log(this.planRefusse);
      console.log(this.planRefusse);
      if (this.timeList.applyTime == null) {
        this.timeListJudge.applyTimeJudge = true;
      }
      if (this.timeList.checkApplyTime == null) {
        this.timeListJudge.checkApplyTimeJudge = true;
      }

      if (this.applyRefuse == 2) {
        this.timeListJudge.checkPlanTimeJudge = true;
        this.timeListJudge.planUploadTimeJudge = true;
        this.timeListJudge.uploadContractTimeJudge = true;
        this.timeListJudge.checkContractTimeJudge = true;
        this.timeListJudge.supplierDistributionTimeJudge = true;
        this.timeListJudge.designerAcceptTimeJudge = true;
        this.timeListJudge.uploadDesignTimeJudge = true;
        this.timeListJudge.supplierCheckDesignTimeJudge = true;
        this.timeListJudge.demandorCheckDesignTimeJudge = true;
        this.timeListJudge.finishTimeJudge = true;
      } else {
        if (this.timeList.planUploadTime == null) {
          this.timeListJudge.planUploadTimeJudge = true;
        }
        if (this.timeList.checkPlanTime == null) {
          this.timeListJudge.checkPlanTimeJudge = true;
        }
        if (this.planRefusse == 3) {
          this.timeListJudge.uploadContractTimeJudge = true;
          this.timeListJudge.checkContractTimeJudge = true;
          this.timeListJudge.supplierDistributionTimeJudge = true;
          this.timeListJudge.designerAcceptTimeJudge = true;
          this.timeListJudge.uploadDesignTimeJudge = true;
          this.timeListJudge.supplierCheckDesignTimeJudge = true;
          this.timeListJudge.demandorCheckDesignTimeJudge = true;
          this.timeListJudge.finishTimeJudge = true;
        } else {
          if (this.timeList.uploadContractTime == null) {
            this.timeListJudge.uploadContractTimeJudge = true;
          }
          if (this.timeList.checkContractTime == null) {
            this.timeListJudge.checkContractTimeJudge = true;
          }
          if (this.timeList.supplierDistributionTime == null) {
            this.timeListJudge.supplierDistributionTimeJudge = true;
          }
          if (this.timeList.designerAcceptTime == null) {
            this.timeListJudge.designerAcceptTimeJudge = true;
          }
          if (this.timeList.uploadDesignTime == null) {
            this.timeListJudge.uploadDesignTimeJudge = true;
          }
          if (this.timeList.supplierCheckDesignTime == null) {
            this.timeListJudge.supplierCheckDesignTimeJudge = true;
          }
          if (this.timeList.demandorCheckDesignTime == null) {
            this.timeListJudge.demandorCheckDesignTimeJudge = true;
          }
          if (this.timeList.finishTime == null) {
            this.timeListJudge.finishTimeJudge = true;
          }
        }
      }
    },
    changeTime(row) {
      this.changeTimeDialog = true;
      this.companyId = row.companyId;
      this.applyRefuse = row.checkApplyState;
      this.planRefusse = row.checkPlanState;
      this.taskState = row.taskState;
      this.timeList.applyTime = row.applyTime;
      this.timeList.checkApplyTime = row.checkApplyTime;
      this.timeList.planUploadTime = row.planUploadTime;
      this.timeList.checkPlanTime = row.checkPlanTime;
      this.changeTimeJudge();
    },
    changeTimeMethod() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        companyId: this.companyId,
        beginTime: this.timeList.beginTime,
        publishTime: this.timeList.publishTime,
        applyTime: this.timeList.applyTime,
        checkApplyTime: this.timeList.checkApplyTime,
        planUploadTime: this.timeList.planUploadTime,
        checkPlanTime: this.timeList.checkPlanTime,
        uploadContractTime: this.timeList.uploadContractTime,
        checkContractTime: this.timeList.checkContractTime,
        supplierDistributionTime: this.timeList.supplierDistributionTime,
        designerAcceptTime: this.timeList.designerAcceptTime,
        uploadDesignTime: this.timeList.uploadDesignTime,
        supplierCheckDesignTime: this.timeList.supplierCheckDesignTime,
        demandorCheckDesignTime: this.timeList.demandorCheckDesignTime,
        finishTime: this.timeList.finishTime,
        checkCircuaterTime: this.timeList.checkCircuaterTime,
        uploadCircuaterTime: this.timeList.uploadCircuaterTime,
        State: this.taskState,
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/updateAllTime",
          data: data,
        })
        .then((response) => {
          this.$router.go(0);
          this.changeTimeDialog = false;
        });
    },

    companyDetail(row) {
      var that = this;
      var data = Qs.stringify({
        CompanyID: row.companyId,
      });
      that
        .axios({
          method: "post",
          url: "/api/companyDetail/showCompanyDetal",
          data: data,
        })
        .then((response) => {
          console.log(response);

          this.form = response.data.allData.companyDetail[0];
          this.companyId = response.data.allData.companyDetail[0].companyId;
          this.companyName = response.data.allData.companyDetail[0].companyName;
          this.companyDetailContent =
            response.data.allData.companyDetailContent;
          this.logo = response.data.allData.logo;
          this.imgsrc = response.data.allData.companyPicture;
          this.qiyezhizhao = response.data.allData.BusinessLicence;
          this.shuiwudengjizheng = response.data.allData.tRCertificate;
          this.TPDZCS = this.TPDZCS + 1;
        });
      this.addVisibleCD = true;
    },
    SQTG(row) {
      this.$confirm("确定将申请审核通过么？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          ID: row.id,
          taskID: row.taskId,
          companyID: row.companyId,
          companyName: row.companyName,
        });
        that.axios({
          method: "post",
          url: "/api/SubstaskInformation/shenheSQ",
          data: data,
        });
        this.$message({
          message: "审核通过",
          type: "success",
        });
        this.$router.go(0);
      });
    },

    SQJJ(row) {
      this.addVisible = true;
      this.applyID = row.id;
    },
    SQJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        ID: this.applyID,
        SQrefuseReason: this.addList.SQrefuseReason,
      });
      that.axios({
        method: "post",
        url: "/api/SubstaskInformation/SQJJReason",
        data: data,
      });
      this.$message.success("提交成功");
      this.addList = {};
      this.addVisible = false;
      this.$router.go(0);
    },
  },
};
</script>