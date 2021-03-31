<template>
  <el-steps :active="milepostActive" align-center>
    <el-step
      v-for="(value, key) in milepost"
      :class="milepostActive== key+1 ? stepActive: '' "
      :title="value.title"
      :icon="value.icon"
      :description="value.description"
      :key="key"
    ></el-step>
  </el-steps>
</template>
<script>
import { formatDate } from "../dataChange";
export default {
  data() {
    return {
      name: "designSteps",
      // 进度条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" },
      ],
      // 进度条步骤
      milepostActive: 1,
      //任务信息
      taskMessage: [],
      //任务Id
      taskId: 0,
    };
  },
  filters: {
    formatDate(time) {
      if (time != 0) {
        var index = time.lastIndexOf(".");
        time = time.substring(0, index);
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      } else {
        return "暂未开始";
      }
    },
  },
  methods: {
    // 获取从父组件传过来的参数
    getMsg(msg) {
      this.getTaskMessage(msg);
    },
    // 获取请求头中的taskId
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
    getTaskMessage(msg) {
      this.milepostActive = msg[0][0].taskState;
      if (this.milepostActive == "计划提交") {
        this.milepostActive = 1;
      } else if (this.milepostActive == "申请或邀请中") {
        this.milepostActive = 0;
      } else if (this.milepostActive == "任务进行中") {
        this.milepostActive = 2;
      } else if (this.milepostActive == "审核") {
        this.milepostActive = 3;
      } else if (this.milepostActive == "验收") {
        this.milepostActive = 4;
      } else if (this.milepostActive == "完成") {
        this.milepostActive = 5;
      }
      if (this.milepostActive >= 0) {
        this.milepost[0].description = this.$options.filters["formatDate"](
          msg[0][0].applyTime
        );
        if (this.milepostActive > 0) {
          this.milepost[1].description = this.$options.filters["formatDate"](
             msg[1][0].checkPlanTime
          );
        }
        if (this.milepostActive > 1) {
        }
        if (this.milepostActive > 2) {
          this.milepost[2].description = this.$options.filters["formatDate"](
             msg[2][0].uploadDesignTime
          );
          this.milepost[3].description = this.$options.filters["formatDate"](
             msg[2][0].supplierCheckDesignTime
          );
        }
        if (this.milepostActive > 3) {
          this.milepost[4].description = this.$options.filters["formatDate"](
            msg[3][0].demandorCheckDesignTime
          );
        }
        if (this.milepostActive > 4) {
          this.milepost[5].description = this.$options.filters["formatDate"](
            msg[3][0].finishTime
          );
        }
      }
    },
  },
};
</script>>