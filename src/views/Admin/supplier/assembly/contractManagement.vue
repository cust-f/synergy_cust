<!--合同管理组件-->
<template>
  <div class="contractManagement">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同管理</div>
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
      <el-table-column prop="contractState" width="100" label="合同审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.contractState === 0">待上传</span>
          <span v-else-if="scope.row.contractState === 1">待审核</span>
          <span v-else-if="scope.row.contractState === 2">通过</span>
          <span v-else-if="scope.row.contractState === 3">未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadContractTime" label="上传时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.uploadContractTime === 0">暂未上传</span>
          <span v-else>{{scope.row.uploadContractTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkContractTime" label="合同审核时间">
        <template slot-scope="scope">
          <span v-if="+scope.row.checkContractTime === 0">暂未审核</span>
          <span v-else>{{scope.row.checkContractTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click="upLoadConT(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.contractState===0"
          >上传</el-button>
          <el-button
            @click="HTFileHistory()"
            v-show="scope.row.contractState > 0"
            type="text"
            size="small"
          >历史上传</el-button>
          <el-button
            @click="HTXZ(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.contractState===1"
          >下载</el-button>
          <el-button
            v-show="scope.row.contractState===2"
            @click="HTXZ(scope.row)"
            type="text"
            size="small"
          >下载</el-button>
          <el-button
            @click="upLoadConT(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.contractState===3"
          >重新上传</el-button>
          <el-button
            @click="refuseConReason(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.contractState===3"
          >拒绝原因</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 上传合同 -->
    <el-dialog :visible.sync="conbook" width="400px" :before-close="handleClose">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">上传合同</div>
      <br />
      <br />
      <el-upload
        ref="upload"
        action="/api/supplier/import"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        multiple
        :auto-upload="false"
      >
        <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
        <br />
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
          align-center
        >上传到服务器</el-button>
      </el-upload>
    </el-dialog>
    <!-- 合同拒绝原因 -->
    <el-dialog :visible.sync="addVisible3" width="50%">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5;">合同拒绝原因</div>
      <br />
      <br />
      <el-row>
        <el-col :span="8"></el-col>
      </el-row>
      <el-form ref="form" :model="addList3" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="被拒绝原因">
              <el-input v-model="addList3.contractRefuseReason" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVisible3 = false">确定</el-button>
      </span>
    </el-dialog>
    <!-- 文件历史 -->
    <el-dialog title :visible.sync="fileHistoryDia" width="55%">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">文件历史</div>
      <br />
      <br />
      <div>
        <el-table
          :data="fileHistoryMessage"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="55" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="文件名">
            <template slot-scope="scope">
              <el-link @click.native="downloadFile(scope.row)">{{scope.row.fileName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="publishingCompanyName" label="发布企业" width="180" align="center"></el-table-column>
          <el-table-column prop="fileType" width="100" label="文件类型">
            <template slot-scope="scope">
              <span v-if="scope.row.fileType === 0">合同文件</span>
              <span v-else-if="scope.row.fileType === 1">发货清单</span>
            </template>
          </el-table-column>
          <el-table-column prop="filePath" width="100" label="文件地址" v-if="yinCang === 0"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间">
            <template slot-scope="scope">
              <el-span>{{scope.row.uploadTime | formatDate}}</el-span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {
    return {
      fileType: 0,
      taskId: 0,
      yinCang: 1,
      userName: localStorage.getItem("ms_username"),
      contractMessage: [],
      fileHistoryMessage: [],
      conbook: false,
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
      addList3: {
        contractRefuseReason: ""
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
      this.contractMessage = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    downloadFile(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        url: row.filePath
      });
      that
        .axios({
          method: "post",
          url: "/api/xuqiuyilan/DownloadTelFile",
          data: data,
          responseType: "blob", //服务器返回的数据类型
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          console.log(response);
          const content = response.data;
          const blob = new Blob([content]);
          let url = window.URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", row.fileName);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(link.href); //释放url
        });
    },
    HTFileHistory() {
      this.fileType = 0;
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        fileType: this.fileType
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getFileHistory",
          data: data
        })
        .then(response => {
          // console.log(response);
          this.fileHistoryMessage = response.data.allData;
          this.fileHistoryDia = true;
        });
    },
    //合同下载
    HTXZ(row) {
      var that = this;
      var data = Qs.stringify({
        taskID: this.taskId,
        leixing: "hetong"
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
          let url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/zip" })
          );
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "合同.zip");
          document.body.appendChild(link);
          link.click();
        });
    },
    //合同拒绝原因
    refuseConReason(row) {
      this.addVisible3 = true;
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
          this.addList3 = response.data.allData.a[0];
        });
    },
    //上传合同方法
    upLoadConT() {
      this.conbook = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File: this.technicalFileWanzheng
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/textImportCon",
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
.contractManagement {
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