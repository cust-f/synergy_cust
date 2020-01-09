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
            <el-col  width="100%">
              <el-form-item label="任务细节">
                <el-input type="textarea" :rows="3" style="width:90%" v-model="form.detail" :disabled="true"></el-input>
                   
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
          <el-button type="primary" class="button1" @click="dialogTableVisible = true">接受</el-button>
          <el-button type="primary" class="button1" @click="dialogTableVisibleNo = true">不接受</el-button>
          <el-button type="primary" class="button1">下载设计文档</el-button>
          <div align="left">

            <el-dialog title="分配人员" :visible.sync="dialogTableVisible">
              <el-form :model="form">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" :disabled="true">this.</el-input>
                </el-form-item>
                <el-form-item label="截止日期" :label-width="formLabelWidth">
                  <el-input v-model="form.endtime" autocomplete="off" :disabled="true">this.</el-input>
                </el-form-item>
                <el-form-item label="人员分配" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择分配人员">
                    <el-option label="王小虎" value="wangxiaohu"></el-option>
                    <el-option label="李丽" value="lili"></el-option>
                    <el-option label="马杰" value="majie"></el-option>
                    <el-option label="秦琴" value="qinqin"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="success()">确 定</el-button>
              </div>
            </el-dialog>


             <el-dialog
              title="提示"
              :visible.sync="dialogTableVisibleNo"
              width="30%"
              :before-close="handleClose"
            >
              <span>拒绝成功</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="nosuccess()">确 定</el-button>
              </span>
            </el-dialog>
          

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>分配成功</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="goBackagain()">确 定</el-button>
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
  name: "acceptDesignDetailsTask",
  data() {
    return {
      dialogTableVisible: false,
      dialogTableVisibleNo :false,
      dialogVisible: false,

      form: {
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "协同设计和虚拟可视化仿真，从被提出起就成为计算机和信息科学领域研究的一个热点。早在二十世纪八十年代末，美国斯坦福大学联合Lockheed、EIT 及HP 公司开发的名为PACT 的项目，主要用于研究大规模、分布式并行工程系统。",
        
        leader: "陈平安",
        company: "一汽大众",
        leaderTel: "18088675187"
      },
      formLabelWidth: "120px",
    };
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
    nosuccess(){
    this.dialogTableVisibleNo = false;  
    }
  }
};
</script>

<style>
</style>
