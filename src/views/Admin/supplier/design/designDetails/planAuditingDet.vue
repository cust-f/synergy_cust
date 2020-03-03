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
                <el-input v-bind:value="mainStask.deadline | formatDate" :disabled="true"></el-input>
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
                <el-input v-bind:value="mainStask.beginTime | formatDate" :disabled="true"></el-input>
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
          <el-button type="primary" class="button1">查看计划书</el-button>
          <el-button type="primary" class="button1" @click="success()">通过</el-button>
          <el-button type="primary" class="button1" @click="nosuccess()">不通过</el-button>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="提示" :visible.sync="Auditpost" width="15%" :before-close="handleClose">
      <span>审核通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="NoAuditpost" width="15%" :before-close="handleClose">
      <span>审核不通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "planAuditingDet",
  data() {
    return {
      Auditpost: false,
      NoAuditpost: false,

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
        backState: ""
      },
      formLabelWidth: "120px",
      taskId: "",
      backState: ""
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
    success() {
      this.Auditpost = true;
    },
    nosuccess() {
      this.NoAuditpost = true;
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
          if (response.data.allData.tRefuseReason == null) backState = "否";
          else backState = "是";
          this.form = response.data.allData;
          this.form.backState = this.backState;
          console.log(response.data.allData);
        });
    }


  }
};
</script>

<style>
</style>
