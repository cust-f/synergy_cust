<template>
  <div id="circulationChart" style="width: 100%;height:350%;"></div>
</template>

<script>
export default {
  props: {
    lineData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  //   mounted() {
  //     this.getCharts3();
  //   },
  methods: {
    getCharts() {
      var that = this;
      var charts = [];
      var myChart = echarts.init(
        document.getElementById("circulationChart")
      );

      var option = {
        title: {
          text: "月度销售/库存量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["销售量", "库存量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.lineData.months
          // [
          //   "一月",
          //   "二月",
          //   "三月",
          //   "四月",
          //   "五月",
          //   "六月",
          //   "七月",
          //   "八月",
          //   "九月",
          //   "十月",
          //   "十一月",
          //   "十二月"
          // ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销售量",
            type: "line",
            stack: "总量",
          //  itemStyle: {
          //     normal: {
          //     // color:'#19CAAD',
          //       lineStyle: {
          //       //  color: "#19CAAD",
          //         width: 3
          //       }
          //     }
          //   },
            data: this.lineData.saleCount
            //    data: [1,1,6]
          },
          {
            name: "库存量",
            type: "line",
            stack: "总量",
            // itemStyle: {
            //   normal: {
            //   // color:'#F4606C',
            //     lineStyle: {
            //     //  color: "#F4606C",
            //       width: 3
            //     }
            //   }
            // },
            data: this.lineData.inventoryCount
            // data: [0,0,9]
          }
        ]
      }; // 使用刚指定的配置项和数据显示图表。
      console.log(option);
      myChart.setOption(option);
      charts.push(myChart);
    }
  }
};
</script>
