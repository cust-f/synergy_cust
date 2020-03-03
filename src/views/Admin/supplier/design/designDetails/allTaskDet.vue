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
              <el-form-item label="设计师">
                <el-input v-model="form.userName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="状态">
                <el-input v-model="form.taskState" :disabled="true"></el-input>
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
import Qs from "qs";
import { formatDate } from "../../maintask/dataChange";

export default {
  name: "allTaskDet",
  data() {
    return {
      successful: false,
      dialogTableVisible: false,
      TableVisible: false,
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
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      multipleSelection: [],
      formLabelWidth: "120px",
      taskId: "",
      multipleSelection: [],
      pageTotal: 0,
      idx: -1,
      id: -1
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
    }
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
      this.successful = true;
      this.TableVisible = false;
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
          url: "http://127.0.0.1:8082/SupplierdesigntaskController/designTaskDet",
          data: data
          
        })
        .then(response => {
          this.form = response.data.allData;
          console.log(response.data.allData);
        });
    },
  }
};
</script>

<style>
</style>
