<template>
<div>
  <el-container>
    <el-aside width="100px">Aside</el-aside>
     <el-container>
         <el-main>
           <el-container>
              <el-main>
                <div id="fulfillDemandTop5" ref="chart" style="width:600px;height:400px"></div>
                <div id="comprehensiveScore" style="width: 600px;height:400px;"></div>
                    本年总完成量：1000
                <div id="quarterlySituation" style="width: 600px;height:400px;"></div>
                <div id="releaseDemandTop5" style="width: 600px;height:400px;"></div>  
                <div id="totalSupplyAndDemandTop5" style="width: 600px;height:400px;"></div>
                <div id="typeSituation" style="width: 700px;height:400px;"></div>
                </el-main>
                <el-footer>
                  footer
                </el-footer>
              </el-container>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>


<script>
export default {
    name:"charts",
    data(){
      return{
      }
    },
  mounted() {
    this.getCharts();
    this.getCharts2();
    this.getCharts3();
    this.getCharts4();
    this.getCharts5();
    this.getCharts6();
  },
  methods: {
    getCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('fulfillDemandTop5'))
      var option = {
        title: {
          text: "供应商完成的需求量Top5",
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
    },

    getCharts2(){
      // 基于准备好的dom，初始化echarts实例
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
            { name: '人员管理（Administration）', max: 10},
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
    },

    getCharts3(){
    var myChart = echarts.init(document.getElementById('quarterlySituation'));
    // 指定图表的配置项和数据
    var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
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
                        fontSize: '30',
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
    ]
};
    myChart.setOption(option);
    },

    getCharts4(){
      // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('releaseDemandTop5'));
    // 指定图表的配置项和数据
    var option = {
    title: {
        text: '核心企业发布的需求量Top5 ',
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
        }
    ]
};
       myChart.setOption(option);
    },

      getCharts5() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('totalSupplyAndDemandTop5'))
      var option = {
        title: {
          text: "企业当年供需总量Top5",
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
          data: ['索尼', '松下', '海尔', '美的', '格力']
        },
        series: [
        {
            name: '2017年',
            type: 'bar',
            data: [ 2245, 2523, 2587, 7689, 8543]
        },
        {
            name: '2018年',
            type: 'bar',
            data: [ 2389, 2530, 2750, 7890, 8722]
        }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
    },

    getCharts6() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('typeSituation'))
      var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['汽车零部件', '建筑材料', '电子器件', '钢筋', '混凝土','水泥', '电容器', '电感', '铜导线', '其他']
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
                {value: 335, name: '汽车零部件', selected: true},
                {value: 679, name: '建筑材料'},
                {value: 1548, name: '电子器件'}
                //{value: 1122, name: '农副产品'}
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
                {value: 335, name: '汽车零部件'},
                {value: 310, name: '钢筋'},
                {value: 234, name: '混凝土'},
                {value: 135, name: '水泥'},
                {value: 1048, name: '电容器'},
                {value: 251, name: '电感'},
                {value: 147, name: '铜导线'},
                {value: 102, name: '其他'}
            ]
        }
    ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  }
};
</script>
<style>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 300px;
    border-block: 3px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align:left;
    line-height: 160px;
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
