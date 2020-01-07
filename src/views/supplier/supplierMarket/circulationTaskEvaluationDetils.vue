<template>
  <div>
<div>
    <el-container>
<el-aside width="15%">Aside</el-aside>
        <el-main>
            <el-page-header @back="goBack" content="评价详情页面">
</el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-form ref="form" :model="form" label-width="110px">
            <el-row  :gutter="50">
                <el-col :span="10">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.Taskname" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="完成时间">
                        <el-input v-model="form.Finish_Time" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="50">
                <el-col :span="10">
                    <el-form-item label="评价时间">
                        <el-input v-model="form.Trade_Time" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="评价企业">
                        <el-input v-model="form.Company_ID" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="70">
                <el-col :span="20">
                    <el-form-item label="评价内容">
                        <el-input v-model="form.Comment" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
              <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="总评">
                    <div class="block">
                            <el-rate v-model="value0" :colors="colors" disabled="ture" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="零件完整度">
                    <div class="block">
                            <el-rate v-model="value2" :colors="colors" disabled="ture">
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="流通速度">
                    <div class="block">
                            <el-rate v-model="value3" :colors="colors" disabled="ture">
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="20">
                    <el-form-item label="零件质量">
                    <div class="block">
                            <el-rate v-model="value4" :colors="colors" disabled="ture" >
                            </el-rate>
                    </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
         
        </el-main>
    </el-container>

</div>


           
  </div>
</template>

<script>
export default {
    name:'circulationTaskEvaluationDetils',
    data(){
      return {
          
        value0: 3,
        value1: 4,
        value2: 5,
        value3: 2,
        value4: 2,

        colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        
        form: {
          Taskname:'小型汽车车灯',
          Finish_Time: '2019-01-01',
          Trade_Time: '2019-03-13',
          Company_ID: '一汽大众',
          Comment:'零件十分完整，但是耐久程度不高，流通速度太慢'
        },
        
      }
    },
    methods:{
        goBack() {
        this.$router.push('/circulationTaskfinish');
      }
      
  }
}
</script>

<style>
.block
{
    margin-top: 10px;
    margin-bottom: 20px;
}
.stars{
            white-space: nowrap;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .stars li{
            display: inline-block;
            color: #ADADAD;
            font-size: 40px;
        }
</style>