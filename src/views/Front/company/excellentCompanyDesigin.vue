<template>
  <div>
    <el-col :span="20" push="2" pull="2">
      <div>
        <div>
          <div class="title" width="160px">
            <span>首页</span>
            <span>&nbsp; > &nbsp;</span>
            <span>科技成果</span>
          </div>
          <br />
        </div>
      </div>
    </el-col>

    <div class="np_top">
      <div class="preview">
        <div class="BigTime">
          <el-carousel :interval="3000" arrow="always">
            <el-carousel-item v-for="item in imagesbox" :key="item">
              <img :src="item.idView" class="image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="Right">
        <font style="color:#ff7720;font-size:20px;">[229857]</font>
        <font style="color:#ff7720;font-size:18px">车辆装配制造</font>
        <el-divider></el-divider>
        <ul class="ul02">
          <li>
            <a>
              价格：
              <font style="color:#ff7720;font-size:18px">面议</font>
            </a>
          </li>
          <br />
          <li>
            <a>
              限制类别：
              <font style="font-size:18px">公司人数</font>
            </a>
          </li>
          <br />
          <li>
            <a>
              任务类别：
              <font style="font-size:18px">汽车装配制造</font>
            </a>
          </li>
          <br />
          <li>
            <a>
              注册资本：
              <font style="font-size:18px">2.5亿元</font>
            </a>
          </li>
          <br />
          <li>
            <a>
              其他：
              <font style="color:#ff7720;font-size:18px">无</font>
            </a>
          </li>
          <br />
        </ul>
      </div>
    </div>
    <div><br>
      <el-col :span="20" push="2" pull="1">
      <el-row :gutter="20">
        <el-col :span="16">
      <el-tabs type="card" class="white">
        <el-tab-pane label="企业信息">
          <el-col :span="23" push="1">
            <div style="display:block">
              <ul>
                <li class="yqk_nr_bt">
                  <a>企业简介</a>
                </li>
                <li>
                  <a>哈尔滨科大志远科技有限公司成立于2013年11月07日，注册地位于哈尔滨高新区科技创新城创新创业广场11号楼科技一街1039号C504室，法人代表为张晓天。经营范围包括智能教学设备、软件的研发与销售；企业管理咨询、商务信息咨询；信息技术服务，工程技术服务(涉及许可经营的项目，经审批机关批准并经工商行政管理机关登记注册后方可经营)。黑龙江棵乐信息技术有限公司是为中小微企业提供企业移动管理服务的专业企业，棵乐信息始终坚持专注于移动互联网时代的企业客户关系管理、营销管理、HR管理等方向，通过打造“管理信息化咨询平台+云服务平台”两大平台联动的商业模式，为客户提供从战略规划、商业模式设计、组织及人力资源优化、业务流程优化及管理、PC端和移动端IT系统规划及落地、云服务综合运营、管理等全链条综合持续服务，切实帮助企业与政府客户实现转型升级与价值落地。</a>
                </li>
                <li>
                  <a></a>
                </li>
              </ul>
            </div>
          </el-col>
        </el-tab-pane>
      </el-tabs></el-col>
       <el-col :span="7">
      <el-card shadow="hover">
        <div id="quarterlySituation" style="width: 100%;height:250%;"></div>
      </el-card>
       </el-col>
      </el-row>
      </el-col></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesbox: [
        { id: 0, idView: require("../../../admin/company/1.png") },
        { id: 1, idView: require("../../../admin/company/2.jpg") },
        { id: 2, idView: require("../../../admin/company/3.jpg") }
      ]
    };
  },
  mounted() {
    this.getCharts();
  },
  methods: {
    getCharts() {
      var charts = [];
      var myChart = echarts.init(document.getElementById("quarterlySituation"));
      var option = {
        title: {
          text: "季度完成量",
          subtext: " ",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          data: ["第一季度", "第二季度", "第三季度", "第四季度"]
        },
        series: [
          {
            name: "分季完成量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "25",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "第一季度" },
              { value: 310, name: "第二季度" },
              { value: 235, name: "第三季度" },
              { value: 220, name: "第四季度" }
              // {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      };
      myChart.setOption(option);
      charts.push(myChart);
    }
  }
};
</script>
<style>
/* .whitepicture {
  width: 25%;
  float: left;
}

.white {
  width: 50%;
} */
.divtap {
  border-right: 1px solid #000;
  border-top: 1px solid #000;
}
.designcomment {
  width: 80%;
  text-align: center;
}
.yqk_nr_bt {
  display: block;
  width: 200px;
  font-size: 16px;
  line-height: 40px;
  color: #00a2e6;
}

.title {
  font-size: 14px;
  font-style: normal;
  width: 160px;
}
.np_top {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  border-bottom-color: rgb(225, 225, 225);

  border-bottom-style: solid;

  border-bottom-width: 1px;

  border-left-color: rgb(225, 225, 225);

  border-left-style: solid;

  border-left-width: 1px;

  border-right-color: rgb(225, 225, 225);

  border-right-style: solid;

  border-right-width: 1px;

  border-top-color: rgb(225, 225, 225);

  border-top-style: solid;

  border-top-width: 1px;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 140px;

  margin-right: 125.61px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 10px;

  padding-left: 10px;

  padding-right: 10px;

  padding-top: 10px;

  text-decoration: none;

  width: 1200px;
}
.BigTime {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  height: 300px;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 0px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  position: relative;

  text-decoration: none;

  width: 300px;
}
.Right {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  float: left;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;

  font-size: 14px;

  font-style: normal;

  font-variant: normal;

  font-weight: 400;

  line-height: normal;

  margin-bottom: 0px;

  margin-left: 40px;

  margin-right: 0px;

  margin-top: 0px;

  overflow: hidden;

  padding-bottom: 0px;

  padding-left: 0px;

  padding-right: 0px;

  padding-top: 0px;

  text-decoration: none;

  width: 820px;
}
</style>
