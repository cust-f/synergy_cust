<template>
  <div>
    <div>
      <el-container>
        <el-main>
              <h3>流通任务评价详情</h3>
               &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                     <el-steps :active="milepostActive" align-center>
        <!-- 步骤图片 -->
        <el-step
          v-for="(value, key) in milepost"
          :class="milepostActive== key+1 ? stepActive: '' "
          :title="value.title"
          :icon="value.icon"
          :key="key"
        ></el-step>
      </el-steps>
     

            <br/><br/>
            <div class="charts1" id="charts1" ></div>

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
                
                <el-col>
                  <el-form-item>
                    <el-button>确定</el-button>
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
      },
       //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit" },
        { title: "计划提交", icon: "el-icon-upload" },
        { title: "任务进行中", icon: "el-icon-picture" },
        { title: "审核", icon: "el-icon-message-solid" },
        { title: "验收", icon: "el-icon-s-promotion" },
        { title: "完成", icon: "el-icon-s-claim" }
      ],
      // 默认步骤数
      milepostActive: 5,
      // 动态添加类名
      stepActive: "stepActive",
      //申请状态按钮显示隐藏
      applicationStatus:0,
      //任务计划状态按钮显示隐藏
      taskPlanStatus:0,
      //合同管理状态按钮显示隐藏
      contractManagementStatus:0,
      //设计任务状态按钮显示隐藏
      designState:0
    
    };
  },
   //初始化俩图标
  mounted() {
    
    this.getCharts1();
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskEvaluation");
    },
     getCharts1() {
      var myChart = echarts.init(document.getElementById("charts1"));
      var option = {
        tooltip: {},
        legend: {
          x: "left",
          y: "top",
          data: ["设计任务", "流通任务"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "人员数量", max: 50 },
            { name: "时间效率", max: 400 },
            { name: "涉及金额", max: 50000 },
            { name: "提交效率", max: 100 },
            { name: "完成准确度", max: 100 }
          ]
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [20, 200, 35000, 80, 90],
                name: "设计任务"
              },
              {
                value: [30, 300, 28000, 93, 87],
                name: "流通任务"
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
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
.charts1 {
  width: 66%;
  margin-top: 10%;
  margin-left: 10%;
  height: 320px;
}
</style>