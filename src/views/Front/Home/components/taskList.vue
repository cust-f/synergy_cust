<template>
    <div class="taskList">
        <el-row v-for="(task,index) in taskList" :key="index" class="company-info">
              <div @click="companyDetail(task.taskID)">
                <el-col :span="4">
                  <!-- <el-avatar shape="square" :size="80" fit="fill" :src="task.logo"></el-avatar> -->
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <div style="float:left;">
                      <h2 style="float:left;">{{task.taskName}}</h2>
                      <span style="  line-height: 36px;font-size: 18px; color: #ff7720"><slot></slot></span>
                    </div>
                    <!-- <div style="float:right;">
                      <el-rate v-model="companys.star" disabled text-color="#ff9900"></el-rate>
                    </div> -->
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <span>一级行业类别: {{task.taskCategotyMain}}</span>
                    </el-col>
                      
                    <el-col :span="11">
                        <span v-if="type==0">主任务名称: {{task.maintaskName}}</span>
                        <span v-else-if="type==1">公司名称: {{task.companyName}}</span>
                    </el-col>
                    
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <span>二级行业类别: {{task.taskCategoryPart}}</span>
                    </el-col>
                  
                    <el-col :span="11">
                      <span>发布日期: {{task.publishTime | dataFormat("yyyy-MM-dd")}}</span>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-row>
    </div>
</template>

<script>
export default {
    props:{
        taskList:{
            default:[],
            type:Array
        },
        //需求Or成果
        type:{
          default:0,
          type:Number
        }
    },
    methods: {
          //进入企业详情界面
    companyDetail(id) {
      console.log(id);
      if(this.type==0){
         this.$router.push({
        path: "admin/xuqiuyilanDetail",
        query: { taskID: id }
      });     
      }else{
         this.$router.push({
        path: "/service1",
        query: { mainTaskID: id }
      });  
      }

    }  
    },
}
</script>


<style scoped>
/* 企业列表样式 */
.taskList{
    width:100%;
}
.company-info {
  padding: 20px;
  border-bottom: 1px solid #f3f3f3;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.company-info:hover {
  position: relative;
  z-index: 1;
  -webkit-box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
}
.company-info:hover h2 {
  color: #0084ff;
}
.company-info .el-row {
  margin-bottom: 10px;
}
</style>