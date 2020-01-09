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
              <el-form-item label="供货数量">
                <el-input v-model="form.number" :disabled="true"></el-input>
              </el-form-item>

            </el-col>

            <el-col width="100%">
              <el-form-item label="任务细节">
               <el-input type="textarea" :rows="3" style="width:90%" v-model="form.detail" :disabled="true"></el-input>
              </el-form-item>
          </el-col>

            
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
           
            
             <el-button type="primary" class="button1" >下载技术文档</el-button>
  
        </div>
        
         <el-divider></el-divider>
        <div>
        <h3>任务评价</h3>
        </div>
        <br/>
        <el-form ref="form" :model="form" label-width="110px">
        
          <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通总体星级">
                    <div class="block">
                            <el-rate v-model="value0" :colors="colors" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
                
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通数据完整性">
                    <div class="block">
                            <el-rate v-model="value1" :colors="colors" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通数据可靠性">
                    <div class="block">
                            <el-rate v-model="value2" :colors="colors" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通数据一致性">
                    <div class="block">
                            <el-rate v-model="value3" :colors="colors" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通数据及时性">
                    <div class="block">
                            <el-rate v-model="value4" :colors="colors" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "circulationTaskfinishDesign",
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
          "",
        leader: "陈平安",
        company: "一汽大众",
        designer: "金像元",
        number:"550000",
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
    //返回
    goBack() {
      this.$router.push("/admin/circulationTaskq");
    },
    //跳转评价界面
    EvaluationDetils () {
      this.$router.push("/circulationTaskEvaluationDetils");
    },
    
    
  }
};
</script>
<style>
</style>
