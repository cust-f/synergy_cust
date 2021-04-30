<template>
  <div id="fulfillDemandTop5" style="width: 100%;height:350%;"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    cloumnData: {
      type: Object
    }
  },
  methods: {
    getCharts() {
      // 基于准备好的dom，初始化echarts实例
      var charts = [];
      var myChart = echarts.init(
        document.getElementById("fulfillDemandTop5")
      );
      console.log(this.cloumnData.Vintage);
      var option = {
        title: {
          text: "企业需求量预测",
          subtext: "数据来自大数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          // data: this.cloumnData.Vintage
          data: ["需求量预测"]
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
          type: "category",
          data: this.cloumnData.needCompanyName
          //   [
          //     "上海小糸车灯有限公司 ",
          //     "上海胜德塑料厂 ",
          //     "上海奥力得特种工具厂",
          //     "合肥皖仪科技有限公司",
          //     "北京京伟电器有限公司 "
          //   ]
        },
        series: [
          {
            // name: this.cloumnData.Vintage[0],
            name: "需求量预测",
            type: "bar",
            itemStyle: {
              normal: {
              //  color: "#BEE7E9",
                lineStyle: {
               //   color: "#BEE7E9",
                  width: 3
                }
              }
            },
            barWidth : 20,
            data: this.cloumnData.count
            // [1245, 1523, 1587, 1689, 2567]
          },
          // {
          //   name: this.cloumnData.Vintage[1],
          //   type: "bar",
          //   itemStyle: {
          //     normal: {
          //    //   color: "#F4606C",
          //       lineStyle: {
          //      //   color: "#F4606C",
          //         width: 3
          //       }
          //     }
          //   },
          //   data: this.cloumnData.nowTaskNumber
          // }
        ]
      }; // 使用刚指定的配置项和数据显示图表。

      myChart.setOption(option);
      charts.push(myChart);
    }
  }
};
</script>