<!--流通清单组件-->
<template>
  <div class="deliveryList">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      流通清单
    </div>

    <br />
    <el-table
      :data="deliveryList"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>

      <el-table-column
        prop="Consignment_State"
        width="100"
        align="center"
        label="验收状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.demandorCheckDesignState === 0"
            >待提交</el-tag
          >
          <el-tag
            type="warning"
            v-else-if="scope.row.demandorCheckDesignState === 1"
            >待审核</el-tag
          >
          <el-tag
            type="success"
            v-else-if="scope.row.demandorCheckDesignState === 2"
            >通过</el-tag
          >
          <el-tag
            type="danger"
            v-else-if="scope.row.demandorCheckDesignState === 3"
            >未通过</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="upLoadCircuaterTime" label="清单上传时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadCircuaterTime === 0"
            >暂未验收</el-span
          >
          <el-span v-else>{{
            scope.row.uploadCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column prop="checkCircuaterTime" label="验收时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.checkCircuaterTime === 0">暂未验收</el-span>
          <el-span v-else>{{
            scope.row.checkCircuaterTime | formatDate
          }}</el-span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template>
          <el-button @click="showData()" type="text" size="small"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看弹窗的内容 -->
    <el-dialog
      :visible.sync="upCirculation"
      width="1000px"
      @click="handleClose"
    >
      <div
        class="biaoti"
        style="padding: 0 10px; border-left: 3px solid #4e58c5"
      >
        流通清单
      </div>
      <br />
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
      <br />

      <div style="padding: 0 10px; border-left: 3px solid #4e58c5"></div>
      <br />
      <el-form ref="form" label-width="100px" class="box">
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
            type="selection"
            :selectable="checkboxT"
            disabled="true"
            width="55"
            prop="checkox"
          >
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="50"
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
            width="100"
          ></el-table-column>

          <el-table-column prop="deliveryTime" label="发货时间" width="160"
            ><template slot-scope="scope">
              <el-span>{{ scope.row.deliveryTime | formatDate }}</el-span>
            </template></el-table-column
          >
          <el-table-column
            prop="consignmentTimeLatest"
            label="发货截至时间"
            width="160"
            ><template slot-scope="scope">
              <el-span>{{
                scope.row.consignmentTimeLatest | formatDate
              }}</el-span>
            </template></el-table-column
          >
          <el-table-column prop="consignmentState" label="发货状态" width="100">
            <template slot-scope="scope">
              <el-tag v-if="+scope.row.consignmentState === 0" type="info"
                >待发货</el-tag
              >
              <el-tag v-else-if="+scope.row.consignmentState === 1"
                >已发货</el-tag
              >
              <el-tag
                v-else-if="+scope.row.consignmentState === 2"
                type="success"
                >已完成</el-tag
              >
              <el-tag
                v-else-if="+scope.row.consignmentState === 3"
                type="danger"
                @click="open(scope.row)"
                >拒绝
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="issuedQuantity"
            label="已发数量"
            width="80"
          ></el-table-column>
           <el-table-column
            prop="shortageQuantity"
            label="仍需数量"   
            width="85"
          ></el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                v-show="
                  +(scope.row.consignmentState == 0 ||
                  scope.row.consignmentState == 3)&&scope.row.shortageQuantity==0
                "
                @click="submit(scope.row)"
                type="text"
                size="small"
                >提交</el-button
              >
            </template>
          </el-table-column>
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
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      submitDisable: false,
      text: true,
      pageIndex: 1,
      pageIndex1: 1,
      pageSize: 10,
      fileType: 0,
      taskId: 0,
      yinCang: 1,
      userName: sessionStorage.getItem("ms_username"),
      deliveryList: [],
      taskState: 0,
      fileHistoryMessage: [
        {
          publishingCompanyName: "123",
          fileType: "123",
        },
      ],
      upCirculation: false,
      //文件历史弹窗
      fileHistoryDia: false,
      addVisible3: false, //拒绝原因弹窗
      //文件列表
      fileList: [],
      //上传此时
      shangchuancishu: 0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      filePath: "",
      uploadTime: "",
      multipleSelection: [],
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
          issuedQuantity:'',
          shortageQuantity:'',
          leadState:'',
        },
      ],

      Data_checkox: [],
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      var _this = this;
      _this.data.push({
        checkox: _this.checkox,
      });
    },
    //获得信息
    getMsg(msg) {
      this.deliveryList = msg;
      this.taskState = msg[0].taskState;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },

    //把数据库表格中的内容显示到上面
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
          console.log(response.data.allData[0].leadState);
          if (this.taskState == "完成") {
            this.submitDisable = true;
          }
        });
    },

    submit(row) {
      console.log(row.taskId+"++++"+row);

      this.$confirm("确定提交吗？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          consignmentId: row.consignmentId,
          taskId: row.taskId,
        });
        that
          .axios({
            method: "post",
            url: "/api/addConsignment/submit",
            data: data,
          })
          .then((response) => {});
        this.$message({
          message: "审核通过",
          type: "success",
        });
        this.showData();
        this.upCirculation = false;
      });
    },
    //全部提交的实现
    submit2() {
      // alert(this.multipleSelection.length)
      // alert(this.multipleSelection[0].productName )
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请至少选择一个！",
          type: "warning",
        });
      } else {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          let that = this;
          let data = Qs.stringify({
            consignmentId: that.multipleSelection[i].consignmentId,
          });
          console.log(data);
          that
            .axios({
              method: "post",
              url: "/api/addConsignment/submit",
              data: data,
            })
            .then((response) => {
              //that.tableData = response.data.allData;
            });
        }
        this.$message({
          message: "审核通过",
          type: "success",
        });
        this.upCirculation = true;
        this.showData();
        this.upCirculation = false;
      }
    },

    //拒绝原因弹出框
    open(row) {
      console.log(row.refuseReason);
      this.$alert(row.refuseReason, "拒绝原因", {
        confirmButtonText: "确定",
      });
    },
    checkboxT(row,index){
      if(row.consignmentState == 0 || row.consignmentState == 3|| row.leadState==1){
        return true
      }
      else{
        return false
      }
    },
    handleCurrentChange(cpage) {
      this.pageIndex = cpage;
    },
    handleSizeChange(psize) {
      this.pageSize = psize;
    },
    handleClose() {
      debugger;
      console.log("1");
      if (this.upCirculation == false) {
        this.upCirculation = true;
      } else {
        this.upCirculation = false;
      }
    },
  },
};
</script>

<style lang="scss">
.deliveryList {
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