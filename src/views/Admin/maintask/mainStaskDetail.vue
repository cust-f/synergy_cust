<template >
  <div class="mainStaskDetaul">
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <!-- <el-steps >
        <el-step title="申请/邀请" icon="el-icon-edit"></el-step>
        <el-step title="计划提交" icon="el-icon-upload"></el-step>
        <el-step title="任务进行中" icon="el-icon-picture"></el-step>
        <el-step title="审核" icon="el-icon-message-solid"></el-step>
        <el-step title="验收" icon="el-icon-s-promotion"></el-step>
        <el-step title="完成" icon="el-icon-s-claim"></el-step>
      </el-steps> -->
      <el-steps :active="milepostActive" align-center>
        <el-step
          v-for="(value, key) in milepost"
          :class="milepostActive== key+1 ? stepActive: '' "
          :title="value.title"
          :icon="value.icon"
          :key="key"
        ></el-step>
      </el-steps>
      <br />
      <br />
      <div class="biaoti">——基本信息——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <br />
      <el-card class="box-card">
        <el-form ref="cool" :model="cool" label-width="110px" class="form">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求名称:">
                <el-input v-model="cool.mainTaskName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="子任务名称:">
                <el-input v-model="cool.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="发布企业名称:">
                <el-input v-model="cool.companyName" :disabled="true" style="text-align:center"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="接受企业名称:">
                <el-input v-model="cool.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务截止日期:">
                <el-input
                  v-bind:value="cool.deadline|formatDate"
                  :disabled="true"
                  style="text-align:center"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求方电话:">
                <el-input v-model="cool.demanderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br />
      <br />

      <div v-show="milepostActive1">
        <div class="biaoti">——申请列表——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <el-table
          :data="tableData1"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商"></el-table-column>
          <el-table-column prop="applyWay" label="承接方式">
            <template slot-scope="{row: {applyWay}}">
              <span v-if="+applyWay === 0">邀请</span>
              <span v-else-if="+applyWay === 1">申请</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkApplyState" label="申请/邀请状态">
            <template slot-scope="scope">
              <span v-if="+scope.row.checkApplyState === 0">待审核</span>
              <span v-else-if="+scope.row.checkApplyState === 1">通过</span>
              <span v-else>拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请/邀请时间">
            <template slot-scope="scope">{{scope.row.applyTime | formatDate}}</template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button @click="SQTG(scope.row)" type="text" size="small"   v-if="scope.row.checkApplyState===0"  >通过</el-button>
              <el-button @click="SQJJ(scope.row)" type="text" size="small"  v-if="scope.row.checkApplyState===0" >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>



      <div v-show="milepostActive2">
        <div class="biaoti">——任务计划——</div>
        <br />
        <el-table
          :data="tableData2"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商"></el-table-column>
          <el-table-column prop="checkPlanState" label="计划审核状态">
            <template slot-scope="{row: {checkPlanState}}">
              <span v-if="+checkPlanState === 0">待上传</span>
              <span v-else-if="+checkPlanState === 1">待审核</span>
              <span v-else-if="+checkPlanState === 2">通过</span>
              <span v-else-if="+checkPlanState === 3">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column prop="planUploadTime" label="计划上传时间">
            <template slot-scope="scope">{{scope.row.planUploadTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="checkPlanTime" label="计划审核时间">
            <template slot-scope="scope">{{scope.row.checkPlanTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button @click="SQTG(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive3">
        <div class="biaoti">——合同管理——</div>
        <br />
        <el-table
          :data="tableData3"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="acceptCompanyName" label="供应商"></el-table-column>
          <el-table-column prop="contractState" label="合同审核状态">
            <template slot-scope="{row: {contractState}}">
              <span v-if="+contractState === 0">待上传</span>
              <span v-else-if="+contractState === 1">待审核</span>
              <span v-else-if="+contractState === 2">通过</span>
              <span v-else-if="+contractState === 3">未通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploadContractTime" label="合同上传时间">
            <template slot-scope="scope">{{scope.row.uploadContractTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="contractRefuseReason" label="合同拒绝原因"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button @click="SQTG(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
      </div>

      <div v-show="milepostActive4">
        <div class="biaoti">——设计提交——</div>
        <br />
        <el-table
          :data="tableData4"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <!-- mainTaskID冲-->
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="companyName" label="供应商"></el-table-column>
          <el-table-column prop="designerName" label="设计人员姓名"></el-table-column>
          <el-table-column prop="uploadDesignTime" label="设计提交时间">
            <template slot-scope="scope">{{scope.row.uploadDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="designCount" label="设计重做次数"></el-table-column>demandorCheckDesignState
          <el-table-column prop="demandorCheckDesignState" label="设计验收状态"></el-table-column>
          <el-table-column prop="demandorCheckDesignTime" label="需求方验收时间">
            <template slot-scope="scope">{{scope.row.demandorCheckDesignTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <el-button @click="SQTG(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "./dataChange";
export default {
  name: "mainStaskDetail",
  data() {
    return {
      //申请计划的按钮是否存在
      ShenQing:"none",
      activeBZT: "",
      mainTaskID: "",
      //SQRWButton:none,
      //控制4个table是否显示的
      milepostActive1: -1, 
      milepostActive2: -1,
      milepostActive3: -1,
      milepostActive4: -1,
      cool: {
        mainTaskName: "nihao",
        taskName: "nihao",
        companyName: "",
        supplierName: "",
        deadline: "",
        demanderTel: ""
      },
      tableData1: [
        {
          companyName: "",
          applyWay: "",
          checkApplyState: "", //任务申请审核状态
          applyTime: "", //任务申请审核时间
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData2: [
        {
          acceptCompanyName: "",
          applyWay: "",
          checkPlanState: "", //计划审核状态
          checkPlanTime: "" //计划审核时间
        }
      ],
      tableData3: [
        {
          acceptCompanyName: "",
          applyWay: "",
          contractState: "", //合同审核状态
          uploadContractTime: "", //合同上传时间
          contractRefuseReason: "" //合同拒绝原因
        }
      ],
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit" },
        { title: "计划提交", icon: "el-icon-upload" },
        { title: "任务进行中", icon: "el-icon-picture" },
        { title: "审核", icon: "el-icon-message-solid" },
        { title: "验收", icon: "el-icon-s-promotion" },
        { title: "完成", icon: "el-icon-s-claim" }
      ],
      // 默认步骤数
      milepostActive: 1,
      // 动态添加类名
      stepActive: "stepActive",
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  created() {
    this.getParams();
    this.showData();
  },
  methods: {
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },

    showData() {
      console.log("你好");
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        subStaskID: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/SubstaskInformation/list",
          data: data

          // data:this.$store.state.userName
        })
        .then(response => {
          console.log(response);
          this.tableData1 = response.data.allData.b;
          //判断4个table是否隐藏
          if (this.tableData1 == null) {
            this.milepostActive1 = 0;
          }
          this.tableData2 = response.data.allData.c;
          if (this.tableData2 == null) {
            this.milepostActive2 = 0;
          }
          this.tableData3 = response.data.allData.d;
          if (this.tableData3 == null) {
            this.milepostActive3 = 0;
          }
          this.tableData4 = response.data.allData.e;
          if (this.tableData4 == null) {
            this.milepostActive4 = 0;
          }


          //判断el-step到第几步骤
          this.cool = response.data.allData.a[0];
          this.milepostActive = response.data.allData.a[0].taskState;
          if (this.milepostActive == "计划提交") {
            this.milepostActive = 1;
          } else if (this.milepostActive == "申请或邀请中") {
            this.milepostActive = 0;
          } else if (this.milepostActive == "任务进行中") {
            this.milepostActive = 2;
          } else if (this.milepostActive == "审核") {
            this.milepostActive = 3;
          } else if (this.milepostActive == "验收") {
            this.milepostActive = 4;
          } else if (this.milepostActive == "完成") {
            this.milepostActive = 5;
          }
          console.log(this.milepostActive)
          this.mainTaskID = response.data.allData.a[0].mainTaskId;
          console.log(response.data.allData.a[0].taskState);
          console.log(response.data.allData);
        });
    },
    goBack() {
      this.$router.push({
        path: "/admin/substaskDetail",
        query: {
          mainTaskID: this.mainTaskID
        }
      });
    }
  }
};
</script>

<style lang="scss">
.mainStaskDetaul {
  .table {
    font-size: 13px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 960px;
    /* border: 1px solid #00a2e6 ; */
  }
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
  /* 表格字体粗细 */
  .el-table thead {
    font-weight: 200;
  }
  /* 表格下方每列有无竖线 */
  .el-table__row > td {
    border: none;
  }
  // 表格样式调整
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
  // 进度样式调整
.el-step__head.is-process {
  color: #f15e09;
  border-color: #f15e09;
}

.el-step__title.is-process {
  color: #f15e09;
  border-color: #f15e09;
}
}
</style>
