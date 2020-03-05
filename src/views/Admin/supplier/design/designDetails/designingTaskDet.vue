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
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "designingTaskDet",
  data() {
    return {
      form: {
        taskId: "1",
        acceptCompanyId: "2",
        supplierName: "3",
        deadline: "4",
        companyName: "5",
        beginTime: "6",
        userName: "7",
        taskState: "8",
        taskDetail: "9",
         backState:"0"
      },
      formLabelWidth: "120px",
      taskId: "",
      backState:"",

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
