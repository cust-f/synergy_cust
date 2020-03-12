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
              <el-form-item label="发布需求时间">
                <el-input v-model="form.deadtime" :disabled="true"></el-input>
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
                <el-input v-model="form.startTime" :disabled="true"></el-input>
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
                v-model="form.taskDetail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col width="100%">
            <el-form-item label="废除原因">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="form.fail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-row :gutter="80"></el-row>
        </el-form>
        <div align="right">
          <el-button type="primary" class="button1">查看成果</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "finishTaskDet",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleNo: false,
      dialogVisible: false,

      form: {
        taskId: "",
        acceptCompanyId: "",
        supplierName: "",
        deadline: "",
        companyName: "",
        beginTime: "",
        userName: "",
        taskState: "",
        taskDetail: ""
      },
      formLabelWidth: "120px",
      taskId:this.$store.state.taskId1
    };
  },
  created() {
    this.getParams();
    this.getData();
  },

  methods: {
    goBack() {
      this.$router.push("/admin/designTaskq");
    },
    goBackagain() {
      this.$router.push("/admin/designTaskq");
      this.dialogVisible = false;
    },
    success() {
      this.dialogTableVisible = false;

      this.dialogVisible = true;
    },
    nosuccess() {
      this.dialogTableVisibleNo = false;
    },
    getParams() {
      // var shishi = "123";
      // console.log(shishi);
      // var routerParams = this.$route.params.taskId;
      // this.taskId = routerParams;
      form.taskId = this.taskId;
      console.log(this.taskId);
      console.log(this.$store.state.taskId1);
      console.log(form.taskId);
    },

    getData() {
      console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/supplier/designTaskDet",
          data: data
        })
        .then(response => {
          this.form = response.data.allData;
          console.log(response.data.allData);
        });
    }
  }
};
</script>

<style>
</style>
