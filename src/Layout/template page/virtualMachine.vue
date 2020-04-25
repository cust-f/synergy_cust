
<template>
  <el-container style="overflow: hidden;">
    <div style="padding:0px;">
      <header-synergy></header-synergy>
    </div>
    <div>
      <el-container style="padding:0px;overflow:hidden;">
        <el-main style="padding-top:10spx;overflow:hidden;">
          <el-container>
            <el-container>
              
              <el-main width="73%" id="kvm-left">
                <el-tabs type="card" v-model="activeName" @tab-click="updataDetail">
                  <el-tab-pane 
                 v-for="(item,index) in virtualMachineList" :key="index"
                 :label="item.taskName"
                 :name="item.taskId">
                    <iframe
                      class="show-iframe"
                      style="width:100%;height:100%;                                                                                                                                                                                                                                                                                            position：absolute;width: 100%;height:90%; top: 0;left:0;bottom:0;"
                      frameborder="0"
                      scrolling="yes"
                      :src="item.ip"
                    ></iframe>
                  </el-tab-pane>
                </el-tabs>
              </el-main>

              <div
                id="movebar"
                style="width:15px; z-index:2; background:#cccccc; margin-left:-20px; margin-top:76px; height:91%"
              ></div>

              <el-aside width="27%" id="kvm-right">
                <!-- <div style="height:128px; margin-top:50px"> -->
                  <!-- <el-row>
                    <el-col :span="11">
                      <el-button class="buttons" type="info" @click="backtolist">返回</el-button>
                    </el-col>
                    <el-col :span="11">
                      <el-button class="buttons" type="warning">发送Ctrl+Alt+Del</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <el-button class="buttons" type="danger">断开连接</el-button>
                    </el-col>
                    <el-col :span="11">
                      <el-button class="buttons" type="danger">关闭虚拟机</el-button>
                    </el-col>
                  </el-row> -->
                <!-- </div> -->

                <el-tabs v-model="activeTab" type="border-card" style="height:73%; margin-top:5px">
                  <el-tab-pane class="cur" label="任务详情" name="first">
                    <el-form ref="form" :model="form" label-width="100px" style="margin-right:20px">
                      <br />
                      <el-row>
                        <el-col :span="6" align="right">设计任务ID:</el-col>
                        <el-col :span="15" style="margin-left:40px">0023</el-col>
                      </el-row>
                      <br />
                      <el-row>
                        <el-col :span="6" align="right">设计任务名称:</el-col>
                        <el-col :span="15" style="margin-left:40px">空气滤清器</el-col>
                      </el-row>
                      <br />
                      <el-row>
                        <el-col :span="6" align="right">设计任务类型:</el-col>
                        <el-col :span="15" style="margin-left:40px">设计任务</el-col>
                      </el-row>
                      <br />
                      <el-row>
                        <el-col :span="6" align="right">截止日期:</el-col>
                        <el-col :span="15" style="margin-left:40px">2020-2-25</el-col>
                      </el-row>
                      <br />
                      <el-row>
                        <el-col :span="6" align="right">设计任务详情:</el-col>
                        <el-col :span="15" style="margin-left:40px">
                          <span>作用是过滤空气中的灰尘杂质，让洁净的空气进入发动机，这对发动机的寿命和正常工作很重要。</span>
                          </el-col>
                      </el-row>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane class="cur" label="文档提交" name="second">
                    假装这里有个富文本编辑器
                    <br />
                  </el-tab-pane>
                  <el-tab-pane class="cur" label="预留标签1" name="third">预留标签1</el-tab-pane>
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
import Qs from "qs"

export default {
  data() {
    return {
      form: {},
      activeTab: "first",
      activeName: "",
      virtualMachineList:""
    };
  },
  components: {
    "header-synergy": headerSynergy
  },
  created(){
    this.getVirtualTab();
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const oIframe=document.getElementsByClassName("show-iframe")
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      console.log(Number(deviceHeight) - 40 + "px");
      for (i = 0; i < oIframe.length; i++) {
    oIframe[i].style.height = Number(deviceHeight) - 40 + "px"; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整
}

    }
    changeMobsfIframe();
    window.onresize = function() {
      changeMobsfIframe();
      var kvm_left = document.getElementById("kvm-left");
      var kvm_right = document.getElementById("kvm-right");
      kvm_left.style.width = "67%";
      kvm_right.style.width = "33%";
    };

    /**
     * 鼠标拖动改变窗口大小
     */
    var move = true;
    this.dragControllerDiv(move);
  },
  methods: {
    getVirtualTab(){
      var that=this;
      var data=Qs.stringify({
        taskId:1//未对接
      })
      that.axios({
        method:"post",
        url:"/api/VisualMachine/getDesignVisualMachine",
        data:data
      })
      .then(response=>{
        this.virtualMachineList=response.data.allData.VisualMachineList
        this.activeName=this.virtualMachineList[0].taskId
      })
    },
    updataDetail(){

    },
    backtolist() {
      this.$router.push("/admin/personnel_allotment/desinger");
    },
    dragControllerDiv: function(move) {
      var movebar = document.getElementById("movebar");
      movebar.onmousedown = function(e) {
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

        window.onmousemove = function(event) {
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
      window.onmouseup = function() {
        var mf = document.getElementById("mf");
        if (mf != null) {
          mf.remove();
          move = false;
        }
      };
    }
  }
};
</script>
<style >
.buttons {
  margin-left: 70px;
  margin-top: 15px;
  width: 150px;
}
</style>
