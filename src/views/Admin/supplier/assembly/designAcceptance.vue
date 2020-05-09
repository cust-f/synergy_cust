<!--设计提交组件-->
<template>
  <div class="designAcceptance">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计提交</div>
    <br />
    <el-table
      :data="designAcceptance"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column prop="designCount" label="重做次数"></el-table-column>
      <el-table-column prop="demandorCheckDesignState" width="100" align="center" label="验收状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.demandorCheckDesignState === 0">待提交</el-tag>
          <el-tag type="warning" v-else-if="scope.row.demandorCheckDesignState === 1">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.demandorCheckDesignState === 2">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.demandorCheckDesignState === 3">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="demandorCheckDesignTime" label="验收时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.demandorCheckDesignTime === 0">暂未验收</el-span>
          <el-span v-else>{{scope.row.demandorCheckDesignTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.designCount > 1 && scope.row.demandorCheckDesignState!=2 "
            @click="refuseDesignReason(scope.row)"
            type="text"
            size="small"
          >拒绝原因</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 设计验收拒绝原因 -->
    <el-dialog :visible.sync="addVisible4" width="50%">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计验收拒绝原因</div>
      <br />
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList5" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item>
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 7}"
                v-model="addList5.demandorRefuseReason"
                :readonly="true"
              ></el-input>
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
      userName: localStorage.getItem("ms_username"),
      designAcceptance: [],
      addVisible4: false, //拒绝原因弹窗
      addList5: {
        demandorRefuseReason: ""
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
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
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