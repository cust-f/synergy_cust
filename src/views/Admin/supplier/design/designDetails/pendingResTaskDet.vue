<template>
  <div>
    <el-container>
      <el-main style="overflow:hidden">
        <el-page-header @back="goBack" content="需求详情"></el-page-header>
        <br />
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求ID">
                <el-input v-model="form.taskId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="form.acceptCompanyId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="需求类型">
                <el-input v-model="form.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-input v-model="form.deadline" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发布需求企业">
                <el-input v-model="form.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发布需求时间">
                <el-input v-model="form.beginTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="承接供应商">
                <el-input v-model="form.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="设计师">
                <el-input v-model="form.userName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="是否为退回">
                <el-input v-model="form.backState" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col width="100%">
            <el-form-item label="需求细节">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="form.taskDetail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-row :gutter="80"></el-row>
        </el-form>
        <div align="right">
          <el-button type="primary" class="button1" @click="planbook=true">接受</el-button>
          <el-button type="primary" class="button1" @click="disaccept=true">不接受</el-button>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="上传需求书" :visible.sync="planbook" width="20%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">上传需求书</el-button>
        <div slot="tip" class="el-upload__tip">只能上传doc文件</div>
      </el-upload>
      <el-button type="primary" @click="success()">确 定</el-button>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="accept" width="30%" :before-close="handleClose">
      <span>接受成功,请等待需求审核</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="disaccept" width="30%" :before-close="handleClose">
      <span>拒绝成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "pendingResTaskDet",
  data() {
    return {
      accept: false,
      disaccept: false,
      planbook: false,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      form: {
       taskId: "",
        acceptCompanyId: "",
        supplierName: "",
        deadline: "",
        companyName: "",
        beginTime: "",
        userName: "",
        taskState: "",
        taskDetail: "",
         backState:""
      },
      formLabelWidth: "120px",
      taskId: "",
      backState:"",
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/designTaskq");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    success() {
      this.planbook = false;
      this.accept = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }

    
  }
};
</script>

<style>
</style>
