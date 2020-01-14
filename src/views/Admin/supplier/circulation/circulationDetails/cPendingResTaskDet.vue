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
                <el-input v-model="form.id" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="需求类型">
                <el-input v-model="form.type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-input v-model="form.endtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发布需求企业">
                <el-input v-model="form.company" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发布需求时间">
                <el-input v-model="form.startTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="负责人员">
                <el-input v-model="form.leader" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="负责人电话">
                <el-input v-model="form.leaderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="设计单位">
                <el-input v-model="form.designcompany" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="设计师">
                <el-input v-model="form.designer" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col width="100%">
            <el-form-item label="需求细节">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="form.detail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-row :gutter="80"></el-row>
        </el-form>
        <div align="right">
          <el-button type="primary" class="button1" @click="planbook=true">接收</el-button>
          <el-button type="primary" class="button1" @click="disaccept=true">不接收</el-button>
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
      <span>上传成功,请等待需求审核</span>
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
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "协同设计和虚拟可视化仿真，从被提出起就成为计算机和信息科学领域研究的一个热点。早在二十世纪八十年代末，美国斯坦福大学联合Lockheed、EIT 及HP 公司开发的名为PACT 的项目，主要用于研究大规模、分布式并行工程系统。",

        leader: "陈平安",
        company: "长春奥普光电技术股份有限公司",
        leaderTel: "18088675187",
        designcompany: "杭机集团长春一机有限公司",
        startTime: "2019-5-1",
        designer: "陈龙"
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskq");
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
