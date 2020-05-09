<!--申请信息组件-->
<template>
  <div class="missionPlan">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请列表</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <el-table
      :data="PlantableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>
      <el-table-column prop="applyWay" width="100" label="获取方式">
        <template slot-scope="scope">
          <span v-if="scope.row.applyWay === 0">邀请</span>
          <span v-else-if="scope.row.applyWay === 1">申请</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkApplyState" width="120" align="center" label="申请/邀请状态">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.checkApplyState === 0">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.checkApplyState === 1">通过</el-tag>
          <el-tag type="danger" v-else>拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="applyTime" label="申请/邀请时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.applyTime === 0">暂未开始</el-span>
          <el-span v-else>{{scope.row.applyTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="checkApplyTime" label="审核时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.checkApplyTime === 0">暂未审核</el-span>
          <el-span v-else>{{scope.row.checkApplyTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.checkApplyState < 1">
            <el-button @click="accept(scope.row)" type="text" size="small">通过</el-button>
            <el-button @click="noAccept(scope.row)" type="text" size="small">拒绝</el-button>
          </div>
          <div v-if="scope.row.checkApplyState === 2&&scope.row.applyWay == 1">
            <el-button @click="refuseReason(scope.row)" type="text" size="small">拒绝原因</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 申请拒绝原因 -->
    <el-dialog :visible.sync="addVisible1" width="50%">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">申请被拒绝原因</div>
      <br />
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList1" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="被拒绝原因">
              <el-input v-model="addList1.refuseApplyMessage" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisible1 = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      //拒绝原因弹窗
      addVisible1: false,
      taskId: 0,
      userName: localStorage.getItem("ms_username"),
      PlantableData: {},
      addList1: {
        refuseApplyMessage: ""
      }
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    getMsg(msg) {
      this.PlantableData = msg;
      this.taskId = this.PlantableData.taskId;
      console.log("我要看看这里的TaskId：" + this.taskId);
    },
    //下载子任务附件
    xiazaiZRWFJ() {
      console.log("shenme");
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "ZIRWHJ"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
          console.log("cap");
          console.log(response);
          this.download(response.data, "ZRWFJ");
        });
    },
    //接受通过
    accept(row) {
      this.$confirm("确定接受需求么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId,
          userName: this.userName
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "/api/supplier/accept",
          data: data
        });
        this.$message({
          message: "接受成功",
          type: "success"
        });
        this.$router.go(0);
      });
    },
    //接受不通过
    noAccept(row) {
      this.$confirm("确定拒绝需求么？", "提示", {
        type: "warning"
      }).then(() => {
        console.log(row.taskId);
        var that = this;
        var data = Qs.stringify({
          taskID: row.taskId
        });
        console.log(data);
        that.axios({
          method: "post",
          url: "/api/supplier/noAccept",
          data: data
        });
        this.$message({
          message: "拒绝通过",
          type: "success"
        });
        this.$router.go(0);
      });
    },
    //申请拒绝原因
    refuseReason(row) {
      this.addVisible1 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.addList1 = response.data.allData.b[0];
        });
    }
  }
};
</script>

<style lang="scss">
.missionPlan {
  .table {
    font-size: 13px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
}
</style>