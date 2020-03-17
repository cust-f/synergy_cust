<template>
  <div>
    <el-container>
      <el-main style="overflow:hidden">
        <el-page-header @back="goBack" content="需求详情"></el-page-header>
        <br />
        <el-form ref="form" :model="formPendingAuditDet" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求ID">
                <el-input v-model="formPendingAuditDet.taskId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="formPendingAuditDet.taskName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="需求类型">
                <el-input v-model="formPendingAuditDet.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-input v-bind:value="formPendingAuditDet.deadline | formatDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发布需求企业">
                <el-input v-model="formPendingAuditDet.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发布需求时间">
                <el-input v-bind:value="formPendingAuditDet.beginTime | formatDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="承接供应商">
                <el-input v-model="formPendingAuditDet.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="设计师">
                <el-input v-model="formPendingAuditDet.designer" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="是否为退回">
                <el-input v-model="formPendingAuditDet.backState" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-col width="100%">
            <el-form-item label="需求细节">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="formPendingAuditDet.taskDetail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-row :gutter="80"></el-row>
        </el-form>
        <div align="right">
          <el-button type="primary" class="button1">查看成果</el-button>
          <el-button type="primary" class="button1">通过</el-button>
          <el-button type="primary" class="button1">不通过</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "pendingAuditDet",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleNo: false,
      dialogVisible: false,

      formPendingAuditDet: {
        taskId: "",
        taskName: "",
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
      backState:"0",
      taskId: ""
    };
  },
  // created() {
  //   this.getParams();
  //   this.getData();
  // },

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
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
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
            "http://127.0.0.1:8082/SupplierdesigntaskController/designTaskDet",
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
