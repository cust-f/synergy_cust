<template>
  <div>
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
      <el-table-column prop="assignmentState" label="状态"></el-table-column>
      <el-table-column prop="planUploadTime" label="上传时间">
        <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="checkPlanTime" label="审核时间">
        <template slot-scope="scope">{{scope.row.deadline | formatDate}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <div v-show="taskPlanStatus=0">
            <el-button @click="SQJJ(scope.row)" type="text" size="small">上传</el-button>
          </div>
          <div v-show="taskPlanStatus>0">
            <el-button @click="SQJJ(scope.row)" type="text" size="small">下载</el-button>
          </div>
          <div v-show="milepostActive=3">
            <el-button @click="SQJJ(scope.row)" type="text" size="small">拒绝原因</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../../../../design/dataChange";
export default {
  name: "planDet",
  data() {
    return {
      //任务计划表数据
      tableData2: [
        {
          assignmentState: "",
          planUploadTime: "",
          checkPlanTime: ""
        }
      ],
      props: {
        taskId: {
          type: Number,
          required: true
        }
      
      },
      //任务计划状态按钮显示隐藏
      taskPlanStatus: 0,
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
  },
  created() {
    this.getDate2();
  },
  methods: {
    getDate2() {
      console.log(this.props.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      that
        .axios({
          method: "post",
          url: "http://127.0.0.1:8082/supplier/taskAppleDet",
          data: data
        })
        .then(response => {
          this.tableData2 = response.data.allData;
          //判断任务计划按钮的隐藏与显示
          if ((this.tableData2.assignmentState = 1)) {
            this.taskPlanStatus = 1;
          } else if ((this.tableData2.assignmentState = 2)) {
            this.taskPlanStatus = 2;
          } else if ((this.tableData2.assignmentState = 3)) {
            this.taskPlanStatus = 3;
          }
          console.log(response.data.allData);
        });
    }
  }
};
</script>

<style>
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
  border: none;
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
  border: none;
  border-radius: 0px;
  /* text-align: center; */
}
.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}
</style>
