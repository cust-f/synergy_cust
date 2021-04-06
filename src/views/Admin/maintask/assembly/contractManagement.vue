<template>
  <div>
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同管理</div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    <br />
    <el-table
      :data="tableData"
      border
      class="table1"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <!-- mainTaskID冲-->
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="acceptCompanyName" label="供应商" width="250"></el-table-column>
      <el-table-column prop="contractState" label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="+scope.row.contractState === 0" type="info">待上传</el-tag>
          <el-tag v-else-if="+scope.row.contractState === 1">待审核</el-tag>
          <el-tag v-else-if="+scope.row.contractState === 2" type="success">通过</el-tag>
          <el-tag v-else type="danger">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="uploadContractTime" label="上传时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadContractTime === 0">暂未上传</el-span>
          <el-span v-else>{{scope.row.uploadContractTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="checkContractTime" label="审核时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.checkContractTime === 0">暂未审核</el-span>
          <el-span v-else>{{scope.row.checkContractTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.contractState!==0"
            @click="HTXZ(scope.row)"
          >下载</el-button>

          <el-button
            @click="HTSHTG(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.contractState===1 "
          >通过</el-button>
          <el-button
            @click="HTSHJJ(scope.row)"
            type="text"
            size="small"
            v-if="scope.row.contractState===1"
          >拒绝</el-button>
          <el-button type="text" size="small" @click="CKLSHT(scope.row)">历史上传</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../dataChange";
export default {
  data() {
    return {
      tableData: [],
      usernameX: sessionStorage.getItem("ms_username"),
    };
  },
  methods: {
    getMsg(msg) {
      this.tableData = msg;
    },
    //密码验证
    passwordRequest(value){
      console.log("进来了")
      console.log("名字："+this.usernameX+"密码："+value)
      var that = this;
        var data = Qs.stringify({
            username: this.usernameX,
          });
           that
            .axios({
              method: "post",
              url: "api/users/isTrue",
              data: data,
            })
            .then((response) => {
            console.log(response.data.allData)
            if (response.data.allData == value) {
              this.ispassWord=true;
                this.$message({
                  type: "success",
                  message: "验证成功",
                });
              }else {
                this.$message({
                  type: "warning",
                  message: "验证失败",
                });
                 this.ispassWord=false;
              }
        });
    },
    //合同管理处合同下载
    ContractDownload(row){
      var that = this;
      var data = Qs.stringify({
        taskID: row.taskId,
        leixing: "hetong",
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob",
        })
        .then((response) => {
          this.download(response.data, "HT");
        });
    },
    //合同下载
    HTXZ(row) {
       this.$prompt('请输入密码', '提示', {
        showInput:true,
      inputType: 'password',
      // inputValidator: validator,
      inputErrorMessage: '请输入正确密码！',
      confirmButtonText: '确定',
      showClose: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      // center: true
        }).then(({ value }) => {
          this.passwordRequest(value);
          setTimeout(() => {
          if(this.ispassWord==true){
              this.ContractDownload(row);
          }
          },100);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消下载'
          });       
        });
    },
    // 下载文件
    download(data, leixing) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(
        new Blob([data], { type: "application/zip" })
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      if (leixing === "JHS") {
        link.setAttribute("download", "计划书.zip");
      } else if (leixing === "HT") {
        link.setAttribute("download", "合同.zip");
      } else if (leixing === "ZRWFJ") {
        link.setAttribute("download", "子任务附件.zip");
      }
      document.body.appendChild(link);
      link.click();
    },
  },
  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      } else {
        return "暂未开始";
      }
    },
  },
};
</script>>