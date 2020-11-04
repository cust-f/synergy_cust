
<template>
  <el-container style="overflow: hidden;" class="visual">
    <div style="padding:0px;">
      <header-synergy></header-synergy>
    </div>
    <div>
      <el-container style="padding:0px;overflow:hidden;">
        <el-header style="height:50px;">
          <el-page-header style="padding-top:15px;margin-left:15px;" @back="goBack" content="任务工作台"></el-page-header>
        </el-header>
        <el-main style="overflow:hidden;">
          <el-container>
            <el-container>
              <el-main width="73%" id="kvm-left" class="work">
                <el-tabs type="border-card" v-model="activeName" @tab-click="updataDetail">
                  <el-tab-pane
                    v-for="(item,index) in VisualMachineList"
                    :key="index"
                    :label="item.taskName"
                    :name="item.taskId"
                  >
                    <div class="show-iframe" id="visual" :style="{height:(screenHeight-80)+'px'}">
                      <iframe
                        style="width:100%;height:100%;                                                                                                                                                                                                                                                                                            position：absolute;width: 100%;height:90%; top: 0;left:0;bottom:0;"
                        frameborder="0"
                        scrolling="yes"
                        :src="item.ip"
                      ></iframe>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-main>

              <div id="movebar" style="width:2px; z-index:2; background:#cccccc;"></div>

              <el-aside width="27%" id="kvm-right">
                <el-tabs v-model="activeTab" type="border-card">
                  <el-tab-pane
                    class="cur"
                    :style="{height:(screenHeight-80)+'px'}"
                    label="任务详情"
                    name="first"
                  >
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">公司名称:</el-col>
                      <el-col :span="15" style="margin-left:40px">{{taskDetail.taskCode}}</el-col>
                    </el-row>
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">任务名称:</el-col>
                      <el-col :span="15" style="margin-left:40px">{{taskDetail.taskName}}</el-col>
                    </el-row>
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">任务类型:</el-col>
                      <el-col :span="15" style="margin-left:40px">{{taskDetail.taskType}}</el-col>
                    </el-row>
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">截止日期:</el-col>
                      <el-col
                        :span="15"
                        style="margin-left:40px"
                      >{{taskDetail.taskDeadline |dataFormat("yyyy-MM-dd")}}</el-col>
                    </el-row>
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">任务详情:</el-col>
                      <el-col :span="15" style="margin-left:40px">
                        <span>{{taskDetail.taskDescription}}</span>
                      </el-col>
                    </el-row>
                    <br />
                    <el-row>
                      <el-col :span="6" align="right">联系电话:</el-col>
                      <el-col :span="15" style="margin-left:40px">
                        <span>{{taskDetail.phone}}</span>
                      </el-col>
                    </el-row>
                    <br />
                  </el-tab-pane>
                  <!-- <el-tab-pane class="cur" label="文档提交" name="second">
                    假装这里有个富文本编辑器
                    <br />
                  </el-tab-pane>
                  <el-tab-pane class="cur" label="预留标签1" name="third">预留标签1</el-tab-pane>-->
                </el-tabs>
              </el-aside>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </div>
    <el-footer></el-footer>
  </el-container>
</template>


<script>
import headerSynergy from "../components/common/Front/Header";
import bus from "../components/common/Admin/bus";
import Qs from "qs";

export default {
  data() {
    return {
      taskDetail: "",
      activeTab: "first",
      activeName: "",
      VisualMachineList: "",
      taskId:this.$route.query.taskId,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  components: {
    "header-synergy": headerSynergy,
  },
  watch: {
    screenHeight: function (val) {
      // 监听屏幕高度变化
      var oIframe = document.getElementById("maindiv");
      // alert(this.$store.getters.screenHeight)
      oIframe.style.height = Number(val) - 40 + "px";
    },
  },
  created() {
    this.getVirtualTab();
    this.getTaskDetail(this.taskId);
  },
  mounted() {
    this.changeMobsfIframe();
    var _this = this;
    window.onresize = function () {
      // this.changeMobsfIframe();
      // var kvm_left = document.getElementById("kvm-left");
      // var kvm_right = document.getElementById("kvm-right");
      // kvm_left.style.width = "67%";
      // kvm_right.style.width = "33%";
      _this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
    /**
     * 鼠标拖动改变窗口大小
     */
    var move = true;
    this.dragControllerDiv(move);
  },
  methods: {
    /**
     * iframe-宽高自适应显示
     */
    changeMobsfIframe() {
      const oIframe = document.getElementsByClassName("show-iframe");
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      console.log(oIframe.length);
      for (var i = 0; i < oIframe.length; i++) {
        oIframe[i].style.height = Number(deviceHeight) - 40 + "px"; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整
      }
    },
    getVirtualTab() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.$route.query.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getDesignVisualMachine",
          data: data,
        })
        .then((response) => {
          console.log(response);
          this.VisualMachineList = response.data.allData.VisualMachineList;
          this.activeName = this.VisualMachineList[0].taskId;
        });
    },
    goBack() {
      window.history.go(-1);
    },
    getTaskDetail(id) {
      var that = this;
      var data = Qs.stringify({
        taskId: id,
      });
      that
        .axios({
          method: "post",
          url: "/api/VisualMachine/getTaskDetail",
          data: data,
        })
        .then((response) => {
          this.taskDetail = response.data.allData.taskDetail;
        });
    },
    updataDetail(data) {
      this.getTaskDetail(this.activeName);
    },
    backtolist() {
      this.$router.push("/admin/personnel_allotment/desinger");
    },
    dragControllerDiv: function (move) {
      var movebar = document.getElementById("movebar");
      movebar.onmousedown = function (e) {
        //获取左右距离
        var leftw = document.getElementById("kvm-left").offsetWidth;
        var rightw = document.getElementById("kvm-right").offsetWidth;
        //获取左右拖动快
        var kvm_left = document.getElementById("kvm-left");
        var kvm_right = document.getElementById("kvm-right");

        var mouse_start = e.pageX; //开始位置
        var mouse_end; //结束位置
        move = true;

        //插入一个全局的拖动把手（隐藏的）
        var mf = document.createElement("div");
        mf.setAttribute("id", "mf");
        mf.setAttribute(
          "style",
          "position:absolute;width:100%;height:100%;top:0;z-index:9999;cursor:w-resize"
        );
        document.body.appendChild(mf);

        window.onmousemove = function (event) {
          if (move && event.button == 0) {
            //当左键按下
            mouse_end = event.pageX;
            if (mouse_start < mouse_end) {
              //向右拖动
              if (rightw >= 10) {
                kvm_left.style.width = leftw + mouse_end - mouse_start + "px";
                leftw = leftw + mouse_end - mouse_start;

                kvm_right.style.width = rightw - mouse_end + mouse_start + "px";
                rightw = rightw - mouse_end + mouse_start;
              }
              if (rightw < 10) {
                kvm_right.style.width = 10 + "px";
                kvm_left.style.width = window.innerWidth - 10 + "px";
              }
            } else if (mouse_start > mouse_end) {
              //向左拖动
              if (leftw >= 1) {
                kvm_left.style.width = leftw - mouse_start + mouse_end + "px";
                leftw = leftw - mouse_start + mouse_end;
                kvm_right.style.width = rightw + mouse_start - mouse_end + "px";
                rightw = rightw + mouse_start - mouse_end;
              }
              if (leftw < 1) {
                kvm_left.style.width = 0 + "px";
                kvm_right.style.width = window.innerWidth + "px";
              }
            }
            mouse_start = mouse_end;
            var newleftw = document.getElementById("kvm-left").offsetWidth;
            var newrightw = document.getElementById("kvm-right").offsetWidth;
            var windows = window.innerWidth;
            if (newleftw > windows) {
              kvm_left.style.width = windows.innerWidth - 10 + "px";
              kvm_right.style.width = -10 + "px";
            }
            if (newrightw > windows) {
              kvm_right.style.width = windows.innerWidth + "px";
              kvm_left.style.width = 0 + "px";
            }
          }
        };
      };
      //释放把手
      window.onmouseup = function () {
        var mf = document.getElementById("mf");
        if (mf != null) {
          mf.remove();
          move = false;
        }
      };
    },
    returnAcceptMession() {
      this.$router.push({ path: "/admin/designerAcceptList" });
    },
  },
};
</script>
<style >
.buttons {
  margin-left: 70px;
  margin-top: 15px;
  width: 150px;
}
.visual .el-main {
  padding: 0px 0px;
  /* background-color: #F5F7FA; */
}
.visual .el-tabs__header {
  margin: 0px 0px;
}
.visual .el-tabs__content {
  padding: 0;
}
/* .visual .el-tabs__nav-scroll{
  background-color: #F5F7FA;
}
.visual .el-tabs--card>.el-tabs__header .el-tabs__nav{
  background-color: #FFF;
} */
.work {
}
</style>
