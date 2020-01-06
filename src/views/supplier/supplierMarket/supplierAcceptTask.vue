<template>
  <div>
    <el-container>
      <el-aside width="15%" style="overflow:hidden">
        <div class="backGround_0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>历史记录</span>
              <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">{{ o }}</div>
          </el-card>
        </div>
      </el-aside>

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
              <el-form-item label="任务细节">
                <el-input v-model="form.detail" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
          <el-button type="primary" class="button1" @click="dialogTableVisible = true">接受</el-button>
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
                <el-form-item label="活动区域" :label-width="formLabelWidth">
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
  name: "supplierAcceptTask",
  data() {
    return {
      dialogTableVisible: false,
      dialogVisible: false,

      form: {
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "人生路上，总会有那么几场疾风骤雨，就像是老天爷在提醒世人，你们是在寄人篱下，要乖乖低头。比如陈平安在泥瓶巷自家门口遇上了个蔡金简，在蛟龙沟遇上法袍金醴的原先主人，误入藕花深处，就迎来了一场宗师联手的围剿。就看熬不熬得过去了。熬过去，雨后天晴，熬不过去，最多也就只能像武夫那般，嚷着十八年后还是条好汉。",
        leader: "陈平安",
        company: "一汽大众",
        leaderTel: "18088675187"
      },
      formLabelWidth: "120px",
      tenderTrendsList: [
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来" },
        { column_name: "白日依山尽，黄河入海流" },
        { column_name: "黄河落天走东海，万里尘沙入胸怀" },
        { column_name: "明月隐高树，长河没晓天" },
        { column_name: "萧萧远树疏林外，一半秋山带夕阳。" },
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。" }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/supplierAccept");
    },
    goBackagain() {
      this.$router.push("/supplierAccept");
      this.dialogVisible = false;
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
