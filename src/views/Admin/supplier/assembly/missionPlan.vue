<!--任务计划组件-->
<template>
  <div class="contractManagement">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">任务计划</div>
    <br />
    <el-table
      :data="contractMessage"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称"></el-table-column>
      <el-table-column prop="checkPlanState" width="100" label="计划审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.checkPlanState === 0">待上传</el-tag>
          <el-tag type="warning" v-else-if="scope.row.checkPlanState === 1">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.checkPlanState === 2">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.checkPlanState === 3">拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="planUploadTime" label="上传时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.planUploadTime === 0">暂未上传</span>
          <span v-else>{{scope.row.planUploadTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkPlanTime" label="审核时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.checkPlanTime === 0">暂未审核</span>
          <span v-else>{{scope.row.checkPlanTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click="upLoadPlanT()"
            type="text"
            size="small"
            v-show="scope.row.checkPlanState === 0 || scope.row.checkPlanState == 3"
          >上传</el-button>
          
          <el-button
            @click="RWJHXZ(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.checkPlanState > 0 && scope.row.pathPath "
          >下载</el-button>
          <el-button
            v-show="scope.row.checkPlanState === 3"
            @click="refusePlanReason(scope.row)"
            type="text"
            size="small"
          >拒绝原因</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 计划书上传 -->
    <el-dialog :visible.sync="planbook" width="400px">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">上传计划书</div>
      <br />
      <br />
      <el-upload
        ref="upload"
        action="/api/MainTaskInformation/import"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        multiple
        :auto-upload="false"
        :file-list="fileList"
      >
        <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
        <br />
        <el-button
          size="small"
          type="success"
          @click="submitUpload"
          align-center
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>

    <!-- 任务计划拒绝原因 -->
    <el-dialog :visible.sync="addVisible2" width="50%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">拒绝原因</div>
      <br />
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList2" label-width="120px">
        <el-row>
          <el-col>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 7}"
              v-model="addList2.refusePlanMessage"
              :readonly="true"
            ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisible2 = false">确定</el-button>
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
        refuseApplyMessage: ""
      },
      judgePlan: "",
      judgePlanBook: 0
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    // this.judgePlanBoo();
  },
  methods: {
    //获得信息
    getMsg(msg) {
      this.contractMessage = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    //验证密码是否正确
    passwordRequest(value){
      console.log("进来了")
      console.log("名字："+this.usernameX+"密码："+value)
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
    //下载的方法
    download(row){
      var that = this;
      var data = Qs.stringify({
        taskID: row.id,
        leixing: "jihuashu"
      });
      that
        .axios({
          method: "post",
          url: "/api/SubstaskInformation/DownloadHTHT",
          data: data,
          responseType: "blob"
        })
        .then(response => {
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
      this.$prompt('请输入密码', '提示', {
        showInput:true,
      inputType: 'password',
      inputPattern:/^[A-Za-z0-9]+$/,
      inputErrorMessage: '请输入正确密码！',
      confirmButtonText: '确定',
      showClose: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      // center: true
        }).then(({ value }) => {
          this.passwordRequest(value);
          console.log("要执行"+this.ispassWord);
          setTimeout(() => {
          if(this.ispassWord==true){
              this.download(row);
          }
          },100);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消下载'
          });       
        });
    },

    judgePlanBoo(row) {
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/judgePlan",
          data: data
        })
        .then(response => {
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
        userName: this.userName
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
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
    handlePreview(file) {
    },
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
        message: `文件上传成功`
      });
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File1: this.technicalFileWanzheng,
        userName: this.userName
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportPlan",
          data: data
        })
        .then(response => {
          this.technicalFileWanzheng = "";
        });
      this.$router.go(0);
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