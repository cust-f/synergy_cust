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
                <el-input v-model="form.id" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="需求名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="需求类型">
                <el-input v-model="form.type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="截止时间">
                <el-input v-model="form.endtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="发布需求企业">
                <el-input v-model="form.company" :disabled="true"></el-input>
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
              <el-form-item label="负责人员">
                <el-input v-model="form.leader" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="负责人电话">
                <el-input v-model="form.leaderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="状态">
                <el-input v-model="form.status" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col width="100%">
            <el-form-item label="需求细节">
              <el-input
                type="textarea"
                :rows="3"
                style="width:90%"
                v-model="form.detail"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-row :gutter="80"></el-row>
        </el-form>
        <div align="right">
          <el-button type="primary" class="button1">查看技术文档</el-button>
          <el-button type="primary" class="button1" @click="TableVisible = true">供应商分配</el-button>
          <el-button type="primary" class="button1" @click="dialogTableVisible = true">人员分配</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="分配设计人员" :visible.sync="dialogTableVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="需求名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设计人员" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分配人员">
            <el-option label="王虎" value="wangxiaohu"></el-option>
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

    <el-dialog title="分配供应商" :visible.sync="TableVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="需求名称" :label-width="formLabelWidth">
          <el-input v-model="from.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-input v-model="from.endtime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择分配供应商">
            <el-option label="杭机集团长春一机有限公司" value="wangxiaohu"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="lili"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="majie"></el-option>
            <el-option label="杭机集团长春一机有限公司" value="qinqin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TableVisible = false">取 消</el-button>
        <el-button type="primary" @click="success()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="successful" width="15%" :before-close="handleClose">
      <span>分配成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cPlanAuditDet",
  data() {
    return {
      successful: false,
      dialogTableVisible: false,
      TableVisible: false,
       from: {
        name: "小汽车零件的装配",
        endtime: "2019-10-17"
      },

      form: {
        id: "000101",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "协同设计和虚拟可视化仿真，从被提出起就成为计算机和信息科学领域研究的一个热点。早在二十世纪八十年代末，美国斯坦福大学联合Lockheed、EIT 及HP 公司开发的名为PACT 的项目，主要用于研究大规模、分布式并行工程系统。",

        leader: "陈平安",
        company: "长春奥普光电技术股份有限公司",
        leaderTel: "18088675187",
        designcompany: "杭机集团长春一机有限公司",
        startTime: "2019-5-1",
        status: "审核通过"
      },
      formLabelWidth: "120px"
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
      this.successful = true;
      this.TableVisible = false;
    }
  }
};
</script>

<style>
</style>
