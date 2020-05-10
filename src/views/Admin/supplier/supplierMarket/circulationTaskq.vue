<template>
  <div>
    <el-container>
      <el-main>
        <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">流通任务</div>
        <el-divider></el-divider>
        <div>
          <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部任务" name="first">
                <cAll-Task></cAll-Task>
              </el-tab-pane>

              <el-tab-pane label="待响应" name="second">
                <cPending-ResTask></cPending-ResTask>
              </el-tab-pane>

              <el-tab-pane label="任务计划" name="third">
                <cPlan-Audit></cPlan-Audit>
              </el-tab-pane>

              <el-tab-pane label="进行中" name="fourth">
                <circulationing-Task></circulationing-Task>
              </el-tab-pane>

              <el-tab-pane label="待验收" name="sixth">
                <cPending-Acceptance></cPending-Acceptance>
              </el-tab-pane>

              <el-tab-pane label="已完成" name="seventh">
                <cFinish-Task></cFinish-Task>
              </el-tab-pane>

              <el-tab-pane label="已废除" name="eighth">
                <cRepealed-Task></cRepealed-Task>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import cPendingResTask from "../circulation/cPendingResTask"; //待响应任务
import cPlanAudit from "../circulation/cPlanAudit"; //计划审核
import circulationingTask from "../circulation/circulationingTask"; //进行中任务
import cPendingAcceptance from "../circulation/cPendingAcceptance"; //待验收
import cFinishTask from "../circulation/cFinishTask"; //已完成任务
import cRepealedTask from "../circulation/cRepealedTask"; //已废除任务
import cAllTask from "../circulation/cAllTask";
export default {
  name: "circulationTaskq",
  components: {
    "cAll-Task": cAllTask,
    "cPending-ResTask": cPendingResTask, //待响应任务
    "cPlan-Audit": cPlanAudit, //计划审核
    "circulationing-Task": circulationingTask, //进行中任务
    "cPending-Acceptance": cPendingAcceptance, //待验收
    "cFinish-Task": cFinishTask, //已完成任务
    "cRepealed-Task": cRepealedTask //已废除任务
  },
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      activeName: "first"
    };
  },

  created() {
    this.getData();
  }
};
</script>
<style>
.con {
  width: 500px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
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
.biaoti {
  font-size: 18px;
  color: #303133;
}
.table {
  width: 100%;
  font-size: 16px;
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

