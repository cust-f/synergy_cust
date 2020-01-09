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
              <el-form-item label="需要数量">
                <el-input v-model="form.number" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col  width="100%">
              <el-form-item label="任务细节">
                <el-input type="textarea" :rows="3" style="width:90%" v-model="form.detail" :disabled="true"></el-input>
                   
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
          <el-button type="primary" class="button1" @click="dialogTableVisibleYes = true">审核通过</el-button>
          <el-button type="primary" class="button1" @click="dialogTableVisibleNo = true">审核不通过</el-button>
          <el-button type="primary" class="button1">下载相关文档</el-button>
          <div align="left">

             <el-dialog
              title="提示"
              :visible.sync="dialogTableVisibleYes"
              width="30%"
              :before-close="handleClose"
            >
              <span>审核通过</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="yessuccess()">确 定</el-button>
              </span>
            </el-dialog>
       

             <el-dialog
              title="提示"
              :visible.sync="dialogTableVisibleNo"
              width="30%"
              :before-close="handleClose"
            >
              <span>审核不通过</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="nosuccess()">确 定</el-button>
              </span>
            </el-dialog>


          </div>

      


        </div>
        <el-divider></el-divider>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "circulationTaskreD",
  data() {
    return {
      dialogTableVisibleYes: false,
      dialogTableVisibleNo :false,
      dialogVisible: false,

      form: {
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "",
        
        leader: "陈平安",
        company: "一汽大众",
        number: "40000件",
        leaderTel: "18088675187"
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskq");
    },
    yessuccess() {
      this.dialogTableVisibleYes = false;     
    },
    nosuccess(){
    this.dialogTableVisibleNo = false;  
    }
  }
};
</script>

<style>
</style>
