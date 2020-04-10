<template>
  <div>
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">
          网站数据统计
        </div>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
    
      <el-col :span="24" style="margin-top:15px;">
        <el-row :gutter="20" class="mgb20">
          <el-form ref="form" :html="form">
           <el-col :span="4" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class=" "></i>
                <div class="grid-cont-right">
                  <div class="grid-num" v-html="form.monthCount"></div>
                  <div>本月成交任务</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-s-data grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num" v-html="form.desingMonthCount"></div>
                  <div>设计任务</div>
                </div>
              </div>
            </el-card>
          </el-col>
           <el-col :span="5" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-data grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num" v-html="form.circulaterMonthCount"></div>
                  <div>流通任务</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-bell grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">32</div>
                  <div>认证企业</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" >
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-s-data grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">50</div>
                  <div>认证供应商</div>
                </div>
              </div>
            </el-card>
          </el-col>
          </el-form>
           </el-row>
      </el-col>
           <el-row :gutter="20">
          <el-col :span="8" style="margin-top:5px;">
       
        <el-card shadow="hover" style="height:482px;margin-top: 10px;">
         
            <pie-chart ref="drawPieChart" :pieData="pieData" ></pie-chart>
          
        
        </el-card>
      </el-col>
        
        <el-col :span="16" style="margin-top:5px;">
        <el-card shadow="hover" style="height:482px;margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>需求详情</span>
            <el-tabs v-model="activeName">
              <!-- <el-tab-pane label="分季度完成需求量统计" name="first">
                <div id="quarterlySituation" style="width: 600px;height:400px;"></div>
              </el-tab-pane> -->

              <el-tab-pane label="核心企业发布需求量Top5" name="first">
               <cloumn-chart1 ref="drawCloumnChart1" :cloumnData1="cloumnData1" style="width: 600px;height:400px;"></cloumn-chart1>
              </el-tab-pane>
              <el-tab-pane label="供应商完成需求量Top5" name="second">
                <cloumn-chart2 ref="drawCloumnChart2" :cloumnData2="cloumnData2" style="width: 600px;height:400px;"></cloumn-chart2>
                
              </el-tab-pane>
              <!-- <el-tab-pane label="企业评分雷达" name="forth">
                <div id="comprehensiveScore" style="width: 600px;height:400px;"></div>
              </el-tab-pane>
              <el-tab-pane label="分类别需求量统计" name="fifth"> 
                <div class="demandTop5">日登录人数</div>
                <br />
                <div id="numberStatistics" style="width: 100%;height:390%;"></div>
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </el-card>
        </el-col>
       
      </el-row>
   
    <el-row :gutter="20">
     
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="type-situation">分类别需求量统计</div>
          <br />
          <div id="typeSituation" style="width: 100%;height:430%"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Schart from "vue-schart";
import Qs from "qs";
import columnChart1 from "./components/columnChart1";
import columnChart2 from "./components/columnChart2";
import pieChart from "./components/pieChart";
import bus from "../../../Layout/components/common/Admin/bus";
export default {
  name: "dashboard",
   components: {
      "cloumn-chart1": columnChart1,
      "cloumn-chart2": columnChart2,
      "pie-chart": pieChart
  },
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      activeName: "first",
      total_number: 1000,
      form:{
        monthCount:'',
        desingMonthCount:[],
        circulaterMonthCount:[],
      },
     
     //柱状图1
      cloumnData1: {
        //年份
        Vintage1: [],
        //最高五家公司名称
        topCompanyName1: [],
        //今年任务完成量
        nowTaskNumber1: [],
        //去年任务完成量
        lastTaskNumber1: []
      },
       //柱状图2
      cloumnData2: {
        //年份
        Vintage2: [],
        //最高五家公司名称
        topSupplierName2: [],
        //今年任务完成量
        nowTaskNumber2: [],
        //去年任务完成量
        lastTaskNumber2: []
      },
      pieData: {
        searsonCount: [],
        seasonsFinishTaskCount: [],
        nowYear:""
      },
      
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  //初始化方法
   created() {
   
    this.getMonthData();//本月成交任务、需求任务、流通任务的数据查找
    this.getStatistics();
  },
  mounted() {
   
    
    this.getCharts5();
    this.getCharts4();
    this.getCharts6();
  },

  methods: {
    //本月成交任务、需求任务、流通任务的数据查找
    getMonthData(){
       var that = this;
      
      var data = Qs.stringify({
       // monthCount:this.form.monthCount,
        // desingMonthCount:this.form.drawradarChart,
        // circulaterMonthCount:this.form.circulaterMonthCount,
      });
       // console.log(data);
     
      that
        .axios({
          method: "post",
          url:
            "http://127.0.0.1:8082/findTaskMonthCount",
          data: data
        })
        .then(response => {
          this.form.monthCount=response.data.allData[0];
          this.form.desingMonthCount=response.data.allData[1];
          this.form.circulaterMonthCount=response.data.allData[2];
           // console.log(response.data.allData);
          
        });
    },
    //数据统计
    getStatistics() {
      // var myDate = new Date();
      // var nowMonth = myDate.getMonth() + 1;
    
      this.columnChart();
      this.columnChart2();
      this.pipChart();
    },
    //柱形图数据1
    columnChart() {
      let that = this;
      that.axios.post("/api/dataStatistics/companyRank").then(response => {
        this.cloumnData1.Vintage1 = response.data.allData.Vintage;
        this.cloumnData1.topCompanyName1 = response.data.allData.companyName;
        this.cloumnData1.nowTaskNumber1 = response.data.allData.countYear;
        this.cloumnData1.lastTaskNumber1 = response.data.allData.countLastYear;
        that.$refs.drawCloumnChart1.getCharts();
      
      });
    },
    //柱形图数据2
    columnChart2() {
      let that = this;
      that.axios.post("/api/dataStatistics/supplierRank").then(response => {
        this.cloumnData2.Vintage2 = response.data.allData.Vintage;
        this.cloumnData2.topSupplierName2 = response.data.allData.supplierName;
        this.cloumnData2.nowTaskNumber2 = response.data.allData.countYear;
        this.cloumnData2.lastTaskNumber2 = response.data.allData.countLastYear;
        this.$refs.drawCloumnChart2.getCharts2();
          console.log(response.data.allData);
      });
    },
    //饼图数据
    pipChart() {
      let that = this;
      that.axios.post("/api/dataStatistics/seasonsTaskCount").then(response => {
        this.pieData.searsonCount = response.data.allData.searsonCount;
        this.pieData.seasonsFinishTaskCount = response.data.allData.seasonsFinishTaskCount;
        this.pieData.nowYear = response.data.allData.nowYear;
        
        this.$refs.drawPieChart.getCharts();        
        
      });
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    

    

    getCharts4() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("comprehensiveScore")); // 指定图表的配置项和数据

      var option = {
        title: {
          text: " "
        },
        tooltip: {},
        legend: {
          data: ["2017年", "2018年"]
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "销售", max: 10 },
            { name: "管理", max: 10 },
            { name: "技术", max: 10 },
            { name: "客服", max: 10 },
            { name: "研发", max: 10 } // { name: '市场（Marketing）', max: 25000}
          ]
        },
        series: [
          {
            name: "2017 vs 2018",
            type: "radar", // areaStyle: {normal: {}},
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                value: [8, 5, 6, 6, 6, 6],
                name: "2017年"
              },
              {
                value: [8, 6, 7, 4, 8, 7],
                name: "2018年"
              }
            ]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      charts.push(myChart);
    },

    getCharts5() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("typeSituation"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: [
            "交通运输设备",
            "仪器仪表及文化、办公用机械",           
            "通信设备、计算机及其他电子设备",
            "电器机械及器材",
            "专用设备",
            "通用设备",        
            
           
          ]
        },
        series: [
          
          {
            name: "占比来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 200, name: "交通运输设备" },
              { value: 350, name: "仪器仪表及文化、办公用机械",},
              { value: 300, name:  "通信设备、计算机及其他电子设备", },
              { value: 300, name: "电器机械及器材", },
              { value: 600, name: "专用设备", },
              { value: 900, name: "通用设备",  },
             
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      charts.push(myChart);
    },

    getCharts6() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById("numberStatistics"));
      var option = {
        title: {
          text: " "
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["核心企业用户", "供应商企业用户", "已注册用户", "未注册散户"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "核心企业用户",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "供应商企业用户",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "已注册用户",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "未注册散户",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      charts.push(myChart);
    }
  }
};

//监听窗口的改变大小
window.onresize = function() {
  //迭代全部图表
  for (var i = 0; i < charts.length; i++) {
    //随着窗口改变重置大小
    charts[i].resize();
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 80px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 15px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.type-situation {
  margin-left: 35%;
  font-size: 1.8rem;
  font-weight: bold;
}

.quarterly-situation {
  margin-left: 21%;
  font-weight: bold;
  font-size: 1.2rem;
}

.demandTop5 {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
