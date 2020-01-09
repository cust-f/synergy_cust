<template>
  <div>
    <el-container>
      <el-main style="overflow:hidden">
        <el-page-header @back="goBack" content="任务详情"></el-page-header>
        <br />
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form.id" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务截止时间">
                <el-input v-model="form.endtime" :disabled="true"></el-input>
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
            <el-col :span="11">
              <el-form-item label="发布任务企业">
                <el-input v-model="form.company" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="设计人员">
                <el-input v-model="form.designer" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col  width="100%">
               <el-form-item label="废除原因">
                        <el-input type="textarea" :rows="3" style="width:90%" v-model="form.Abolish_Reason" :disabled="true"></el-input>
                    </el-form-item>
            </el-col>
             <el-col  width="100%">
               <el-form-item label="任务详情">
                        <el-input type="textarea" :rows="3" style="width:90%" v-model="form.detail" :disabled="true"></el-input>
                    </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
            <el-button type="primary" class="button1" >下载相关文件</el-button>
          
        </div>
        <el-divider></el-divider>
       
       
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "circulationTaskabolishDe",
  data() {
    return {
   
      form: {
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        Abolish_Reason:"数据不符",
        detail:
          "",
        leader: "陈平安",
        company: "一汽大众",
        designer: "金像元",
        leaderTel: "18088675187"
      },
      formLabelWidth: "120px",
     
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskq");
    },
    success() {
      this.dialogTableVisible = false;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>
