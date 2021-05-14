<!--任务计划组件-->
<template>
  <div class="quotaAllocation">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      流通清单
    </div>
    <br />
    <el-table
      :data="tableData11"
      border
      class="table1"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <!-- mainTaskID冲-->
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="Task_Name"
        align="center"
        label="需求名称"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="Product_Name"
        label="产品名称"
        align="center"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="Parts_Category"
        label="类别"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="Consignment_Time_Latest"
        label="截止时间"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="+scope.row.planUploadTime === 0">暂未上传</span>
          <span v-else>{{scope.row.Consignment_Time_Latest | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="Contact_Number"
        label="联系电话"
        align="center"
        width="120"
      >
      </el-table-column>
      <!-- <el-table-column prop="saleNum" label="销量" align="center" width="70">
      </el-table-column>
      <el-table-column
        prop="inventoryNum"
        label="库存"
        align="center"
        width="70"
      >
      </el-table-column>
      <el-table-column
        prop="productPrice"
        label="价格"
        align="center"
        width="70"
      >
      </el-table-column> -->
      <!-- <el-table-column
        prop="Check_Apply_State"
        label="申请/邀请状态"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="+scope.row.Check_Apply_State === 0">拒绝</el-tag>
          <el-tag type="success" v-else-if="+scope.row.Check_Apply_State === 1">通过</el-tag>
          <el-tag v-else>其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="Quota_State"
        label="配额分配状态"
        align="center"
        width="120"
      >
      <template slot-scope="scope">
          <el-tag type="warning" v-if="+scope.row.Quota_State === 0">待分配</el-tag>
          <el-tag type="success" v-else-if="+scope.row.Quota_State === 1">已分配</el-tag>
          <el-tag v-else>其他</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="Quota_Number" label="产品数量" align="center">
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="XGPE(scope.row)" type="text" size="small"
                    >修改</el-button
                  >
                  <el-button
                    @click="substaskDetailLT(scope.row)"
                    type="text"
                    size="small"
                    >查看详情</el-button
                  >
                </template>
              </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      //配额分配数据
      tableData11: [
        // {
        //   taskName: "探岳X离合器流通生产",
        //   productName: "缸盖",
        //   partsCategory: "缸盖和部件",
        //   saleNum: "1500",
        //   inventoryNum: "3000",
        //   productPrice: "50",
        //   applyType: "0",
        //   applyState: "1",
        //   getNum: "1000",
        // },
        // {
        //   companyName: "吉林大华机械制造有限公司",
        //   productName: "缸盖",
        //   partsCategory: "缸盖和部件",
        //   saleNum: "1000",
        //   inventoryNum: "2000",
        //   productPrice: "50",
        //   applyType: "0",
        //   applyState: "1",
        //   getNum: "1000",
        // },
        ],
      taskId: 0,
      addVisible2: false,
      userName: sessionStorage.getItem("ms_username"),
      contractMessage: [],
      planbook: false,
      //文件列表
      fileList: [],
      //上传此时
      shangchuancishu: 0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      addList2: {
        refuseApplyMessage: "",
      },
      judgePlan: "",
      judgePlanBook: 0,
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  created() {
    // this.judgePlanBoo();
  },
  methods: {
    //获得信息
    getMsg(msg) {
      this.tableData11 = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //验证密码是否正确
    passwordRequest(value) {
      console.log("进来了");
      console.log("名字：" + this.usernameX + "密码：" + value);
      var that = this;
      var data = Qs.stringify({
        username: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "api/users/isTrue",
          data: data,
        })
        .then((response) => {
          console.log(response.data.allData);
          if (response.data.allData == value) {
            this.ispassWord = true;
            this.$message({
              type: "success",
              message: "验证成功",
            });
          } else {
            this.$message({
              type: "warning",
              message: "验证失败",
            });
            this.ispassWord = false;
          }
        });
    },
    //下载的方法
    download(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: row.id,
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
          let url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/zip" })
          );
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "任务书.zip");
          document.body.appendChild(link);
          link.click();
        });
    },
    //任务计划下载
    RWJHXZ(row) {
      this.$prompt("请输入密码", "提示", {
        showInput: true,
        inputType: "password",
        inputPattern: /^[A-Za-z0-9]+$/,
        inputErrorMessage: "请输入正确密码！",
        confirmButtonText: "确定",
        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        // center: true
      })
        .then(({ value }) => {
          this.passwordRequest(value);
          console.log("要执行" + this.ispassWord);
          setTimeout(() => {
            if (this.ispassWord == true) {
              this.download(row);
            }
          }, 100);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消下载",
          });
        });
    },

    judgePlanBoo(row) {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/judgePlan",
          data: data,
        })
        .then((response) => {
          this.judgePlan = response.date;
          if (this.judgePlan != null) {
            this.judgePlanBook = 0;
          } else {
            this.judgePlanBook = 1;
          }
        });
    },

    //计划书拒绝原因
    refusePlanReason(row) {
      this.addVisible2 = true;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data,
        })
        .then((response) => {
          this.addList2 = response.data.allData.b[0];
        });
    },
    //上传计划书方法
    upLoadPlanT() {
      this.planbook = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {},
    handleRemove(file, fileList) {
      this.fileNumber = this.fileNumber - 1;
    },

    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile[this.shangchuancishu] = response;
      this.technicalFileWanzheng =
        this.technicalFileWanzheng +
        this.technicalFile[this.shangchuancishu] +
        "linklink";
      this.shangchuancishu = this.shangchuancishu + 1;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`,
      });
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File1: this.technicalFileWanzheng,
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportPlan",
          data: data,
        })
        .then((response) => {
          this.technicalFileWanzheng = "";
        });
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss">
.quotaAllocation {
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