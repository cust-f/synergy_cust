<template>
  <div class="returnFile">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5">
      文件重传
    </div>
    <br />
    <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
      <el-form-item label="任务书重传：">
        <el-button v-if="planState === 2" type="primary" @click="upLoad(1)"> 上传任务书 </el-button>
        <span v-else>任务书未上传或审核未通过</span>
      </el-form-item>

      <el-form-item label="合同重传：">
        <el-button v-if="conState === 2" type="primary" @click="upLoad(2)"> 上传合同 </el-button>
        <span v-else>合同未上传或审核未通过</span>
      </el-form-item>
    </el-form>
    <!-- 上传合同 -->
    <el-dialog :visible.sync="uploadFileDiaog" width="400px">
      <div style="padding: 0 10px; border-left: 3px solid #4e58c5">
        上传合同
      </div>
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
        <el-button size="small" slot="trigger" type="primary"
          >选取文件</el-button
        >
        <br />
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          align-center
          >上传到服务器</el-button
        >
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import Qs from 'qs'
export default {
  data() {
    return {
      uploadFileDiaog: false,
      taskId: 0,
      userName: sessionStorage.getItem("ms_username"),
      //文件列表
      fileList: [],
      //上传此时
      shangchuancishu: 0,
      //上传的文件路径
      technicalFile: [],
      technicalFileWanzheng: "",
      planState: 0,
      conState: 0,
      fileType:0
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    getMsg(msg) {
      this.conState = msg.a[0].contractState;
      this.planState = msg.b[0].checkPlanState;
      console.log(this.planState);
      console.log(this.conState);
    },
    upLoad(fileType) {
      this.uploadFileDiaog = true;
      this.fileType = fileType
    },
    handlePreview(file) {},
    handleRemove(file, fileList) {
      this.fileNumber = this.fileNumber - 1;
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    submitUpload() {
      this.$refs.upload.submit();
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
        userName: this.userName,
        taskId: this.taskId,
        Text_File: this.technicalFileWanzheng,
        fileType: this.fileType,
      });

      that
        .axios({
          method: "post",
          url: "/api/supplier/returnFile",
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
.returnFile {
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
}
</style>