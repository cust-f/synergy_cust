<template>
  <el-form-item label="附件上传" label-width="80px">
    <el-form-item label="附件上传" label-width="80px">
      <el-upload
        style="padding-left:0px"
        class="upload-demo"
        action="admin/zuul/lcloud-elis-rms-gwb/um/rmsAnnex/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :data="{idSalesTccUserNotetice:form.idSalesTccUserNotetice }"
        multiple
        :auto-upload="false"
        :http-request="uploadFile"
        ref="upload"
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </el-form-item>
</template>

<script>
export default {
  name: "cRepealedTask",
  data() {
    return {};
  },
  created() {},
  methods: {
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    //发布
    saveProject1() {
      this.formDate = new FormData();
      this.$refs.upload.submit();
      var uid = JSON.parse(window.sessionStorage.getItem("keyLimit")).username;
      this.formDate.append("noticeTitle", this.form.noticeTitle);
      this.formDate.append("noticeType", this.form.noticeType);
      this.formDate.append("isPublic", this.form.isPublic);
      this.formDate.append("note", this.form.note);
      this.formDate.append(
        "idSalesTccUserNotetice",
        this.form.idSalesTccUserNotetice
      );
      this.formDate.append("uid", uid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios
        .post(
          "admin/zuul/lcloud-elis-rms-gwb/um/userNotice/save",
          this.formDate,
          config
        )
        .then(res => {
          if (res.code == "0") {
            if (res.object.status == 200) {
              this.$emit("close");
              this.$emit("getNoticeList");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  /*
   *转跳对应需求信息页面
   */
};
</script>

<style scoped>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}

.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 260px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box {
  font-size: 24px;
}
</style>
