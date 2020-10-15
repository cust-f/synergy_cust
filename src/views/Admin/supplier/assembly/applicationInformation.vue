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
      <el-table-column prop="applyWay" width="100" label="承接方式">
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
          <div v-if="scope.row.applyWay === 0">
            <div v-if="scope.row.checkApplyState < 1">
              <el-button @click="accept(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="noAccept(scope.row)" type="text" size="small">拒绝</el-button>
            </div>
          </div>
          <el-button
            v-if="scope.row.checkApplyState === 2 && scope.row.applyWay === 1"
            @click="refuseReason(scope.row)"
            type="text"
            size="small"
          >拒绝原因</el-button>
          <el-button @click="showData()" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
     <!-- 查看弹窗的内容 -->
    <el-dialog
      :visible.sync="upCirculation"
      width="50%"
      @click="handleClose"
    >
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        发货清单
      </div>
     <!--  <br />
      <div style="margin-top: 10px">
        <el-button
          style="float: left; margin-bottom: 10px"
          type="primary"
          @click="submit2()"
          size="small"
          v-bind:disabled="submitDisable"
          >全部提交</el-button
        >
      </div>
      <br /> -->

      <div style="padding: 0 10px; border-left: 3px solid #4e58c5"></div>
      <br />
      <el-form ref="form" label-width="100%" class="box">
        <el-table
          ref="multipleTable"
          :data="
            tableData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
          "
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >

          <el-table-column
            label="序号"
            type="index"
            width="50px"
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
            <el-table-column
            prop="productPrice"
            label="产品单价"
          
          ></el-table-column>
          <el-table-column
            prop="contactNumber"
            label="联系方式"
            
          ></el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :current-page="pageIndex1"
            :page-size="pageSize"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-form>
    </el-dialog>

    <!-- 申请拒绝原因 -->
    <el-dialog :visible.sync="addVisible1" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">拒绝原因</div>
      <br />
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList1" label-width="120px">
        <el-row>
          <el-col>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7}"
              v-model="addList1.refuseApplyMessage"
              :readonly="true"
            ></el-input>
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
      userName: sessionStorage.getItem("ms_username"),
      PlantableData: {},
      upCirculation: false,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      fileType: 0,
      tableData: [
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
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //下载子任务附件
    xiazaiZRWFJ() {
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
          this.download(response.data, "ZRWFJ");
        });
    },
     showData() {
      this.upCirculation = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/addConsignment/findConsignmentByTaskId",
          data: data,
        })
        .then((response) => {
          this.tableData = response.data.allData;
          console.log(this.tableData);
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
        });
    },
       handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    //接受通过
    accept(row) {
      this.$confirm("确定接受需求么？", "提示", {
        type: "warning"
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          taskId: row.taskId,
          userName: this.userName
        });
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
        var that = this;
        var data = Qs.stringify({
          taskId: row.taskId,
          userName: this.userName
        });
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