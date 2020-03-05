<template>
  <div>
    <el-container>
      <el-main style="overflow:hidden">
        <el-page-header @back="goBack" content="需求详情"></el-page-header>
        <br />
        <el-form ref="form" :model="formAllTaskDet" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="需求ID">
                <el-input v-model="formAllTaskDet.taskId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="formAllTaskDet.acceptCompanyId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="需求类型">
                <el-input v-model="formAllTaskDet.supplierName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="截止时间">
                <el-input v-model="formAllTaskDet.deadline" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发布需求企业">
                <el-input v-model="formAllTaskDet.companyName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发布需求时间">
                <el-input v-bind:value="formAllTaskDet.beginTime | formatDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="状态">
                <el-input v-model="formAllTaskDet.status" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col width="100%">
            <el-form-item label="需求细节">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="formAllTaskDet.taskDetail"
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
      formAllTaskDet: {
        taskId: "",
        acceptCompanyId: "",
        supplierName: "",
        deadline: "",
        companyName: "",
        beginTime: "",
        userName: "",
        taskState: "",
        state:"",
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
    //返回列表页
    goBack() {
      this.$router.push("/admin/designTaskq");
    },
    //返回列表页
    goBackagain() {
      this.$router.push("/admin/designTaskq");
      this.dialogVisible = false;
    },
    //成功弹窗
    success() {
      this.dialogTableVisible = false;
      this.successful = true;
      this.TableVisible = false;
    },
    //接受数据
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //数据查找
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
