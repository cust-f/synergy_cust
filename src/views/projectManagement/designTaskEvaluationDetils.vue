<template>
  <div>
<div>
    <el-container>

        <el-aside>
                  <div class="backGround_0">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史记录</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">
                {{ o }}
            </div>  
        </el-card>
      </div>
        </el-aside>

        <el-main>
            <el-form ref="form" :model="form" label-width="110px">
            <el-row  :gutter="80">
                <el-col :span="11">
                    <el-form-item label="评价ID">
                        <el-input v-model="form.Remark_ID" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
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
                <el-col :span="11">
                    <el-form-item label="评价状态">
                        <el-input v-model="form.Remark_State" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            
        </el-form>

        
         <el-divider></el-divider>
        </el-main>
    </el-container>
</div>


           
  </div>
</template>




<script>
export default {
    name:'substaskDetail',
    data(){
      return {
        form: {
          Remark_ID:'01',
          Design_ID: '02',
          Trade_Time: '2019-03-13',
          Remark_State: '已评价'
        },
               tenderTrendsList:[
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来"},
        { column_name: "白日依山尽，黄河入海流"},
        { column_name: "黄河落天走东海，万里尘沙入胸怀"},
        { column_name: "明月隐高树，长河没晓天"},
        { column_name :"萧萧远树疏林外，一半秋山带夕阳。"},
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。"}
         ],
        
      }
    },
    methods:{
      /*
      *转跳对应任务信息页面
      */
     mainStaskDetail(){
         this.$router.push('/mainStaskDetail')
     }
  }
}
</script>

<style>

</style>