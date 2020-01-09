<template>
  <el-container>
    <el-container>
      <el-main width="67%" id="kvm-left">
        <iframe
          id="show-iframe"
          style="width:100%;height:100%;                                                                                                                                                                                                                                                                                            position：absolute;width: 100%;height:90%; top: 0;left:0;bottom:0;"
          frameborder="0"
          scrolling="yes"
          src="http://10.34.51.107:9000"
        ></iframe>
      </el-main>

      <div id="movebar" style="width:15px; z-index:2; background:#cccccc"></div>

      <el-aside width="25%" id="kvm-right">
        <div style="background:#FFFFFF; height:128px">
          <el-row>
            <el-col :span="11">
              <el-button type="info" @click="backtolist">返回</el-button>
            </el-col>
            <el-col :span="11">
              <el-button type="warning">发送Ctrl+Alt+Del</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-button type="danger">断开连接</el-button>
            </el-col>
            <el-col :span="11">
              <el-button type="danger">关闭虚拟机</el-button>
            </el-col>
          </el-row>
        </div>
        <el-tabs v-model="activeTab" type="border-card" style="height:70%; margin-top:5px">
          <el-tab-pane class="cur" label="任务详情" name="first">
            <el-form ref="form" :model="form" label-width="140px" style="margin-right:40px">
              <br />
              <el-row>
                <el-form-item label="设计任务ID">
                  <el-input v-model="form.Desinger_ID" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
              <br />
              <br />
              <el-row>
                <el-form-item label="设计任务名称">
                  <el-input v-model="form.Desinger_Name" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
              <br />
              <br />
              <el-row>
                <el-form-item label="设计任务类型">
                  <el-input v-model="form.Desinger_Type" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
              <br />
              <br />
              <el-row>
                <el-form-item label="截止日期">
                  <el-input v-model="form.Desinger_End_Time" :disabled="true"></el-input>
                </el-form-item>
              </el-row>
              <br />
              <br />
              <el-row>
                <el-form-item label="设计任务详情">
                  <el-input
                    :disabled="true"
                    type="textarea"
                    :rows="5"
                    v-model="form.Desinger_Task_Details"
                    style="width:100%;"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane class="cur" label="文档提交" name="second">
            假装这里有个富文本编辑器
            <br />
          </el-tab-pane>
          <el-tab-pane class="cur" label="预留标签1" name="third">预留标签1</el-tab-pane>
          <el-tab-pane class="cur" label="预留标签2" name="fourth">预留标签2</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      activeTab: 'first'
    };
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe() {
      const oIframe = document.getElementById("show-iframe");
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.height = Number(deviceHeight) - 160 + "px"; //数字是页面布局高度差，其中的100可以根据自己的界面进行调整
    }
    changeMobsfIframe();
    window.onresize = function() {
      changeMobsfIframe();
      var kvm_left = document.getElementById("kvm-left");
      var kvm_right = document.getElementById("kvm-right");
      kvm_left.style.width = "65%";
      kvm_right.style.width = "28%";
    };

    /**
     * 鼠标拖动改变窗口大小
     */
    var move = true;
    this.dragControllerDiv(move);
  },
  methods: {
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
<style>
.el-button {
  margin-left: 50px;
  margin-top: 15px;
  width: 160px
}
</style>
