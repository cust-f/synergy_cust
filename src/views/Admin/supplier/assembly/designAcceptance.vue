<!--设计提交组件-->
<template>
  <div class="designAcceptance">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计验收</div>
    <br />
    <el-table
      :data="designAcceptance"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称" width="240"></el-table-column>
            <el-table-column prop="demandorCheckDesignState" width="120" align="center" label="验收状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.demandorCheckDesignState === 0">待提交</el-tag>
          <el-tag type="warning" v-else-if="scope.row.demandorCheckDesignState === 1">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.demandorCheckDesignState === 2">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.demandorCheckDesignState === 3">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="designCount" width="100" label="上传次数" align="center"></el-table-column>

      <el-table-column prop="demandorCheckDesignTime" label="验收时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.demandorCheckDesignTime === 0">暂未验收</el-span>
          <el-span v-else>{{scope.row.demandorCheckDesignTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.demandorCheckDesignState === 3"
            @click="refuseDesignReason(scope.row)"
            type="text"
            size="small"
          >拒绝原因</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 设计验收拒绝原因 -->
    <el-dialog :visible.sync="addVisible4" class="refuseDialog">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计拒绝原因</div>
      <br />
      <el-form ref="form" :model="addList5" label-width="0px">
        <el-row>
          <el-col :span="24" style="width:100%">
            <el-form-item>
              <el-input type="textarea" rows="6" v-model="addList5.checkRefuseReason" :readonly="true" placeholder="已拒绝"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisible4 = false">确定</el-button>
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
      taskId: 0,
      yinCang: 1,
      userName: sessionStorage.getItem("ms_username"),
      designAcceptance: [],
      addVisible4: false, //拒绝原因弹窗
      addList5: {
        checkRefuseReason: ""
      }
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    //获得信息
    getMsg(msg) {
      this.designAcceptance = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //设计拒绝原因
    refuseDesignReason(row) {
      this.addVisible4 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          this.addList5 = response.data.allData.a[0];
        });
    }
  }
};
</script>

<style lang="scss">
.designAcceptance {
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
<style>
.refuseDialog .el-dialog{
  width:400px;
}
.refuseDialog .el-dialog__body {
  padding-bottom: 0px;
}
.refuseDialog .el-dialog__footer {
  padding-top: 0px;
}
.refuseDialog .el-textarea__inner{
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}
</style>
