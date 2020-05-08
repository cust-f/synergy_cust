<template>
  <div>
    <div>
      <essential-Information ref="essentialInformation"></essential-Information>
    </div>
    <div>
      <mission-Plan ref="missionPlan"></mission-Plan>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
import { formatDate } from "../designDetails/dataChange";
import essentialInformation from "../designDetails/detailComponents/essentialInformation";
import missionPlan from "../designDetails/detailComponents/missionPlan";
export default {
  data() {
    return {
      //任务Id
      taskId: 0,
      //获取用户名
      userName: localStorage.getItem("ms_username"),
      //基本信息数据
      cool: {},
      PlantableData: []
    };
  },
  created() {
    this.getParams();
    this.showData();
  },
  methods: {
    //taskId传递方法，获取通过主界面传过来的taskId
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
      console.log(routerParams);
    },
    //数据显示方法
    showData() {
      console.log("你好");
      console.log(this.taskId);
      console.log(this.userName);
      var that = this;
      var data = Qs.stringify({
        taskId: this.taskId,
        userName: this.userName
      });
      console.log(data);
      that
        .axios({
          method: "post",
          url: "/api/supplier/getList",
          data: data
        })
        .then(response => {
          console.log(response);
          this.cool = response.data.allData.a[0];
          this.PlantableData = response.data.allData.b;
          this.sendMsg();
        });
    },
    //数据传递方法
    sendMsg() {
      this.$refs.essentialInformation.getMsg(this.cool);
      this.$refs.missionPlan.getMsg(this.PlantableData);
    }
  },
  components: {
    "essential-Information": essentialInformation, //基本信息
    "mission-Plan": missionPlan
  }
};
</script>

