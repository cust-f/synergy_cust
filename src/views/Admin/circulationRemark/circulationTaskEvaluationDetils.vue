<template>
  <div>
    <div>
      <el-container>
        <el-main>
          <el-form ref="form" :model="form" label-width="110px">
            <el-scrollbar style="height:100%">
              <el-row :gutter="80">
                <el-col :span="11">
                  <el-form-item label="评价ID">
                    <el-input v-model="form.Remark_ID" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="设计任务ID">
                    <el-input v-model="form.Design_ID" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="80">
                <el-col :span="11">
                  <el-form-item label="评价时间">
                    <el-input v-model="form.Trade_Time" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="评价状态">
                    <el-input v-model="form.Remark_State" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="接收企业ID">
                    <el-input v-model="form.Accept_Company_ID" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 
                <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
              -->
              <el-row :gutter="120">
                <el-col :span="20">
                  <el-form-item label="详细评价">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item>
                    <el-button>确定</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="总体星级">
                    <div class="block">
                      <el-rate v-model="value0" :colors="colors"></el-rate>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="流通基础性">
                    <div class="block">
                      <el-rate v-model="value1" :colors="colors"></el-rate>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="流通可靠性">
                    <div class="block">
                      <el-rate v-model="value2" :colors="colors"></el-rate>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="流通价值性">
                    <div class="block">
                      <el-rate v-model="value3" :colors="colors"></el-rate>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                  <el-form-item label="流通保证性">
                    <div class="block">
                      <el-rate v-model="value4" :colors="colors"></el-rate>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "circulationTaskEvaluationDetils",
  data() {
    return {
      value0: null,
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      textarea: "",

      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

      form: {
        Remark_ID: "01",
        Design_ID: "02",
        Trade_Time: "2019-03-13",
        Remark_State: "已评价",
        Accept_Company_ID: "233"
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskEvaluation");
    }
  }
};
</script>

<style>
.is-horizontal {
  display: none;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.block {
  margin-top: 10px;
  margin-bottom: 20px;
}
.stars {
  white-space: nowrap;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.stars li {
  display: inline-block;
  color: #adadad;
  font-size: 40px;
}
</style>