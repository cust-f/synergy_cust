<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top:15px;">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2020-1-6</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>长春</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:332px;margin-top: 20px;">
          <!-- <div slot="header" class="clearfix">
            <span>需求详情</span> -->
            <el-tabs v-model="activeName">
              <div class="quarterly-situation">年完成总量：{{total_number}}</div>
              <div id="quarterlySituation" style="width: 100%;height:300%"></div>
              <!-- width: 230px;height:300px; -->
            </el-tabs>
          <!-- </div> -->
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top:15px;">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-bell grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-data grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:482px;margin-top:10px;">
          <!-- <div slot="header" class="clearfix">
            <span>需求详情</span> -->
            <!-- <el-tabs v-model="activeName">
              <el-tab-pane label="分季度完成需求量统计" name="first">
                <div id="quarterlySituation" style="width: 600px;height:400px;"></div>
              </el-tab-pane> -->
              <!-- <el-tab-pane label="核心企业发布需求量Top5" name="second">
                <div id="releaseDemandTop5" style="width: 600px;height:400px;"></div>
              </el-tab-pane>    
              <el-tab-pane label="供应商完成需求量Top5" name="thirth">
                <div id="fulfillDemandTop5" ref="chart" style="width:600px;height:400px"></div>
              </el-tab-pane> -->
              <!-- <el-tab-pane label="企业评分雷达" name="forth">
                <div id="comprehensiveScore" style="width: 600px;height:400px;"></div>
              </el-tab-pane> -->
              <!-- <el-tab-pane label="分类别需求量统计" name="fifth"> -->
                <div class="type-situation">
                   分类别需求量统计
                </div><br>
                <div id="typeSituation" style="width: 105%;height:430%"></div>
              <!-- </el-tab-pane>               -->
            <!-- </el-tabs> -->
          <!-- </div> -->
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="demandTop5">核心企业发布需求量Top5</div>
          <div id="releaseDemandTop5" style="width: 100%;height:400%;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="demandTop5">供应商完成的需求量Top5</div>
          <div id="fulfillDemandTop5" ref="chart" style="width: 100%;height:400%;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Schart from "vue-schart";
import bus from "../../../Layout/components/common/Admin/bus";
export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("ms_username"),
      activeName:"first",
      total_number:1000,
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ],
    };
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  deactivated() {
      window.removeEventListener('resize', this.renderChart);
      bus.$off('collapse', this.handleBus);
  },
  mounted(){
    this.getCharts();
    this.getCharts2();
    this.getCharts3();
    // this.getCharts4();
    this.getCharts5();
  },
  methods: {
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
      });
    },
    getCharts(){
    var charts = [];
    var myChart = echarts.init(document.getElementById('quarterlySituation'));
    // 指定图表的配置项和数据
    var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: 0,
        data: ['第一季度', '第二季度', '第三季度', '第四季度']
    },
    series: [
        {
            name: '分季完成量',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '第一季度'},
                {value: 310, name: '第二季度'},
                {value: 235, name: '第三季度'},
                {value: 220, name: '第四季度'},
                // {value: 1548, name: '搜索引擎'}
            ]
        }
    ],
    

};
     myChart.setOption(option);
     charts.push(myChart);


    },

    getCharts2(){
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
    var myChart = echarts.init(document.getElementById('releaseDemandTop5'));
    // 指定图表的配置项和数据
    var option = {
    title: {
        text: ' ',
        subtext: '数据来自大数据统计'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['2017年', '2018年']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['索尼', '松下', '美的', '海尔', '格力']
    },
    series: [
        {
            name: '2017年',
            type: 'bar',
            data: [ 1315, 1432, 1679, 1789, 2015]
        },
        {
            name: '2018年',
            type: 'bar',
            data: [ 1356, 1530, 1650, 1690, 2121]
        },
        
    ]
    
};

       myChart.setOption(option);
       charts.push(myChart);
    },

    getCharts3() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(document.getElementById('fulfillDemandTop5'))
      var option = {
        title: {
          text: ' ',
          subtext: "数据来自大数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["2017年", "2018年"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['松下', '索尼', '海尔', '格力', '美的']
        },
        series: [
        {
            name: '2017年',
            type: 'bar',
            data: [ 1245, 1523, 1587, 1689, 2567]
        },
        {
            name: '2018年',
            type: 'bar',
            data: [ 1389, 1530, 1750, 1890, 2899]
        }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
      charts.push(myChart);
    },

    getCharts4(){
      // 基于准备好的dom，初始化echarts实例
    var charts =[];
    var myChart = echarts.init(document.getElementById('comprehensiveScore'));

    // 指定图表的配置项和数据
    var option = {
    title: {
        text: '企业综合评分'
    },
    tooltip: {},
    legend: {
        data: ['2017年', '2018年']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '销售能力（sales）', max: 10},
            { name: '管理（Administration）', max: 10},
            { name: '技术水平（Techology）', max: 10},
            { name: '客户服务（Customer Support）', max: 10},
            { name: '研发能力（Development）', max: 10},
            // { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [
            {
                value: [8, 5, 6, 6, 6, 6],
                name: '2017年'
            },
            {
                value: [8, 6, 7, 4, 8, 7],
                name: '2018年'
            }
        ]
    }]
};
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    charts.push(myChart);
    },

    getCharts5() {
      // 基于准备好的dom，初始化echarts实例
      var charts =[];
      var myChart = echarts.init(document.getElementById('typeSituation'))
      var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['仪器仪表', '电器机械及器材', '通信设备', '交通运输设备','光学仪器仪表', '通用仪器仪表','输配电及控制设备', '照明器具', '雷达及配套设备', '广播电视设备', '铁路运输设备','汽车']
    },
    series: [
        {
            name: '占比来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                position: 'inner'
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 550, name: '仪器仪表', selected: true},
                {value: 600, name: '电器机械及器材'},
                {value: 1500, name: '通信设备'},
                {value: 1200, name: '交通运输设备'}
            ]
        },
        {
            name: '占比来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                    a: {
                        color: '#999',
                        lineHeight: 22,
                        align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                    },
                    b: {
                        fontSize: 16,
                        lineHeight: 33
                    },
                    per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                    }
                }
            },
            data: [
                {value: 200, name: '光学仪器仪表'},
                {value: 350, name: '通用仪器仪表'},
                {value: 300, name: '输配电及控制设备'},
                {value: 300, name: '照明器具'},
                {value: 600, name: '雷达及配套设备'},
                {value: 900, name: '广播电视设备'},
                {value: 800, name: '铁路运输设备'},
                {value: 400, name: '汽车'}
            ]
        }
    ]
};

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      charts.push(myChart);
	    
    },
    
  }
};
    //监听窗口的改变大小
    window.onresize = function(){
      //迭代全部图表
      for(var i = 0; i < charts.length; i++){
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
  height: 100px;
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
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
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
  margin-bottom: 20px;
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
  margin-left: 30%;
  font-size: 2rem;
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
