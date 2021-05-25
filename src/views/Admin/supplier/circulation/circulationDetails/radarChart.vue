<template>
  <div id="charts1" style="height:380px; width:530px; float:left"></div>
</template>


<script>
export default {
  props: {
    radarData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    //雷达图
    getCharts1() {
      var that = this;
      var myChart = echarts.init(document.getElementById("charts1"));

      var option = {
        tooltip: {},
        legend: {
          orient: "vertical",
          x: "left",
          y: "top",
          data: ["数据统计"]
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 8]
            }
          },
          indicator:this.radarData.indicatorData,
          //  [
          //   { name: "协同交互效能", max: 60 },
          //   { name: "技术方案匹配度", max: 60 },
          //   { name: "任务响应时效", max: 20 },
          //   { name: "过程管理效能", max: 20 }
          // ]
        },
        series: [
          {
            type: "radar",
            textStyle: {
              fontSize: 16
            },
            data: [
              {
                name: "数据统计",
                value: this.radarData.radarData
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>