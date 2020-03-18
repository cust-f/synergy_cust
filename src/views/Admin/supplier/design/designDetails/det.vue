<template>
  <div>
    <el-main style="overflow:hidden">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
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
              <el-form-item label="行业类别:">
                <el-input v-model="cool.industry_Type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br />
      <br />
      <div class="biaoti">——申请列表——</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <el-card class="box-card">
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
          <el-table-column prop="principalName" label="状态"></el-table-column>
          <el-table-column prop="publishTime" label="申请/邀请时间">
            <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="time" label="审核时间">
            <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
              >废除</el-button>-->
              <div v-show="applicationStatus=1">
                <el-button @click="SQTG(scope.row)" type="text" size="small">通过</el-button>
                <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
              </div>
              <div v-show="applicationStatus=1">
                <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝原因</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <br />
      <br />
      <div v-show="milepostActive>0">
        <div class="biaoti">——任务计划——</div>
        <br />
        <el-card class="box-card">
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
            <el-table-column prop="principalName" label="状态"></el-table-column>
            <el-table-column prop="publishTime" label="申请/邀请时间">
              <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="time" label="审核时间">
              <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                >废除</el-button>-->
                <div v-show="milepostActive<0">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">上传</el-button>
                </div>
                <div v-show="milepostActive<0">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
                </div>
                <div v-show="milepostActive<0">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝原因</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <br />
        <br />
      </div>
      
      <div v-show="milepostActive>1">
        <div class="biaoti">——设计提交——</div>
        <br />
        <el-card class="box-card">
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
            <el-table-column prop="mainTaskName" label="供应商"></el-table-column>
            <el-table-column prop="industry_Type" label="承接方式"></el-table-column>
            <el-table-column prop="principalName" label="状态"></el-table-column>
            <el-table-column prop="publishTime" label="申请/邀请时间">
              <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="time" label="审核时间">
              <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                >废除</el-button>-->
                <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
               <div v-show="designState=1">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">通过</el-button>
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <div v-show="milepostActive>2">
        <div class="biaoti">——合同管理——</div>
        <br />
        <el-card class="box-card">
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
            <el-table-column prop="principalName" label="状态"></el-table-column>
            <el-table-column prop="publishTime" label="上传时间">
              <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="time" label="审核时间">
              <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                      type="text"
                      icon="el-icon-delete"
                      class="red"
                      @click="handleDelete(scope.$index, scope.row)"
                >废除</el-button>-->
                <div v-show="contractManagementStatus=0">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">上传</el-button>
                </div>
                <div v-show="contractManagementStatus=1">
                  <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <br />
        <br />
      </div>
    </el-main>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../../../design/dataChange";
export default {
  name: "det",
  data() {
    return {
      activeBZT: "3",
      cool: {
        mainTaskName: "nihao",
        industry_Type: "nihao",
        publishTime: "",
        deadline: "",
        mainTaskDetail: "",
        leader: "",
        taskState: ""
      },
      tableData: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长光电子",
          money: "2020-2-12",
          state: "成功",
          date: "2019-11-1"
        }
      ],
      //步骤条数据
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
      //申请状态按钮显示隐藏
      applicationStatus:0,
      //任务计划状态按钮显示隐藏
      taskPlanStatus:0,
      //合同管理状态按钮显示隐藏
      contractManagementStatus:0,
      //设计任务状态按钮显示隐藏
      designState:0
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
          this.mainStask = response.data.allData[0];
          this.mainTaskID = response.data.allData[0].mainTaskId;
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

<style>
.el-step__head.is-process {
  color: #f15e09;
  border-color: #f15e09;
}

.el-step__title.is-process {
  color: #f15e09;
  border-color: #f15e09;
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

.box-card {
  width: 960px;
  /* border: 1px solid #00a2e6 ; */
}
.el-page-header__title {
  font-size: 18px;
}
.biaoti {
  font-size: 18px;
}
/* 表格字体粗细 */
.el-table thead {
  font-weight: 200;
}
/* 表格下方每列有无竖线 */
.el-table__row > td {
  border: none;
}

.el-input__inner {
  /* border-left: none;
  border-right: none;
  border-top: none; */
  border:none;
  border-radius: 0px;
  /* text-align: center; */
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}
</style>
