<template>
  <div style="width:1200px;margin:0 auto;" class="service">
    <el-row>
      <div>
        <div class="title1">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/twoMenu' }">服务成果</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/service1' }">成果详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <br />
      </div>
    </el-row>
    <br />
    <el-card shadow="never" style="margin-bottom:20px;" class="tatolheader">
      <div slot="header">
        <div style=" margin:-18px -20px; padding:10px 20px; background: #dcdfe6;border-bottom: 1px solid #606266;">成果详情</div>
      </div>

      <div class="service_top">
        <el-row>
          <el-col :span="11">
            <div class="service_right">
              <el-row>
                <span style="font-size:22px;font-weight:500;">{{maintask.mainTaskName}}</span>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="13">
                  <li>
                    <a>
                      企业所在省：
                      <font>{{Province}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      企业所在市：
                      <font>{{City}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      行业类别：
                      <font>{{maintask.taskCategoryMain}}</font>
                    </a>
                  </li>
                  <br />
                </el-col>
                <el-col :span="10">
                  <li>
                    <a>
                      二级类别：
                      <font>{{maintask.taskCategoryPart}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      开始时间：
                      <font>{{maintask.publishTime| dataFormat("yyyy-MM-dd")}}</font>
                    </a>
                  </li>
                  <br />
                  <li>
                    <a>
                      完成时间：
                      <font>{{maintask.finishTime| dataFormat("yyyy-MM-dd")}}</font>
                    </a>
                  </li>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <br>

          <el-col :span="10">
            <div class="left1">
              <el-card class="box-card" style="float:left ;margin-bottom: 10px;">
                <div slot="header" class="clearfix">
                  <div style="margin:-18px -20px; padding:10px 20px; background:#ffc107;">需求方</div>
                </div>
                <div class="text item">
                  <el-row>
                    <el-col :span="5">
                      <div class="demo-image">
                        <div class="block" :key="fill">
                          <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <li>
                        <a>
                          企业名称：
                          <font>{{company.companyName}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          经营范围：
                          <font>{{productCompany}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          联系电话：
                          <font>{{company.officeNumber}}</font>
                        </a>
                      </li>
                      <br />
                      <li>
                        <a>
                          企业地址：
                          <font>{{company.address}}</font>
                        </a>
                      </li>
                      <!-- <br />
                <li>
                  <a>
                    企业星级：
                    <el-rate v-model="company.star" disabled text-color="#ff9900"></el-rate>
                  </a>
                      </li>-->
                      <br />
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="son">
        <el-tabs v-model="activeName" type="card" @tab-click="updataDetail">
          <el-tab-pane v-for="(item,index) in list" :key="index" :label="item.taskName" :name="item.taskId"></el-tab-pane>
        </el-tabs>
        <el-card shadow="never">
          <el-row>
            <el-col :span="14">
              <div class="service_right">
                <el-row>
                  <span style="font-size:22px;font-weight:500;">{{taskData.taskName}}</span>
                </el-row>
                <el-divider></el-divider>

                <el-row>
                  <el-col :span="13">
                    <li>
                      <a>
                        企业所在省：
                        <font>{{supplier.province}}</font>
                      </a>
                    </li>
                    <br />
                    <li>
                      <a>
                        企业所在市：
                        <font>{{supplier.city}}</font>
                      </a>
                    </li>
                    <br />
                    <li>
                      <a>
                        行业类别：
                        <font>{{taskData.taskCategoryMain}}</font>
                      </a>
                    </li>
                    <br />
                    <li>
                      <a>
                        需求类别：
                        <font>{{taskData.taskType}}</font>
                      </a>
                    </li>
                    <br />
                  </el-col>

                  <el-col :span="10">
                    <li>
                      <a>
                        二级类别：
                        <font>{{taskData.taskCategoryPart}}</font>
                      </a>
                    </li>
                    <br />
                    <li>
                      <a>
                        开始时间：
                        <font>{{taskData.publishTime| dataFormat("yyyy-MM-dd")}}</font>
                      </a>
                    </li>
                    <br />
                    <li>
                      <a>
                        完成时间：
                        <font>{{taskData.finishTime| dataFormat("yyyy-MM-dd")}}</font>
                      </a>
                    </li>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <br>

            <el-col :span="10">
              <div class="left2">
                <el-card class="box-card" style="float:left ;margin-bottom: 10px;">
                  <div slot="header" class="clearfix">
                    <div style="margin:-18px -20px; padding:10px 20px; background:#ffc107;">供应方</div>
                  </div>
                  <div class="text item">
                    <el-row>
                      <el-col :span="5">
                        <div class="demo-image">
                          <div class="block" :key="fill">
                            <el-image style="width: 100px; height: 100px" :src="url1" :fit="fit"></el-image>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <li><a>企业名称：<font>{{supplier.companyName}}</font></a></li>
                        <br />
                        <li>
                          <a>
                            经营范围：
                            <font>{{product}}</font>
                          </a>
                        </li>
                        <br />
                        <li>
                          <a>
                            联系电话：
                            <font>{{supplier.officeNumber}}</font>
                          </a>
                        </li>
                        <br />
                        <li>
                          <a>
                            企业地址：
                            <font align="right">{{supplier.address}}</font>
                          </a>
                        </li>
                        <!-- <br />
                <li>
                  <a>
                    企业星级：
                    <el-rate v-model="company.star" disabled text-color="#ff9900"></el-rate>
                  </a>
                        </li>-->
                        <br />
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div class="white">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">需求详情</div>
              <el-divider></el-divider>
              <div>
                <div class="message" v-html="taskData.taskDetail"></div>
                <!-- <el-divider></el-divider> -->
              </div>
            </div>
          </el-row>
          <br />
          <br />
          <el-row>
            <div class="white">
              <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">服务成果</div>
              <el-divider></el-divider>
              <!-- <div v-show="see==1"> -->
                <div class="LTStep">
                  <el-steps :active="milepostActive1" align-center>
                    <el-step v-for="(stpesdata, key) in milepost1" :title="stpesdata.title" :icon="stpesdata.icon" :description="stpesdata.description" :key="key"></el-step>
                  </el-steps>
                </div>
                <br />
                <br />

                <div class="LDT">
                  <div id="charts2" style="height:300px; width:400px; float:left">
                    <radar-chart :radarData="radarData1" ref="QradarChart1"></radar-chart>
                    <br />
                  </div>
                  <div class="input_span1" align="center">
                    <el-form ref="formLT" :modelZL="formLT">
                      <div class="WCZL">完成质量:
                        <label id="word1" style="font-size:16px"></label>
                      </div>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                      <br />
                      <br />
                    </el-form>
                    <span id="one1"></span>
                    <span id="two2"></span>
                    <span id="three3"></span>
                  </div>
                </div>
              <!-- </div> -->
            </div>
          </el-row>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import Qs from "qs";
import radarChart from "./components/radarChart";
import radarChart1 from "./components/radarChart copy";
import { formatDate } from "./dataChange";

export default {
  name: "Home",
  components: {
    "radar-chart": radarChart,
    "radar-chart": radarChart1,
  },

  data() {
    return {
      formZL: {
        designCount: "",
      },
      formLT: {
        circulationCount: "",
      },
      see: "",
      activeName: "",
      Province: "",
      City: "",
      editableTabsValue: "1",
      companyDetail: "",
      companyDetailContent: "",
      productCompany: "",
      // editableTabs: [{
      //     title: "1",
      //     name: "1",
      //     taskId:"",
      //   },
      //   {
      //     title: "2",
      //     name: "2",
      //     taskId:"",
      //   }],
      url: require("../company/2.jpg"),
      //"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578498716057&di=2862e7c5e9dc83020a4698017c207fd8&imgtype=0&src=http%3A%2F%2Fstatic.yjcf360.com%2Fgegu%2Fimg%2F000800.jpg",
      //设定el-cow的值
      url1: "",
      //"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585666024421&di=1347c59f700657d0fe7b3089bb08a48a&imgtype=0&src=http%3A%2F%2Fcarlable.autov.com.cn%2Fimages%2Fb49.jpg",

      list: [
        {
          taskId: "",
          taskName: "",
        },
      ],
      taskData: [
        {
          taskName: "",
          taskCategoryMain: "",
          taskCategoryPart: "",
          taskDetail: "",
          finishTime: "",
          beginTime: "",
          taskType: "",
        },
      ],
      maintask: [
        {
          mainTaskName: "",
          taskCategoryMain: "",
          taskCategoryPart: "",
          publishTime: "",
          finishTime: "",
          maintaskDetail: "",
        },
      ],
      company: [
        {
          companyName: "",
          address: "",
          officeNumber: "",
          product: "",
        },
      ],
      product: "",
      supplier: [
        {
          companyName: "",
          address: "",
          officeNumber: "",
          // product: ""
        },
      ],
      radarData: {
        radarData: [],
        indicator: [],
      },
      radarData1: {
        radarData: [],
        indicator: [],
      },
      stepsdata: [],

      //步骤条数据
      milepost: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "审核", icon: "el-icon-message-solid", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" },
      ],
      milepost1: [
        { title: "申请/邀请", icon: "el-icon-edit", description: "" },
        { title: "计划提交", icon: "el-icon-upload", description: "" },
        { title: "任务进行中", icon: "el-icon-picture", description: "" },
        { title: "验收", icon: "el-icon-s-promotion", description: "" },
        { title: "完成", icon: "el-icon-s-claim", description: "" },
      ],
      // 默认步骤数
      milepostActive: 5,

      milepostActive1: 4,
      // 动态添加类名
      stepActive: "stepActive",
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
  created() {
    this.getParams();
    this.getListData();
    this.getData();
    this.getproduct();
  },
  methods: {
    getParams() {
      var routerParams = this.$route.query.mainTaskID;
      this.maintaskId = routerParams;
      // console.log(routerParams);
    },
    getData() {
      // console.log(this.maintaskId);
      var that = this;
      var data = Qs.stringify({
        maintaskId: this.maintaskId,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/serviceResult/mainTaskDetail",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          // console.log(response);
          //this.$set(this,'list',response.data.alldata)
          this.maintask = response.data.allData.a[0];
          this.Province = response.data.allData.b;
          this.City = response.data.allData.c;
          //this.list = response.data.allData.b[0];
        });
    },
    getListData() {
      //console.log(this.maintaskId);
      var that = this;
      var data = Qs.stringify({
        mainTaskId: this.maintaskId,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/serviceResult/TaskDetail",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
        //   console.log(response);
          this.activeName = response.data.allData.List[0].taskId;
          this.list = response.data.allData.List;
          this.getTaskData();
          this.getLTData();
          this.getAcceptCompanyData();
          this.getCompanyData();
          this.getCirculationCount();
          this.getproduct();
        });
    },

    getCompanyData() {
      var that = this;
      //console.log(this.activeName + "================");
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/serviceResult/finisCompanyDetail",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          console.log(response);
          //this.$set(this,'list',response.data.alldata)
          // console.log(response)
          this.company = response.data.allData.a[0];
          this.url = response.data.allData.b;
        });
    },
    getAcceptCompanyData() {
      ///console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/serviceResult/finishAcceptCompanyDetail",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          //console.log(response);
          //this.$set(this,'list',response.data.alldata)
          this.supplier = response.data.allData.a[0];
          this.url1 = response.data.allData.b;
        });
    },

    getproduct() {
      ////console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "/api//serviceResult/getCompay",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          // console.log(response);
          //this.$set(this,'list',response.data.alldata)
          this.product = response.data.allData.c;
          this.productCompany = response.data.allData.b;
          //console.log("product"+this.product)
        });
    },

    getTaskData() {
      //console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/serviceResult/findTask",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          //console.log(response);
          //this.$set(this,'list',response.data.alldata)
          this.taskData = response.data.allData[0];
          this.see = this.taskData.taskType;
          if (this.taskData.taskType === 0) {
            this.taskData.taskType = "设计任务";
            this.see = 0;
          } else {
            this.taskData.taskType = "流通任务";
            this.see = 1;
          }
          this.milepost1[0].description = this.$options.filters["formatDate"](
            response.data.allData[0].applyTime
          );
          this.milepost1[1].description = this.$options.filters["formatDate"](
            response.data.allData[0].checkPlanTime
          );
          this.milepost1[2].description = this.$options.filters["formatDate"](
            response.data.allData[0].uploadCircuaterTime
          );
          this.milepost1[3].description = this.$options.filters["formatDate"](
            response.data.allData[0].finishTime
          );
          this.milepost1[4].description = this.$options.filters["formatDate"](
            response.data.allData[0].finishTime
          );
          console.log("see:" + this.see);
          // if (this.taskData.taskType === 0) {
          //   this.taskData.taskType = "设计任务";
          //   this.see=0;

          // } else {
          //   this.taskData.taskType = "流通任务";
          //   this.see=1;

          // }
        });
    },

    getData1() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/remarkDetils",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          // console.log(response);
          this.radarData.radarData = response.data.allData.AllRemarkLength;
          this.radarData.indicator = response.data.allData.indicator;
          //console.log(this.radarData.radarData);

          // that.$refs.QradarChart.getCharts1();
          //that.$refs.QradarChart1.getCharts2();
          this.getCharts1();

          // this.getCharts2();
          //that.getCharts1();
        });
    },
    //流通雷达图数据获取
    getLTData() {
      var that = this;
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);
      that
        .axios({
          method: "post",
          url: "api/remarkDetilsL",
          data: data,

          //  data:this.$store.state.userName
        })
        .then((response) => {
          //console.log(response);

          this.radarData1.radarData = response.data.allData.AllRemarkLength;
          this.radarData1.indicator = response.data.allData.indicator;
          //console.log(this.radarData.radarData);

          //that.$refs.QradarChart.getCharts1();
          // that.$refs.QradarChart1.getCharts2();
          //this.getCharts1();

          this.getCharts2();
          //that.getCharts1();
        });
    },
    //步骤图数据查找
    getData2() {
      var that = this;
      // console.log(this.taskId);
      var data = Qs.stringify({
        taskId: this.activeName,
      });
      //console.log(data);

      that
        .axios({
          method: "post",
          url: "api/evaluateDetils",
          data: data,
        })
        .then((response) => {
          // that.stpesdata = response.data.allData[0];
          this.formZL.designCount = response.data.allData[6];

          this.milepost[0].description = response.data.allData[0];
          this.milepost[1].description = response.data.allData[1];
          this.milepost[2].description = response.data.allData[2];
          this.milepost[3].description = response.data.allData[3];
          this.milepost[4].description = response.data.allData[4];
          this.milepost[5].description = response.data.allData[5];

          this.styleswith();
        });
    },
    getCharts1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts1"));

      var option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "left",
          y: "top",
          data: ["数据统计(单位：天)"],
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: this.radarData.indicator,
          //  [
          //   { name: "协同交互效能", max: 60 },
          //   { name: "技术方案匹配度", max: 60 },
          //   { name: "变更控制效能", max: 60 },
          //   { name: "任务响应时效", max: 20 },
          //   { name: "过程管理效能", max: 20 }
          // ]
        },
        series: [
          {
            //name:'完成统计',
            type: "radar",
            data: [
              {
                name: "数据统计(单位：天)",
                value: this.radarData.radarData,
              },
            ],
          },
        ],
      };
      myChart.setOption(option, true);
    },
    //流通雷达图数据获取
    getCharts2() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts2"));

      var option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "left",
          y: "top",
          data: ["数据统计(单位：天)"],
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: this.radarData1.indicator,
          //  [
          //   { name: "协同交互效能", max: 60 },
          //   { name: "技术方案匹配度", max: 60 },
          //   { name: "变更控制效能", max: 60 },
          //   { name: "任务响应时效", max: 20 }
          // ]
        },
        series: [
          {
            //name:'完成统计',
            type: "radar",
            data: [
              {
                name: "数据统计(单位：天)",
                value: this.radarData1.radarData,
              },
            ],
          },
        ],
      };
      myChart.setOption(option, true);
    },
    getCirculationCount() {
      var that = this;
      var data = Qs.stringify({
        // taskId: this.taskId
        taskId: this.activeName,
      });
      that
        .axios({
          method: "post",
          url: "/api/findCirculationCount",
          data: data,
        })
        .then((response) => {
          (this.formLT.circulationCount = response.data.allData),
            this.styleswith1();
        });
    },

    styleswith() {
      //  document.getElementById("one").style.background = "rgb(238, 238, 238)";
      //  document.getElementById("two").style.background = "rgb(238, 238, 238)";
      //  document.getElementById("three").style.background = "rgb(238, 238, 238)";
      if (this.formZL.designCount >= 0 && this.formZL.designCount < 3) {
        document.getElementById("one").style.background = "#00D1B2";
        document.getElementById("word").innerHTML = "优";
        document.getElementById("word").style.color = "#00D1B2";
      }
      if (this.formZL.designCount > 2 && this.formZL.designCount < 4) {
        document.getElementById("one").style.background = "#eee";
        document.getElementById("two").style.background = "orange";
        document.getElementById("word").innerHTML = "良";
        document.getElementById("word").style.color = "orange";
      }
      if (this.formZL.designCount > 4 || this.formZL.designCount == 4) {
        document.getElementById("two").style.background = "#eee";
        document.getElementById("three").style.background = "red";
        document.getElementById("word").innerHTML = "差";
        document.getElementById("word").style.color = "red";
      }
    },

    styleswith1() {
      //document.getElementById("one").style.background = "rgb(238, 238, 238)";
      //  document.getElementById("two").style.background = "rgb(238, 238, 238)";
      //  document.getElementById("three").style.background = "rgb(238, 238, 238)";
      if (this.formLT.circulationCount > -4) {
        document.getElementById("two2").style.background = "#eee";
        document.getElementById("three3").style.background = "#eee";
        document.getElementById("one1").style.background = "#00D1B2";
        document.getElementById("word1").innerHTML = "优";
        document.getElementById("word1").style.color = "#00D1B2";
      } else if (
        this.formLT.circulationCount < -3 &&
        this.formLT.circulationCount > -8
      ) {
        document.getElementById("one1").style.background = "#eee";
        document.getElementById("two2").style.background = "#eee";
        document.getElementById("three3").style.background = "red";
        document.getElementById("word1").innerHTML = "良";
        document.getElementById("word1").style.color = "orange";
      } else if (
        this.formLT.circulationCount < -7 ||
        this.formLT.circulationCount == -8
      ) {
        document.getElementById("one1").style.background = "#eee";
        document.getElementById("two2").style.background = "#eee";
        document.getElementById("three3").style.background = "red";
        document.getElementById("word1").innerHTML = "差";
        document.getElementById("word1").style.color = "red";
      }
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
    updataDetail(data) {
      // console.log(data);
      this.getAcceptCompanyData();
      this.getCompanyData();
      this.getData1();
      this.getData2();
      //this.styleswith();
      this.getTaskData();
      this.getLTData();
      this.getCirculationCount();
      this.getproduct();
      //this.getCharts1();
    },
  },
};
</script>
<style lang="scss">
.service {
  .LDT {
    height: 300px;
    margin-left: 50px;
  }

  /* //完成质量 */
  .WCZL {
    font-size: 13px;
    color: #303133;
    margin-left: 20px;
  }
  .images {
    width: 200px;
    height: 200px;
  }
  .white {
    /* width: 67%; */
    margin-top: 20px;
  }
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
  .title1 {
    font-size: 14px;
    font-style: normal;
    width: 250px;
    margin-top: 22px;
  }
  .service_top {
    /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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

  border-top-width: 1px; */

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 0px;

    /* margin-left: 305.6px; */

    margin-right: 65.61px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 10px;

    padding-left: 10px;

    padding-right: 10px;

    padding-top: 10px;

    text-decoration: none;

    width: 1280px;
  }
  .BigTime {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    height: 150px;

    line-height: normal;

    margin-bottom: 0px;

    margin-left: 30px;

    margin-right: 0px;

    margin-top: 10px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    position: relative;

    text-decoration: none;

    width: 150px;
  }
  .ull {
    width: 200px;
  }
  .ulr {
    width: 200px;
  }
  .chart {
    width: 150px;
    height: 150px;
  }

  .service_right {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 10px;

    margin-left: 0px;

    margin-right: 0px;

    margin-top: 0px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 600px;
  }
  .service_right1 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 10px;

    margin-left: 120px;

    margin-right: 0px;

    margin-top: 50px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 800px;
  }
  .Right2 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    float: left;

    font-family: Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial,
      sans-serif;

    font-size: 14px;

    font-style: normal;

    font-variant: normal;

    font-weight: 400;

    line-height: normal;

    margin-bottom: 10px;

    margin-left: 0px;

    margin-right: 0px;

    margin-top: 50px;

    overflow: hidden;

    padding-bottom: 0px;

    padding-left: 0px;

    padding-right: 0px;

    padding-top: 0px;

    text-decoration: none;

    width: 800px;
  }
  .Right .el-divider--horizontal {
    width: 87%;
  }
  .ul02 {
    width: 920px;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: 0px solid #e4e7ed;
    margin-bottom: 0px;
  }
  .el-step__head.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .el-tabs__header {
    border-bottom: 0px solid #e4e7ed;
    padding: 0;
    position: relative;
    margin: 0 0 0px;
  }
}
/* //雷达图 */
</style>


<style scoped>
/* #inputValue {
  width: 240px;
  margin-left: 0px;
  padding-left: 10px;
  border-radius: 3px;
} */
.input_span span {
  display: inline-block;
  width: 85px;
  height: 30px;
  background: #eee;
  line-height: 20px;
}

#one {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 150px;
  margin-right: 3px;
}

#two {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
.input_span1 span {
  display: inline-block;
  width: 85px;
  height: 30px;
  background: #eee;
  line-height: 20px;
}
#one1 {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 5px;
  border-right: 0px solid;
  margin-left: 150px;
  margin-right: 3px;
}

#two2 {
  border-left: 0px solid;
  border-right: 0px solid;
  margin-left: -5px;
  margin-right: 3px;
}

#three3 {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: 0px solid;
  margin-left: -5px;
}
/* #font span:nth-child(1) {
  color: #00d1b2;
  margin-left: 80px;
}
#font span:nth-child(2) {
  color: orange;
  margin: 0 60px;
}
#font span:nth-child(3) {
  color: red;
} */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.LTstep {
  width: 100%;
  height: 70px;
}
.SJstep {
  width: 100%;
  height: 70px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 500px;
  float: right;
}

.test {
  padding: 0;
}

.left1 {
  margin-left: 30px;
  margin-top: 20px;
  float: right;
}
.left2 {
  margin-left: 30px;
  margin-top: 20px;
  float: right;
}
.el-tabs__header {
  border-bottom: 0px solid #e4e7ed;
  padding: 0;
  position: relative;
  margin: 0 0 0px;
}
.el-tabs__content {
  overflow: hidden;
  position: relative;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 0px;
}
</style>