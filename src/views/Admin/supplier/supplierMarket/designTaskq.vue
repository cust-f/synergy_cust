<template>
  <div>
    <el-container>
      <el-main>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计任务</div>
        <br>
        <div>
          <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部任务" name="first">
                <all-Task></all-Task>
              </el-tab-pane>
               
              <el-tab-pane label="待响应" name="second">
                <pending-ResTask></pending-ResTask>
              </el-tab-pane>

              <el-tab-pane label="任务计划" name="third">
                <plan-Audit></plan-Audit>
              </el-tab-pane>

              <el-tab-pane label="进行中" name="fourth">
                <designing-Task></designing-Task>
              </el-tab-pane>

              <el-tab-pane label="待审核" name="fifth">
                <pending-Audit></pending-Audit>
              </el-tab-pane>

              <el-tab-pane label="待验收" name="sixth">
                <pending-Acceptance></pending-Acceptance>
              </el-tab-pane>

              <el-tab-pane label="已完成" name="seventh">
                <finish-Task></finish-Task>
              </el-tab-pane>

              <!-- <el-tab-pane label="已废除" name="eighth">
                <repealed-Task></repealed-Task>
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>


import pendingResTask from "../design/pendingResTask"; //待响应任务
import planAudit from "../design/planAudit"; //计划审核
import designingTask from "../design/designingTask"; //进行中任务
import pendingAudit from "../design/pendingAudit"; //待审核
import pendingAcceptance from "../design/pendingAcceptance"; //待验收
import finishTask from "../design/finishTask.vue"; //已完成任务
// import repealedTask from "../design/repealedTask"; //已废除任务
import allTask from "../design/allTask";//全部任务
export default {
  name: "designTaskq",
  components: {
    "all-Task": allTask,//全部任务
    "pending-ResTask": pendingResTask, //待响应任务
    "plan-Audit": planAudit, //计划审核
    "designing-Task": designingTask, //进行中任务
    "pending-Audit": pendingAudit, //待审核
    "pending-Acceptance": pendingAcceptance, //待验收
    "finish-Task": finishTask, //已完成任务
    // "repealed-Task": repealedTask //已废除任务
  },
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      activeName:"first",
    };
  },
  
}
</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
}
.biaoti {
    font-size: 18px;
    color: #303133;
  }
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 260px;
  display: inline-block;
}
.table {
  width: 100%;
  /* font-size: 16px; */
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.box {
  font-size: 24px;
}
</style>

