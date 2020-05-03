<template>
  <div>
    <el-upload
      ref="upload"
      action="/api/supplier/import"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess2"
      :on-change="change" multiple
      :auto-upload="false" 
    >
      <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
      <br />
      <el-button
        style="margin-left:10px;"
        size="small"
        type="success"
        @click="submitUpload"
        align-center
      >上传到服务器</el-button>
    </el-upload>
<br><br>
    <el-upload action class="upload-demo" :on-change="change" multiple :http-request="uploadFile">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "text",
  data() {
    return {
      length: 0,
      fileList: [] //文件存储中间量
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(response, file, fileList) {
      this.technicalFile = response;
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      console.log(response);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        Text_File: this.technicalFile
      });
      console.log(data);
      that.axios({
        method: "post",
        url: "/api/supplier/textImportCon",
        data: data
      });
      this.$router.go(0);
    },
    uploadFile(content) {
      let formData = new FormData();
      if (this.fileList.length > 0) {
        this.fileList.forEach(file => {
          formData.append("files", file);
        });

        if (formData.getAll("files").length == this.length && this.length > 0) {
          //	走接口
          console.log(formData.getAll("files"));
          let _url = "*****"; //上传文件接口地址
          this.$axios({
            url: _url,
            method: "post",
            data: formData
          }).then(
            res => {
              this.fileList = [];
              //此处重置文件中间存储变量是为了相同文件能够重复传递
              if (true === res.data.ok) {
                this.$message.success(`成功`);
              } else {
                this.$message.success(`失败`);
              }
            },
            err => {
              this.fileList = [];
              this.$message.success(`失败`);
            }
          );
        }
      }
    },
    change() {
      //判断上传文件数量
      this.length = document.querySelector("input[type=file]").files.length;
      if (this.length > 0) {
        Array.from(document.querySelector("input[type=file]").files).forEach(
          file => {
            if (this.fileList.indexOf(file) == -1) {
              this.fileList.push(file);
            }
          }
        );
      }
      return false;
    },
    submitUpload() {
      this.$refs.upload.submit();
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
