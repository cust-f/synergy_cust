<template>
  <div>
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务计划</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <br />
    <el-table
      :data="tableData"
      border
      class="table1"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="companyName" label="供应商" width="250"></el-table-column>
      <el-table-column prop="checkPlanState" label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="+scope.row.checkPlanState === 0" type="info">待上传</el-tag>
          <el-tag v-else-if="+scope.row.checkPlanState === 1">待审核</el-tag>
          <el-tag v-else-if="+scope.row.checkPlanState === 2" type="success">通过</el-tag>
          <el-tag v-else type="danger">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="planUploadTime" label="上传时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.planUploadTime === 0">暂未上传</el-span>
          <el-span v-else>{{scope.row.planUploadTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="checkPlanTime" label="审核时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.checkPlanTime === 0">暂未审核</el-span>
          <el-span v-else>{{scope.row.checkPlanTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="RWJHXZ(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.checkPlanState !==0 &&scope.row.checkPlanState !==3"
          >下载</el-button>
          <el-button
            @click="JHSTG(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.checkPlanState===1"
          >通过</el-button>
          <el-button
            @click="JHSJJ(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.checkPlanState===1"
          >拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 计划书拒绝原因弹出框 -->
    <el-dialog :visible.sync="refuseDialog" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">请输入计划书拒绝原因</div>
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList1" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="审核拒绝原因">
              <el-input v-model="addList1.JHSrefuseReason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseDialog = false">取 消</el-button>
        <el-button type="primary" @click="JHSJJYYTJ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "../dataChange";
import Qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      ID: 0,
      refuseDialog: false,
      addList1: {
        JHSrefuseReason: "", //计划书拒绝原因
      },
    };
  },
  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "暂未开始";
      }
    },
  },
  methods: {
    getMsg(msg) {
      this.tableData = msg;
      console.log("tableData");
      console.log(this.tableData);
    },
    //任务计划下载
    RWJHXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: row.id,
        companyId: row.companyId,
        leixing: "jihuashu",
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob",
        })
        .then((response) => {
          this.download(response.data, "JHS");
        })
        .catch((error) => {
          if (error != null) {
            this.$confirm("文件不存在或者文件路径有误", "提示", {
              type: "warning",
            });
          }
        });
    },
    JHSTG(row) {
      this.$confirm("确定将任务计划书审核通过么？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId,
          ID: row.id,
          companyID: row.companyId,
          companyName: row.companyName,
        });
        that
          .axios({
            method: "post",
            url: "/api/SubstaskInformation/RWJHSH",
            data: data,
          })
          .then((response) => {
            if (response.data == "成功") {
              this.$message({
                message: "审核通过",
                type: "success",
              });
              this.$router.go(0);
            } else {
              this.$confirm(
                "您已经通过了一个任务计划，无法再通过另一个任务计划",
                "提示",
                {
                  type: "warning",
                }
              );
            }
          });
      });
    },
    JHSJJ(row) {
      this.refuseDialog = true;
      this.ID = row.id;
    },
    JHSJJYYTJ() {
      var that = this;
      var data = Qs.stringify({
        ID: this.ID,
        JHSrefuseReason: this.addList1.JHSrefuseReason,
      });
      that.axios({
        method: "post",
        url: "/api/SubstaskInformation/JHSJJReason",
        data: data,
      });
      this.$message.success("提交成功");
      this.addList1 = {};
      this.refuseDialog = false;
      this.$router.go(0);
    },
  },
};
</script>